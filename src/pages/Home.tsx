import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Pill, Search, RefreshCw, Clock, ShieldCheck, MapPin, Phone, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-red-600 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-red-100 text-sm font-medium">
                <ShieldCheck className="h-4 w-4" />
                Trusted Healthcare Provider in Lagos
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                Your Trusted <br /> 
                <span className="text-red-200">Health Partner</span>
              </h1>
              <p className="text-xl text-red-50 leading-relaxed max-w-lg">
                Authentic medications, professional advice, and convenient online services. Skip the queue and manage your health from home.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/inquiry" 
                  className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-50 transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center gap-2"
                >
                  <Search className="h-5 w-5" />
                  Check Drug Availability
                </Link>
                <Link 
                  to="/refill" 
                  className="bg-red-800 text-white border border-red-400 px-8 py-4 rounded-full font-bold text-lg hover:bg-red-900 transition-all active:scale-95 flex items-center gap-2"
                >
                  <RefreshCw className="h-5 w-5" />
                  Request Refill
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&q=80&w=800" 
                  alt="Pharmacy Interior" 
                  className="rounded-2xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <ShieldCheck className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Certified Pharmacy</p>
                    <p className="text-lg font-bold text-gray-900">100% Authentic</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats/Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all group">
              <Clock className="h-10 w-10 text-red-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">Fast Service</h3>
              <p className="text-gray-600">Submit your inquiry online and get a response within minutes. No more waiting in line.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all group">
              <ShieldCheck className="h-10 w-10 text-red-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">Authentic Drugs</h3>
              <p className="text-gray-600">We source our medications directly from authorized distributors to ensure safety.</p>
            </div>
            <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:border-red-200 transition-all group">
              <RefreshCw className="h-10 w-10 text-red-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">Easy Refills</h3>
              <p className="text-gray-600">Upload your prescription and request a refill. We'll have it ready for your pickup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Facility Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 rounded-full z-0" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-50 rounded-full z-0" />
              <img 
                src="https://lh3.googleusercontent.com/d/1jnHG5rMAW6wf14OLBUPSD_eBi4nDJKc2" 
                alt="Rohi-Healthcare Center Building" 
                className="relative z-10 rounded-[2rem] shadow-2xl border-8 border-white object-cover aspect-[4/3]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                Modern Healthcare <br />
                <span className="text-red-600">At Your Service</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Welcome to Rohi-Healthcare Center. Our state-of-the-art facility is designed to provide you with the highest quality pharmaceutical care in a comfortable and professional environment.
              </p>
              <ul className="space-y-4">
                {[
                  'Fully stocked with authentic medications',
                  'Professional pharmacists always on duty',
                  'Modern diagnostic and store facilities',
                  'Safe and accessible parking for customers'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="bg-red-100 p-1 rounded-full">
                      <ShieldCheck className="h-4 w-4 text-red-600" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-2 text-red-600 font-bold hover:gap-4 transition-all"
                >
                  Learn more about us
                  <Search className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Store</h2>
            <p className="text-gray-600">Conveniently located in the heart of the city.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-red-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Address</h4>
                  <p className="text-gray-600">123 Pharmacy Road, Lagos, Nigeria</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="h-6 w-6 text-red-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Operating Hours</h4>
                  <p className="text-gray-600">Mon - Sat: 8:00 AM - 9:00 PM</p>
                  <p className="text-gray-600">Sunday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-6 w-6 text-red-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-lg">Call Us</h4>
                  <p className="text-gray-600">+234 800 123 4567</p>
                </div>
              </div>
              <div className="pt-6 flex flex-wrap gap-4">
                <a 
                  href="tel:+2348001234567" 
                  className="flex-1 bg-red-600 text-white text-center py-4 rounded-xl font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="h-5 w-5" />
                  Call Now
                </a>
                <a 
                  href="https://wa.me/2348001234567" 
                  target="_blank"
                  className="flex-1 bg-green-600 text-white text-center py-4 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Chat
                </a>
              </div>
            </div>
            
            <div className="h-[400px] rounded-3xl overflow-hidden shadow-lg border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.728551471921!2d3.3791!3d6.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjcnMDAuMCJOIDPCsDIyJzQ0LjgiRQ!5e0!3m2!1sen!2sng!4v1615890000000!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Staff Portal Link */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-sm mb-4">Are you a staff member?</p>
          <Link 
            to="/admin" 
            className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition-colors"
          >
            <ShieldCheck className="h-4 w-4" />
            Access Admin Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
}
