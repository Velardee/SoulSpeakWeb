import { Route, Routes } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}

export default Router;
