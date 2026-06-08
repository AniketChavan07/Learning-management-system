import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const Testimonals = () => {
  return (
    <div className="py-20 px-6 bg-gray-50 text-center">
      {/* Heading */}
      <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
        Testimonials
      </h3>

      <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
        Hear from our learners as they share their experiences with our
        courses and how our platform has made a difference in their learning
        journey.
      </p>

      {/* Testimonial Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
          >
            {/* User Image */}
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mx-auto object-cover"
            />

            {/* Name */}
            <h4 className="mt-4 text-xl font-semibold text-gray-900">
              {testimonial.name}
            </h4>

            {/* Role */}
            <p className="mt-1 text-gray-500 text-sm">
              {testimonial.role}
            </p>

            {/* Rating */}
            <div className="flex justify-center gap-1 mt-3">
              {[...Array(5)].map((_, starIndex) => (
                <img
                  key={starIndex}
                  src={
                    starIndex < Math.floor(testimonial.rating)
                      ? assets.star
                      : assets.star_blank
                  }
                  alt={`Rating ${starIndex + 1}`}
                  className="w-4 h-4"
                />
              ))}
            </div>

            {/* Feedback */}
            <p className="mt-4 text-gray-600 text-sm leading-relaxed">
              {testimonial.feedback}
            </p>
            <a href={testimonial.link} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500 hover:text-blue-700 text-sm font-medium">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonals