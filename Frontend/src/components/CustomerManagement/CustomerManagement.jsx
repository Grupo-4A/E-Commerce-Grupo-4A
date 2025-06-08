
import React, { useState, useEffect } from 'react';
import { FiUser, FiSearch, FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate API call
        const dummyCustomers = [
          { id: 'CUST001', name: 'Juan Pérez', email: 'juan@example.com', registered: '2024-01-15', totalOrders: 5, status: 'Active' },
          { id: 'CUST002', name: 'Maria López', email: 'maria@example.com', registered: '2024-02-20', totalOrders: 2, status: 'Active' },
          { id: 'CUST003', name: 'Carlos García', email: 'carlos@example.com', registered: '2023-11-10', totalOrders: 10, status: 'Active' },
          { id: 'CUST004', name: 'Ana Ruiz', email: 'ana@example.com', registered: '2024-03-01', totalOrders: 0, status: 'Inactive' },
        ];
        setCustomers(dummyCustomers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase())));
        setTotalPages(1);
      } catch (err) {
        setError("Error loading customers.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [searchTerm, currentPage]);

  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm(`Are you sure you want to delete customer ${customerId}?`)) {
      try {
        // Your DELETE API call here
        setCustomers(customers.filter(c => c.id !== customerId));
        alert('Customer deleted successfully.');
      } catch (err) {
        alert('Error deleting customer.');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading customers...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Customer Management</h1>

      <div className="flex justify-end items-center mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search customer by name or email..."
            className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.length > 0 ? customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.registered}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.totalOrders}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    customer.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/admin/customers/${customer.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <FiEye className="inline-block mr-1" /> View
                  </Link>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="inline-block mr-1" /> Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">No customers found.</td>
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

export default CustomerManagement;