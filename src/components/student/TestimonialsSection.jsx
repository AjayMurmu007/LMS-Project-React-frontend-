import React, { useContext } from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const TestimonialsSection = () => {
  return (
    <div className="pb-16 px-8 md:px-40">
      <h2 className="text-3xl font-medium text-gray-800">Testimonials</h2>
      <p className="md:text-base text-gray-500 mt-3 ">
        Hear from our students about their experiences and how our platform has
        helped them achieve their learning goals.<br/>"This platform has transformed
        my learning experience. The courses are top-notch and the community is
        incredibly supportive. Highly recommend!"
      </p>

      {/* Display only the first 3 testimonials from dummyTestimonial */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
        {dummyTestimonial.slice(0, 3).map((testimonial, i) => (
          <div
            key={i}
            className="text-sm text-left border border-gray-500/30 pb-6 bg-white rounded-lg shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden"
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-gray-500/10">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h1 className="text-lg font-medium text-gray-800">
                  {testimonial.name}
                </h1>
                <p className="text-gray-800/80 mt-2">{testimonial.role}</p>
              </div>
            </div>
            <div className="p-5 pb-7">
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src={
                      index < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt="Star Icon"
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <p>{testimonial.feedback}</p>
            </div>
            <a href="#" className="text-blue-500 underline px-5">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
