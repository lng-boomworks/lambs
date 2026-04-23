const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string): string {
  if (!path) return path;
  if (path.startsWith("//")) return path;
  if (!path.startsWith("/")) return path;
  return `${BASE}${path}`;
}

export const BASE_URL = BASE;
