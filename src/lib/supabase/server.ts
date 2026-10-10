import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const configured = () =>
  Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

export async function serverClient() {
  if (!configured()) throw new Error("Supabase not configured");
  const jar = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
      cookies: {
        getAll() {
          return jar.getAll();
        },
        setAll(values) {
          try {
            values.forEach(({ name, value, options }) =>
              jar.set(name, value, options),
            );
          } catch {
            // Server Components cannot write cookies. Proxy handles session refresh.
          }
        },
      },
    },
  );
}

export async function authorizedRole() {
  if (!configured()) return null;
  const client = await serverClient();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (error || !user) return null;
  const { data: role } = await client
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .single();
  return role?.role === "admin" || role?.role === "editor" ? role.role : null;
}
