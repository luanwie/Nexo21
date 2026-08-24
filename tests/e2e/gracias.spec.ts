import { expect, test } from "@playwright/test";

const privateEmail = "compradora.privada@example.test";

test("mobile: /gracias guides a buyer without exposing query PII", async ({ page }) => {
  const response = await page.goto(`/gracias?email=${encodeURIComponent(privateEmail)}&name=Maria`);

  expect(response?.ok()).toBe(true);
  await expect(page).toHaveURL(/\/gracias$/);
  expect(new URL(page.url()).search).toBe("");
  await expect(page).toHaveTitle(/Activa tu acceso.*Nexo 21/i);
  await expect(page.getByRole("heading", { level: 1, name: "Activa tu acceso a Nexo 21" })).toBeVisible();
  await expect(page.getByText(/mismo correo que usaste en la compra/i)).toBeVisible();
  await expect(page.getByText(/confirma tu correo/i).first()).toBeVisible();
  await expect(page.getByText(/mediante un webhook/i)).toBeVisible();

  await expect(page.getByRole("link", { name: "Crear mi acceso" })).toHaveAttribute("href", "/registro");
  await expect(page.getByRole("link", { name: "Ya tengo una cuenta" })).toHaveAttribute("href", "/login");
  await expect(page.getByRole("heading", { name: "¿Problemas con el acceso?" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Tu seguridad importa" })).toBeVisible();

  await expect(page.getByText(privateEmail, { exact: false })).toHaveCount(0);
  await expect(page.getByText("Maria", { exact: true })).toHaveCount(0);

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});
