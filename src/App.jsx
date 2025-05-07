import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';
import ProductLayout from './components/ProductLayout';
import ProductsByCategory from './components/ProductsByCategory';
import Categories from './components/Categories';
import About from './components/About';
import SearchResults from './components/SearchPage';

const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>

          <Route path='products' element={<ProductLayout />}>
            <Route index element={<Products />} />
            <Route path=':id' element={<Product />} />
            <Route path='categories' element={<Categories />} />
            <Route path='categories/:category' element={<ProductsByCategory />} />
            <Route path='search' element={<SearchResults />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App