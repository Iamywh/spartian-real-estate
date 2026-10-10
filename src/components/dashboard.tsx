"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Download,
  Trash2,
  Pencil,
  LayoutDashboard,
  Home,
  Layers,
  Inbox,
  BookOpen,
  Settings2,
  ArrowUpRight,
  RotateCcw,
} from "lucide-react";
import { useStore } from "./store";
import { seed, Property, Project, Post, DemoData, euro } from "@/lib/data";
type Tab =
  | "Resumen"
  | "Viviendas"
  | "Proyectos"
  | "Contactos"
  | "Inversores"
  | "Blog"
  | "Configurador";
export function Dashboard({
  protectedMode = false,
}: {
  protectedMode?: boolean;
}) {
  const { data, save, ready } = useStore();
  const [tab, setTab] = useState<Tab>("Resumen");
  const [edit, setEdit] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("/images/salon.jpg");
  const [busy, setBusy] = useState(false);
  const tabs: [Tab, typeof Home][] = [
    ["Resumen", LayoutDashboard],
    ["Viviendas", Home],
    ["Proyectos", Layers],
    ["Contactos", Inbox],
    ["Inversores", Inbox],
    ["Blog", BookOpen],
    ["Configurador", Settings2],
  ];
  const collection =
    tab === "Viviendas"
      ? "properties"
      : tab === "Proyectos"
        ? "projects"
        : "posts";
  const selected = data[collection].find((p) => p.id === edit);
  function update(next: DemoData) {
    const ok = save(next);
    setMessage(
      ok ? "Cambios guardados en este navegador." : "No se pudo guardar.",
    );
    return ok;
  }
  function remove(id: string) {
    if (!confirm("¿Eliminar este elemento de la demo local?")) return;
    update({
      ...data,
      [collection]: data[collection].filter((p) => p.id !== id),
    });
  }
  function exportData() {
    const u = URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = u;
    a.download = "spartian-demo-backup.json";
    a.click();
    URL.revokeObjectURL(u);
  }
  const requests = data.inquiries.filter((r) =>
    tab === "Inversores" ? r.kind === "Inversor" : r.kind !== "Inversor",
  );
  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <span className="eyebrow">SPARTIAN STUDIO</span>
        <h2>
          Tu espacio
          <br />
          de gestión.
        </h2>
        <nav aria-label="Panel de gestión">
          {tabs.map(([t, Icon]) => (
            <button
              key={t}
              aria-current={tab === t ? "page" : undefined}
              onClick={() => {
                setTab(t);
                setEdit(null);
                setMessage("");
              }}
            >
              <Icon size={18} />
              {t}
              {t === "Contactos" && (
                <small>
                  {data.inquiries.filter((r) => r.kind !== "Inversor").length}
                </small>
              )}
              {t === "Inversores" && (
                <small>
                  {data.inquiries.filter((r) => r.kind === "Inversor").length}
                </small>
              )}
            </button>
          ))}
        </nav>
        <Link href="/" className="under-link">
          Ver sitio <ArrowUpRight size={16} />
        </Link>
        <Link href="/admin" className="under-link">
          Acceso protegido
        </Link>
      </aside>
      <div className="admin-content">
        <div className="admin-title">
          <div>
            <span className="eyebrow">
              {protectedMode
                ? "SESIÓN VERIFICADA · DATOS DE PRUEBA"
                : "ENTORNO DE PRUEBA LOCAL"}
            </span>
            <h1>{tab}</h1>
          </div>
          <span className="tag">DEMO</span>
        </div>
        <div className="notice">
          {protectedMode
            ? "Acceso verificado con Supabase."
            : "Este panel es público y no tiene autenticación."}{" "}
          Las ediciones solo afectan a este navegador. No introduzcas
          información real ni confidencial.
        </div>
        <div role="status" className="save-status">
          {message}
        </div>
        {!ready ? (
          <p>Cargando datos locales…</p>
        ) : (
          <>
            {tab === "Resumen" && (
              <>
                <div className="stats-grid">
                  {[
                    ["Viviendas", data.properties.length],
                    ["Proyectos", data.projects.length],
                    ["Solicitudes", data.inquiries.length],
                    ["Artículos", data.posts.length],
                  ].map(([n, v]) => (
                    <div key={n}>
                      <span>{n}</span>
                      <strong>{v}</strong>
                      <small>Datos demostrativos</small>
                    </div>
                  ))}
                </div>
                <div className="admin-welcome">
                  <span className="eyebrow">RECORRIDO PARA LEO</span>
                  <h2>De una idea a una experiencia.</h2>
                  <ol>
                    <li>Explora el catálogo y prueba sus filtros.</li>
                    <li>
                      Personaliza un hogar y guarda una solicitud ficticia.
                    </li>
                    <li>
                      Vuelve al panel para ver la solicitud y cambiar su estado.
                    </li>
                    <li>
                      Edita una vivienda y observa el cambio en el catálogo.
                    </li>
                  </ol>
                  <div className="admin-actions">
                    <button className="button" onClick={exportData}>
                      <Download size={17} /> Exportar datos demo
                    </button>
                    <button
                      className="under-link"
                      onClick={() => {
                        if (
                          confirm(
                            "¿Restablecer todos los datos locales? Se eliminarán las ediciones y solicitudes de este navegador.",
                          )
                        )
                          update(structuredClone(seed));
                      }}
                    >
                      <RotateCcw size={17} /> Restablecer demo
                    </button>
                  </div>
                  <p className="fineprint">
                    La exportación es una copia JSON. La importación y la
                    sincronización entre usuarios no están activadas.
                  </p>
                </div>
              </>
            )}
            {["Viviendas", "Proyectos", "Blog"].includes(tab) && (
              <>
                <div className="admin-toolbar">
                  <p>{data[collection].length} elementos</p>
                  <button
                    className="button"
                    onClick={() => {
                      setEdit("new");
                      setImage("/images/salon.jpg");
                    }}
                  >
                    <Plus size={17} /> Crear{" "}
                    {tab === "Viviendas"
                      ? "vivienda"
                      : tab === "Proyectos"
                        ? "proyecto"
                        : "artículo"}
                  </button>
                </div>
                {edit !== null ? (
                  <form
                    key={`${tab}-${edit}`}
                    className="editor-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const f = new FormData(e.currentTarget);
                      const val = (k: string) => String(f.get(k) || "").trim();
                      const id =
                        selected?.id ||
                        `${collection}-${crypto.randomUUID().slice(0, 8)}`;
                      let item: Property | Project | Post;
                      if (tab === "Viviendas") {
                        item = {
                          id,
                          name: val("name"),
                          location: val("location"),
                          price: Number(val("price")),
                          area: Number(val("area")),
                          beds: Number(val("beds")),
                          status: val("status"),
                          availability: "No disponible",
                          image,
                          description: val("description"),
                          customizable: f.get("customizable") === "on",
                        };
                      } else if (tab === "Proyectos") {
                        item = {
                          id,
                          name: val("name"),
                          phase: val("phase"),
                          description: val("description"),
                        };
                      } else {
                        item = {
                          id,
                          title: val("title"),
                          category: val("category"),
                          body: val("body"),
                        };
                      }
                      const list = [...data[collection]];
                      const index = list.findIndex((x) => x.id === id);
                      if (index >= 0) list[index] = item;
                      else list.push(item);
                      if (update({ ...data, [collection]: list }))
                        setEdit(null);
                    }}
                  >
                    <h3>
                      {selected ? "Editar" : "Crear"}{" "}
                      {tab === "Viviendas"
                        ? "vivienda"
                        : tab === "Proyectos"
                          ? "proyecto"
                          : "artículo"}
                    </h3>
                    {tab === "Viviendas"
                      ? (() => {
                          const p = selected as Property | undefined;
                          return (
                            <>
                              <div className="form-grid">
                                <label>
                                  Nombre
                                  <input
                                    name="name"
                                    required
                                    maxLength={80}
                                    defaultValue={p?.name}
                                  />
                                </label>
                                <label>
                                  Localidad
                                  <input
                                    name="location"
                                    required
                                    maxLength={100}
                                    defaultValue={
                                      p?.location || "Santa Cruz · Centro"
                                    }
                                  />
                                </label>
                                <label>
                                  Precio ficticio (€)
                                  <input
                                    name="price"
                                    type="number"
                                    required
                                    min="1"
                                    max="9999999"
                                    defaultValue={p?.price || 189000}
                                  />
                                </label>
                                <label>
                                  Superficie ilustrativa (m²)
                                  <input
                                    name="area"
                                    type="number"
                                    required
                                    min="1"
                                    max="9999"
                                    defaultValue={p?.area || 62}
                                  />
                                </label>
                                <label>
                                  Dormitorios
                                  <input
                                    name="beds"
                                    type="number"
                                    required
                                    min="1"
                                    max="10"
                                    defaultValue={p?.beds || 1}
                                  />
                                </label>
                                <label>
                                  Estado
                                  <select
                                    name="status"
                                    defaultValue={
                                      p?.status || "Estudio conceptual"
                                    }
                                  >
                                    {[
                                      "Estudio conceptual",
                                      "Diseño ilustrativo",
                                      "Concepto en revisión",
                                    ].map((v) => (
                                      <option key={v}>{v}</option>
                                    ))}
                                  </select>
                                </label>
                              </div>
                              <label>
                                Descripción
                                <textarea
                                  name="description"
                                  required
                                  rows={4}
                                  maxLength={2500}
                                  defaultValue={p?.description}
                                />
                              </label>
                              <label className="checkbox">
                                <input
                                  name="customizable"
                                  type="checkbox"
                                  defaultChecked={p?.customizable ?? true}
                                />
                                Permitir personalización demostrativa
                              </label>
                              <label>
                                Imagen de inspiración
                                <select
                                  value={
                                    image.startsWith("data:")
                                      ? "uploaded"
                                      : image
                                  }
                                  onChange={(e) => setImage(e.target.value)}
                                >
                                  <option value="/images/salon.jpg">
                                    Salón
                                  </option>
                                  <option value="/images/cocina.jpg">
                                    Cocina
                                  </option>
                                  <option value="/images/interior.jpg">
                                    Interior
                                  </option>
                                  {image.startsWith("data:") && (
                                    <option value="uploaded">
                                      Imagen subida
                                    </option>
                                  )}
                                </select>
                              </label>
                              <label>
                                O subir una imagen propia (JPEG, PNG o WebP,
                                máx. 400 KB)
                                <input
                                  type="file"
                                  accept="image/jpeg,image/png,image/webp"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    if (
                                      file.size > 400000 ||
                                      ![
                                        "image/jpeg",
                                        "image/png",
                                        "image/webp",
                                      ].includes(file.type)
                                    ) {
                                      setMessage(
                                        "Imagen no válida: usa JPEG, PNG o WebP de menos de 400 KB.",
                                      );
                                      return;
                                    }
                                    setBusy(true);
                                    try {
                                      const reader = new FileReader();
                                      reader.onload = () => {
                                        setImage(String(reader.result));
                                        setBusy(false);
                                      };
                                      reader.onerror = () => {
                                        setMessage(
                                          "No se pudo leer la imagen.",
                                        );
                                        setBusy(false);
                                      };
                                      reader.readAsDataURL(file);
                                    } catch {
                                      setBusy(false);
                                      setMessage("No se pudo leer la imagen.");
                                    }
                                  }}
                                />
                              </label>
                              <img
                                className="upload-preview"
                                src={image}
                                alt="Vista previa de la imagen seleccionada"
                              />
                              <p className="fineprint">
                                Disponibilidad bloqueada en «No disponible» para
                                evitar anunciar ventas reales en esta demo.
                              </p>
                            </>
                          );
                        })()
                      : tab === "Proyectos"
                        ? (() => {
                            const p = selected as Project | undefined;
                            return (
                              <>
                                <label>
                                  Nombre
                                  <input
                                    name="name"
                                    required
                                    maxLength={100}
                                    defaultValue={p?.name}
                                  />
                                </label>
                                <label>
                                  Fase
                                  <select
                                    name="phase"
                                    defaultValue={p?.phase || "Concepto demo"}
                                  >
                                    {[
                                      "Concepto demo",
                                      "Estudio ilustrativo",
                                      "En revisión demo",
                                    ].map((v) => (
                                      <option key={v}>{v}</option>
                                    ))}
                                  </select>
                                </label>
                                <label>
                                  Descripción
                                  <textarea
                                    name="description"
                                    required
                                    maxLength={2500}
                                    rows={6}
                                    defaultValue={p?.description}
                                  />
                                </label>
                              </>
                            );
                          })()
                        : (() => {
                            const p = selected as Post | undefined;
                            return (
                              <>
                                <label>
                                  Título
                                  <input
                                    name="title"
                                    required
                                    maxLength={140}
                                    defaultValue={p?.title}
                                  />
                                </label>
                                <label>
                                  Categoría
                                  <input
                                    name="category"
                                    required
                                    maxLength={60}
                                    defaultValue={p?.category || "Diseño"}
                                  />
                                </label>
                                <label>
                                  Artículo (texto plano)
                                  <textarea
                                    name="body"
                                    required
                                    maxLength={10000}
                                    rows={12}
                                    defaultValue={p?.body}
                                  />
                                </label>
                              </>
                            );
                          })()}
                    <div className="admin-actions">
                      <button className="button" disabled={busy}>
                        Guardar cambios
                      </button>
                      <button
                        type="button"
                        className="under-link"
                        onClick={() => setEdit(null)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="admin-list">
                    {data[collection].map((item) => (
                      <article key={item.id}>
                        <div>
                          <h3>{"name" in item ? item.name : item.title}</h3>
                          <p>
                            {"price" in item
                              ? `${euro(item.price)} · ${item.area} m² · ${item.status}`
                              : "phase" in item
                                ? item.phase
                                : item.category}
                          </p>
                          <small>Demostrativo</small>
                        </div>
                        <div className="row-actions">
                          <button
                            aria-label={`Editar ${"name" in item ? item.name : item.title}`}
                            onClick={() => {
                              setEdit(item.id);
                              if ("image" in item) setImage(item.image);
                            }}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            aria-label={`Eliminar ${"name" in item ? item.name : item.title}`}
                            onClick={() => remove(item.id)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </article>
                    ))}
                    {!data[collection].length && (
                      <p>No hay elementos. Crea el primero.</p>
                    )}
                  </div>
                )}
              </>
            )}
            {(tab === "Contactos" || tab === "Inversores") && (
              <>
                <div className="admin-toolbar">
                  <p>{requests.length} solicitudes demo</p>
                  <button className="under-link" onClick={exportData}>
                    Exportar datos <Download size={16} />
                  </button>
                </div>
                <div className="admin-list">
                  {requests.map((r) => (
                    <article className="request-row" key={r.id}>
                      <div>
                        <span className="eyebrow">
                          {r.kind} ·{" "}
                          {new Date(r.createdAt).toLocaleDateString("es-ES")}
                        </span>
                        <h3>{r.name}</h3>
                        <p>{r.email}</p>
                        <p className="request-message">{r.message}</p>
                      </div>
                      <div>
                        <label>
                          Estado
                          <select
                            value={r.status}
                            onChange={(e) =>
                              update({
                                ...data,
                                inquiries: data.inquiries.map((q) =>
                                  q.id === r.id
                                    ? { ...q, status: e.target.value }
                                    : q,
                                ),
                              })
                            }
                          >
                            {["Nueva", "En revisión", "Cerrada"].map((v) => (
                              <option key={v}>{v}</option>
                            ))}
                          </select>
                        </label>
                        <button
                          className="under-link"
                          onClick={() => {
                            if (confirm("¿Eliminar esta solicitud de prueba?"))
                              update({
                                ...data,
                                inquiries: data.inquiries.filter(
                                  (q) => q.id !== r.id,
                                ),
                              });
                          }}
                        >
                          Eliminar <Trash2 size={15} />
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
                {!requests.length && (
                  <div className="empty">
                    <Inbox size={36} />
                    <h3>Todavía no hay solicitudes de prueba</h3>
                    <p>
                      Completa un formulario del sitio con datos ficticios para
                      probar este flujo.
                    </p>
                    <Link
                      href={tab === "Inversores" ? "/inversores" : "/contacto"}
                      className="button"
                    >
                      Probar formulario <ArrowUpRight size={16} />
                    </Link>
                  </div>
                )}
              </>
            )}
            {tab === "Configurador" && (
              <div className="editor-form">
                <h3>Opciones disponibles</h3>
                <p>
                  Activa o desactiva las opciones compatibles con la vista 2D.
                  Debe quedar al menos una por categoría.
                </p>
                {Object.entries(seed.options).map(([k, values]) => (
                  <fieldset className="option-admin" key={k}>
                    <legend>{k}</legend>
                    {values.map((v) => (
                      <label className="checkbox" key={v}>
                        <input
                          type="checkbox"
                          checked={data.options[k]?.includes(v) ?? false}
                          onChange={(e) => {
                            const prev = data.options[k] || [];
                            const next = e.target.checked
                              ? [...prev, v]
                              : prev.filter((x) => x !== v);
                            if (!next.length) {
                              setMessage(
                                "Mantén al menos una opción en cada categoría.",
                              );
                              return;
                            }
                            update({
                              ...data,
                              options: { ...data.options, [k]: next },
                            });
                          }}
                        />
                        {v}
                      </label>
                    ))}
                  </fieldset>
                ))}
                <Link href="/configurador" className="button">
                  Ver configurador <ArrowUpRight size={17} />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
