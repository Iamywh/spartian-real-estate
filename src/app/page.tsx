import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveUpRight } from "lucide-react";
import { Button, Reveal } from "@/components/shell";
import { Featured } from "@/components/catalog";
import { steps } from "@/lib/data";
export default function Home() {
  return (
    <>
      <section className="hero">
        <Image
          src="/images/salon.jpg"
          alt="Salón mediterráneo luminoso; fotografía de inspiración, no inmueble SPARTIAN"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="hero-copy">
          <span className="eyebrow">
            SANTA CRUZ DE TENERIFE · UNA NUEVA PERSPECTIVA
          </span>
          <h1>
            Transformamos espacios.
            <br />
            <em>Creamos hogares.</em>
          </h1>
          <p>
            Rediseñamos espacios comerciales para crear
            <br className="desktop-break" /> nuevas oportunidades de vivienda en
            Tenerife.
          </p>
          <div className="hero-actions">
            <Button href="/proyectos" light>
              Descubre nuestros proyectos
            </Button>
            <Link href="/inversores" className="text-link">
              Invierte con nosotros <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#filosofia">
            <ArrowDown size={15} /> DESCUBRE SPARTIAN
          </a>
          <span>Fotografía de inspiración · Concepto demostrativo</span>
          <span>
            01 <i /> 03
          </span>
        </div>
      </section>
      <section id="filosofia" className="section philosophy">
        <Reveal>
          <span className="eyebrow">01 / NUESTRA FILOSOFÍA</span>
          <h2>
            Hay espacios que esperan
            <br />
            <em>una nueva historia.</em>
          </h2>
        </Reveal>
        <Reveal className="philosophy-copy">
          <p>
            Donde hoy ves un local, nosotros imaginamos un hogar. Un lugar con
            luz, carácter y una forma más personal de vivir la ciudad.
          </p>
          <p className="muted">
            SPARTIAN nace para explorar el potencial de los espacios existentes
            en Tenerife. Arquitectura consciente, decisiones cuidadas y una
            visión de futuro, desde el primer estudio.
          </p>
          <Link href="/la-empresa" className="under-link">
            Conoce nuestra visión <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </section>
      <section className="section sand-section">
        <div className="section-heading">
          <Reveal>
            <span className="eyebrow">02 / ESPACIOS PARA IMAGINAR</span>
            <h2>
              Tu próxima historia
              <br />
              <em>empieza aquí.</em>
            </h2>
          </Reveal>
          <div className="heading-side">
            <p>
              Tres conceptos. Distintas formas de vivir.
              <br />
              Una misma atención al detalle.
            </p>
            <Link href="/viviendas" className="under-link">
              Explora las viviendas <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <Featured />
        <p className="fineprint">
          Colección demostrativa · Inmuebles ficticios, no disponibles a la
          venta.
        </p>
      </section>
      <section className="section process-section">
        <Reveal>
          <span className="eyebrow">03 / DE LA IDEA AL HOGAR</span>
          <h2>
            Una transformación.
            <br />
            <em>Cada paso cuenta.</em>
          </h2>
        </Reveal>
        <div className="process-grid">
          {steps.map(([n, t, d]) => (
            <Reveal key={n}>
              <div className="step-number">
                {n}
                <MoveUpRight size={20} />
              </div>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>
        <p className="fineprint">
          Proceso previsto. Cualquier cambio de uso o división de unidades
          estará sujeto a viabilidad y autorizaciones.
        </p>
      </section>
      <section className="config-teaser">
        <div className="teaser-image">
          <Image
            src="/images/cocina.jpg"
            alt="Cocina de inspiración con materiales cálidos"
            fill
            sizes="(max-width:760px) 100vw, 55vw"
          />
          <span className="image-caption">Imagen de inspiración</span>
        </div>
        <Reveal className="teaser-copy">
          <span className="eyebrow">04 / A TU MANERA</span>
          <h2>
            Diseña tu
            <br />
            <em>futuro hogar.</em>
          </h2>
          <p>
            La calma del roble. La textura de la piedra. Ese tono que sientes
            tan tuyo. Explora las combinaciones que dan forma a tu manera de
            vivir.
          </p>
          <div className="material-swatches">
            <span style={{ background: "#c8ab87" }} />
            <span style={{ background: "#ded9cf" }} />
            <span style={{ background: "#A4B5A0" }} />
            <small>Naturalmente tú.</small>
          </div>
          <Button href="/configurador">Prueba el configurador 2D</Button>
          <p className="fineprint">
            Opciones ilustrativas, sujetas al proyecto aprobado.
          </p>
        </Reveal>
      </section>
      <section className="investor-band">
        <Reveal>
          <span className="eyebrow">05 / CONSTRUIR UNA VISIÓN COMPARTIDA</span>
          <h2>
            El potencial está ahí.
            <br />
            <em>Hablemos de posibilidades.</em>
          </h2>
        </Reveal>
        <div>
          <p>
            Una mirada rigurosa a cada oportunidad. Conoce nuestro modelo, el
            proceso de análisis y los riesgos que deben evaluarse.
          </p>
          <Button href="/inversores" light>
            Descubre el enfoque inversor
          </Button>
          <small>Sin ofertas de inversión ni rentabilidades prometidas.</small>
        </div>
      </section>
      <section className="section home-contact">
        <span className="eyebrow">TENERIFE ES NUESTRO PUNTO DE PARTIDA</span>
        <h2>
          Una isla. Muchas posibilidades.
          <br />
          <em>Una conversación para empezar.</em>
        </h2>
        <Button href="/contacto">Hablemos de tu idea</Button>
      </section>
    </>
  );
}
