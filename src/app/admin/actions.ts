"use server";
import { redirect } from "next/navigation";
import {
  configured,
  serverClient,
  authorizedRole,
} from "@/lib/supabase/server";
export async function login(form: FormData) {
  if (!configured()) redirect("/admin?error=setup");
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  if (!email || !password || email.length > 254 || password.length > 256)
    redirect("/admin?error=invalid");
  const client = await serverClient();
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin?error=invalid");
  const role = await authorizedRole();
  if (!role) {
    await client.auth.signOut();
    redirect("/admin?error=role");
  }
  redirect("/admin/panel");
}
export async function logout() {
  if (configured()) {
    const client = await serverClient();
    await client.auth.signOut();
  }
  redirect("/admin");
}
