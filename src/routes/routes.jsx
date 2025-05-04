// src/routes/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/ProductListPage";

const router = createBrowserRouter([
  {
    path: "/", // Aquí empieza
    element: <MainLayout />,
    children: [
      {
        index: true, 
        element: <ProductListPage />,
      },
      /*{
        path: "products",
        element: <ProductListPage />,
      }*/
    ],
  },
]);

export default router;
