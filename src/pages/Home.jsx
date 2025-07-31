export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <section className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-5xl font-extrabold text-primary leading-tight">
            Expert Business Consulting That Drives Growth
          </h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            KM-M Business Consultants help you build strategies for success and achieve your business goals with confidence.
          </p>
          <a
            href="/contact"
            className="inline-block bg-secondary text-black font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition"
          >
            Contact Us Today
          </a>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 rounded-lg overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"
            alt="Consulting"
            className="w-full h-auto"
          />
        </div>
      </section>
    </main>
  );
}
