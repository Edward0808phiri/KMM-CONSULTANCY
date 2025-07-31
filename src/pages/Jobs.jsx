import { useState, useEffect } from "react";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [qualificationFilter, setQualificationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
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

  // Apply filters
  const filteredJobs = jobs.filter((job) => {
    return (
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())) &&
      (qualificationFilter ? job.qualifications.toLowerCase().includes(qualificationFilter.toLowerCase()) : true) &&
      (typeFilter ? (job.type && job.type.toLowerCase() === typeFilter.toLowerCase()) : true)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Job Openings</h1>

      {/* Search & Filters */}
      <div className="bg-white shadow p-4 rounded mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by job title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => setSearch(search)}
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select
            value={qualificationFilter}
            onChange={(e) => setQualificationFilter(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Qualifications</option>
            <option value="student">Student</option>
            <option value="diploma">Diploma</option>
            <option value="degree">Degree</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Job Types</option>
            <option value="internship">Internship</option>
            <option value="full time">Full Time</option>
          </select>
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-blue-700">{job.title}</h2>
              <p className="text-gray-700 my-2">{job.description}</p>
              <p className="text-sm text-gray-500">
                <strong>Qualifications:</strong> {job.qualifications}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Type:</strong> {job.type || "Not specified"}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Location:</strong> {job.location}
              </p>

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
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  Apply
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No job postings match your search or filters.</p>
      )}
    </div>
  );
}
