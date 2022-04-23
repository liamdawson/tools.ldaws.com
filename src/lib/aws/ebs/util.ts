const bytesInA = {
  KB: 1000,
  KiB: 1024,
  MB: 1000 * 1000,
  MiB: 1024 * 1024,
} as const;

type SizeUnits = keyof typeof bytesInA;

export const toBytes = (bytes: number, unit: SizeUnits) =>
  bytes * bytesInA[unit];
export const fromBytes = (bytes: number, unit: SizeUnits) =>
  bytes / bytesInA[unit];
