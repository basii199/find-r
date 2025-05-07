import { Link } from "react-router-dom"

const FeaturedCategories = () => {
  const categories = [
    { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80' },
    { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80' },
    { name: 'Fragrances', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80' },
    { name: 'Skincare', image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80' },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/category/${category.name.toLowerCase()}`}
            className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-64 w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
              <h3 className="text-xl font-bold text-white">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default FeaturedCategories