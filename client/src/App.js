// import React, { useContext, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import NavBar from "./components/navbar";
// import Home from "./components/home";
// import ProductList from "./components/productlist";
// import AboutUs from "./components/About";
// import Login from "./components/login";
// import SignUp from "./components/signup";
// import Contact from "./components/Contact";
// import CartModal from "./components/cartModal";
// import ShippingForm from "./components/ShippingForm";
// import { UserProvider, UserContext } from "./components/context/userContext";
// import { CartProvider } from "./components/context/cartContext";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import { Progress } from "@chakra-ui/react";

// function AppContent() {
//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   const { currentUser, loading } = useContext(UserContext);

//   if (loading) {
//     return <div><Progress size="lg" isIndeterminate colorScheme="red" /></div>;
//   }

//   return (
//     <div className="min-h-screen flex flex-col">
//       <NavBar />
//       <div className="flex-grow">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route
//             path="/"
//             element={currentUser ? <Navigate to="/home" /> : <Login />}
//           />
//           <Route
//             path="/home"
//             element={currentUser ? <Home /> : <Navigate to="/home" />}
//           />
//           <Route
//             path="/products"
//             element={currentUser ? <ProductList /> : <Navigate to="/home" />}
//           />
//           <Route
//             path="/about"
//             element={currentUser ? <AboutUs /> : <Navigate to="/home" />}
//           />
//           <Route
//             path="/contact"
//             element={currentUser ? <Contact /> : <Navigate to="/home" />}
//           />
//           <Route
//             path="/cart"
//             element={currentUser ? <CartModal /> : <Navigate to="/home" />}
//           />
//           <Route
//             path="/shipping"
//             element={currentUser ? <ShippingForm /> : <Navigate to="/home" />}
//           />
//         </Routes>
//       </div>
//       {/* <Footer /> */}
//     </div>
//   );
// }

// function App() {
//   return (
//     <Router>
//       <UserProvider>
//         <CartProvider>
//           <AppContent />
//         </CartProvider>
//       </UserProvider>
//     </Router>
//   );
// }

// export default App;
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import NProgress from "nprogress"; // Import NProgress
import "nprogress/nprogress.css"; // Import NProgress styles
import NavBar from "./components/navbar";
import Home from "./components/home";
import ProductList from "./components/productlist";
import AboutUs from "./components/About";
import Login from "./components/login";
import SignUp from "./components/signup";
import Contact from "./components/Contact";
import CartModal from "./components/cartModal";
import ShippingForm from "./components/ShippingForm";
import { UserProvider, UserContext } from "./components/context/userContext";
import { CartProvider } from "./components/context/cartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { Progress } from "@chakra-ui/react";

function useProgressBar() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start(); // Start NProgress on location change start
    NProgress.done(); // Finish NProgress on location change end
  }, [location]);
}

function AppContent() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useProgressBar(); // Hook for NProgress

  const { currentUser, loading } = useContext(UserContext);

  if (loading) {
    return (
      <div>
        <Progress size="lg" isIndeterminate colorScheme="red" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={currentUser ? <Navigate to="/home" /> : <Login />}
          />
          <Route
            path="/home"
            element={currentUser ? <Home /> : <Navigate to="/home" />}
          />
          <Route
            path="/products"
            element={currentUser ? <ProductList /> : <Navigate to="/home" />}
          />
          <Route
            path="/about"
            element={currentUser ? <AboutUs /> : <Navigate to="/home" />}
          />
          <Route
            path="/contact"
            element={currentUser ? <Contact /> : <Navigate to="/home" />}
          />
          <Route
            path="/cart"
            element={currentUser ? <CartModal /> : <Navigate to="/home" />}
          />
          <Route
            path="/shipping"
            element={currentUser ? <ShippingForm /> : <Navigate to="/home" />}
          />
        </Routes>
      </div>
      {/* <Footer /> */}
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
