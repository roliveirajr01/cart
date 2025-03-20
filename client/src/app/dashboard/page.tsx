"use client";

import { BarChart, ShoppingCart, Users, Package, DollarSign } from 'lucide-react';
import Link from 'next/link';
import AdminRoute from '../../components/AdminRoute';

export default function DashboardPage() {
  const stats = [
    { title: "Vendas Hoje", value: "R$ 12.430", icon: DollarSign, color: "bg-green-100" },
    { title: "Pedidos", value: "234", icon: ShoppingCart, color: "bg-blue-100" },
    { title: "Produtos", value: "1.532", icon: Package, color: "bg-purple-100" },
    { title: "Clientes", value: "892", icon: Users, color: "bg-orange-100" },
  ];

  const recentOrders = [
    { id: "#3214", customer: "Ana Silva", status: "Entregue", amount: "R$ 299,90" },
    { id: "#3215", customer: "Carlos Souza", status: "Processando", amount: "R$ 599,90" },
    { id: "#3216", customer: "Julia Costa", status: "Enviado", amount: "R$ 159,90" },
  ];

  return (
    <AdminRoute>
      <div className="min-h-screen bg-gray-50">
        <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-8 px-2">
            <h1 className="text-2xl font-bold text-gray-800">AdminStore</h1>
          </div>

          <nav className="space-y-1">
            {[
              { name: "Dashboard", icon: BarChart, href: "#" },
              { name: "Produtos", icon: Package, href: "#" },
              { name: "Pedidos", icon: ShoppingCart, href: "#" },
              { name: "Clientes", icon: Users, href: "#" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 text-gray-700"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="ml-64 p-8">
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Visão Geral</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Buscar..."
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="h-6 w-6 text-gray-700" />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Vendas nos últimos 7 dias</h3>
              <div className="h-64">
                <div className="bg-gray-100 w-full h-full flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">Gráfico de Vendas</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Pedidos Recentes</h3>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                    <div>
                      <span className={`px-2 py-1 text-xs rounded-full ${order.status === "Entregue" ? "bg-green-100 text-green-800" :
                        order.status === "Enviado" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {order.status}
                      </span>
                      <p className="text-sm mt-1 text-right">{order.amount}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 flex items-center">
              <Package className="h-6 w-6 mr-3 text-blue-500" />
              <span>Gerenciar Estoque</span>
            </button>
            <button className="p-4 bg-white rounded-xl shadow-sm hover:bg-gray-50 flex items-center">
              <Users className="h-6 w-6 mr-3 text-green-500" />
              <span>Clientes Novos</span>
            </button>
          </div>
        </main>
      </div>
    </AdminRoute>
  );
}