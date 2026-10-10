import { Button } from "@/components/shell";
export default function NotFound() {
  return (
    <section className="section empty">
      <span className="eyebrow">404</span>
      <h1>Este espacio aún no existe.</h1>
      <Button href="/">Volver al inicio</Button>
    </section>
  );
}
