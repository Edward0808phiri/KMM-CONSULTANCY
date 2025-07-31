import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10 rounded-md" />
            <span className="ml-3 text-xl font-bold text-blue-700">
              K M & M
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-700">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-700">
              About
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-700">
              Services
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-700">
              Jobs
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-700">
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-700"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-gray-700 hover:text-blue-700"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            to="/services"
            className="block text-gray-700 hover:text-blue-700"
            onClick={() => setIsOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/jobs"
            className="block text-gray-700 hover:text-blue-700"
            onClick={() => setIsOpen(false)}
          >
            Jobs
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-blue-700"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <li><a href="/admin" className="hover:text-green-400">Admin</a></li>
        </div>
      )}
    </nav>
  );
}
