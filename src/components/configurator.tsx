"use client";
import { useState } from "react";
import { useStore } from "./store";
import { Floorplan } from "./floorplan";
import { InquiryForm } from "./inquiry";
import { ArrowDown, RotateCcw, Download } from "lucide-react";
export function Configurator() {
  const { data } = useStore();
  const initial = Object.fromEntries(
    Object.entries(data.options).map(([k, v]) => [k, v[0]]),
  );
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [quote, setQuote] = useState(false);
  const c = { ...initial, ...choices };
  const summary = Object.entries(c)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" · ");
  return (
    <>
      <div className="config-layout">
        <div className="plan-panel">
          <div className="plan-heading">
            <span className="eyebrow">TU HOGAR, VISTO DESDE ARRIBA</span>
            <span className="tag">VISTA 2D</span>
          </div>
          <Floorplan
            layout={c.Distribución}
            material={c.Materiales}
            floor={c.Pavimentación}
            color={c.Colores}
            kitchen={c.Cocina}
            finish={c.Acabados}
          />
          <div className="plan-footer">
            <span>Concepto de 1 dormitorio · Distribución orientativa</span>
            <button className="icon-link" onClick={() => setChoices({})}>
              <RotateCcw size={16} /> Reiniciar
            </button>
          </div>
          <p className="fineprint">
            Cada opción modifica el plano esquemático. Esta vista no es un
            render ni una validación técnica.
          </p>
        </div>
        <div className="config-options">
          <span className="eyebrow">DALE TU PERSONALIDAD</span>
          {Object.entries(data.options).map(([key, values], i) => (
            <fieldset key={key}>
              <legend>
                <small>0{i + 1}</small>
                {key}
              </legend>
              <div className="choice-grid">
                {values.map((v) => (
                  <label
                    className={`choice ${c[key] === v ? "selected" : ""}`}
                    key={v}
                  >
                    <input
                      type="radio"
                      name={key}
                      value={v}
                      checked={c[key] === v}
                      onChange={() => setChoices({ ...choices, [key]: v })}
                    />
                    {v}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      </div>
      <div className="config-summary">
        <div>
          <span className="eyebrow">TU COMBINACIÓN</span>
          <p>{summary}</p>
          <small>
            Selección demostrativa y no vinculante. Sin cálculo de precio.
          </small>
        </div>
        <div className="summary-buttons">
          <button
            className="button"
            onClick={() => {
              setQuote(true);
              setTimeout(
                () =>
                  document
                    .getElementById("quote")
                    ?.scrollIntoView({ behavior: "smooth" }),
                50,
              );
            }}
          >
            Solicitar presupuesto demo <ArrowDown size={17} />
          </button>
          <button
            className="under-link"
            onClick={() => {
              const url = URL.createObjectURL(
                new Blob(
                  [JSON.stringify({ demo: true, choices: c }, null, 2)],
                  { type: "application/json" },
                ),
              );
              const a = document.createElement("a");
              a.href = url;
              a.download = "spartian-configuracion.json";
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            Descargar selección <Download size={16} />
          </button>
        </div>
      </div>
      {quote && (
        <div id="quote" className="quote-section">
          <InquiryForm kind="Configuración" context={summary} />
        </div>
      )}
    </>
  );
}
