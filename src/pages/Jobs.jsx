import { useState, useEffect } from "react";
import { db } from "../firebase"; // Import your Firebase config
import { collection, getDocs, addDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [qualificationFilter, setQualificationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [application, setApplication] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    jobTitle: "", 
    cv: null,
    appliedDate: new Date().toISOString(),
    status: "New",
    viewed: false
  });
  const [loading, setLoading] = useState(true);

  // Fetch jobs from Firebase
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData = [];
        querySnapshot.forEach((doc) => {
          jobsData.push({ id: doc.id, ...doc.data() });
        });
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleChange = (e) => setApplication({ ...application, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setApplication({ ...application, cv: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!application.cv) {
      alert("Please upload your CV");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newApp = { 
          ...application, 
          cv: { 
            name: application.cv.name, 
            content: reader.result 
          } 
        };
        
        // Save to Firebase
        await addDoc(collection(db, "applications"), newApp);
        
        alert("Application submitted successfully!");
        setApplication({ 
          name: "", 
          email: "", 
          phone: "", 
          jobTitle: "", 
          cv: null,
          appliedDate: new Date().toISOString(),
          status: "New",
          viewed: false
        });
      };
      reader.readAsDataURL(application.cv);
    } catch (error) {
      console.error("Error submitting application: ", error);
      alert("Error submitting application");
    }
  };

  // Apply filters
  const filteredJobs = jobs.filter((job) => {
    return (
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.location.toLowerCase().includes(search.toLowerCase())) &&
      (qualificationFilter ? 
        job.qualifications.toLowerCase().includes(qualificationFilter.toLowerCase()) : true) &&
      (typeFilter ? 
        (job.type && job.type.toLowerCase() === typeFilter.toLowerCase()) : true) &&
      job.status === "Active" // Only show active jobs
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />
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
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
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
            <option value="experience">Experience</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Job Types</option>
            <option value="internship">Internship</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="remote">Remote</option>
          </select>
        </div>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-blue-700">{job.title}</h2>
                  <div className="flex items-center mt-1 space-x-4">
                    <span className="text-sm text-gray-600">📍 {job.location}</span>
                    {job.salary && (
                      <span className="text-sm text-gray-600">💰 {job.salary}</span>
                    )}
                    <span className="text-sm text-gray-600">🕒 {job.type}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  job.status === "Active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-gray-100 text-gray-800"
                }`}>
                  {job.status}
                </span>
              </div>
              
              <p className="text-gray-700 my-3">{job.description}</p>
              
              <div className="my-4">
                <h3 className="font-medium text-gray-800">Qualifications:</h3>
                <p className="text-sm text-gray-600">{job.qualifications}</p>
              </div>

              <div className="text-xs text-gray-500 mt-4">
                Posted: {new Date(job.postedDate).toLocaleDateString()} | 
                Views: {job.views || 0}
              </div>

              {/* Application Form for this Job */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <input type="hidden" name="jobTitle" value={job.title} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={application.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={application.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+260 123 456 789"
                    value={application.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload CV (PDF/DOC)*
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition mt-4"
                >
                  Apply for this Position
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h3 className="text-xl font-medium text-gray-700 mb-2">No jobs found</h3>
          <p className="text-gray-500">
            {search || qualificationFilter || typeFilter 
              ? "Try adjusting your search or filters" 
              : "There are currently no active job openings"}
          </p>
        </div>
      )}
    </div>
  );
}