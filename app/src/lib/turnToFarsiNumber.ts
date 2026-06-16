export function toFarsiNumber(input: string | number): string {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return input.toString().replace(/[0-9]/g, (d) => {
    return farsiDigits[Number(d)];
  });
}