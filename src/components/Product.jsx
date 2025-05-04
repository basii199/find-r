import React from 'react'
import { useParams } from 'react-router-dom';
import { useGetProductQuery } from '../services/products';
import ProductPage from './ProductPage';

const Product = () => {
  const id = useParams().id;
  const {data, error, isLoading} = useGetProductQuery(id)

  return (
    <div>
      {isLoading && (<h1>Loading...</h1>)}
      {error && (<h1>Error fetching products</h1>)}
      {data && (<ProductPage product={data} />)}
    </div>
  )
}

export default Product