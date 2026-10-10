import { PropertyDetail } from "@/components/content";
import { seed } from "@/lib/data";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title:
      seed.properties.find((p) => p.id === slug)?.name ||
      "Vivienda demostrativa",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <PropertyDetail slug={(await params).slug} />;
}
