// Jobs.jsx
import { useState, useEffect } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [application, setApplication] = useState({ name: "", email: "", phone: "", jobTitle: "", cv: null });

  useEffect(() => {
    setJobs(JSON.parse(localStorage.getItem("jobs")) || []);
  }, []);

  const handleChange = (e) => setApplication({ ...application, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setApplication({ ...application, cv: e.target.files[0] });

  const handleSubmit = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      const newApp = { ...application, cv: { name: application.cv.name, content: reader.result } };
      const storedApps = JSON.parse(localStorage.getItem("applications")) || [];
      localStorage.setItem("applications", JSON.stringify([...storedApps, newApp]));
      alert("Application submitted!");
      setApplication({ name: "", email: "", phone: "", jobTitle: "", cv: null });
    };
    if (application.cv) reader.readAsDataURL(application.cv);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Job Openings</h1>

      {jobs.length > 0 ? (
        <div className="space-y-6">
          {jobs.map((job, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-700">{job.description}</p>
              <p className="text-sm text-gray-500">Qualifications: {job.qualifications}</p>
              <p className="text-sm text-gray-500">Location: {job.location}</p>

              {/* Application Form for this Job */}
              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <input type="hidden" name="jobTitle" value={job.title} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={application.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={application.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={application.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Apply</button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No job postings available at the moment.</p>
      )}
    </div>
  );
}
