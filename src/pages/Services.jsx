import img1 from "../assets/1.jpg";
import img2 from "../assets/2.1.jpg";
import img3 from "../assets/3.1.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/about.jpg";
import img6 from "../assets/logo.jpg";

export default function Services() {
  const services = [
    {
      title: "Business Development Consulting",
      desc: "Helping you design and implement strategies for sustainable growth.",
      img: img1,
    },
    {
      title: "Human Resource Solutions",
      desc: "Comprehensive HR management, rSpecialized services in job evaluation, executive recruitment, payroll, HR policy design, team building, and employee training to help you build a dynamic workforce.ecruitment, and staff development programs.",
      img: img1,
    },
    {
      title: "Financial Advisory",
      desc: "Expert guidance on financial planning, budgeting, and investment strategies.",
      img: img3,
    },
    {
      title: "Project Management",
      desc: "End-to-end management for projects of all sizes and complexities.",
      img: img4,
    },
    {
      title: "Training & Development",
      desc: "Workshops and programs to enhance skills and drive team productivity.",
      img: img5,
    },
    {
      title: "Market Research & Analysis",
      desc: "In-depth insights to inform decisions and uncover opportunities.",
      img: img6,
    },
    {
      title: "Market Research & Analysis",
      desc: "In-depth insights to inform decisions and uncover opportunities.",
      img: img6,
    },
    {
      title: "Market Research & Analysis",
      desc: "In-depth insights to inform decisions and uncover opportunities.",
      img: img6,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">Our Services</h1>
        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          At K M & M Business Consultants, we provide tailored solutions designed to help businesses grow,
          optimize operations, and achieve sustainable success.
        </p>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 overflow-hidden"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
