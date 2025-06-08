// frontend/src/components/SupportManagement/SupportManagementComponent.jsx
import React, { useState, useEffect } from 'react';
import { FiEye, FiCheckCircle, FiClock, FiXCircle, FiFilter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SupportManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate API call
        const dummyTickets = [
          { id: 'TKT001', customerName: 'Juan Pérez', subject: 'Software License Issue', status: 'Open', date: '2025-06-05' },
          { id: 'TKT002', customerName: 'Maria López', subject: 'Frontend Template Query', status: 'In Progress', date: '2025-06-04' },
          { id: 'TKT003', customerName: 'Carlos García', subject: 'Graphics Card Warranty', status: 'Resolved', date: '2025-06-03' },
          { id: 'TKT004', customerName: 'Ana Ruiz', subject: 'Software Download Error', status: 'Open', date: '2025-06-02' },
        ];
        setTickets(dummyTickets.filter(t => filterStatus === '' || t.status === filterStatus));
      } catch (err) {
        setError("Error loading support tickets.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [filterStatus]);

  const updateTicketStatus = async (ticketId, newStatus) => {
    if (window.confirm(`Change ticket ${ticketId} status to "${newStatus}"?`)) {
      try {
        // Your PUT API call here
        setTickets(tickets.map(ticket => ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket));
        alert('Ticket status updated.');
      } catch (err) {
        alert('Error updating ticket status.');
        console.error(err);
      }
    }
  };

  const statusOptions = ['Open', 'In Progress', 'Resolved', 'Closed'];

  if (loading) return <div className="text-center p-4">Loading tickets...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Support Management (Tickets)</h1>

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.length > 0 ? tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ticket.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                    ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    ticket.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/admin/support/${ticket.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <FiEye className="inline-block mr-1" /> View
                  </Link>
                  {ticket.status !== 'Resolved' && (
                    <button
                      onClick={() => updateTicketStatus(ticket.id, 'Resolved')}
                      className="text-green-600 hover:text-green-900"
                    >
                      <FiCheckCircle className="inline-block mr-1" /> Resolve
                    </button>
                  )}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No support tickets found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupportManagement;