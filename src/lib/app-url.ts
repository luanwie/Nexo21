type AppUrlSources = {
  configured?: string;
  vercelProjectHost?: string;
  vercelHost?: string;
};

function normalizeHost(value?: string) {
  const host = value?.trim();
  if (!host) return undefined;
  return host.startsWith("http://") || host.startsWith("https://") ? host : `https://${host}`;
}

export function resolvePublicAppUrl({ configured, vercelProjectHost, vercelHost }: AppUrlSources) {
  const explicit = configured?.trim();
  if (explicit) return explicit;
  return normalizeHost(vercelProjectHost) ?? normalizeHost(vercelHost);
}

export function resolveAppUrl(sources: AppUrlSources) {
  return resolvePublicAppUrl(sources) ?? "http://localhost:3000";
}

export function resolvePublicAppUrlFromEnvironment() {
  return resolvePublicAppUrl({
    configured: process.env.NEXT_PUBLIC_APP_URL,
    vercelProjectHost: process.env.VERCEL_PROJECT_PRODUCTION_URL,
    vercelHost: process.env.VERCEL_URL,
  });
}

export function resolveAppUrlFromEnvironment() {
  return resolvePublicAppUrlFromEnvironment() ?? "http://localhost:3000";
}
