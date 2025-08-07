import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase"; // Import your Firebase config
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    qualifications: "",
    location: "",
    type: "Full-time",
    salary: "",
    status: "Active" // Added status field
  });
  // ... other state variables ...

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
      }
    };

    fetchJobs();
  }, []);

  // Post job to Firebase
  const postJob = async (e) => {
    e.preventDefault();
    try {
      const newJob = {
        ...jobForm,
        postedDate: new Date().toISOString(),
        views: 0
      };
      
      // Add to Firebase
      const docRef = await addDoc(collection(db, "jobs"), newJob);
      
      // Update local state
      setJobs([...jobs, { id: docRef.id, ...newJob }]);
      
      // Reset form
      setJobForm({
        title: "",
        description: "",
        qualifications: "",
        location: "",
        type: "Full-time",
        salary: "",
        status: "Active"
      });
      
      setActiveTab("jobs");
      alert("Job posted successfully!");
    } catch (error) {
      console.error("Error adding job: ", error);
      alert("Error posting job");
    }
  };

  // Delete job from Firebase
  const deleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteDoc(doc(db, "jobs", id));
        setJobs(jobs.filter(job => job.id !== id));
        // Also remove applications for this job
        const jobTitle = jobs.find(j => j.id === id)?.title;
        setApplications(applications.filter(app => app.jobTitle !== jobTitle));
      } catch (error) {
        console.error("Error deleting job: ", error);
      }
    }
  };

  // Toggle job status in Firebase
  const toggleJobStatus = async (id) => {
    try {
      const job = jobs.find(j => j.id === id);
      const newStatus = job.status === "Active" ? "Closed" : "Active";
      
      // Update in Firebase
      await updateDoc(doc(db, "jobs", id), {
        status: newStatus
      });
      
      // Update local state
      setJobs(jobs.map(job => 
        job.id === id ? { ...job, status: newStatus } : job
      ));
    } catch (error) {
      console.error("Error updating job status: ", error);
    }
  };

  // ... rest of your component code ...
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [accountData] = useState({
    name: "Admin User",
    email: "admin@jobportal.com",
    plan: "Premium"
  });
  const [isMobile, setIsMobile] = useState(false);

  // Initialize with mock data
  useEffect(() => {
    const mockJobs = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        description: "Develop and maintain web applications using React.",
        qualifications: "5+ years experience with React and TypeScript",
        location: "Remote",
        type: "Full-time",
        salary: "$90,000 - $120,000",
        postedDate: new Date().toISOString(),
        status: "Active",
        views: 245
      },
      {
        id: 2,
        title: "UX Designer",
        description: "Create beautiful user experiences for our products.",
        qualifications: "3+ years UX design experience",
        location: "New York, NY",
        type: "Full-time",
        salary: "$80,000 - $100,000",
        postedDate: new Date().toISOString(),
        status: "Active",
        views: 180
      }
    ];

    const mockApplications = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        jobTitle: "Senior Frontend Developer",
        location: "Remote",
        appliedDate: new Date().toISOString(),
        viewed: false,
        status: "New",
        cv: {
          name: "John_Doe_CV.pdf",
          content: "#"
        }
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        jobTitle: "UX Designer",
        location: "New York, NY",
        appliedDate: new Date().toISOString(),
        viewed: true,
        status: "Reviewed",
        cv: {
          name: "Jane_Smith_Resume.pdf",
          content: "#"
        }
      }
    ];

    setJobs(mockJobs);
    setApplications(mockApplications);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // Changed to 1024 for better tablet support
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true); // Always show sidebar on larger screens
      } else {
        setSidebarOpen(false); // Hide by default on mobile
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleJobChange = (e) => {
    setJobForm({ ...jobForm, [e.target.name]: e.target.value });
  };

  const postJob = (e) => {
    e.preventDefault();
    const newJob = {
      ...jobForm,
      id: Date.now(),
      postedDate: new Date().toISOString(),
      status: "Active",
      views: 0
    };
    setJobs([...jobs, newJob]);
    setJobForm({
      title: "",
      description: "",
      qualifications: "",
      location: "",
      type: "Full-time",
      salary: ""
    });
    setActiveTab("jobs");
    alert("Job posted successfully!");
  };

  const deleteJob = (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      setJobs(jobs.filter(job => job.id !== id));
      setApplications(applications.filter(app => app.jobTitle !== jobs.find(j => j.id === id)?.title));
    }
  };

  const toggleJobStatus = (id) => {
    setJobs(jobs.map(job => 
      job.id === id ? { ...job, status: job.status === "Active" ? "Closed" : "Active" } : job
    ));
  };

  const markAsViewed = (id) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, viewed: true, status: "Reviewed" } : app
    ));
  };

  // Calculate stats
  const stats = {
    totalJobs: jobs.length,
    totalApplications: applications.length,
    newApplications: applications.filter(app => !app.viewed).length,
    activeJobs: jobs.filter(job => job.status === "Active").length
  };

  // Analytics data
  const analytics = {
    totalViews: jobs.reduce((sum, job) => sum + job.views, 0),
    applicationsThisMonth: applications.length,
    popularJob: jobs.length > 0 
      ? jobs.reduce((prev, current) => 
          (applications.filter(app => app.jobTitle === current.title).length > 
           applications.filter(app => app.jobTitle === prev.title).length) 
            ? current : prev
        ).title 
      : "No jobs"
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          bg-blue-900 text-white 
          ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'} 
          fixed lg:relative z-40 h-full transition-all duration-300 flex-shrink-0 
          flex flex-col lg:w-64
        `}
      >
        <div className="p-4 flex items-center justify-between border-b border-blue-800">
          <h1 className="text-xl font-bold whitespace-nowrap">JobPortal Pro</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="text-blue-200 hover:text-white lg:block hidden"
          >
            ◀
          </button>
        </div>
        
        <nav className="mt-6 flex-1 overflow-y-auto">
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
              onClick={() => {
                setActiveTab(tab.id);
                if (isMobile) setSidebarOpen(false);
              }}
              className={`flex items-center w-full p-4 text-left transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-800 text-white"
                  : "text-blue-200 hover:bg-blue-850 hover:text-white"
              }`}
            >
              <span className="text-lg mr-3">{tab.symbol}</span>
              <span>{tab.label}</span>
              {tab.id === "applications" && stats.newApplications > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {stats.newApplications}
                </span>
              )}
            </button>
          ))}
        </nav>
        
        <div className="p-4 bg-blue-850 border-t border-blue-800">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">
              {accountData.name.charAt(0)}
            </div>
            <div className="ml-3 whitespace-nowrap overflow-hidden">
              <p className="text-sm font-medium truncate">{accountData.name}</p>
              <p className="text-xs text-blue-300 truncate">{accountData.plan} Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="mr-4 text-gray-500 hover:text-gray-700 lg:hidden"
            >
              ☰
            </button>
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {activeTab}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
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
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Search */}
        <div className="p-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        <main className="p-4 md:p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
                            {new Date(app.appliedDate).toLocaleDateString()}
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === "applications" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
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
                          {new Date(app.appliedDate).toLocaleDateString()}
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
                            {!app.viewed && (
                              <button 
                                onClick={() => markAsViewed(app.id)}
                                className="text-blue-600 hover:text-blue-900"
                                title="Mark as reviewed"
                              >
                                ✓
                              </button>
                            )}
                            <a
                              href={app.cv.content}
                              download={app.cv.name}
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
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === "jobs" && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
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
              
              <div className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <div key={job.id} className="p-6 hover:bg-gray-50">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
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
                        <div className="mt-1 flex flex-wrap items-center gap-x-4 text-sm text-gray-600">
                          <span>📍 {job.location}</span>
                          <span>🕒 {job.type}</span>
                          {job.salary && <span>💰 {job.salary}</span>}
                        </div>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {job.description}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-x-4 text-sm">
                          <span className="text-blue-600">
                            {applications.filter(app => app.jobTitle === job.title).length} applications
                          </span>
                          <span className="text-gray-500">
                            Posted on {new Date(job.postedDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
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
                      placeholder="e.g. Remote, New York, etc."
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
                <div className="flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0 sm:space-x-6">
                  <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
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