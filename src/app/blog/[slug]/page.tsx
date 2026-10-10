import { Article } from "@/components/content";
export const metadata = { title: "Cuaderno SPARTIAN" };
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <Article slug={(await params).slug} />;
}
