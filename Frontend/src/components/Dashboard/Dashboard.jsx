// frontend/src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiShoppingBag, FiUsers, FiPackage } from 'react-icons/fi';

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Aquí iría tu llamada a la API para obtener los datos del dashboard.
        // const response = await fetch('/api/admin/dashboard');
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();

        // Datos de ejemplo para desarrollo:
        const data = {
          totalSalesMonth: 12500.50,
          pendingOrders: 15,
          newCustomersMonth: 45,
          lowStockProducts: 8,
          salesChartData: [], // Placeholder for chart data
          recentOrders: [
            { id: 'ORD005', customerName: 'Roberto P.', status: 'Pendiente' },
            { id: 'ORD004', customerName: 'Ana G.', status: 'Enviado' },
            { id: 'ORD003', customerName: 'Carlos M.', status: 'Completado' },
          ]
        };
        setSummaryData(data);
      } catch (err) {
        setError("No se pudieron cargar los datos del dashboard.");
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full p-4">
        <p className="text-gray-600">Cargando datos del dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full p-4 text-red-600 bg-red-50 border border-red-200 rounded-md">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className="flex justify-center items-center h-full p-4 text-gray-500">
        <p>No hay datos disponibles para mostrar.</p>
      </div>
    );
  }

  return (
    // CAMBIO CLAVE AQUÍ: Eliminado 'min-h-screen' y añadido 'w-full' para asegurar que ocupe todo el ancho disponible.
    // El padding ya está bien con 'p-6'.
    <div className="p-6 bg-gray-50 w-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Administración</h1>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Ventas del Mes"
          value={`$${summaryData.totalSalesMonth.toFixed(2)}`}
          icon={<FiDollarSign className="text-green-500" />}
        />
        <DashboardCard
          title="Órdenes Pendientes"
          value={summaryData.pendingOrders}
          icon={<FiShoppingBag className="text-yellow-500" />}
        />
        <DashboardCard
          title="Nuevos Clientes"
          value={summaryData.newCustomersMonth}
          icon={<FiUsers className="text-blue-500" />}
        />
        <DashboardCard
          title="Productos Bajo Stock"
          value={summaryData.lowStockProducts}
          icon={<FiPackage className="text-red-500" />}
        />
      </div>

      {/* Gráfico de Ventas */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Tendencia de Ventas (Últimos 30 Días)</h2>
        <div className="h-64 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-md">
          [Aquí iría tu gráfico de ventas (ej: Recharts, Chart.js)]
        </div>
      </div>

      {/* Órdenes Recientes */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Órdenes Recientes</h2>
        {summaryData.recentOrders && summaryData.recentOrders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {summaryData.recentOrders.map((order) => (
              <li key={order.id} className="py-3 flex justify-between items-center">
                <span>Orden #{order.id} - {order.customerName}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No hay órdenes recientes.</p>
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <h3 className="text-lg font-medium text-gray-600">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
    <div className="text-5xl opacity-40">
      {icon}
    </div>
  </div>
);

export default Dashboard;