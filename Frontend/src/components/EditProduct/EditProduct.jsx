import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiUpload, FiX, FiSave, FiArrowLeft, FiImage } from 'react-icons/fi';
import { getProductById, updateProduct } from '../../services/productService';
import { fetchCategories, fetchBrands } from '../../services/dataService';
import { uploadImage } from '../../services/productService';

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryId: '',
    brandId: '',
    status: 'Active',
    imageUrl: '',
    // Campos específicos según el tipo de producto
    ramValue: '',
    diskSpaceValue: '',
    compatibilityIds: [],
    licenseIds: []
  });

  useEffect(() => {
    fetchInitialData();
    if (id) {
      loadProduct();
    }
  }, [id]);

  const fetchInitialData = async () => {
    try {
      const [categoriesData, brandsData] = await Promise.all([
        fetchCategories(),
        fetchBrands()
      ]);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setErrors({ general: 'Error al cargar datos iniciales: ' + error.message });
    }
  };

  const loadProduct = async () => {
    try {
      setLoadingProduct(true);
      const product = await getProductById(id);
      
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        stock: product.stock || '',
        categoryId: product.category?.id || '',
        brandId: product.brand?.id || '',
        status: product.status?.name || 'Active',
        imageUrl: product.image || '',
        ramValue: product.ram || '',
        diskSpaceValue: product.diskSpace || '',
        compatibilityIds: product.compatibility ? [product.compatibility.id] : [],
        licenseIds: product.license ? [product.license.id] : []
      });

      // Si hay una imagen existente, mostrarla como preview
      if (product.image) {
        setImagePreview(product.image);
      }

    } catch (error) {
      console.error('Error loading product:', error);
      setErrors({ general: 'Error al cargar el producto: ' + error.message });
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, image: 'Por favor selecciona un archivo de imagen válido' }));
        return;
      }

      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, image: 'La imagen debe ser menor a 5MB' }));
        return;
      }

      setSelectedFile(file);

      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Limpiar error de imagen
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: null }));
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFormData(prev => ({ ...prev, imageUrl: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.description.trim()) newErrors.description = 'La descripción es requerida';
    if (!formData.price || formData.price <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (!formData.stock || formData.stock < 0) newErrors.stock = 'El stock no puede ser negativo';
    if (!formData.categoryId) newErrors.categoryId = 'Selecciona una categoría';
    if (!formData.brandId) newErrors.brandId = 'Selecciona una marca';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      let imageUrl = formData.imageUrl;

      // Subir nueva imagen si se seleccionó una
      if (selectedFile) {
        setUploadingImage(true);
        const imageResponse = await uploadImage(selectedFile);
        imageUrl = imageResponse.url || imageResponse.path || '';
        setUploadingImage(false);
      }

      // Preparar datos del producto para actualización
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        categoryId: parseInt(formData.categoryId),
        brandId: parseInt(formData.brandId),
        status: formData.status,
        image: imageUrl,
        // Agregar campos específicos si tienen valor
        ...(formData.ramValue && { ram: formData.ramValue }),
        ...(formData.diskSpaceValue && { diskSpace: formData.diskSpaceValue }),
        ...(formData.compatibilityIds.length > 0 && { compatibilityId: formData.compatibilityIds[0] }),
        ...(formData.licenseIds.length > 0 && { licenseId: formData.licenseIds[0] })
      };

      await updateProduct(id, productData);

      alert('Producto actualizado exitosamente');
      navigate('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      setErrors({ general: 'Error al actualizar el producto: ' + error.message });
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  if (loadingProduct) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg text-gray-600">Cargando producto...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/admin/products')}
              className="mr-4 p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-bold text-gray-800">Editar Producto</h1>
          </div>
        </div>

        {/* Error general */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Información básica */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Información Básica</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Producto *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Nombre del producto"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.description ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Descripción detallada del producto"
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.price ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="0.00"
                    />
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.stock ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="0"
                    />
                    {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría *
                    </label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.categoryId ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca *
                    </label>
                    <select
                      name="brandId"
                      value={formData.brandId}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.brandId ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Seleccionar marca</option>
                      {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    {errors.brandId && <p className="mt-1 text-sm text-red-600">{errors.brandId}</p>}
                  </div>
                </div>
              </div>

              {/* Especificaciones técnicas */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Especificaciones Técnicas (Opcional)</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RAM
                    </label>
                    <input
                      type="text"
                      name="ramValue"
                      value={formData.ramValue}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ej: 8GB, 16GB"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Almacenamiento
                    </label>
                    <input
                      type="text"
                      name="diskSpaceValue"
                      value={formData.diskSpaceValue}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="ej: 256GB SSD, 1TB HDD"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Imagen y estado */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Imagen del Producto</h2>

                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                      <FiImage className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Sin imagen seleccionada</p>
                    </div>
                  )}

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      <FiUpload className="mr-2" />
                      {imagePreview ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                    </label>
                  </div>

                  {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">Estado</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado del Producto
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Activo</option>
                    <option value="Inactive">Inactivo</option>
                    <option value="Draft">Borrador</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || uploadingImage}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
            >
              {loading || uploadingImage ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {uploadingImage ? 'Subiendo imagen...' : 'Actualizando...'}
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Actualizar Producto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;

