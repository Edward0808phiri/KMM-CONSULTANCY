import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary text-white p-4 shadow">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">KM‑M Consultants</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-secondary transition">Home</Link>
          <Link to="/about" className="hover:text-secondary transition">About</Link>
          <Link to="/services" className="hover:text-secondary transition">Services</Link>
          <Link to="/jobs" className="hover:text-secondary transition">Jobs</Link>
          <Link to="/admin" className="hover:text-secondary transition">Admin</Link>
        </div>
      </div>
    </nav>
  );
}
