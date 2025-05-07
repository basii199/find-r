import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
    {
      name: 'Sarah Williams',
      role: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    },
    {
      name: 'Michael Chen',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden opacity-75">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            About Find-r
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            We're revolutionizing the way people discover and shop for products online.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Story
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Founded in 2023, Find-r began as a small project to help people discover products more easily. 
              What started as a simple idea has grown into a comprehensive platform serving thousands of 
              customers worldwide.
            </p>
            <p className="mt-5 text-lg text-gray-500">
              We believe in making online shopping effortless, enjoyable, and accessible to everyone. 
              Our team works tirelessly to curate the best products and provide an exceptional shopping 
              experience.
            </p>
          </div>
          <div className="mt-12 lg:mt-0">
            <img
              className="rounded-lg shadow-xl"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="Our team working"
            />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              These principles guide everything we do at Find-r
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Customer First',
                description:
                  'We prioritize our customers in every decision we make, ensuring their needs are always met.',
              },
              {
                name: 'Quality Matters',
                description:
                  'We carefully select products that meet our high standards for quality and value.',
              },
              {
                name: 'Transparency',
                description:
                  'We believe in honest pricing, clear product information, and straightforward policies.',
              },
              {
                name: 'Innovation',
                description:
                  'We continuously improve our platform to provide the best shopping experience.',
              },
              {
                name: 'Community',
                description:
                  'We support and engage with the communities we serve through various initiatives.',
              },
              {
                name: 'Sustainability',
                description:
                  "We're committed to environmentally responsible practices in our operations.",
              },
            ].map((value) => (
              <div key={value.name} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium text-gray-900">{value.name}</h3>
                <p className="mt-2 text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Meet Our Team
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            The passionate people behind Find-r
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((person) => (
            <div key={person.name} className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover"
                src={person.image}
                alt={person.name}
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">{person.name}</h3>
              <p className="mt-1 text-gray-500">{person.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to start shopping?
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-blue-100">
              Join thousands of satisfied customers who've discovered amazing products with Find-r.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About