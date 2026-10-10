import { authorizedRole } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Dashboard } from "@/components/dashboard";
import { logout } from "../actions";
export const dynamic = "force-dynamic";
export default async function Page() {
  const role = await authorizedRole();
  if (!role) redirect("/admin");
  return (
    <>
      <form action={logout} className="logout-bar">
        <span>Rol verificado: {role}</span>
        <button className="under-link">Cerrar sesión</button>
      </form>
      <Dashboard protectedMode />
    </>
  );
}
