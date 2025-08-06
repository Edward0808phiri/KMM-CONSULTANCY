import img1 from "../assets/1.jpg";
import img2 from "../assets/2.1.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/7.jpg";
import img6 from "../assets/8.jpg";
import img7 from "../assets/2.jpg";
import img8 from "../assets/6.jpg";
import Navbar from "../components/Navbar";

export default function Services() {
  const services = [
    {
      title: "Human Resource Solutions",
      desc: "Comprehensive HR management, rSpecialized services in job evaluation, executive recruitment, payroll, HR policy design, team building, and employee training to help you build a dynamic workforce.ecruitment, and staff development programs.",
      img: img1,
    },
    {
      title: "Compensation & Benefits",
      desc: "Market-based salary benchmarking, benefit structuring, remuneration analysis, and policy guidance to ensure staff retention and competitiveness.",
      img: img7,
    },
    {
      title: "Recruitment & Executive Search",
      desc: "We provide end-to-end recruitment solutions including candidate sourcing, executive headhunting, competency-based hiring, and onboarding support.",
      img: img3,
    },
    {
      title: "Financial Risk Management",
      desc: "Policy drafting, internal controls, construction & procurement audits, and financial manuals development tailored for transparency and accountability.",
      img: img2,
    },
    {
      title: "Tax & Compliance",
      desc: "Domestic and international tax advisory, reverse VAT, corporate tax filings, payroll compliance, and customized tax planning for operational efficiency.",
      img: img8,
    },
    {
      title: "Business Process Reviews",
      desc: "We conduct structured internal audits and governance evaluations to improve efficiency, manage risk, and ensure regulatory compliance.",
      img: img5,
    },
    {
      title: "Corporate Governance",
      desc: "Expert support in board structures, secretarial services, policy development, and succession planning for ethical and effective management.",
      img: img6,
    },
    {
      title: "Investment & Development Advisory",
      desc: "We assist with ZDA registrations, funding proposals, feasibility studies, public sector reform, and NGO consultancy in water, sanitation, and housing.",
      img: img4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-6">
      <Navbar />
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
