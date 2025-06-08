// frontend/src/components/MarketingManagement/MarketingManagementComponent.jsx
import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiEdit, FiTrash2, FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MarketingManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate API call
        const dummyCoupons = [
          { id: 'CPN001', code: 'SUMMER25', type: 'Percentage', value: 25, expiryDate: '2025-07-31', status: 'Active' },
          { id: 'CPN002', code: 'FREE_SHIP', type: 'Free Shipping', value: 0, expiryDate: '2025-08-31', status: 'Active' },
          { id: 'CPN003', code: 'OFFER10', type: 'Fixed Amount', value: 10, expiryDate: '2025-05-31', status: 'Inactive' },
        ];
        setCoupons(dummyCoupons);
      } catch (err) {
        setError("Error loading coupons.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  const handleDeleteCoupon = async (couponId) => {
    if (window.confirm(`Are you sure you want to delete coupon ${couponId}?`)) {
      try {
        // Your DELETE API call here
        setCoupons(coupons.filter(c => c.id !== couponId));
        alert('Coupon deleted successfully.');
      } catch (err) {
        alert('Error deleting coupon.');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading offers...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Marketing Management (Coupons)</h1>

      <div className="flex justify-end mb-6">
        <Link
          to="/admin/marketing/new-coupon"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <FiPlusCircle className="mr-2" /> Add Coupon
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.length > 0 ? coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{coupon.code}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {coupon.type === 'Percentage' ? `${coupon.value}%` : `$${coupon.value.toFixed(2)}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coupon.expiryDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    coupon.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {coupon.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/admin/marketing/edit-coupon/${coupon.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <FiEdit className="inline-block mr-1" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteCoupon(coupon.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="inline-block mr-1" /> Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No coupons found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketingManagement;