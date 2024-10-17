import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/layout";
import Home from "./pages/Home";
import ApplicationPages from "./pages/ApplicationPages";
import ApplicationMenus, { ApplicationMenu } from "./pages/ApplicationMenus";
import LocalStorageCRUD from "@/lib/local-storage-crud";
import DynamicPage from "./pages/DynamicPage";
import ApplicationSettings  from "./pages/ApplicationSettings"; 

const App: React.FC = () => {
  const menus = LocalStorageCRUD.getItems<ApplicationMenu>("application_menus");

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route element={<Layout menus={menus} />}>
          <Route path="/" element={<Home />} />
          <Route path="/pages" element={<ApplicationPages />} />
          <Route path="/menus" element={<ApplicationMenus />} />
          <Route path="/application-settings" element={<ApplicationSettings />} />
          {/* Dynamically added routes */}
          {menus.map((menu: ApplicationMenu, index: number) => {
            return (
              <Route
                key={index}
                path={menu.url}
                element={<DynamicPage id={menu.pageId} />}
              />
            );
          })}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
