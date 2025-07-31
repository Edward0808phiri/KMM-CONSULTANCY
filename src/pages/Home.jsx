export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="text-center py-20 px-6 bg-blue-700 text-white">
        <h1 className="text-5xl font-extrabold">KM‑M Business Consultants Limited</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Empowering businesses with expert consultancy, strategic advice, and tailored solutions for growth and success.
        </p>
        <a
          href="/services"
          className="mt-8 inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
        >
          Explore Our Services
        </a>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">Why Choose KM‑M?</h2>
        <p className="mt-4 text-gray-600">
          We combine deep industry expertise with innovative solutions to help you achieve your business goals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-semibold text-blue-700">Expert Team</h3>
            <p className="mt-3 text-gray-600">Our consultants bring years of experience across multiple industries.</p>
          </div>
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-semibold text-blue-700">Tailored Solutions</h3>
            <p className="mt-3 text-gray-600">We design strategies unique to your business needs.</p>
          </div>
          <div className="p-6 bg-white shadow rounded">
            <h3 className="text-xl font-semibold text-blue-700">Proven Success</h3>
            <p className="mt-3 text-gray-600">Helping businesses grow, innovate, and thrive for over a decade.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
