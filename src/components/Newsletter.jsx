import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribed with:', email)
    setEmail('')
  }

  return (
    <div className="bg-blue-600 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest products, deals, and updates.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-2 rounded-l-md focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-blue-800 text-white px-6 py-2 rounded-r-md hover:bg-blue-900"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default Newsletter