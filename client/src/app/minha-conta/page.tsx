"use client";

import { useState } from 'react';
import { Package, User, Lock, LogOut } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'pedidos' | 'dados' | 'seguranca'>('pedidos');
  const [user] = useState({
    name: "João Silva",
    email: "joao@example.com",
    phone: "(11) 99999-9999"
  });

  const orders = [
    { id: "#3214", date: "15/03/2024", status: "Entregue", total: "R$ 299,90" },
    { id: "#3215", date: "18/03/2024", status: "Transporte", total: "R$ 599,90" },
    { id: "#3216", date: "20/03/2024", status: "Processando", total: "R$ 159,90" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 space-y-2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">Olá, {user.name}</h2>

              <button
                onClick={() => setActiveTab('pedidos')}
                className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'pedidos' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
              >
                <Package className="h-5 w-5 mr-3" />
                Meus Pedidos
              </button>

              <button
                onClick={() => setActiveTab('dados')}
                className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'dados' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
              >
                <User className="h-5 w-5 mr-3" />
                Dados Pessoais
              </button>

              <button
                onClick={() => setActiveTab('seguranca')}
                className={`w-full flex items-center p-3 rounded-lg ${activeTab === 'seguranca' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'
                  }`}
              >
                <Lock className="h-5 w-5 mr-3" />
                Segurança
              </button>

              <button className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 mt-4">
                <LogOut className="h-5 w-5 mr-3" />
                Sair da Conta
              </button>
            </div>
          </div>

          <div className="flex-1">
            {activeTab === 'pedidos' && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Histórico de Pedidos</h3>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Pedido {order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div>
                          <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'Entregue' ? 'bg-green-100 text-green-800' :
                              order.status === 'Transporte' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status}
                          </span>
                          <p className="text-lg font-medium mt-2">{order.total}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'dados' && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Dados Pessoais</h3>

                <form className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Salvar Alterações
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'seguranca' && (
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-2xl font-bold mb-6">Segurança</h3>

                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h4 className="font-medium mb-2">Alterar Senha</h4>
                    <form className="space-y-3 max-w-lg">
                      <input
                        type="password"
                        placeholder="Senha atual"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <input
                        type="password"
                        placeholder="Nova senha"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Alterar Senha
                      </button>
                    </form>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Autenticação de Dois Fatores</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Não ativado</span>
                      <button className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                        Ativar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}