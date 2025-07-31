export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h3 className="text-2xl font-bold text-green-400 mb-3">K M & M Business Consultants</h3>
          <p className="text-gray-300">
            Plot No. 25 Cedar Road, Woodlands, Lusaka, Zambia
          </p>
          <p className="mt-2 text-gray-300">
            Phone: <a href="tel:+260774453005" className="hover:text-green-400">+260 774 453 005</a>
          </p>
          <p>
            Email: <a href="mailto:kmandmbusinessconsultants1@gmail.com" className="hover:text-green-400">kmandmbusinessconsultants1@gmail.com</a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-green-400 mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-green-400">Home</a></li>
            <li><a href="/about" className="hover:text-green-400">About Us</a></li>
            <li><a href="/services" className="hover:text-green-400">Our Services</a></li>
            <li><a href="/contact" className="hover:text-green-400">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-xl font-semibold text-green-400 mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-400">Facebook</a>
            <a href="#" className="hover:text-green-400">LinkedIn</a>
            <a href="#" className="hover:text-green-400">Twitter</a>
            <a href="#" className="hover:text-green-400">Instagram</a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center border-t border-gray-700 pt-4 text-gray-400">
        <p>&copy; {new Date().getFullYear()} K M & M Business Consultants. All Rights Reserved.</p>
        <p className="mt-2">
          Designed by <a href="#" className="hover:text-green-400">Ukwenda Solutions</a>
        </p>
      </div>
    </footer>
  );
}
