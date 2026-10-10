"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Check, ArrowLeft } from "lucide-react";
import { useStore } from "./store";
import { Button, Reveal } from "./shell";
import { Catalog } from "./catalog";
import { InquiryForm } from "./inquiry";
import { Configurator } from "./configurator";
import { Floorplan } from "./floorplan";
import { Gallery } from "./gallery";
import { euro, steps } from "@/lib/data";
export const titles: Record<string, string> = {
  viviendas: "Espacios para una nueva vida.",
  proyectos: "El comienzo de algo diferente.",
  "que-hacemos": "Transformar con sentido.",
  inversores: "Una visión compartida.",
  "la-empresa": "Una nueva mirada a Tenerife.",
  blog: "Ideas para habitar mejor.",
  contacto: "Todo empieza conversando.",
  configurador: "Diseña tu futuro hogar.",
  "aviso-legal": "Aviso legal",
  privacidad: "Política de privacidad",
  cookies: "Política de cookies",
};
const intros: Record<string, string> = {
  viviendas:
    "Explora tres ejemplos de lo que un espacio puede llegar a ser. Conceptos ficticios para imaginar el potencial de SPARTIAN.",
  proyectos:
    "Ideas que ilustran nuestra visión. Sin adquisiciones, obras ni autorizaciones anunciadas.",
  "que-hacemos":
    "Del análisis de un local a una nueva forma de habitarlo: un proceso previsto para tomar decisiones con criterio.",
  inversores:
    "Nuestro punto de partida es el análisis. Queremos conversar con quienes comparten una mirada rigurosa y a largo plazo.",
  "la-empresa":
    "SPARTIAN es un proyecto empresarial en desarrollo, nacido con una idea: encontrar nuevas posibilidades en los espacios que ya existen.",
  blog: "Un cuaderno sobre luz, materiales y nuevas formas de entender el espacio. Contenido editorial demostrativo.",
  contacto:
    "¿Te interesa una vivienda, el modelo de negocio o tienes un espacio en mente? Explora cómo sería la conversación.",
  configurador:
    "Elige una distribución, combina texturas y encuentra tu paleta. Una primera aproximación, hecha a tu manera.",
};
export function PageContent({ section }: { section: string }) {
  const { data } = useStore();
  return (
    <>
      <section className="page-heading section">
        <span className="eyebrow">
          SPARTIAN / {section.replaceAll("-", " ").toUpperCase()}
        </span>
        <h1>{titles[section]}</h1>
        {intros[section] && <p>{intros[section]}</p>}
      </section>
      <div className="section page-body">
        {section === "viviendas" && <Catalog />}
        {section === "configurador" && <Configurator />}
        {section === "proyectos" && (
          <>
            <div className="notice">
              Todos los proyectos de esta página son conceptos demostrativos, no
              promociones reales.
            </div>
            <div className="project-list">
              {data.projects.map((p, i) => (
                <Reveal className="project-row" key={p.id}>
                  <div className="project-photo">
                    <Image
                      src={i % 2 ? "/images/interior.jpg" : "/images/salon.jpg"}
                      alt="Fotografía de inspiración, no un proyecto real"
                      fill
                      sizes="(max-width:760px) 100vw, 50vw"
                    />
                    <span className="image-tag">CONCEPTO DEMO</span>
                  </div>
                  <div>
                    <span className="eyebrow">
                      0{i + 1} / {p.phase}
                    </span>
                    <h2>{p.name}</h2>
                    <p>{p.description}</p>
                    <Link href="/viviendas" className="under-link">
                      Explorar viviendas ilustrativas <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}
        {section === "que-hacemos" && (
          <>
            <div className="wide-image">
              <Image
                src="/images/interior.jpg"
                alt="Interior contemporáneo de inspiración"
                fill
                sizes="100vw"
              />
              <span className="image-caption">Fotografía de inspiración</span>
            </div>
            <div className="process-grid">
              {steps.map(([n, t, d]) => (
                <div key={n}>
                  <span className="step-number">{n}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
            <div className="editorial-box">
              <h2>
                Primero, comprobar.
                <br />
                <em>Después, proyectar.</em>
              </h2>
              <p>
                El modelo previsto abarca identificación, estudio de viabilidad,
                adquisición, proyecto, reforma y comercialización. La división
                en varias viviendas solo se contemplará cuando sea legal y
                técnicamente viable. La personalización se limitará a las
                opciones del proyecto aprobado.
              </p>
              <Button href="/contacto">Explora una conversación</Button>
            </div>
          </>
        )}
        {section === "inversores" && (
          <>
            <div className="split-editorial">
              <div>
                <span className="eyebrow">NUESTRO MODELO DE INVERSIÓN</span>
                <h2>
                  Potencial inmobiliario.
                  <br />
                  <em>Criterio en cada decisión.</em>
                </h2>
                <p>
                  El modelo empresarial previsto consiste en estudiar locales,
                  adquirir los que resulten viables, transformarlos y
                  comercializar las viviendas resultantes. SPARTIAN se encuentra
                  en fase de desarrollo.
                </p>
                <p>
                  No hay operaciones de inversión abiertas en esta web. El
                  formulario permite únicamente probar una manifestación de
                  interés.
                </p>
              </div>
              <div className="investor-principles">
                <h3>Cómo trabajamos</h3>
                {[
                  "Selección y análisis del inmueble",
                  "Estudio técnico y urbanístico independiente",
                  "Presupuesto, plazos y escenarios de salida",
                  "Seguimiento documentado de cada fase",
                ].map((t) => (
                  <p key={t}>
                    <Check size={18} />
                    {t}
                  </p>
                ))}
              </div>
            </div>
            <div className="risk-section">
              <span className="eyebrow">
                TRANSPARENCIA Y GESTIÓN DE RIESGOS
              </span>
              <h2>
                Las preguntas correctas,
                <br />
                <em>antes de dar el paso.</em>
              </h2>
              <div className="risk-grid">
                {[
                  [
                    "Viabilidad",
                    "Un local puede no cumplir las condiciones necesarias para convertirse en vivienda.",
                  ],
                  [
                    "Costes y plazos",
                    "La obra, las autorizaciones y los suministros pueden generar desviaciones.",
                  ],
                  [
                    "Mercado y liquidez",
                    "La demanda y el precio de salida pueden variar; una inversión inmobiliaria puede perder valor.",
                  ],
                ].map(([t, d]) => (
                  <article key={t}>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </article>
                ))}
              </div>
              <p className="notice">
                Sin rendimientos garantizados. Sin captación de fondos ni pagos.
                Esta página no constituye una oferta de inversión ni
                asesoramiento financiero.
              </p>
            </div>
            <InquiryForm kind="Inversor" />
          </>
        )}
        {section === "la-empresa" && (
          <>
            <div className="split-editorial">
              <div className="company-image">
                <Image
                  src="/images/salon.jpg"
                  alt="Espacio luminoso de inspiración mediterránea"
                  fill
                  sizes="(max-width:760px) 100vw, 50vw"
                />
              </div>
              <div>
                <span className="eyebrow">NACEMOS CON UNA IDEA</span>
                <h2>
                  Ver posibilidades.
                  <br />
                  <em>Crear pertenencia.</em>
                </h2>
                <p>
                  Empezamos en Santa Cruz de Tenerife, con la mirada puesta en
                  el conjunto de la isla. Nos interesa una transformación que
                  conecte la arquitectura, la vida cotidiana y el contexto de
                  cada barrio.
                </p>
                <p>
                  Estamos definiendo el proyecto empresarial, sus procesos y
                  futuras colaboraciones. Todavía no presentamos un historial de
                  obras, un equipo acreditado ni promociones aprobadas.
                </p>
                <Button href="/que-hacemos">Conoce el proceso previsto</Button>
              </div>
            </div>
            <div className="values-grid">
              {[
                ["Claridad", "Explicar en qué fase está cada oportunidad."],
                ["Cuidado", "Pensar en el espacio y en quienes lo habitarán."],
                ["Identidad", "Diseñar desde el carácter de Tenerife."],
              ].map(([t, d]) => (
                <div key={t}>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {section === "blog" && (
          <div className="blog-grid">
            {data.posts.map((p, i) => (
              <Link href={`/blog/${p.id}`} key={p.id} className="blog-card">
                <div className="blog-photo">
                  <Image
                    src={
                      [
                        "/images/salon.jpg",
                        "/images/cocina.jpg",
                        "/images/interior.jpg",
                      ][i % 3]
                    }
                    alt="Fotografía de inspiración editorial"
                    fill
                    sizes="(max-width:760px) 100vw,33vw"
                  />
                </div>
                <span className="eyebrow">{p.category} · EDITORIAL DEMO</span>
                <h3>{p.title}</h3>
                <span className="under-link">
                  Leer artículo <ArrowUpRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        )}
        {section === "contacto" && (
          <div className="contact-layout">
            <div>
              <span className="eyebrow">NUESTRO PUNTO DE PARTIDA</span>
              <h2>
                Santa Cruz
                <br />
                <em>de Tenerife.</em>
              </h2>
              <p>
                <MapPin size={18} /> Islas Canarias, España
              </p>
              <div className="contact-note">
                <h3>Estamos dando forma a SPARTIAN</h3>
                <p>
                  Los canales de contacto reales se publicarán cuando estén
                  confirmados. Por ahora puedes probar el recorrido con este
                  formulario local.
                </p>
              </div>
              <Link className="under-link" href="/inversores">
                Me interesa el modelo inversor <ArrowUpRight size={18} />
              </Link>
            </div>
            <InquiryForm />
          </div>
        )}
        {["aviso-legal", "privacidad", "cookies"].includes(section) && (
          <div className="legal-content">
            <div className="notice">
              Borrador para evaluación. Pendiente de datos definitivos y
              revisión profesional antes del lanzamiento.
            </div>
            {section === "aviso-legal" ? (
              <>
                <h2>Identificación del titular</h2>
                <p>
                  Nombre comercial provisional: SPARTIAN | Desarrollo
                  Inmobiliario.
                </p>
                <p>
                  Razón social: [pendiente]. NIF: [pendiente]. Domicilio social:
                  [pendiente]. Email y datos registrales: [pendientes].
                </p>
                <h3>Alcance de esta demostración</h3>
                <p>
                  No existen ofertas de venta, reservas, pagos ni ofertas de
                  inversión. Los inmuebles, precios, planos y proyectos son
                  ficticios. Las fotografías son de inspiración y no representan
                  activos de SPARTIAN.
                </p>
                <h3>Imágenes</h3>
                <p>
                  Fotografías de inspiración obtenidas de Unsplash. Las
                  referencias y condiciones de uso se documentan en CREDITS.md.
                  El diseño y los textos de esta demo son originales.
                </p>
              </>
            ) : section === "privacidad" ? (
              <>
                <h2>Datos de prueba, bajo tu control</h2>
                <p>
                  Los formularios almacenan los datos introducidos únicamente en
                  el almacenamiento local del navegador. No envían correos ni
                  solicitudes a SPARTIAN. Utiliza exclusivamente información
                  ficticia.
                </p>
                <h3>Persistencia y eliminación</h3>
                <p>
                  Los datos permanecen hasta que se borra el almacenamiento del
                  navegador o se restablece la demo desde el panel. Los puede
                  ver cualquier persona que utilice el mismo perfil del
                  navegador. No se sincronizan entre dispositivos.
                </p>
                <h3>Antes de la publicación definitiva</h3>
                <p>
                  Responsable, contacto para derechos, base jurídica, plazos,
                  destinatarios y proveedores: [pendientes de definir y
                  revisar]. El alojamiento puede procesar datos técnicos de
                  acceso según su configuración; debe revisarse antes de aceptar
                  contactos reales.
                </p>
              </>
            ) : (
              <>
                <h2>Una demo sin analítica publicitaria</h2>
                <p>
                  Esta versión no incorpora analítica, píxeles publicitarios ni
                  cookies de marketing. Guarda las ediciones y solicitudes de
                  prueba en localStorage del navegador.
                </p>
                <p>
                  Si se configura el acceso administrativo protegido, se
                  utilizará cookies técnicas de autenticación gestionadas por
                  Supabase, con duración según la configuración del servicio. La
                  vista pública del panel demo no requiere autenticación.
                </p>
                <h3>Control del almacenamiento</h3>
                <p>
                  Puedes eliminar los datos desde el panel demo o desde los
                  ajustes del navegador. Antes de añadir analítica u otros
                  servicios será necesario revisar esta política y el
                  consentimiento correspondiente.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
export function PropertyDetail({ slug }: { slug: string }) {
  const { data, ready } = useStore();
  const p = data.properties.find((p) => p.id === slug);
  if (!p)
    return (
      <section className="section">
        <h1>{ready ? "Ejemplo no encontrado" : "Cargando…"}</h1>
        <Button href="/viviendas">Volver al catálogo</Button>
      </section>
    );
  return (
    <>
      <Gallery primary={p.image} name={p.name} />
      <section className="section">
        <div className="detail-heading">
          <div>
            <span className="eyebrow">{p.location}</span>
            <h1>{p.name}</h1>
          </div>
          <div className="detail-price">
            {euro(p.price)}
            <small>Precio ficticio · No es una oferta</small>
          </div>
        </div>
        <div className="detail-specs">
          <span>{p.area} m² ilustrativos</span>
          <span>{p.beds} dormitorios</span>
          <span>{p.status}</span>
          <span>{p.availability} · Demo</span>
        </div>
        <div className="detail-body">
          <div>
            <h2>Un espacio para imaginar.</h2>
            <p>{p.description}</p>
            <h3>Características del concepto</h3>
            <ul className="feature-list">
              <li>Zona de día conectada</li>
              <li>Paleta mediterránea</li>
              <li>Materiales cálidos y acabados naturales</li>
              <li>
                {p.customizable
                  ? "Personalización ilustrativa disponible"
                  : "Personalización no prevista en este ejemplo"}
              </li>
            </ul>
            <h3>Planimetría conceptual</h3>
            <Floorplan bedrooms={p.beds} />
            <p className="fineprint">
              Esquema de inspiración con {p.beds} dormitorios, sin escala. No es
              un plano técnico ni acredita superficie o viabilidad.
            </p>
            {p.customizable && (
              <Button href="/configurador">Explorar personalización</Button>
            )}
          </div>
          <InquiryForm
            kind="Vivienda"
            context={`Ejemplo: ${p.name} (${p.id}). No disponible a la venta.`}
          />
        </div>
      </section>
    </>
  );
}
export function Article({ slug }: { slug: string }) {
  const { data, ready } = useStore();
  const p = data.posts.find((p) => p.id === slug);
  return (
    <section className="section article">
      <Link href="/blog" className="under-link">
        <ArrowLeft size={17} /> Volver al cuaderno
      </Link>
      {p ? (
        <>
          <span className="eyebrow">{p.category} · EDITORIAL DEMO</span>
          <h1>{p.title}</h1>
          {p.body
            .split("\n")
            .filter(Boolean)
            .map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          <Button href="/contacto">Conversemos</Button>
        </>
      ) : (
        <h1>{ready ? "Artículo no encontrado" : "Cargando…"}</h1>
      )}
    </section>
  );
}
