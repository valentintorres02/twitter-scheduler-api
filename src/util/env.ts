export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;

  if (typeof value === 'string') return value;
  throw new Error(`Missing environment variable "${key}".`);
}
