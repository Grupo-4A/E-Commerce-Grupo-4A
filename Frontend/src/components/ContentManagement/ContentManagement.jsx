// frontend/src/components/ContentManagement/ContentManagementComponent.jsx
import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiEdit, FiTrash2, FiFileText } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ContentManagement = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        // Simulate API call
        const dummyArticles = [
          { id: 'ART001', title: 'New Nvidia Graphics Cards', author: 'Admin', date: '2025-06-01', status: 'Published' },
          { id: 'ART002', title: 'Frontend Templates Guide', author: 'Admin', date: '2025-05-20', status: 'Draft' },
          { id: 'ART003', title: 'Software Update: What You Need to Know', author: 'Admin', date: '2025-05-10', status: 'Published' },
        ];
        setArticles(dummyArticles);
      } catch (err) {
        setError("Error loading content.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleDeleteArticle = async (articleId) => {
    if (window.confirm(`Are you sure you want to delete this article?`)) {
      try {
        // Your DELETE API call here
        setArticles(articles.filter(a => a.id !== articleId));
        alert('Article deleted successfully.');
      } catch (err) {
        alert('Error deleting article.');
        console.error(err);
      }
    }
  };

  if (loading) return <div className="text-center p-4">Loading content...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Content Management (Blog/Pages)</h1>

      <div className="flex justify-end mb-6">
        <Link
          to="/admin/content/new-article"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <FiPlusCircle className="mr-2" /> New Article/Page
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.length > 0 ? articles.map((article) => (
              <tr key={article.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    article.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/admin/content/edit-article/${article.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                    <FiEdit className="inline-block mr-1" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="inline-block mr-1" /> Delete
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No articles/pages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;