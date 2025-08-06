import React from "react";
import aboutImage from "../assets/about.jpg";
import Navbar from "../components/Navbar";
export default function About() {
  return (

    <section className="bg-gray-50 min-h-screen py-16 px-6">

      <div>
        <Navbar />
        <h2 className="text-4xl font-bold text-blue-700 mb-6 text-center">
            Our Commitment
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          K M & M BUSINESS CONSULTANTS LIMITED assembles highly skilled client focused teams, 
          who are both dedicated to working with you and are selected to match your requirements in every engagement we undertake. 
          We understand that you expect value for the money you pay. Our commitment is that we will provide the value you pay for. 
          Draw on resources K M & M BUSINESS CONSULTANTS LIMITED has established a database of renowned consultants in different fields. 
          This give us a competitive edge in terms of meeting even the most challenging of assignments.
          We the resources expertise both locally and internationally to execute assignments.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left: Text Content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 leading-snug">
            It Has Over 100 Associate Consultants On Its Database
          </h2>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            Our network of consultants enables us to ensure that our clients have access to blend of professionals who are well 
            versed with local conditions, and have access to skillful resources, no matter where they may be located. K M & M 
            BUSINESS CONSULTANTS LIMITED objectives are to provide consistent, high quality services to regional and local 
            clients as well as multi-national clients.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/contact"
              className="px-6 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800 transition"
            >
              Get In Touch
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
