export class PayloadTooLargeError extends Error {
  constructor() {
    super("Payload too large");
    this.name = "PayloadTooLargeError";
  }
}

export async function readJsonBody(request: Request, maxBytes: number): Promise<unknown> {
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declared) && declared > maxBytes) throw new PayloadTooLargeError();

  const bytes = new Uint8Array(await request.arrayBuffer());
  if (bytes.byteLength > maxBytes) throw new PayloadTooLargeError();
  if (bytes.byteLength === 0) throw new SyntaxError("Empty JSON body");
  return JSON.parse(new TextDecoder().decode(bytes)) as unknown;
}
