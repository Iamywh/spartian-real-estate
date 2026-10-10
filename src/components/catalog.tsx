"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  SlidersHorizontal,
  MapPin,
  BedDouble,
  Maximize2,
} from "lucide-react";
import { useStore } from "./store";
import { Property, euro } from "@/lib/data";
import { filterProperties, emptyFilters, Filters } from "@/lib/filter";
import { Reveal, Button } from "./shell";
export function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="property-card">
      <Link href={`/viviendas/${p.id}`} className="property-image">
        <Image
          src={p.image}
          alt={`Interior ilustrativo de ${p.name}; no representa una vivienda en venta`}
          fill
          sizes="(max-width:760px) 100vw, 33vw"
          unoptimized={p.image.startsWith("data:")}
        />
        <span className="image-tag">EJEMPLO · NO EN VENTA</span>
        <span className="round-arrow">
          <ArrowUpRight size={22} />
        </span>
      </Link>
      <div className="property-meta">
        <span>{p.location}</span>
        <span>{p.status}</span>
      </div>
      <Link href={`/viviendas/${p.id}`}>
        <h3>{p.name}</h3>
      </Link>
      <div className="property-spec">
        <span>
          <BedDouble size={16} />
          {p.beds} hab.
        </span>
        <span>
          <Maximize2 size={16} />
          {p.area} m²
        </span>
        <strong>
          {euro(p.price)}
          <small>Precio ficticio</small>
        </strong>
      </div>
    </article>
  );
}
export function Featured() {
  const { data } = useStore();
  return (
    <div className="property-grid">
      {data.properties.slice(0, 3).map((p) => (
        <Reveal key={p.id}>
          <PropertyCard p={p} />
        </Reveal>
      ))}
    </div>
  );
}
export function Catalog() {
  const { data } = useStore();
  const [f, setF] = useState<Filters>(emptyFilters);
  const items = filterProperties(data.properties, f);
  const select = (
    key: keyof Filters,
    label: string,
    options: [string, string][],
  ) => (
    <label>
      {label}
      <select
        value={f[key]}
        onChange={(e) => setF({ ...f, [key]: e.target.value })}
      >
        <option value="">Todos</option>
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
  return (
    <>
      <div className="filters">
        <div className="filter-title">
          <SlidersHorizontal size={18} /> Encuentra tu espacio
        </div>
        <div className="filter-grid">
          {select(
            "location",
            "Localidad",
            [...new Set(data.properties.map((p) => p.location))].map((v) => [
              v,
              v,
            ]),
          )}
          {select("price", "Precio máximo", [
            ["200000", "200.000 €"],
            ["250000", "250.000 €"],
            ["300000", "300.000 €"],
          ])}
          {select("area", "Superficie mínima", [
            ["60", "60 m²"],
            ["80", "80 m²"],
            ["100", "100 m²"],
          ])}
          {select("beds", "Dormitorios", [
            ["1", "1 dormitorio"],
            ["2", "2 dormitorios"],
            ["3", "3 dormitorios"],
          ])}
          {select(
            "status",
            "Estado",
            [...new Set(data.properties.map((p) => p.status))].map((v) => [
              v,
              v,
            ]),
          )}
          {select("availability", "Disponibilidad", [
            ["No disponible", "No disponible · Demo"],
          ])}
        </div>
      </div>
      <div className="results-bar">
        <span aria-live="polite">{items.length} espacios demostrativos</span>
        <button onClick={() => setF(emptyFilters)}>Restablecer filtros</button>
      </div>
      <div className="property-grid">
        {items.map((p) => (
          <PropertyCard p={p} key={p.id} />
        ))}
      </div>
      {!items.length && (
        <div className="empty">
          <h3>No hay coincidencias</h3>
          <p>Prueba otros filtros para explorar los ejemplos.</p>
          <button className="button" onClick={() => setF(emptyFilters)}>
            Ver todos los espacios
          </button>
        </div>
      )}
      <p className="fineprint">
        Imágenes de inspiración. Ubicaciones, superficies y precios ficticios.
        Ningún inmueble está disponible para compra o reserva.
      </p>
    </>
  );
}
