import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Toaster from './utils/Toaster';
import AppRoutes from './Components/AppRoutes'; 

import './App.css';

const  App=()=> {
  const [order, setOrder] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />
      <Toaster />
      <AppRoutes order={order} setOrder={setOrder} />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
