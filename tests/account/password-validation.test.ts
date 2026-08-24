import { describe, expect, it } from "vitest";
import { validatePasswordChange } from "@/components/account/password-validation";

describe("validatePasswordChange", () => {
  it("requires the current password", () => {
    expect(
      validatePasswordChange({
        currentPassword: "",
        newPassword: "nueva-clave-segura",
        confirmation: "nueva-clave-segura",
      }),
    ).toEqual({ valid: false, message: "Ingresa tu contraseña actual." });
  });

  it("requires a new password", () => {
    expect(
      validatePasswordChange({
        currentPassword: "clave-actual",
        newPassword: "",
        confirmation: "",
      }),
    ).toEqual({ valid: false, message: "Ingresa una contraseña nueva." });
  });

  it("rejects a new password shorter than eight characters", () => {
    expect(
      validatePasswordChange({
        currentPassword: "clave-actual",
        newPassword: "corta12",
        confirmation: "corta12",
      }),
    ).toEqual({
      valid: false,
      message: "La contraseña nueva debe tener al menos 8 caracteres.",
    });
  });

  it("rejects a new password longer than 128 characters", () => {
    const password = "a".repeat(129);

    expect(
      validatePasswordChange({
        currentPassword: "clave-actual",
        newPassword: password,
        confirmation: password,
      }),
    ).toEqual({
      valid: false,
      message: "La contraseña nueva no puede superar los 128 caracteres.",
    });
  });

  it("requires the confirmation to match the new password", () => {
    expect(
      validatePasswordChange({
        currentPassword: "clave-actual",
        newPassword: "nueva-clave-segura",
        confirmation: "otra-clave-segura",
      }),
    ).toEqual({ valid: false, message: "Las contraseñas nuevas no coinciden." });
  });
});
