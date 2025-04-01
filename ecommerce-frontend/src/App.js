import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Products from './pages/Products';
// import Cart from './pages/Cart';
// import Orders from './pages/Orders';
// import Login from './pages/Login';
// import Register from './pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import './App.css';

function App() {
  return (
    <div className='app-container'>
      <Router>
        <Navbar />
        <div className='content-wrap'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:productId' element={<ProductDetail />} />
            {/* <Route path='/cart' element={<Cart />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} /> */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
