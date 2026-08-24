export const secureSessionConfig = {
  expiresIn: 60 * 60 * 24 * 30,
  updateAge: 60 * 60 * 24,
  // Paid access and password changes require revocations to take effect immediately.
  cookieCache: { enabled: false },
} as const;
