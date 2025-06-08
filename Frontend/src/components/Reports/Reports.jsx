
import React, { useState, useEffect } from 'react';
import { FiDownload, FiBarChart2, FiPieChart } from 'react-icons/fi';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Example charting library

const Reports = () => {
  const [reportType, setReportType] = useState('salesByMonth');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-06-30');

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate API call
        let data;
        if (reportType === 'salesByMonth') {
          data = {
            title: 'Sales by Month',
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            values: [5000, 7500, 6000, 9000, 10500, 12000]
          };
        } else if (reportType === 'topProducts') {
          data = {
            title: 'Top Selling Products',
            products: [
              { name: 'RTX 4090 Graphics Card', sales: 120 },
              { name: 'Pro OS v10', sales: 90 },
              { name: 'React E-commerce Template', sales: 75 },
            ]
          };
        }
        setReportData(data);
      } catch (err) {
        setError(`Error loading ${reportType} report.`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, [reportType, startDate, endDate]);

  const handleDownloadReport = () => {
    alert(`Downloading ${reportType} report... (Implement CSV/Excel download logic)`);
  };

  if (loading) return <div className="text-center p-4">Generating report...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Reports & Analytics</h1>

      <div className="flex justify-between items-center mb-6">
        <select
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="salesByMonth">Sales by Month</option>
          <option value="topProducts">Top Selling Products</option>
          <option value="customerGrowth">Customer Growth</option>
        </select>
        <div className="flex gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleDownloadReport}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
          >
            <FiDownload className="mr-2" /> Download
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">{reportData.title}</h2>
        <div className="h-96 flex items-center justify-center text-gray-400">
          [Chart for {reportData.title} here]
        </div>
      </div>

      {reportData.products && reportData.products.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mt-8 overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Details for {reportData.title}</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reportData.products.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.sales}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;