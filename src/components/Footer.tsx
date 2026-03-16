import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-red-600 p-1.5 rounded-lg">
                <Pill className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Rohi-Healthcare Center</span>
            </Link>
            <p className="text-sm leading-relaxed">
              Providing quality healthcare and authentic medications to our community. Your health is our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-500 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-red-500 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-red-500 transition-colors">Our Services</Link></li>
              <li><Link to="/inquiry" className="hover:text-red-500 transition-colors">Drug Inquiry</Link></li>
              <li><Link to="/refill" className="hover:text-red-500 transition-colors">Refill Request</Link></li>
              <li><Link to="/privacy" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/admin" className="hover:text-red-500 transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-red-500 shrink-0" />
                <span>123 Pharmacy Road, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-red-500 shrink-0" />
                <span>+234 800 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-red-500 shrink-0" />
                <span>info@rohihealthcare.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-white font-semibold mb-6">Opening Hours</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-red-500 shrink-0" />
                <div>
                  <p className="font-medium text-white">Mon - Sat</p>
                  <p>8:00 AM - 9:00 PM</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-red-500 shrink-0" />
                <div>
                  <p className="font-medium text-white">Sunday</p>
                  <p>10:00 AM - 4:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Rohi-Healthcare Center. All rights reserved. Built for quality healthcare.</p>
        </div>
      </div>
    </footer>
  );
}
