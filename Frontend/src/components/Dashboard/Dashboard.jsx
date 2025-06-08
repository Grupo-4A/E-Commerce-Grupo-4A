// frontend/src/components/Dashboard/DashboardComponent.jsx
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
        // Aquí iría tu llamada a la API para obtener los datos del dashboard
        // const response = await fetch('/api/admin/dashboard');
        // const data = await response.json();

        const data = {
          totalSalesMonth: 12500.50,
          pendingOrders: 15,
          newCustomersMonth: 45,
          lowStockProducts: 8,
          salesChartData: [], // Placeholder for chart data
          recentOrders: [
            { id: 'ORD005', customerName: 'Roberto P.', status: 'Pendiente' },
            { id: 'ORD004', customerName: 'Ana G.', status: 'Enviado' },
          ]
        };
        setSummaryData(data);
      } catch (err) {
        setError("Couldn't load dashboard data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center p-4">Loading dashboard...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;
  if (!summaryData) return <div className="text-center p-4">No data available.</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Monthly Sales"
          value={`$${summaryData.totalSalesMonth.toFixed(2)}`}
          icon={<FiDollarSign className="text-green-500" />}
        />
        <DashboardCard
          title="Pending Orders"
          value={summaryData.pendingOrders}
          icon={<FiShoppingBag className="text-yellow-500" />}
        />
        <DashboardCard
          title="New Customers"
          value={summaryData.newCustomersMonth}
          icon={<FiUsers className="text-blue-500" />}
        />
        <DashboardCard
          title="Low Stock"
          value={summaryData.lowStockProducts}
          icon={<FiPackage className="text-red-500" />}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Sales Trend (Last 30 Days)</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          [Sales Chart Here] {/* Integrate a charting library like Recharts or Chart.js */}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Orders</h2>
        {summaryData.recentOrders && summaryData.recentOrders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {summaryData.recentOrders.map((order, index) => (
              <li key={index} className="py-3 flex justify-between items-center">
                <span>Order #{order.id} - {order.customerName}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {order.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent orders.</p>
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