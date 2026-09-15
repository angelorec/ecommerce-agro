import Link from "next/link";
import { User, Package, MapPin, Key, SignOut } from "@phosphor-icons/react/dist/ssr";

export default function AccountPage() {
  const mockCustomer = {
    name: "João da Silva (Produtor Rural)",
    cpfCnpj: "123.456.789-00",
    email: "joao.silva@fazendapinheiros.com.br",
    phone: "(49) 99876-5432",
    city: "Lages - SC",
  };

  const mockOrders = [
    {
      id: "PED-10492",
      date: "14/09/2026",
      total: "R$ 489,90",
      status: "Em Separação",
      statusColor: "bg-amber-100 text-amber-800",
      itemsCount: 3,
    },
    {
      id: "PED-09821",
      date: "02/08/2026",
      total: "R$ 1.250,00",
      status: "Entregue",
      statusColor: "bg-emerald-100 text-emerald-800",
      itemsCount: 6,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1200px]">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:underline">Início</Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold">Minha Conta</span>
        </nav>

        <h1 className="font-display font-black text-2xl md:text-3xl text-brand-dark mb-8">
          Minha Conta
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User profile card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-fit">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="w-14 h-14 bg-brand-forest text-white rounded-full flex items-center justify-center font-bold text-xl">
                JS
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-base">{mockCustomer.name}</h2>
                <p className="text-xs text-gray-500">{mockCustomer.email}</p>
                <p className="text-xs font-semibold text-brand-gold mt-0.5">{mockCustomer.city}</p>
              </div>
            </div>

            <nav className="space-y-1">
              <Link
                href="/conta"
                className="flex items-center gap-3 px-4 py-3 bg-brand-forest/10 text-brand-forest font-bold text-sm rounded-xl"
              >
                <Package size={20} />
                <span>Meus Pedidos</span>
              </Link>
              <button
                disabled
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-xl transition-colors opacity-60 cursor-not-allowed"
              >
                <User size={20} />
                <span>Dados Cadastrais</span>
              </button>
              <button
                disabled
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-xl transition-colors opacity-60 cursor-not-allowed"
              >
                <MapPin size={20} />
                <span>Endereços de Entrega</span>
              </button>
              <button
                disabled
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 text-sm font-medium rounded-xl transition-colors opacity-60 cursor-not-allowed"
              >
                <Key size={20} />
                <span>Alterar Senha</span>
              </button>
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 text-sm font-medium rounded-xl transition-colors mt-4"
              >
                <SignOut size={20} />
                <span>Sair</span>
              </button>
            </nav>
          </div>

          {/* Orders list */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="font-bold text-lg text-brand-dark mb-4 flex items-center gap-2">
                <Package size={22} className="text-brand-forest" />
                Histórico de Pedidos Sincronizados (HIPER ERP)
              </h2>

              <div className="space-y-4">
                {mockOrders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-brand-forest/40 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{order.id}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Data: {order.date} • {order.itemsCount} itens
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="font-bold text-brand-forest text-base">{order.total}</span>
                      <Link
                        href={`/confirmacao?pedido=${order.id}`}
                        className="px-4 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-lg hover:bg-brand-forest hover:text-white transition-colors"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Loyalty / Producer notice */}
            <div className="bg-gradient-to-r from-brand-forest to-emerald-900 text-white p-6 rounded-2xl shadow-sm">
              <h3 className="font-bold text-base mb-1">🌾 Programa Produtor Rural Rancho</h3>
              <p className="text-xs text-emerald-100 leading-relaxed mb-4">
                Seu cadastro está vinculado ao HIPER ERP com condições exclusivas de faturamento direto no boleto bancário para compras de grande volume em rações e sementes.
              </p>
              <a
                href="https://wa.me/5549998142661"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-brand-gold text-brand-dark font-bold text-xs rounded-lg hover:opacity-90 transition-opacity"
              >
                Solicitar Cotação Faturada
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
