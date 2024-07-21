import React from "react";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import Layout from "./Layout";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductAdd from "./components/ProductAdd";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Details from "./pages/Details";
import Statistic from "./pages/Statistic";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") ?? "false");

  return user ? <>{children}</> : <Navigate to="/login" />;
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Products />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "productadd",
        element: <ProductAdd setRefresh={() => {}} />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
      {
        path: "/statistic",
        element: <Statistic />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
