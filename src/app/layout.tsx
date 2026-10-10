import type { Metadata } from "next";
import "./globals.css";
import { Store } from "@/components/store";
import { Shell } from "@/components/shell";
export const metadata: Metadata = {
  title: {
    default: "SPARTIAN | Desarrollo Inmobiliario en Tenerife",
    template: "%s | SPARTIAN",
  },
  description:
    "Transformamos espacios. Creamos hogares. Una visión de vivienda para Tenerife. Proyecto empresarial en desarrollo: demostración conceptual.",
  robots: { index: false, follow: false },
  icons: { icon: "/icon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Store>
          <Shell>{children}</Shell>
        </Store>
      </body>
    </html>
  );
}
