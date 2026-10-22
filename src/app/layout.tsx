import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { CategoryNav } from "@/components/layout/CategoryNav";
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
    default: "Rancho dos Pinheiros Pet Shop | Lages/SC",
    template: "%s | Rancho dos Pinheiros Pet Shop",
  },
  description: "Pet Shop e Agropecuária em Lages/SC. Rações para cães, gatos, pássaros e peixes. Acessórios, higiene, petiscos, vermífugos e rações avícola. Qualidade de verdade e preço justo.",
  keywords: ["pet shop", "agropecuária", "rações", "cães", "gatos", "pássaros", "peixes", "avícola", "acessórios pet", "petiscos", "vermífugos", "gaiolas", "Lages", "Santa Catarina", "ração cachorro", "ração gato"],
  openGraph: {
    title: "Rancho dos Pinheiros Pet Shop & Agro",
    description: "Tudo para seus animais com carinho, qualidade e preço justo. Cães, gatos, pássaros, peixes e mais.",
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
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-white text-brand-dark flex flex-col min-h-screen" suppressHydrationWarning>
        <Header />
        <CategoryNav />
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
