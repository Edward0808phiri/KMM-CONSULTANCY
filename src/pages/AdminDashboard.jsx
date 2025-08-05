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
  const [sidebarOpen, setSidebarOpen] = useState(false); // Changed default to false for mobile
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
    // Check if mobile on mount and resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    // Simulate loading data
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const storedApps = JSON.parse(localStorage.getItem("applications")) || [];
    
    setJobs(storedJobs);
    setApplications(storedApps);
  }, []);

  // ... (keep all your existing handler functions) ...

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed z-50 bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg md:hidden"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      )}

      {/* Sidebar */}
      <div className={`bg-blue-900 text-white ${sidebarOpen ? 'w-64 fixed md:relative z-40 h-full' : 'w-0 md:w-20'} transition-all duration-300 flex-shrink-0`}>
        {sidebarOpen && (
          <>
            <div className="p-4 flex items-center justify-between border-b border-blue-800">
              <h1 className="text-xl font-bold">JobPortal Pro</h1>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-blue-200 hover:text-white md:block hidden"
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
          </>
        )}
      </div>

      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${sidebarOpen && isMobile ? 'ml-64' : ''}`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
          <div className="flex items-center w-full md:w-auto">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {activeTab}
            </h2>
            {!sidebarOpen && !isMobile && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                ☰
              </button>
            )}
          </div>
          <div className="flex flex-col md:flex-row w-full md:w-auto md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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

        <main className="p-4 md:p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* ... (keep your existing card JSX) ... */}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">Recent Applications</h3>
                </div>
                <div className="overflow-x-auto">
                  {/* ... (keep your existing table JSX) ... */}
                </div>
              </div>

              {/* Job Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {/* ... (keep your existing JSX) ... */}
              </div>
            </div>
          )}

          {/* Other tabs - similar responsive adjustments */}
          {/* ... (apply similar responsive patterns to other tabs) ... */}
        </main>
      </div>
    </div>
  );
}