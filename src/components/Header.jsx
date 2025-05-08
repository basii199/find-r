import { User, ShoppingCart, Search, Menu } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Categories', path: '/products/categories' },
    { name: 'About', path: '/about' },
  ]

  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
    }
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and mobile menu button */}
            <div className="flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <Link to="/" className="ml-4 lg:ml-0">
                <div className="flex items-center">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    find-r
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Search and User Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
              
              {/* <Link 
                to="/cart" 
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Link> */}
              
              <div 
                className="p-2 rounded-full border border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                <User className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Mobile Search (shown when searchOpen is true) */}
          {searchOpen && (
            <div className="pb-4 px-2">
              <form onSubmit={handleSearch} className="relative mt-2 rounded-md shadow-sm">
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu (shown when mobileMenuOpen is true) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-4 px-3 py-2">
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    className="block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6"
                    placeholder="Search products..."
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Add padding to the top of children to account for fixed header */}
      <div className="pt-16">
        {children}
      </div>
    </>
  )
}

export default Header