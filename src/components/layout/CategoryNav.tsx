import Link from "next/link";
import { PawPrint } from "@phosphor-icons/react/dist/ssr";

/**
 * Category navigation bar — simplified to show only PETS category.
 */
export function CategoryNav() {
  return (
    <nav className="hidden md:block border-t border-gray-100 bg-white sticky top-[calc(theme(spacing.20)+30px)] z-40">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-center gap-6 lg:gap-8 h-11">
          <li className="flex-shrink-0">
            <Link
              href="/categorias/pets"
              className="flex items-center gap-1.5 text-[13px] font-bold text-brand-dark hover:text-brand-forest transition-colors uppercase tracking-wide whitespace-nowrap"
            >
              <PawPrint size={16} weight="fill" className="text-brand-forest" />
              PETS
            </Link>
          </li>
          <li className="flex-shrink-0">
            <Link
              href="/categorias/ofertas"
              className="text-[13px] font-semibold text-brand-red hover:text-brand-red/80 transition-colors uppercase tracking-wide whitespace-nowrap"
            >
              🔥 Ofertas
            </Link>
          </li>
          <li className="flex-shrink-0">
            <Link
              href="/produtos"
              className="text-[13px] font-extrabold text-brand-forest hover:opacity-80 transition-opacity uppercase tracking-wide whitespace-nowrap"
            >
              Ver Tudo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
