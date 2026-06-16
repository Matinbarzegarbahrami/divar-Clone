export function formatPrice(value: string | number): string {
  return value
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}