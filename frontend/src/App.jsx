import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import DietasList from './components/DietasList';
import AgregarDieta from './components/AgregarDieta';
import EditarDieta from './components/EditarDieta';
import Login from './components/Login';

const PrivateRoute = ({ element, loggedIn }) => {
  return loggedIn ? element : <Navigate to="/login" />;
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/dietas"
            element={
              <PrivateRoute
                loggedIn={loggedIn}
                element={
                  <>
                    <Navbar />
                    <DietasList />
                  </>
                }
              />
            }
          />
          <Route
            path="/agregar-dieta"
            element={
              <PrivateRoute
                loggedIn={loggedIn}
                element={
                  <>
                    <Navbar />
                    <AgregarDieta />
                  </>
                }
              />
            }

          />

      <Route
            path="/editar-dieta/:titulo"
            element={
              <PrivateRoute loggedIn={loggedIn}>
                <Navbar />
                <EditarDieta />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              loggedIn ? (
                <>
                  <Navbar />
                  <h1>Recetas saludables</h1>
                  <DietasList />
                  <AgregarDieta />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
