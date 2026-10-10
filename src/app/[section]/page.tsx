import { notFound } from "next/navigation";
import { PageContent } from "@/components/content";
const labels: Record<string, string> = {
  viviendas: "Viviendas",
  proyectos: "Proyectos",
  "que-hacemos": "Qué hacemos",
  inversores: "Inversores",
  "la-empresa": "La empresa",
  blog: "Blog",
  contacto: "Contacto",
  configurador: "Diseña tu futuro hogar",
  "aviso-legal": "Aviso legal",
  privacidad: "Privacidad",
  cookies: "Cookies",
};
export function generateStaticParams() {
  return Object.keys(labels).map((section) => ({ section }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  return { title: labels[(await params).section] || "Página no encontrada" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!labels[section]) notFound();
  return <PageContent section={section} />;
}
