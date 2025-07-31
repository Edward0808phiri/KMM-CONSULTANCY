import React from "react";

export default function Contact() {
  return (
    <section className="bg-gray-50 min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
          Contact Us
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          We'd love to hear from you! Reach out to us using the details below or send us a message directly.
        </p>
      </div>

      {/* Contact Info Boxes */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-blue-700">
          <h3 className="text-xl font-semibold text-blue-700">Address</h3>
          <p className="mt-2 text-gray-700">
            Plot No. 25 Cedar Road, Woodlands, Lusaka, Zambia
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-green-600">
          <h3 className="text-xl font-semibold text-green-600">Phone</h3>
          <p className="mt-2 text-gray-700">+260 774 453 005</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-blue-700">
          <h3 className="text-xl font-semibold text-blue-700">Email</h3>
          <p className="mt-2 text-gray-700">
            <a
              href="mailto:kmandmbusinessconsultants1@gmail.com"
              className="text-blue-600 hover:underline"
            >
              kmandmbusinessconsultants1@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-16 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h3 className="text-2xl font-semibold text-blue-700 mb-6">
          Send Us a Message
        </h3>
        <form
          action="https://formspree.io/f/manbenlz"
          method="POST"
          className="space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Message
            </label>
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Type your message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* WhatsApp Link */}
      <div className="mt-8 text-center">
        <p className="text-gray-700 mb-2">Or chat with us directly on WhatsApp:</p>
        <a
          href="https://wa.me/+260970106075?text=Hello%2C%20I%27m%20interested%20in%20your%20services"
          target="_blank"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          📱 Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
