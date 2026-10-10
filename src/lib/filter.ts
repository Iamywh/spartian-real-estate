import type { Property } from "./data";
export type Filters = {
  location: string;
  price: string;
  area: string;
  beds: string;
  status: string;
  availability: string;
};
export const emptyFilters: Filters = {
  location: "",
  price: "",
  area: "",
  beds: "",
  status: "",
  availability: "",
};
export function filterProperties(items: Property[], f: Filters) {
  return items.filter(
    (p) =>
      (!f.location || p.location === f.location) &&
      (!f.price || p.price <= Number(f.price)) &&
      (!f.area || p.area >= Number(f.area)) &&
      (!f.beds || p.beds === Number(f.beds)) &&
      (!f.status || p.status === f.status) &&
      (!f.availability || p.availability === f.availability),
  );
}
