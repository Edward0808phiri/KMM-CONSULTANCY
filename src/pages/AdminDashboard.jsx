import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("applications"); // default tab
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobForm, setJobForm] = useState({ title: "", description: "", qualifications: "", location: "" });

  useEffect(() => {
    setJobs(JSON.parse(localStorage.getItem("jobs")) || []);
    setApplications(JSON.parse(localStorage.getItem("applications")) || []);
  }, []);

  const handleJobChange = (e) => setJobForm({ ...jobForm, [e.target.name]: e.target.value });

  const postJob = (e) => {
    e.preventDefault();
    const updatedJobs = [...jobs, jobForm];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobForm({ title: "", description: "", qualifications: "", location: "" });
    alert("Job posted successfully!");
  };

  const deleteJob = (index) => {
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    // Also remove any applications linked to this job
    const jobTitleToDelete = jobs[index].title;
    const filteredApps = applications.filter(app => app.jobTitle !== jobTitleToDelete);
    setApplications(filteredApps);
    localStorage.setItem("applications", JSON.stringify(filteredApps));
  };

  const deleteApplication = (index) => {
    const updatedApps = applications.filter((_, i) => i !== index);
    setApplications(updatedApps);
    localStorage.setItem("applications", JSON.stringify(updatedApps));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Admin Dashboard</h1>

      {/* Dashboard Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 rounded ${activeTab === "applications" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          View Applications
        </button>
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 rounded ${activeTab === "jobs" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Job Postings
        </button>
        <button
          onClick={() => setActiveTab("post")}
          className={`px-4 py-2 rounded ${activeTab === "post" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Post a Job
        </button>
      </div>

      {/* Applications Section */}
      {activeTab === "applications" && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Job Applications</h2>
          {applications.length > 0 ? (
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Job</th>
                  <th className="p-2 border">CV</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-2 border">{app.name}</td>
                    <td className="p-2 border">{app.email}</td>
                    <td className="p-2 border">{app.phone}</td>
                    <td className="p-2 border">{app.jobTitle}</td>
                    <td className="p-2 border">
                      {app.cv ? (
                        <a href={app.cv.content} download={app.cv.name} className="text-blue-600 underline">
                          Download CV
                        </a>
                      ) : (
                        "No CV"
                      )}
                    </td>
                    <td className="p-2 border">
                      <button
                        onClick={() => deleteApplication(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No applications yet.</p>
          )}
        </div>
      )}

      {/* Job Management Section */}
      {activeTab === "jobs" && (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Manage Jobs</h2>
          {jobs.length > 0 ? (
            <ul>
              {jobs.map((job, index) => (
                <li key={index} className="flex justify-between p-3 border-b items-center">
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-gray-600">{job.location}</p>
                  </div>
                  <button
                    onClick={() => deleteJob(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No jobs posted yet.</p>
          )}
        </div>
      )}

      {/* Job Posting Form */}
      {activeTab === "post" && (
        <div className="bg-white shadow rounded-lg p-6 max-w-md">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Post a New Job</h2>
          <form onSubmit={postJob} className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Job Title"
              value={jobForm.title}
              onChange={handleJobChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <textarea
              name="description"
              placeholder="Job Description"
              value={jobForm.description}
              onChange={handleJobChange}
              className="w-full px-4 py-2 border rounded"
              rows="4"
              required
            />
            <input
              type="text"
              name="qualifications"
              placeholder="Qualifications"
              value={jobForm.qualifications}
              onChange={handleJobChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={jobForm.location}
              onChange={handleJobChange}
              className="w-full px-4 py-2 border rounded"
              required
            />
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Post Job</button>
          </form>
        </div>
      )}
    </div>
  );
}
