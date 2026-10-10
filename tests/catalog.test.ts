import { describe, it, expect } from "vitest";
import { filterProperties, emptyFilters } from "../src/lib/filter";
import { seed } from "../src/lib/data";
describe("Combined catalog filters", () => {
  it("returns all three demo properties without filters", () =>
    expect(filterProperties(seed.properties, emptyFilters)).toHaveLength(3));
  it("combines max price, min area and bedroom filters inclusively", () =>
    expect(
      filterProperties(seed.properties, {
        ...emptyFilters,
        price: "245000",
        area: "86",
        beds: "2",
      }).map((p) => p.id),
    ).toEqual(["casa-calma"]));
  it("shows no matches for contradictory ranges", () =>
    expect(
      filterProperties(seed.properties, {
        ...emptyFilters,
        price: "200000",
        area: "100",
      }),
    ).toEqual([]));
  it("combines locality, status and availability", () =>
    expect(
      filterProperties(seed.properties, {
        ...emptyFilters,
        location: "Santa Cruz · Centro",
        status: "Estudio conceptual",
        availability: "No disponible",
      }),
    ).toHaveLength(1));
  it("has no real sale availability", () =>
    expect(
      seed.properties.every((p) => p.availability === "No disponible"),
    ).toBe(true));
});
