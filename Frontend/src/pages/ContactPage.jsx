import { useState } from 'react';
import { Mail, MapPin, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { CONTACT_API } from '../utils/api';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await axios.post(CONTACT_API, formData);
      setSuccess("Thank you! Your message has been sent successfully.");
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-[calc(100vh-90px)] pt-24 sm:pt-28 md:pt-40 lg:pt-44 pb-12 flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

      {/* Hanging Chain Text Effect (Pinned to very top) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 md:gap-4 lg:gap-6 z-20 pointer-events-none w-full max-w-[100vw] justify-center overflow-visible px-2">
        {['C','O','N','T','A','C','T',' ','U','S'].map((char, index) => {
          if (char === ' ') return <div key={index} className="w-2 sm:w-4 md:w-6 lg:w-8 shrink-0"></div>;
          
          return (
            <div key={index} className="flex flex-col items-center origin-top animate-swing shrink-0" style={{ animationDelay: `${index * 0.15}s`, animationDuration: '3s' }}>
              {/* The Chain/String */}
              <div className="w-[1px] md:w-[2px] h-8 sm:h-10 md:h-16 lg:h-20 bg-gradient-to-b from-gray-400 to-gray-600 shadow-sm relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-gray-500 border md:border-2 border-white shadow-sm"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 md:w-2 md:h-2 rounded-full bg-gray-700"></div>
              </div>
              {/* The Letter Block */}
              <div className="-mt-0.5 md:-mt-1 w-6 h-8 sm:w-8 sm:h-10 md:w-12 md:h-14 lg:w-14 lg:h-16 bg-[#1a56db] rounded-b-md md:rounded-b-lg rounded-t-sm shadow-lg md:shadow-xl flex items-center justify-center border-b-2 md:border-b-4 border-blue-900 border-x border-x-blue-400 text-white font-black text-sm sm:text-base md:text-2xl lg:text-3xl relative overflow-hidden">
                {/* Metallic shine */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                <span className="relative drop-shadow-md">{char}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Wrapper */}
      <div className="relative w-full flex flex-col items-center">
        {/* Contact Card */}
        <div className="w-full max-w-[1100px] mx-auto px-4 md:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          
          {/* Left Side: Contact Info (Dark) */}
          <div className="w-full lg:w-2/5 bg-[#0c2444] p-6 sm:p-8 md:p-12 text-white relative overflow-hidden flex flex-col justify-between">
            {/* Inner background elements */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-blue-500 opacity-20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 bg-blue-700 opacity-30 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">Get in Touch</h2>
              <p className="text-blue-100 font-medium mb-8 md:mb-10 text-[13px] md:text-sm leading-relaxed">
                We'd love to hear from you. Our friendly team is always here to chat.
              </p>

              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start gap-3 md:gap-4 group">
                  <div className="w-9 h-9 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#1a56db] transition-colors">
                    <Phone className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-0.5 md:mb-1">Phone</h4>
                    <a href="tel:+919888314231" className="text-blue-100 hover:text-white transition-colors block text-[13px] md:text-sm">+91 98883 14231</a>
                    <a href="tel:9417855365" className="text-blue-100 hover:text-white transition-colors block text-[13px] md:text-sm">+91 94178 55365</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 group">
                  <div className="w-9 h-9 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#1a56db] transition-colors">
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-base md:text-lg mb-0.5 md:mb-1">Email</h4>
                    <a href="mailto:vishalindustries25@yahoo.in" className="text-blue-100 hover:text-white transition-colors block text-[12px] sm:text-[13px] md:text-sm whitespace-nowrap overflow-hidden text-ellipsis">vishalindustries25@yahoo.in</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:gap-4 group">
                  <div className="w-9 h-9 md:w-12 md:h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-[#1a56db] transition-colors">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-0.5 md:mb-1">Office</h4>
                    <p className="text-blue-100 text-[13px] md:text-sm leading-relaxed">
                      Plot No. 45, Indl. Area Phase-1,<br />
                      Panchkula
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form (Light) */}
          <div className="w-full lg:w-3/5 p-10 md:p-12">
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Send us a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  {success}
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">First Name</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/20 transition-all outline-none text-sm" placeholder="John" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Last Name</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/20 transition-all outline-none text-sm" placeholder="Doe" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/20 transition-all outline-none text-sm" placeholder="john@example.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Phone</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/20 transition-all outline-none text-sm" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Message</label>
                <textarea rows="4" name="message" value={formData.message} onChange={handleChange} required className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#1a56db] focus:ring-2 focus:ring-[#1a56db]/20 transition-all outline-none resize-none text-sm" placeholder="Tell us how we can help you..."></textarea>
              </div>

              <div className="pt-2">
                <button type="submit" disabled={loading} className="w-full py-4 bg-[#1a56db] hover:bg-blue-800 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group text-sm disabled:opacity-70 disabled:cursor-not-allowed">
                  <span>{loading ? 'Sending...' : 'Send Message'}</span>
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}
