type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

export async function sendTransactionalEmail(payload: EmailPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (apiKey && from) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, ...payload }),
    });
    if (!response.ok) {
      throw new Error(`Email provider rejected request (${response.status})`);
    }
    return { provider: "resend" as const };
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("Transactional email provider is not configured");
  }

  console.info(`[DEV EMAIL] ${payload.subject} -> ${payload.to}\n${payload.html}`);
  return { provider: "development-log" as const };
}
