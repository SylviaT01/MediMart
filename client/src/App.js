
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/home';
import ProductList from './components/productlist';
import AboutUs from './components/About';
import Login from './components/login';
import SignUp from './components/signup';
import Contact from './components/Contact';
import { UserProvider, UserContext } from './components/context/userContext';
import { CartProvider } from './components/context/cartContext';
import AOS from 'aos';
import 'aos/dist/aos.css';

function AppContent() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const { authToken, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={authToken ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={authToken ? <Home /> : <Navigate to="/login" />} />
          <Route path="/products" element={authToken ? <ProductList /> : <Navigate to="/login" />} />
          <Route path="/about" element={authToken ? <AboutUs /> : <Navigate to="/login" />} />
          <Route path="/contact" element={authToken ? <Contact /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
