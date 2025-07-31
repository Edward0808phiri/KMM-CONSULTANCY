import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-green-500 to-blue-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">KM-M Consultants</div>
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="text-white hover:text-green-300 transition">Home</Link>
          <Link to="/about" className="text-white hover:text-green-300 transition">About</Link>
          <Link to="/services" className="text-white hover:text-green-300 transition">Services</Link>
          <Link to="/jobs" className="text-white hover:text-green-300 transition">Jobs</Link>
          <Link to="/admin" className="text-white hover:text-green-300 transition">Admin</Link>
        </div>
        {/* Mobile menu toggle here if needed */}
      </div>
    </nav>
  );
}