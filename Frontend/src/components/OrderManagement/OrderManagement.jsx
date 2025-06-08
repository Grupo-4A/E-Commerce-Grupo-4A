
import React, { useState, useEffect } from 'react';
import { FiEye, FiCheckCircle, FiXCircle, FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const OrderManagementComponent = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate API call
        const dummyOrders = [
          { id: 'ORD001', customerName: 'Juan Pérez', date: '2025-06-05', total: 1799.99, status: 'Pending', paymentStatus: 'Paid' },
          { id: 'ORD002', customerName: 'Maria López', date: '2025-06-04', total: 250.00, status: 'Shipped', paymentStatus: 'Paid' },
          { id: 'ORD003', customerName: 'Carlos García', date: '2025-06-03', total: 80.00, status: 'Completed', paymentStatus: 'Paid' },
          { id: 'ORD004', customerName: 'Ana Ruiz', date: '2025-06-02', total: 500.00, status: 'Cancelled', paymentStatus: 'Refunded' },
        ];
        setOrders(dummyOrders.filter(o => filterStatus === '' || o.status === filterStatus));
        setTotalPages(1);
      } catch (err) {
        setError("Error loading orders.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [filterStatus, currentPage]);

  const updateOrderStatus = async (orderId, newStatus) => {
    if (window.confirm(`Change order ${orderId} status to "${newStatus}"?`)) {
      try {
        // Your PUT API call here
        setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
        alert('Order status updated.');
      } catch (err) {
        alert('Error updating order status.');
        console.error(err);
      }
    }
  };

  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'];

  if (loading) return <div className="text-center p-4">Loading orders...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order Management</h1>

      <div className="flex justify-end items-center mb-6">
        <select
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.length > 0 ? orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/admin/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <FiEye className="inline-block mr-1" /> View
                  </Link>
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'Processing')}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <FiCheckCircle className="inline-block mr-1" /> Process
                    </button>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementComponent;