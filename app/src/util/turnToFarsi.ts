import { cityT } from "../store/cityStore";

export function ToFarsi(city: cityT): string {
  return city.name === "tehran" ? "تهران" : "تبریز";
}