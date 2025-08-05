import { useState, useEffect } from "react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Start closed by default
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [accountData, setAccountData] = useState({
    name: "Admin User",
    email: "admin@jobportal.com",
    lastLogin: new Date().toISOString(),
    plan: "Premium"
  });
  const [isMobile, setIsMobile] = useState(false);

  // Mock analytics data
  const [analytics, setAnalytics] = useState({
    totalViews: 1243,
    applicationsThisMonth: 28,
    popularJob: "Senior Developer"
  });

  useEffect(() => {
    // Check screen size and set mobile state
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close sidebar by default on mobile
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // Simulate loading data
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedApps = JSON.parse(localStorage.getItem("applications")) || [];
    
    setJobs(storedJobs);
    setApplications(storedApps);
  }, []);

  // ... (keep all your existing handler functions) ...

  // Calculate stats
  const stats = {
    totalJobs: jobs.length,
    totalApplications: applications.length,
    newApplications: applications.filter(app => !app.viewed).length,
    activeJobs: jobs.filter(job => job.status === "Active").length
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Toggle Button - Always visible */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed z-50 ${sidebarOpen ? 'left-64' : 'left-0'} top-4 ml-2 bg-blue-600 text-white p-2 rounded-md shadow-lg transition-all duration-300 md:hidden`}
      >
        {sidebarOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <div 
        className={`bg-blue-900 text-white ${sidebarOpen ? 'w-64' : 'w-0'} fixed md:relative z-40 h-full transition-all duration-300 flex-shrink-0 overflow-hidden`}
      >
        <div className="p-4 flex items-center justify-between border-b border-blue-800">
          <h1 className="text-xl font-bold whitespace-nowrap">JobPortal Pro</h1>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="text-blue-200 hover:text-white md:block hidden"
            aria-label="Close menu"
          >
            ◀
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
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-blue-850 border-t border-blue-800">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold">
              {accountData.name.charAt(0)}
            </div>
            <div className="ml-3 whitespace-nowrap">
              <p className="text-sm font-medium">{accountData.name}</p>
              <p className="text-xs text-blue-300">{accountData.plan} Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto transition-all duration-300 ${sidebarOpen && isMobile ? 'ml-64' : ''}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="mr-4 text-gray-500 hover:text-gray-700 hidden md:block"
              aria-label="Open menu"
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

        {/* Mobile Search - Only shows on mobile */}
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
          {/* All your existing tab content remains the same */}
          {/* ... (keep all your tab content JSX) ... */}
        </main>
      </div>
    </div>
  );
}