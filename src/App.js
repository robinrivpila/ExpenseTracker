
import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Login from "./pages/Login.js";
import Transform from "./pages/Transform.js";
import Layout from "./pages/Layout.js";
import Dashboard from './pages/Dashboard.js';
import { AuthProvider } from './components/AuthContext.js';
import "./styles/App.css";

export default function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/transForm" element={<Transform/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}


