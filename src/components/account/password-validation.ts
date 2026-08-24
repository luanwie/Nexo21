export type PasswordChangeValues = {
  currentPassword: string;
  newPassword: string;
  confirmation: string;
};

export type PasswordValidationResult =
  | { valid: true }
  | { valid: false; message: string };

export function validatePasswordChange(
  values: PasswordChangeValues,
): PasswordValidationResult {
  if (!values.currentPassword) {
    return { valid: false, message: "Ingresa tu contraseña actual." };
  }

  if (!values.newPassword) {
    return { valid: false, message: "Ingresa una contraseña nueva." };
  }

  if (values.newPassword.length < 8) {
    return {
      valid: false,
      message: "La contraseña nueva debe tener al menos 8 caracteres.",
    };
  }

  if (values.newPassword.length > 128) {
    return {
      valid: false,
      message: "La contraseña nueva no puede superar los 128 caracteres.",
    };
  }

  if (values.newPassword !== values.confirmation) {
    return { valid: false, message: "Las contraseñas nuevas no coinciden." };
  }

  return { valid: true };
}
