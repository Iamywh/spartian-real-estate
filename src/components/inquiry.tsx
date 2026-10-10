"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useStore } from "./store";
export function InquiryForm({
  kind = "Contacto",
  context = "",
}: {
  kind?: string;
  context?: string;
}) {
  const { data, save, ready } = useStore();
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="inquiry">
      <span className="eyebrow">SIMULACIÓN DE SOLICITUD</span>
      <h3>
        {kind === "Inversor"
          ? "Conversemos sobre tu interés"
          : "Imaginemos el siguiente paso"}
      </h3>
      <p>
        Prueba el formulario con datos ficticios. Se guarda únicamente en este
        navegador; no se envía al equipo.
      </p>
      {done ? (
        <div role="status" className="success">
          <CheckCircle2 />
          <h3>Solicitud demo guardada</h3>
          <p>
            Puedes verla en el panel demostrativo de este navegador. No se ha
            enviado ningún correo ni solicitud real.
          </p>
          <Link className="under-link" href="/admin/demo">
            Ver en el panel <ArrowUpRight size={17} />
          </Link>
          <button onClick={() => setDone(false)} className="under-link">
            Crear otra solicitud
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const ok = save({
              ...data,
              inquiries: [
                {
                  id: crypto.randomUUID(),
                  kind,
                  name: String(f.get("name")).trim(),
                  email: String(f.get("email")).trim(),
                  message: [context, String(f.get("message")).trim()]
                    .filter(Boolean)
                    .join("\n"),
                  status: "Nueva",
                  createdAt: new Date().toISOString(),
                },
                ...data.inquiries,
              ],
            });
            if (ok) setDone(true);
            else
              setError(
                "No se ha podido guardar la solicitud. Revisa el almacenamiento del navegador.",
              );
          }}
        >
          <div className="form-grid">
            <label>
              Nombre de prueba
              <input
                name="name"
                required
                maxLength={80}
                placeholder="Persona de ejemplo"
              />
            </label>
            <label>
              Email ficticio
              <input
                name="email"
                type="email"
                required
                maxLength={160}
                placeholder="ejemplo@example.com"
              />
            </label>
          </div>
          {context && <div className="context-note">{context}</div>}
          <label>
            {kind === "Inversor"
              ? "¿Qué te gustaría explorar?"
              : "Cuéntanos tu idea"}
            <textarea
              name="message"
              required
              maxLength={1500}
              rows={4}
              placeholder="Escribe una consulta de prueba…"
            />
          </label>
          <label className="checkbox">
            <input type="checkbox" required />{" "}
            <span>
              Confirmo que utilizo datos ficticios y entiendo el almacenamiento
              local de esta demo.{" "}
              <Link href="/privacidad">Más información</Link>.
            </span>
          </label>
          <button className="button" disabled={!ready}>
            Guardar solicitud demo <ArrowUpRight size={17} />
          </button>
          {error && <p role="alert">{error}</p>}
        </form>
      )}
    </div>
  );
}
