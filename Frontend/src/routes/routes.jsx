// frontend/src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import { Inicio } from "../layouts/login/login";
import ProductListPage from "../pages/ProductListPage";
import UserProfilePage from "../pages/UserProfilePage";
import OffersPage from "../pages/OffersPage";
import SupportPage from "../pages/SupportPage";
import NewsPage from "../pages/NewsPage";
import ShoppingCartPage from "../pages/ShoppingCartPage"; // Corregido el typo aquí también

// IMPORTA TU USER LAYOUT
import UserLayout from "../layouts/UserLayout";

// IMPORTA LOS COMPONENTES DE TUS PÁGINAS DE ADMINISTRACIÓN/PERFIL (SIN "Component")
// Asegúrate de que estos archivos y componentes existan en las rutas correctas.
// Si aún no los tienes, crea componentes simples para probar.
import Dashboard from "../components/Dashboard/Dashboard.jsx";
import ProductManagement from "../components/ProductManagement/ProductManagement";
import OrderManagement from "../components/OrderManagement/OrderManagement";
import CustomerManagement from "../components/CustomerManagement/CustomerManagement";
import MarketingManagement from "../components/MarketingManagement/MarketingManagement";
import ContentManagement from "../components/ContentManagement/ContentManagement";
import SupportManagement from "../components/SupportManagement/SupportManagement";
import Reports from "../components/Reports/Reports.jsx";
 // ¡Asegúrate de que esta línea esté presente y correcta!

// Componentes de sub-páginas (pueden ser simples placeholders por ahora)
const AddProduct = () => <div className="p-4 bg-white shadow rounded">Add New Product Form</div>;
const EditProduct = () => <div className="p-4 bg-white shadow rounded">Edit Product Form</div>;
const OrderDetail = () => <div className="p-4 bg-white shadow rounded">Order Detail View</div>;
const CustomerDetail = () => <div className="p-4 bg-white shadow rounded">Customer Detail View</div>;
const NewCoupon = () => <div className="p-4 bg-white shadow rounded">New Coupon Form</div>;
const EditCoupon = () => <div className="p-4 bg-white shadow rounded">Edit Coupon Form</div>;
const NewArticle = () => <div className="p-4 bg-white shadow rounded">New Article Editor</div>;
const EditArticle = () => <div className="p-4 bg-white shadow rounded">Edit Article Editor</div>;
const TicketDetail = () => <div className="p-4 bg-white shadow rounded">Support Ticket Detail</div>;


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "categorias",
        element: <ProductListPage />,
      },
      {
        path: "products",
        element: <ProductListPage />,
      },
      {
        path: "ofertas",
        element: <OffersPage />,
      },
      {
        path: "blog",
        element: <NewsPage />,
      },
      {
        path: "soporte",
        element: <SupportPage />,
      },
      {
        path: "carrito",
        element: <ShoppingCartPage />,
      },
      {
        path: "perfil",
        element: <UserProfilePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Inicio />,
  },
  {
    path: "/admin", // La ruta base para todas las secciones de administración
    element: <UserLayout />, // Este es el layout que contiene SidebarProfile y NavbarProfile
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <ProductManagement />,
      },
      {
        path: "products/new",
        element: <AddProduct />,
      },
      {
        path: "products/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "orders",
        element: <OrderManagement />,
      },
      {
        path: "orders/:id",
        element: <OrderDetail />,
      },
      {
        path: "customers",
        element: <CustomerManagement />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetail />,
      },
      {
        path: "marketing",
        element: <MarketingManagement />,
      },
      { path: "marketing/new-coupon", element: <NewCoupon /> },
      { path: "marketing/edit-coupon/:id", element: <EditCoupon /> },
      {
        path: "content",
        element: <ContentManagement />,
      },
      { path: "content/new-article", element: <NewArticle /> },
      { path: "content/edit-article/:id", element: <EditArticle /> },
      {
        path: "support",
        element: <SupportManagement />,
      },
      { path: "support/:id", element: <TicketDetail /> },
      {
        path: "reports",
        element: <Reports />,
      },
      
      {
        path: "*",
        element: <div><h1>404 - Página de Administración No Encontrada</h1><p>Verifica la URL en el panel de administración.</p></div>,
      },
    ],
  },
  {
    path: "*",
    element: <div><h1>404 - Página No Encontrada</h1><p>Lo sentimos, la página que buscas no existe.</p></div>,
  },
]);

export default router;