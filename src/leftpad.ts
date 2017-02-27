export default function leftpad(str: string, len: number, ch: string) {
  return str.padStart(len, ch);
}

declare global {
  interface String {
    padStart(len: number, pad?: string): string;
  }
}
