import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function ServicesPage() {
  const [activeService, setActiveService] = useState<number | null>(null);  // State to track which service is active

  const services = [
    {
      id: 1,
      title: "Property Listing",
      description: "List your property on our platform and reach a wide range of potential buyers or renters.",
      detailedDescription: "We offer a comprehensive property listing service, allowing you to advertise your property to a broad audience with easy access to interested buyers or renters. Our platform helps you get the best deal with our real estate professionals guiding you every step of the way.",
      icon: "🏠",
      image: "https://example.com/property-listing-image.jpg"
    },
    {
      id: 2,
      title: "Property Management",
      description: "Let us handle your property management, from maintenance to tenant relations.",
      detailedDescription: "Our property management services cover everything from handling tenant inquiries, organizing maintenance requests, and managing contracts. We ensure your property is always in great condition and handle tenant relationships to minimize your stress.",
      icon: "🛠️",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSI2xmVG_Bch1Sb7ioZdo-yPP_j6LIYMC2Dw&s"
    },
    {
      id: 3,
      title: "Consultancy",
      description: "Expert advice and consultancy on property investments and market trends.",
      detailedDescription: "Our consultancy service offers in-depth advice on real estate investment strategies, market trends, and how to optimize your property portfolio for the best returns. Our experts are here to guide you through every aspect of the real estate market.",
      icon: "💼",
      image: "https://example.com/consultancy-image.jpg"
    },
    // Add more services here
  ];

  const toggleDetails = (id: number) => {
    setActiveService(activeService === id ? null : id);  // Toggle service details
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6 flex flex-col justify-between"
            >
              <div className="text-6xl text-[#5ec2a2] mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{service.title}</h3>
              <p className="text-gray-600 text-base mb-6">{service.description}</p>
              <button
                onClick={() => toggleDetails(service.id)}
                className="text-white bg-[#5ec2a2] py-2 px-4 rounded-lg text-center font-medium hover:bg-[#4fa28c] transition duration-300"
              >
                Learn More
              </button>

              {/* Show the detailed description if the service is active */}
              {activeService === service.id && (
                <div className="mt-4">
                  <p className="text-gray-700">{service.detailedDescription}</p>
                  <img src={service.image} alt={service.title} className="w-full mt-4 rounded-lg shadow-md" />
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ServicesPage;
