import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import GlobalStyles from './styles/GlobalStyles';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
