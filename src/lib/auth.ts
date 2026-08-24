import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { escapeHtml, sendTransactionalEmail } from "@/lib/email";
import { secureSessionConfig } from "@/lib/auth-policy";
import { resolveAppUrlFromEnvironment, resolvePublicAppUrlFromEnvironment } from "@/lib/app-url";
import { prisma } from "@/lib/prisma";

const requireEmailVerification = true;
const authSecret = process.env.BETTER_AUTH_SECRET;
const publicAppUrl = resolvePublicAppUrlFromEnvironment();
const appUrl = publicAppUrl ?? resolveAppUrlFromEnvironment();
const databaseProvider = process.env.DATABASE_URL?.startsWith("postgres") ? "postgresql" : "sqlite";

if (
  process.env.NODE_ENV === "production" &&
  (!authSecret || authSecret.length < 32 || /replace|example/i.test(authSecret))
) {
  throw new Error("BETTER_AUTH_SECRET must be a non-placeholder value with at least 32 characters");
}
if (process.env.NODE_ENV === "production" && !publicAppUrl) {
  throw new Error("NEXT_PUBLIC_APP_URL is required in production");
}

export const auth = betterAuth({
  appName: "Nexo 21",
  baseURL: appUrl,
  secret: authSecret,
  trustedOrigins: [appUrl ?? "http://localhost:3000"],
  database: prismaAdapter(prisma, { provider: databaseProvider, transaction: true }),
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendTransactionalEmail({
        to: user.email,
        subject: "Confirma tu correo de Nexo 21",
        html: `<p>Hola ${escapeHtml(user.name)},</p><p>Confirma que este correo te pertenece para activar compras y acceso:</p><p><a href="${escapeHtml(url)}">Confirmar correo</a></p>`,
      });
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: !requireEmailVerification,
    requireEmailVerification,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendTransactionalEmail({
        to: user.email,
        subject: "Restablece tu contraseña de Nexo 21",
        html: `<p>Hola ${escapeHtml(user.name)},</p><p>Usa este enlace seguro para crear una nueva contraseña:</p><p><a href="${escapeHtml(url)}">Restablecer contraseña</a></p><p>Si no solicitaste este cambio, ignora este mensaje.</p>`,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "MEMBER",
        input: false,
      },
    },
  },
  session: secureSessionConfig,
  advanced: {
    cookiePrefix: "nexo21",
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  plugins: [nextCookies()],
});
