import React from 'react'

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Find-r has completely changed how I shop online. The selection is amazing!",
      author: "Sarah Johnson",
      role: "Frequent Shopper"
    },
    {
      quote: "I found exactly what I needed at a great price. Will definitely shop here again.",
      author: "Michael Chen",
      role: "First-time Customer"
    },
    {
      quote: "The customer service is outstanding and the delivery was super fast.",
      author: "Emma Williams",
      role: "Loyal Customer"
    }
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
              <div>
                <p className="font-medium text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials