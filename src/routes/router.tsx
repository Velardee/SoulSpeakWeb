import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import { useAuthStore } from "../store/auth";
import Home from "../pages/home";
import PersistentDrawer from "../components/Drawer/Drawer";

function Router() {
  const { token } = useAuthStore();

  const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    return token ? (
      <>
        {/* Renderizamos el AppBar y Drawer solo si hay token */}
        <PersistentDrawer children={element} />
      </>
    ) : (
      <Navigate to="/" />
    );
  };

  const PublicRoute = ({ element }: { element: JSX.Element }) => {
    return !token ? element : <Navigate to="/Home" />;
  };

  return (
    <Routes>
      {/* Public Routes  */}
      <Route path="/" element={<PublicRoute element={<Login />} />} />
      <Route
        path="/Register"
        element={<PublicRoute element={<Register />} />}
      />
      {/* Private Routes  */}
      <Route path="/Home" element={<PrivateRoute element={<Home />} />} />

      {/* Fallback  */}
      <Route path="*" element={<Navigate to={token ? "/Home" : "/"} />} />
    </Routes>
  );
}

export default Router;
