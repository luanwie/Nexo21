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

export function resolveTrustedOrigins(canonical: string, configured?: string) {
  const values = [canonical, ...(configured?.split(",") ?? [])]
    .map((value) => value.trim())
    .filter(Boolean);
  const origins = values.map((value) => {
    try {
      const url = new URL(value);
      const localHttp = url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname);
      if (
        (url.protocol !== "https:" && !localHttp) ||
        url.username ||
        url.password ||
        url.pathname !== "/" ||
        url.search ||
        url.hash ||
        value.includes("*")
      ) {
        throw new Error("Invalid trusted origin");
      }
      return url.origin;
    } catch (error) {
      if (error instanceof Error && error.message === "Invalid trusted origin") throw error;
      throw new Error("Invalid trusted origin");
    }
  });
  return [...new Set(origins)];
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
