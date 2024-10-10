import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Order from "./pages/Order";
import Layout from "./components/layout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
