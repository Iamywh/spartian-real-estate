import { configured } from "@/lib/supabase/server";
import { login } from "./actions";
import { Button } from "@/components/shell";
export const metadata = { title: "Acceso administrativo" };
export const dynamic = "force-dynamic";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <section className="section login-page">
      <span className="eyebrow">ÁREA ADMINISTRATIVA</span>
      <h1>Un acceso reservado.</h1>
      {configured() ? (
        <form action={login} className="inquiry">
          <p>Acceso con una cuenta autorizada de Supabase.</p>
          <label>
            Email
            <input
              name="email"
              type="email"
              autoComplete="username"
              required
              maxLength={254}
            />
          </label>
          <label>
            Contraseña
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              maxLength={256}
            />
          </label>
          {error && (
            <p role="alert">
              No se ha podido acceder. Comprueba las credenciales y los permisos
              de tu cuenta.
            </p>
          )}
          <button className="button">Acceder</button>
        </form>
      ) : (
        <div className="notice">
          El acceso privado permanece desactivado hasta configurar Supabase y
          asignar un rol autorizado. No hay credenciales de prueba ni datos
          privados.
        </div>
      )}
      <p>
        Para evaluar las funciones sin datos reales, utiliza el entorno local:
      </p>
      <Button href="/admin/demo">Explorar panel demo</Button>
    </section>
  );
}
