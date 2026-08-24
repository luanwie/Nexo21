import {
  DollarSign,
  KeyRound,
  Power,
  ReceiptText,
  RotateCcw,
  Users,
} from "lucide-react";
import { grantAccess, revokeAccess, toggleProduct } from "@/app/admin/actions";
import {
  maskEmail,
  normalizeAdminMetrics,
} from "@/lib/domain/admin";
import {
  loadActions,
  loadConversations,
  loadDevotionals,
  loadJourney,
  loadMessages,
} from "@/lib/content";
import { prisma } from "@/lib/prisma";

const statusLabels: Record<string, string> = {
  PENDING: "Pendiente",
  PAID: "Pagado",
  REFUNDED: "Reembolsado",
  CHARGEBACK: "Contracargo",
  CANCELLED: "Cancelado",
};

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

function formatUsd(cents: number) {
  return `US$${(cents / 100).toFixed(2)}`;
}

function productNames(items: Array<{ product: { title: string } }>) {
  return items.map((item) => item.product.title).join(", ") || "Sin producto vinculado";
}

export default async function AdminPage() {
  const now = new Date();
  const activeAccessWhere = {
    status: "ACTIVE" as const,
    OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
  };
  const hotmartUsdWhere = {
    provider: "hotmart",
    currency: { equals: "USD", mode: "insensitive" as const },
  };

  const [
    totalUsers,
    paidPurchases,
    paidRevenueUsd,
    refundsAndChargebacks,
    activeAccesses,
    products,
    users,
    purchases,
    hotmartEvents,
    entitlements,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.purchase.count({ where: { ...hotmartUsdWhere, status: "PAID" } }),
    prisma.purchase.aggregate({
      where: {
        ...hotmartUsdWhere,
        status: "PAID",
      },
      _sum: { amountCents: true },
    }),
    prisma.purchase.count({
      where: { ...hotmartUsdWhere, status: { in: ["REFUNDED", "CHARGEBACK"] } },
    }),
    prisma.entitlement.count({ where: activeAccessWhere }),
    prisma.product.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { id: true, name: true, email: true, role: true },
    }),
    prisma.purchase.findMany({
      orderBy: [{ providerOccurredAt: "desc" }, { createdAt: "desc" }],
      take: 20,
      select: {
        id: true,
        transactionId: true,
        purchaserEmail: true,
        status: true,
        amountCents: true,
        currency: true,
        providerOccurredAt: true,
        items: {
          select: { product: { select: { title: true } } },
        },
      },
    }),
    prisma.paymentEvent.findMany({
      where: { provider: "hotmart" },
      orderBy: [{ occurredAt: "desc" }, { createdAt: "desc" }],
      take: 20,
      select: {
        id: true,
        eventId: true,
        transactionId: true,
        status: true,
        occurredAt: true,
        purchase: {
          select: {
            purchaserEmail: true,
            items: {
              select: { product: { select: { title: true } } },
            },
          },
        },
      },
    }),
    prisma.entitlement.findMany({
      where: activeAccessWhere,
      select: {
        id: true,
        user: { select: { email: true } },
        product: { select: { title: true } },
      },
      orderBy: { grantedAt: "desc" },
      take: 30,
    }),
  ]);

  const metrics = normalizeAdminMetrics({
    totalUsers,
    paidPurchases,
    paidRevenueUsdCents: paidRevenueUsd._sum.amountCents,
    refundsAndChargebacks,
    activeAccesses,
  });
  const contentCounts = [
    ["Jornada", loadJourney().length],
    ["Mensajes", loadMessages().length],
    ["Conversaciones", loadConversations().length],
    ["Acciones", loadActions().length],
    ["Devocionales", loadDevotionals().length],
  ] as const;

  const metricCards = [
    { icon: Users, label: "Usuarios totales", value: metrics.totalUsers },
    { icon: ReceiptText, label: "Compras Hotmart pagadas (USD)", value: metrics.paidPurchases },
    {
      icon: DollarSign,
      label: "Valor actualmente pagado (Hotmart USD)",
      value: formatUsd(metrics.paidRevenueUsdCents),
    },
    {
      icon: RotateCcw,
      label: "Reversiones Hotmart (USD)",
      value: metrics.refundsAndChargebacks,
    },
    { icon: KeyRound, label: "Accesos activos", value: metrics.activeAccesses },
  ];

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[.16em] text-[#B85C42]">
          Administración
        </p>
        <h1 className="editorial-title mt-3 text-4xl sm:text-6xl">Operación de Nexo 21.</h1>
        <p className="mt-3 text-muted">
          Usuarios, ofertas, pedidos, eventos de pago y desbloqueos.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metricCards.map(({ icon: Icon, label, value }) => (
          <div key={label} className="app-card p-5">
            <Icon className="text-[#B85C42]" />
            <p className="mt-4 text-2xl font-semibold">{value}</p>
            <p className="text-sm text-muted">{label}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="app-card p-6">
          <h2 className="flex items-center gap-2 font-semibold">
            <KeyRound size={18} /> Desbloqueo manual
          </h2>
          <form action={grantAccess} className="mt-4 space-y-3">
            <input
              className="field"
              name="email"
              type="email"
              placeholder="email de la usuaria"
              required
            />
            <select className="field" name="productSlug" required>
              {products.map((product) => (
                <option key={product.id} value={product.slug}>
                  {product.title}
                </option>
              ))}
            </select>
            <button className="primary-button w-fit">Conceder acceso</button>
          </form>
        </div>
        <div className="app-card p-6">
          <h2 className="font-semibold">Inventario editorial</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            {contentCounts.map(([label, value]) => (
              <div key={label} className="rounded-xl bg-[#f4eee4] p-3">
                <strong className="block text-xl">{value}</strong>
                <span className="text-muted">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="app-card overflow-hidden">
        <div className="border-b border-[#ddd3c6] p-5">
          <h2 className="font-semibold">Productos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#f4eee4] text-muted">
              <tr>
                <th className="p-3">Producto</th>
                <th>Tipo</th>
                <th>Precio</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-[#eee6db]">
                  <td className="p-3 font-medium">{product.title}</td>
                  <td>{product.type}</td>
                  <td>{formatUsd(product.priceCents)}</td>
                  <td>{product.active ? "Activo" : "Inactivo"}</td>
                  <td>
                    <form action={toggleProduct}>
                      <input type="hidden" name="id" value={product.id} />
                      <input type="hidden" name="active" value={String(product.active)} />
                      <button className="secondary-button text-xs">
                        <Power size={14} />
                        {product.active ? "Desactivar" : "Activar"}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="app-card overflow-hidden">
        <div className="border-b border-[#ddd3c6] p-5">
          <h2 className="font-semibold">Pedidos recientes</h2>
          <p className="mt-1 text-sm text-muted">
            Los 20 pedidos más recientes.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-[#f4eee4] text-muted">
              <tr>
                <th className="p-3">Estado</th>
                <th>Transacción</th>
                <th>Email</th>
                <th>Producto</th>
                <th>Total</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id} className="border-t border-[#eee6db] align-top">
                  <td className="p-3">
                    <span className="pill bg-[#f4eee4] text-muted">
                      {statusLabels[purchase.status] ?? purchase.status}
                    </span>
                  </td>
                  <td className="py-3 pr-3 font-medium">{purchase.transactionId}</td>
                  <td className="py-3 pr-3">{maskEmail(purchase.purchaserEmail)}</td>
                  <td className="py-3 pr-3">{productNames(purchase.items)}</td>
                  <td className="py-3 pr-3">
                    {purchase.currency.toUpperCase() === "USD"
                      ? formatUsd(purchase.amountCents)
                      : `${purchase.currency} ${(purchase.amountCents / 100).toFixed(2)}`}
                  </td>
                  <td className="py-3 pr-3">{dateFormatter.format(purchase.providerOccurredAt)}</td>
                </tr>
              ))}
              {purchases.length === 0 ? (
                <tr>
                  <td className="p-5 text-muted" colSpan={6}>
                    No hay pedidos que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="app-card overflow-hidden">
        <div className="border-b border-[#ddd3c6] p-5">
          <h2 className="font-semibold">Eventos de Hotmart</h2>
          <p className="mt-1 text-sm text-muted">Los 20 eventos más recientes, sin datos de payload.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] text-left text-sm">
            <thead className="bg-[#f4eee4] text-muted">
              <tr>
                <th className="p-3">Status</th>
                <th>Transacción</th>
                <th>Email</th>
                <th>Producto</th>
                <th>Fecha</th>
                <th>Event ID</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {hotmartEvents.map((event) => (
                <tr key={event.id} className="border-t border-[#eee6db] align-top">
                  <td className="p-3">
                    <span className="pill bg-[#f4eee4] text-muted">
                      {statusLabels[event.status] ?? event.status}
                    </span>
                  </td>
                  <td className="py-3 pr-3 font-medium">{event.transactionId}</td>
                  <td className="py-3 pr-3">
                    {event.purchase ? maskEmail(event.purchase.purchaserEmail) : "—"}
                  </td>
                  <td className="py-3 pr-3">
                    {event.purchase ? productNames(event.purchase.items) : "Sin producto vinculado"}
                  </td>
                  <td className="py-3 pr-3">{dateFormatter.format(event.occurredAt)}</td>
                  <td className="py-3 pr-3 font-mono text-xs">{event.eventId}</td>
                  <td className="py-3 pr-3">{event.purchase ? "Vinculado" : "Sin vincular"}</td>
                </tr>
              ))}
              {hotmartEvents.length === 0 ? (
                <tr>
                  <td className="p-5 text-muted" colSpan={7}>
                    No hay eventos de Hotmart que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <div className="app-card overflow-hidden">
          <div className="p-5">
            <h2 className="font-semibold">Últimos usuarios</h2>
          </div>
          <div className="divide-y divide-[#eee6db]">
            {users.map((user) => (
              <div key={user.id} className="flex justify-between gap-3 px-5 py-3 text-sm">
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-muted">{user.email}</p>
                </div>
                <span className="pill bg-[#f4eee4] text-muted">{user.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="app-card overflow-hidden">
          <div className="p-5">
            <h2 className="font-semibold">Accesos activos recientes</h2>
          </div>
          <div className="divide-y divide-[#eee6db]">
            {entitlements.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 px-5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{item.user.email}</p>
                  <p className="text-muted">{item.product.title}</p>
                </div>
                <form action={revokeAccess}>
                  <input type="hidden" name="entitlementId" value={item.id} />
                  <button className="secondary-button text-xs">Revocar</button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
