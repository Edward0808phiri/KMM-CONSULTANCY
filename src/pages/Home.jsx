import React from "react";

// Import images
import bannerBg from "../assets/homeee.jpg"; // Your background image
import aboutImg from "../assets/about.jpg";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.1.jpg";
import img3 from "../assets/3.1.jpg";
import img4 from "../assets/4.jpg";
import callIcon from "../assets/call.png";
import mailIcon from "../assets/mail.png";
import locationIcon from "../assets/location.png";

export default function Home() {
  return (
    <div>
      {/* Hero Section with background image */}
      <section
        className="relative bg-cover bg-center min-h-screen flex flex-col justify-center items-center text-center px-6 text-white"
        style={{ backgroundImage: `url(${bannerBg})` }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-snug">
            K M & M Business Consultants Limited
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            A registered consulting company providing tailored business
            solutions that stand the test of time.
          </p>
          <a
            href="#contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded transition"
          >
            Find Out More About Us
          </a>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
            Over 100 Associate Consultants on Our Database
          </h2>
          <p className="text-gray-700 mb-6">
            KM&M Business Consultants Limited is a systematic organization
            providing advisory and management consulting services. Managed by
            Richard Kajokoto and Farai Kajoko, we bring vast experience from the
            private sector, public institutions, and NGOs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-blue-700 text-white px-6 py-3 rounded-md text-center hover:bg-blue-800 transition"
            >
              Contact Us
            </a>
            <a
              href="#services"
              className="bg-green-600 text-white px-6 py-3 rounded-md text-center hover:bg-green-700 transition"
            >
              Our Services
            </a>
          </div>
        </div>
        <div>
          <img
            src={aboutImg}
            alt="About Us"
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-4">
            Our Services
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-12">
            We provide a wide range of professional services to help
            organizations achieve their goals and maximize performance.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                img: img1,
                title: "Human Resources Management",
                desc: "Job Evaluations, Recruitment, Payroll, Training, HR Policies",
              },
              {
                img: img2,
                title: "Financial Risk Management",
                desc: "Tax Services, Construction & Procurement Audits, Fraud Detection",
              },
              {
                img: img3,
                title: "Business Performance Services",
                desc: "Process Reviews, Corporate Governance, ERP, Investment Advisory",
              },
              {
                img: img4,
                title: "Development Consultancy",
                desc: "Social Development, Public Sector Reform, Feasibility Studies",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="rounded-md mb-4 w-full h-40 object-cover"
                />
                <h3 className="text-lg font-semibold text-green-600 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 px-6 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 text-center mb-6">
          Contact Us
        </h2>
        <p className="text-center text-gray-700 mb-10">
          We'd be glad to hear from you. Reach out using the form below or
          contact us directly.
        </p>
        <form
          action="https://formspree.io/f/manbenlz"
          method="POST"
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Message:
            </label>
            <textarea
              name="message"
              rows="5"
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 w-full sm:w-auto rounded-md hover:bg-green-700 transition"
          >
            Send
          </button>
        </form>
      </section>
    </div>
  );
}
