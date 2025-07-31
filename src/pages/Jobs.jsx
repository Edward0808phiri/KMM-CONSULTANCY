export default function Jobs() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Career Opportunities</h1>
      <p className="text-lg text-gray-700 mb-10">
        Explore exciting career opportunities with KM‑M Business Consultants Limited.  
        Browse open positions below and apply directly through our platform.
      </p>

      {/* Placeholder for job listings */}
      <div className="bg-white p-6 shadow rounded mb-6">
        <h3 className="text-xl font-semibold text-blue-700">Job Title Example</h3>
        <p className="mt-2 text-gray-600">Short job description goes here. Location: Lusaka.</p>
        <a href="/apply" className="mt-4 inline-block bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition">
          Apply Now
        </a>
      </div>
    </div>
  );
}
