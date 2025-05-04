import React from 'react'
import ProductCard from './ProductCard'
import { useGetProductsQuery } from '../services/products'
 
const Products = () => {  
  const { data, error, isLoading } = useGetProductsQuery()  
  
  return (
    <div className=' grid grid-cols-12 p-5 gap-10 w-full'>
      {isLoading && (<h1>Loading...</h1>)}
      {error && (<h1>Error fetching products</h1>)}
      {data && (data.products.map((product) => (
        <div key={product.id} className='col-span-3'>
          <ProductCard product={product} />
        </div>
      )))}
    </div>
  )
}

export default Products