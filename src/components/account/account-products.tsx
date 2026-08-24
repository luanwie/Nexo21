import { PackageCheck } from "lucide-react";

type AccountProduct = {
  id: string;
  title: string;
  grantedAt: Date;
};

type AccountProductsProps = {
  products: AccountProduct[];
};

const dateFormatter = new Intl.DateTimeFormat("es", { dateStyle: "medium" });

export function AccountProducts({ products }: AccountProductsProps) {
  return (
    <section className="app-card p-6" aria-labelledby="account-products-title">
      <h2 id="account-products-title" className="flex items-center gap-2 font-semibold">
        <PackageCheck size={18} className="text-[#74836B]" aria-hidden="true" />
        Productos adquiridos
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {products.length ? (
          products.map((product) => (
            <article key={product.id} className="rounded-xl border border-[#ddd3c6] p-4">
              <h3 className="font-semibold">{product.title}</h3>
              <p className="mt-1 text-xs text-muted">
                Acceso activo desde {dateFormatter.format(product.grantedAt)}
              </p>
            </article>
          ))
        ) : (
          <p className="text-sm text-muted">Todavía no hay compras vinculadas a esta cuenta.</p>
        )}
      </div>
    </section>
  );
}
