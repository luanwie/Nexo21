import { test, expect } from "@playwright/test";
import { PrismaClient } from "@/generated/prisma-v2";

const prisma = process.env.DATABASE_URL
  ? new PrismaClient({ datasourceUrl: process.env.DATABASE_URL })
  : new PrismaClient();
const buyerEmail = "compradora.e2e@nexo21.test";
const adminEmail = process.env.ADMIN_EMAIL ?? "admin@nexo21.local";
const password = "Nexo21!Prueba2026";

async function clean(email: string) {
  const purchases = await prisma.purchase.findMany({ where: { purchaserEmail: email }, select: { id: true } });
  if (purchases.length) {
    await prisma.paymentEvent.deleteMany({ where: { purchaseId: { in: purchases.map((purchase) => purchase.id) } } });
  }
  await prisma.purchase.deleteMany({ where: { purchaserEmail: email } });
  await prisma.user.deleteMany({ where: { email } });
}

test.beforeAll(async () => {
  await clean(buyerEmail);
  await clean(adminEmail);
});

test.afterAll(async () => {
  await clean(buyerEmail);
  await clean(adminEmail);
  await prisma.$disconnect();
});

test("mobile: landing is responsive and leads to checkout", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Nexo 21/);
  await expect(page.getByRole("heading", { level: 1, name: /Tu matrimonio importa.*Tu voz, tu paz y tus límites también/i })).toBeVisible();
  await expect(page.getByText("Jornada cristiana para mujeres casadas", { exact: true })).toBeVisible();
  await expect(page.getByText("No dejaron de quererse.", { exact: true })).toHaveCount(0);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  const checkoutLinks = page.locator('a[href="/checkout?product=nexo-21"]');
  await expect(checkoutLinks.first()).toBeVisible();
});

test("public legal and support pages are available", async ({ page }) => {
  for (const [path, heading] of [
    ["/terminos", "Términos de uso"],
    ["/privacidad", "Política de privacidad"],
    ["/soporte", "Soporte de Nexo 21"],
  ] as const) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1, name: heading })).toBeVisible();
  }
});

test("buyer completes checkout, registers and uses core product flows", async ({ page }) => {
  test.setTimeout(90_000);
  await page.goto("/checkout?product=nexo-21");
  await page.getByLabel("Tu email de acceso").fill(buyerEmail);
  await page.getByRole("button", { name: /Continuar al pago seguro/i }).click();
  await expect(page.getByRole("heading", { name: /Compra simulada confirmada/i })).toBeVisible({ timeout: 20_000 });
  await page.getByRole("link", { name: /Crear mi acceso/i }).click();

  await page.getByLabel("Nombre").fill("María Prueba");
  await page.getByLabel("Correo electrónico").fill(buyerEmail);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: /Crear mi cuenta/i }).click();
  await expect(page.getByText(/Revisa tu correo y confirma el enlace/i)).toBeVisible({ timeout: 20_000 });
  await prisma.user.update({ where: { email: buyerEmail }, data: { emailVerified: true } });
  await page.goto("/login");
  await page.getByLabel("Correo electrónico").fill(buyerEmail);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: /^Ingresar$/i }).click();
  await expect(page).toHaveURL(/\/app$/, { timeout: 20_000 });
  await expect(page.getByRole("heading", { name: /Tu siguiente paso está aquí/i })).toBeVisible();

  await page.goto("/app/jornada/1");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await page.getByLabel("Tus notas privadas").fill("Hoy quiero responder con más calma.");
  await page.getByRole("button", { name: /Guardar nota/i }).click();
  await expect(page.getByRole("button", { name: /Guardado/i })).toBeVisible();
  await page.getByRole("button", { name: /Marcar como completado/i }).click();
  await expect(page.getByRole("button", { name: /Día completado/i })).toBeVisible();

  await page.goto("/app/diario");
  await page.getByLabel("Título").fill("Mi primera nota");
  await page.getByLabel("Escribe con libertad").fill("Una observación concreta para recordar.");
  await page.getByRole("button", { name: /Guardar entrada/i }).click();
  await expect(page.getByText("Mi primera nota")).toBeVisible();

  await page.goto("/app/mensajes");
  await page.getByPlaceholder(/Busca por situación/i).fill("agrade");
  await expect(page.getByText(/mensajes encontrados/i)).toBeVisible();
  await page.getByRole("button", { name: "Copiar" }).first().click();
  await expect(page.getByRole("button", { name: "Copiado" }).first()).toBeVisible();

  await page.goto("/app/conversaciones");
  await page.getByPlaceholder(/Sobre qué necesitas hablar/i).fill("Presupuesto");
  await page.getByRole("button", { name: /Presupuesto y gastos/i }).click();
  await expect(page.getByText("Frases que ayudan")).toBeVisible();

  await page.goto("/app/tienda");
  await expect(page.getByText(/Lo que tienes hoy y lo que estamos preparando/i)).toBeVisible();
  await expect(page.getByRole("link", { name: /Comprar/i })).toHaveCount(0);
});

test("admin account can access operations dashboard", async ({ page }) => {
  await page.goto("/registro");
  await page.getByLabel("Nombre").fill("Administradora E2E");
  await page.getByLabel("Correo electrónico").fill(adminEmail);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: /Crear mi cuenta/i }).click();
  await expect(page.getByText(/Revisa tu correo y confirma el enlace/i)).toBeVisible({ timeout: 20_000 });
  await prisma.user.update({ where: { email: adminEmail }, data: { emailVerified: true, role: "ADMIN" } });
  await page.goto("/login");
  await page.getByLabel("Correo electrónico").fill(adminEmail);
  await page.getByLabel("Contraseña").fill(password);
  await page.getByRole("button", { name: /^Ingresar$/i }).click();
  await expect(page).toHaveURL(/\/app$/, { timeout: 20_000 });
  await page.goto("/admin");
  await expect(page.getByText("Operación de Nexo 21.")).toBeVisible();
  await expect(page.getByText("Desbloqueo manual")).toBeVisible();
});
