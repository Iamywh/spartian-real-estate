"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export function Gallery({ primary, name }: { primary: string; name: string }) {
  const images = [
    ...new Set([
      primary,
      "/images/salon.jpg",
      "/images/cocina.jpg",
      "/images/interior.jpg",
    ]),
  ];
  const [current, setCurrent] = useState(primary);
  return (
    <>
      <div className="detail-hero">
        <Image
          src={current}
          alt={`Inspiración visual para ${name}; no representa un inmueble real de SPARTIAN`}
          fill
          priority
          sizes="100vw"
          unoptimized={current.startsWith("data:")}
        />
        <span className="image-tag">
          EJEMPLO FICTICIO · NO DISPONIBLE A LA VENTA
        </span>
        <Link href="/viviendas" className="back-link">
          <ArrowLeft size={17} /> Catálogo
        </Link>
      </div>
      <div className="gallery-strip" aria-label="Galería de inspiración">
        {images.map((src, i) => (
          <button
            key={src}
            aria-label={`Ver imagen de inspiración ${i + 1}`}
            aria-pressed={current === src}
            onClick={() => setCurrent(src)}
          >
            <Image
              src={src}
              alt=""
              width={110}
              height={70}
              unoptimized={src.startsWith("data:")}
            />
          </button>
        ))}
        <p>
          Galería de inspiración.
          <br />
          Las fotografías no pertenecen a un mismo inmueble.
        </p>
      </div>
    </>
  );
}
