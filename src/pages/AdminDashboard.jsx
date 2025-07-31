import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("applications"); // default tab
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    qualifications: "",
    location: "",
  });

  useEffect(() => {
    setJobs(JSON.parse(localStorage.getItem("jobs")) || []);
    setApplications(JSON.parse(localStorage.getItem("applications")) || []);
  }, []);

  const handleJobChange = (e) =>
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });

  const postJob = (e) => {
    e.preventDefault();
    const updatedJobs = [...jobs, jobForm];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobForm({ title: "", description: "", qualifications: "", location: "" });
    alert("Job posted successfully!");
  };

  const deleteJob = (index) => {
    if (
      !window.confirm(
        `Are you sure you want to delete the job: "${jobs[index].title}"?`
      )
    )
      return;

    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 border-b border-blue-300 pb-3">
          Admin Dashboard
        </h1>

        {/* Navigation Tabs */}
        <nav className="flex space-x-4 mb-8">
          {["applications", "jobs", "post"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-blue-700 text-white shadow-lg"
                  : "bg-white text-blue-700 border border-blue-700 hover:bg-blue-100"
              }`}
            >
              {tab === "applications"
                ? "View Applications"
                : tab === "jobs"
                ? "Manage Jobs"
                : "Post a Job"}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <section>
          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-6">
                Job Applications
              </h2>
              {applications.length === 0 ? (
                <p className="text-gray-500">No applications yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-300 rounded-md">
                    <thead className="bg-blue-50">
                      <tr>
                        <th className="p-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                          Name
                        </th>
                        <th className="p-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                          Email
                        </th>
                        <th className="p-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                          Phone
                        </th>
                        <th className="p-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                          Applied For
                        </th>
                        <th className="p-3 border-b border-gray-300 text-left text-sm font-medium text-gray-700">
                          CV
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                        >
                          <td className="p-3 border-b border-gray-300">{app.name}</td>
                          <td className="p-3 border-b border-gray-300">{app.email}</td>
                          <td className="p-3 border-b border-gray-300">{app.phone}</td>
                          <td className="p-3 border-b border-gray-300 font-semibold text-blue-700">
                            {app.jobTitle}
                          </td>
                          <td className="p-3 border-b border-gray-300">
                            {app.cv ? (
                              <a
                                href={app.cv.content}
                                download={app.cv.name}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Download CV
                              </a>
                            ) : (
                              <span className="text-gray-400 italic">No CV</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Manage Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-green-700 mb-6">
                Manage Jobs
              </h2>
              {jobs.length === 0 ? (
                <p className="text-gray-500">No jobs posted yet.</p>
              ) : (
                <ul>
                  {jobs.map((job, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b border-gray-300 py-3"
                    >
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 italic">{job.location}</p>
                      </div>
                      <button
                        onClick={() => deleteJob(index)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                        title={`Delete job: ${job.title}`}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Post a Job Tab */}
          {activeTab === "post" && (
            <div className="bg-white shadow-md rounded-lg p-6 max-w-xl">
              <h2 className="text-2xl font-semibold text-green-700 mb-6">
                Post a New Job
              </h2>
              <form onSubmit={postJob} className="space-y-5">
                <input
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={jobForm.title}
                  onChange={handleJobChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Job Description"
                  value={jobForm.description}
                  onChange={handleJobChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="qualifications"
                  placeholder="Qualifications Needed"
                  value={jobForm.qualifications}
                  onChange={handleJobChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Job Location"
                  value={jobForm.location}
                  onChange={handleJobChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition"
                >
                  Post Job
                </button>
              </form>
            </div>
          )}
        </section>
      </main>

    </div>
  );
}
