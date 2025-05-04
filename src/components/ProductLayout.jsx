
import { Outlet } from 'react-router-dom'

const ProductLayout = () => {
  return (
    <>
      <div className='w-full pt-20'>
        <Outlet />
      </div>
    </>
  )
}

export default ProductLayout