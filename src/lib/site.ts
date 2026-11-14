/** Server-only deployment configuration; read at runtime so the image is portable. */
export function getSiteOrigin(): URL {
  const value = process.env.SITE_URL?.trim() || "http://localhost:3000";
  const url = new URL(value);
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password ||
      url.pathname !== "/" || url.search || url.hash) {
    throw new Error("SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment");
  }
  return url;
}
