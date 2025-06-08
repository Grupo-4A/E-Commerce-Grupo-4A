import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import { Inicio } from "../layouts/login/login";
import ProductListPage from "../pages/ProductListPage";
import UserProfilePage from "../pages/UserProfilePage";
import OffersPage from "../pages/OffersPage";
import SupportPage from "../pages/SupportPage";
import NewsPage from "../pages/NewsPage";
import ShoppinCartPage  from "../pages/ShoppingCartPage";

const router = createBrowserRouter([
  {
    path: "/", // Layout principal
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
      {path: "ofertas",
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
        element: <ShoppinCartPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <Inicio />,
  },
  {
    path: "/perfil", 
    element: <UserProfilePage />,
  },
  
]);

export default router;
