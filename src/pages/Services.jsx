
export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-700 mb-10">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold text-blue-700">Business Development Consulting</h3>
          <p className="mt-3 text-gray-600">Helping you design and implement strategies for sustainable growth.</p>
        </div>
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold text-blue-700">Human Resource Solutions</h3>
          <p className="mt-3 text-gray-600">Comprehensive HR management, recruitment, and staff development programs.</p>
        </div>
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold text-blue-700">Financial Advisory</h3>
          <p className="mt-3 text-gray-600">Expert guidance on financial planning, budgeting, and investment strategies.</p>
        </div>
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold text-blue-700">Project Management</h3>
          <p className="mt-3 text-gray-600">End-to-end management for projects of all sizes and complexities.</p>
        </div>
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold text-blue-700">Training & Development</h3>
          <p className="mt-3 text-gray-600">Workshops and programs to enhance skills and drive team productivity.</p>
        </div>
        <div className="p-6 bg-white shadow rounded">
          <h3 className="text-xl font-semibold text-blue-700">Market Research & Analysis</h3>
          <p className="mt-3 text-gray-600">In-depth insights to inform decisions and uncover opportunities.</p>
        </div>
      </div>
    </div>
  );
}
