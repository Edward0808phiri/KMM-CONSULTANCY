import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard"); // Added dashboard tab
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    qualifications: "",
    location: "",
    type: "Full-time",
    salary: ""
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [accountData, setAccountData] = useState({
    name: "Admin User",
    email: "admin@jobportal.com",
    lastLogin: new Date().toISOString(),
    plan: "Premium"
  });

  // Mock analytics data
  const [analytics, setAnalytics] = useState({
    totalViews: 1243,
    applicationsThisMonth: 28,
    popularJob: "Senior Developer"
  });

  useEffect(() => {
    // Simulate loading data
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedApps = JSON.parse(localStorage.getItem("applications")) || [];
    
    setJobs(storedJobs);
    setApplications(storedApps);
  }, []);

  const handleJobChange = (e) =>
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });

  const postJob = (e) => {
    e.preventDefault();
    const newJob = {
      ...jobForm,
      id: Date.now(),
      postedDate: new Date().toISOString(),
      status: "Active",
      views: 0
    };
    const updatedJobs = [...jobs, newJob];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobForm({
      title: "",
      description: "",
      qualifications: "",
      location: "",
      type: "Full-time",
      salary: ""
    });
  };

  const deleteJob = (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const toggleJobStatus = (id) => {
    const updatedJobs = jobs.map(job => 
      job.id === id ? {
        ...job,
        status: job.status === "Active" ? "Closed" : "Active"
      } : job
    );
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const markAsViewed = (appId) => {
    const updatedApps = applications.map(app => 
      app.id === appId ? {...app, viewed: true, status: "Reviewed"} : app
    );
    setApplications(updatedApps);
    localStorage.setItem("applications", JSON.stringify(updatedApps));
  };

  // Calculate stats
  const stats = {
    totalJobs: jobs.length,
    totalApplications: applications.length,
    newApplications: applications.filter(app => !app.viewed).length,
    activeJobs: jobs.filter(job => job.status === "Active").length
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`bg-blue-900 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex-shrink-0`}>
        <div className="p-4 flex items-center justify-between border-b border-blue-800">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold">JobPortal Pro</h1>
          ) : (
            <h1 className="text-xl font-bold">JP</h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-blue-200 hover:text-white"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        <nav className="mt-6">
          {[
            { id: "dashboard", label: "Dashboard", symbol: "📊" },
            { id: "applications", label: "Applications", symbol: "📄" },
            { id: "jobs", label: "Job Listings", symbol: "💼" },
            { id: "post", label: "Post Job", symbol: "➕" },
            { id: "analytics", label: "Analytics", symbol: "📈" },
            { id: "account", label: "Account", symbol: "👤" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center w-full p-4 text-left transition-colors ${
                activeTab === tab.id
                  ? "bg-blue-800 text-white"
                  : "text-blue-200 hover:bg-blue-850 hover:text-white"
              }`}
            >
              <span className="text-lg mr-3">{tab.symbol}</span>
              {sidebarOpen && <span>{tab.label}</span>}
              {tab.id === "applications" && stats.newApplications > 0 && sidebarOpen && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {stats.newApplications}
                </span>
              )}
            </button>
          ))}
        </nav>
        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-blue-850 border-t border-blue-800">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">
                {accountData.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{accountData.name}</p>
                <p className="text-xs text-blue-300">{accountData.plan} Plan</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {activeTab}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <div className="relative">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {accountData.name.charAt(0)}
                </div>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium">{accountData.name}</p>
                      <p className="text-xs text-gray-500">{accountData.email}</p>
                    </div>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-t border-gray-200"
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-blue-500">
                  <p className="text-gray-500 text-sm">Total Jobs</p>
                  <h3 className="text-2xl font-bold mt-2">{stats.totalJobs}</h3>
                  <p className="text-sm text-gray-500 mt-1">{stats.activeJobs} active</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-green-500">
                  <p className="text-gray-500 text-sm">Total Applications</p>
                  <h3 className="text-2xl font-bold mt-2">{stats.totalApplications}</h3>
                  <p className="text-sm text-gray-500 mt-1">{stats.newApplications} new</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-purple-500">
                  <p className="text-gray-500 text-sm">Job Views</p>
                  <h3 className="text-2xl font-bold mt-2">{analytics.totalViews}</h3>
                  <p className="text-sm text-gray-500 mt-1">+12% this month</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border-t-4 border-yellow-500">
                  <p className="text-gray-500 text-sm">Popular Job</p>
                  <h3 className="text-2xl font-bold mt-2 truncate">{analytics.popularJob}</h3>
                  <p className="text-sm text-gray-500 mt-1">Most applications</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Recent Applications</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications.slice(0, 5).map((app) => (
                        <tr key={app.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                                {app.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{app.name}</div>
                                <div className="text-sm text-gray-500">{app.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600">{app.jobTitle}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(app.appliedDate || new Date()).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              app.viewed 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {app.viewed ? "Reviewed" : "New"}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {applications.length === 0 && (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                            No recent applications
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Job Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Active Jobs</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {jobs.filter(job => job.status === "Active").slice(0, 3).map(job => (
                      <div key={job.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{job.title}</h4>
                          <span className="text-sm text-gray-500">{job.location}</span>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          {applications.filter(app => app.jobTitle === job.title).length} applications
                        </div>
                      </div>
                    ))}
                    {jobs.filter(job => job.status === "Active").length === 0 && (
                      <div className="p-4 text-center text-gray-500">
                        No active jobs
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <button 
                      onClick={() => setActiveTab("post")}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
                    >
                      Post New Job
                    </button>
                    <button className="w-full bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-2 px-4 rounded-md transition">
                      View Analytics
                    </button>
                    <button className="w-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md transition">
                      Invite Team Member
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Job Applications</h2>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>All Jobs</option>
                    {jobs.map(job => (
                      <option key={job.id}>{job.title}</option>
                    ))}
                  </select>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>All Status</option>
                    <option>New</option>
                    <option>Reviewed</option>
                  </select>
                </div>
              </div>
              
              {applications.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-6xl mb-4">📄</p>
                  <h3 className="text-lg font-medium text-gray-900">No applications yet</h3>
                  <p className="mt-1 text-gray-500">Applications will appear here when candidates apply to your jobs.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {applications.map((app) => (
                        <tr key={app.id} className={app.viewed ? "" : "bg-blue-50"}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                                {app.name.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{app.name}</div>
                                <div className="text-sm text-gray-500">{app.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600">{app.jobTitle}</div>
                            <div className="text-sm text-gray-500">{app.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(app.appliedDate || new Date()).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              app.viewed 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {app.viewed ? "Reviewed" : "New"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => markAsViewed(app.id)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Mark as reviewed"
                              >
                                ✓
                              </button>
                              <a
                                href={app.cv?.content}
                                download={app.cv?.name}
                                className="text-gray-600 hover:text-gray-900"
                                title="Download CV"
                              >
                                ↓
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Job Listings</h2>
                <div className="flex space-x-2">
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Closed</option>
                  </select>
                  <button 
                    onClick={() => setActiveTab("post")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm"
                  >
                    + New Job
                  </button>
                </div>
              </div>
              
              {jobs.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-6xl mb-4">💼</p>
                  <h3 className="text-lg font-medium text-gray-900">No jobs posted yet</h3>
                  <p className="mt-1 text-gray-500">Get started by posting your first job opening.</p>
                  <button
                    onClick={() => setActiveTab("post")}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                  >
                    Post a Job
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-6 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              job.status === "Active" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {job.status}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center space-x-4 text-sm text-gray-600">
                            <span>📍 {job.location}</span>
                            <span>🕒 {job.type}</span>
                            {job.salary && <span>💰 {job.salary}</span>}
                          </div>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {job.description}
                          </p>
                          <div className="mt-3 flex items-center space-x-4 text-sm">
                            <span className="text-blue-600">
                              {applications.filter(app => app.jobTitle === job.title).length} applications
                            </span>
                            <span className="text-gray-500">
                              Posted on {new Date(job.postedDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => toggleJobStatus(job.id)}
                            className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                          >
                            {job.status === "Active" ? "Close" : "Activate"}
                          </button>
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Post Job Tab */}
          {activeTab === "post" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-4xl mx-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Post a New Job</h2>
              </div>
              <form onSubmit={postJob} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title*</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="e.g. Senior Frontend Developer"
                      value={jobForm.title}
                      onChange={handleJobChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location*</label>
                    <input
                      type="text"
                      name="location"
                      placeholder="e.g. New York, NY or Remote"
                      value={jobForm.location}
                      onChange={handleJobChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type*</label>
                    <select
                      name="type"
                      value={jobForm.type}
                      onChange={handleJobChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                    <input
                      type="text"
                      name="salary"
                      placeholder="e.g. $90,000 - $120,000"
                      value={jobForm.salary}
                      onChange={handleJobChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualifications*</label>
                  <input
                    type="text"
                    name="qualifications"
                    placeholder="e.g. 5+ years of experience, Bachelor's degree"
                    value={jobForm.qualifications}
                    onChange={handleJobChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Description*</label>
                  <textarea
                    name="description"
                    placeholder="Describe the responsibilities and expectations for this role"
                    value={jobForm.description}
                    onChange={handleJobChange}
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold">Job Performance</h2>
                </div>
                <div className="p-6">
                  <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                    [Job Views Chart Placeholder]
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Top Jobs</h2>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {jobs
                      .map(job => ({
                        ...job,
                        applications: applications.filter(app => app.jobTitle === job.title).length
                      }))
                      .sort((a, b) => b.applications - a.applications)
                      .slice(0, 5)
                      .map(job => (
                        <div key={job.id} className="p-4">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{job.title}</h3>
                            <span className="text-blue-600 font-medium">{job.applications} apps</span>
                          </div>
                          <div className="mt-1 text-sm text-gray-500">{job.location}</div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold">Application Sources</h2>
                  </div>
                  <div className="p-6">
                    <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                      [Sources Pie Chart Placeholder]
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden max-w-3xl mx-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Account Settings</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-6">
                  <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    {accountData.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{accountData.name}</h3>
                    <p className="text-gray-600">{accountData.email}</p>
                    <p className="text-sm mt-1">
                      <span className={`px-2 py-1 rounded-full ${
                        accountData.plan === "Premium" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {accountData.plan} Plan
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          defaultValue={accountData.name}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          defaultValue={accountData.email}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Security</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                        <input
                          type="password"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md mr-3">
                    Cancel
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}