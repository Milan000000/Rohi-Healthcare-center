import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, Menu, X, Phone, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Drug Inquiry', href: '/inquiry' },
    { name: 'Request Refill', href: '/refill' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-red-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-red-600 p-2 rounded-lg">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">Rohi-<span className="text-red-600">Healthcare Center</span></span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-600 hover:text-red-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/inquiry"
              className="bg-red-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-red-700 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Check Availability
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-red-600 p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-red-50 py-4 px-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/inquiry"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 bg-red-600 text-white text-center rounded-lg font-semibold"
          >
            Check Availability
          </Link>
        </div>
      )}
    </nav>
  );
}
