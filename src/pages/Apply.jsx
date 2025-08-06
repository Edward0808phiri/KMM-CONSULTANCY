import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJob(jobs[id]);
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type.includes("msword") || file.type.includes("officedocument"))) {
      const reader = new FileReader();
      reader.onloadend = () => setCvFile({ name: file.name, content: reader.result });
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a valid PDF or DOC file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cvFile) {
      alert("Please upload your CV.");
      return;
    }
    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push({ ...formData, jobTitle: job.title, cv: cvFile });
    localStorage.setItem("applications", JSON.stringify(applications));
    alert("Application submitted!");
    navigate("/jobs");
  };

  if (!job) return <p className="p-6">Job not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Apply for {job.title}</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-4 max-w-lg">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full"
          required
        />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Submit Application
        </button>
      </form>
    </div>
  );
}
