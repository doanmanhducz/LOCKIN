const base = '/LOCKIN';

export function sitePath(path: string): string {
  return path === '/' ? `${base}/` : `${base}${path}`;
}
