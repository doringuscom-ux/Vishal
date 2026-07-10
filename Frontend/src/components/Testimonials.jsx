import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ramesh Sharma",
    role: "Plant Manager, ABC Cement",
    content: "Vishal Industries' conveyor rollers are incredibly durable. We've been using them in our cement plant for over a year with zero maintenance issues. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Suresh Patel",
    role: "Operations Head, XYZ Mining",
    content: "The quality of their PU Belt Scrapers and Impact Rollers is unmatched. Fast delivery and excellent customer support make them our go-to supplier.",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Procurement Officer, LMN Logistics",
    content: "We replaced our old warehouse rollers with their Plastic Conveyor Rollers. They are lightweight, reduce noise, and perform exceptionally well.",
    rating: 5,
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#f8f9fa] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h4 className="text-[#1a56db] font-bold tracking-wide mb-4 text-[14px] uppercase">
            Client Reviews
          </h4>
          <h2 className="text-[36px] md:text-[48px] font-semibold text-gray-900 tracking-tight mb-3 leading-tight">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 text-[16px] xl:text-[18px] max-w-2xl leading-relaxed font-medium">
            Don't just take our word for it. Hear from the businesses that trust our material handling solutions every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(26,86,219,0.08)] transition-all duration-300 relative group"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#1a56db] opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-300" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
                ))}
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-8 relative z-10 font-medium">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#1a56db]/10 rounded-full flex items-center justify-center text-[#1a56db] font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
