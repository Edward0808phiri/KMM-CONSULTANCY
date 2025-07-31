export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-700 mb-10">Admin Dashboard</h1>
      <p className="text-lg text-gray-700 mb-6">
        Welcome, Admin! Manage job postings and review applications from this dashboard.
      </p>
      <div className="p-6 bg-white shadow rounded">
        <h3 className="text-xl font-semibold text-blue-700">Post a New Job</h3>
        <p className="mt-3 text-gray-600">Feature coming soon — here you will be able to add new job listings.</p>
      </div>
    </div>
  );
}
