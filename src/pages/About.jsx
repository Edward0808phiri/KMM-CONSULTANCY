import React from "react";
import aboutImage from "../assets/about.jpg";

export default function About() {
  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left: Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 leading-snug">
            It Has Over 100 Associate Consultants On Its Database
          </h2>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            K M & M BUSINESS CONSULTANTS LIMITED is a systematic organization that provides advisory and management consultant services.
            <br /><br />
            K M & M BUSINESS CONSULTANTS LIMITED is managed by <span className="font-semibold text-blue-700">Richard Kajokoto</span> and 
            <span className="font-semibold text-blue-700"> Farai Kajoko</span>, who have a combined vast experience in the private and public sector 
            as well as non-governmental organizations.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition"
            >
              Contact Us
            </a>
            <a
              href="/services"
              className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
            >
              Our Services
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <img
            src={aboutImage}
            alt="About K M & M Business Consultants"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
