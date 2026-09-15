import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rancho dos Pinheiros Agropecuária | Lages/SC",
    template: "%s | Rancho dos Pinheiros",
  },
  description: "Agropecuária em Lages/SC. Rações, vacinas, remédios e acessórios para animais de grande e pequeno porte. Qualidade de verdade, preço justo e atendimento especializado.",
  keywords: ["agropecuária", "rações", "vacinas", "remédios veterinários", "Lages", "Santa Catarina", "pets", "bovinos", "aves"],
  openGraph: {
    title: "Rancho dos Pinheiros Agropecuária",
    description: "Tudo para o produtor rural com qualidade, preço justo e confiança.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-white text-brand-dark flex flex-col min-h-screen">
        <Header />
        <CartDrawer />
        <WhatsAppFloat />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
