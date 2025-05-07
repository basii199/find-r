
import { Outlet } from 'react-router-dom'

const ProductLayout = () => {
  return (
    <>
      <div className='w-full'>
        <Outlet />
      </div>
    </>
  )
}

export default ProductLayout