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
  description: "Pet Shop em Lages/SC. Rações premium, acessórios, higiene e saúde para cães e gatos. Qualidade de verdade, preço justo e atendimento especializado para seu pet.",
  keywords: ["pet shop", "rações", "cães", "gatos", "acessórios pet", "Lages", "Santa Catarina", "pets", "ração cachorro", "ração gato"],
  openGraph: {
    title: "Rancho dos Pinheiros Pet Shop",
    description: "Tudo para o seu pet com carinho, qualidade e preço justo.",
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
