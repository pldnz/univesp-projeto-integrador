import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import RegisterUser from './pages/RegisterUser';
import LandingFeed from './pages/LandingFeed';
import PetDetail from './pages/PetDetail';
import Dashboard from './pages/Dashboard';
import AnimalRegistration from './pages/AnimalRegistration';
import Profile from './pages/Profile';
import Layout from './components/Layout';

// Componente para proteger rotas da ONG
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null; // Ou um spinner
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rotas Públicas */}
        <Route path="/" element={<LandingFeed />} />
        <Route path="/pet/:id" element={<PetDetail />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <RegisterUser />} />
        
        {/* Rotas Privadas */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/anunciar" element={
          <PrivateRoute>
            <AnimalRegistration />
          </PrivateRoute>
        } />
        <Route path="/edit/:id" element={
          <PrivateRoute>
            <AnimalRegistration />
          </PrivateRoute>
        } />
        <Route path="/perfil" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
