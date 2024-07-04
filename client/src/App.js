import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './components/home';
import ProductList from './components/productlist';
import AboutUs from './components/About'
import Login from './components/login';
import SignUp from './components/signup';
import { UserProvider } from './components/context/userContext';

function App() {
  return (
    <Router>
      <UserProvider>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
      </UserProvider>
    </Router>
  );
}

export default App;
