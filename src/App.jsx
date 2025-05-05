import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';
import ProductLayout from './components/ProductLayout';
import ProductsByCategory from './components/ProductsByCategory';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />}/>

          <Route path='products' element={<ProductLayout />}>
            <Route index element={<Products />} />
            <Route path=':id' element={<Product />} />
            <Route path='category/:category' element={<ProductsByCategory />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App