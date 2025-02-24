


import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you have react-router-dom installed
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const properties = [
  {
    id: 1,
    image:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/473296975.jpg?k=d66796d0c65d527bfc9b69bd22ca75728ff4ea96bf319667f059f1c709f14adb&o=&hp=1",
    title: "Luxury Villa",
    location: "Nairobi, Kenya",
    price: "Ksh 250,000 / month",
    description:
      "A luxurious villa with a spacious compound, swimming pool, and modern amenities.",
  },
  {
    id: 2,
    image: "https://gardencityliving.co.ke/wp-content/uploads/2023/03/Homepage-237_1.jpg",
    title: "City Apartment",
    location: "Mombasa, Kenya",
    price: "Ksh 120,000 / month",
    description: "A modern city apartment with a great view and 24/7 security.",
  },
  {
    id: 3,
    image:
      "https://media.istockphoto.com/id/957895328/photo/home-and-healthy-front-yard-during-late-spring-season.jpg?s=612x612&w=0&k=20&c=IAKmKmrRDvsJgV1_-iRUI_TgwAFXY2xGEDgEzaUmzu4=",
    title: "Suburban Home",
    location: "Kisumu, Kenya",
    price: "Ksh 80,000 / month",
    description:
      "A cozy suburban home with a beautiful garden and peaceful neighborhood.",
  },
];

type Property = {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  description: string;
};

function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const navigate = useNavigate(); // React Router navigation

  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#9cb5b5] to-[#834f5f] text-white text-center py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Find Your Perfect Home with Ease</h1>
          <p className="text-lg mt-4">Discover, rent, and manage properties seamlessly</p>
          <button
            onClick={() => navigate("/register")}
            className="mt-6 px-6 py-3 bg-white text-[#834f5f] font-bold rounded-lg shadow-lg hover:bg-gray-200 transition"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Property Showcase Section */}
      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-[#333]">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition transform duration-300"
            >
              <img src={property.image} alt={property.title} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#834f5f]">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-[#6a7f22] font-bold mt-2">{property.price}</p>
                <button
                  className="mt-4 px-4 py-2 bg-[#834f5f] text-white rounded-lg hover:bg-[#6a7f22] transition"
                  onClick={() => setSelectedProperty(property)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <h2 className="text-2xl font-bold text-[#834f5f]">{selectedProperty.title}</h2>
            <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-60 object-cover mt-2 rounded" />
            <p className="text-gray-600 mt-2">{selectedProperty.location}</p>
            <p className="text-[#6a7f22] font-bold mt-2">{selectedProperty.price}</p>
            <p className="mt-4">{selectedProperty.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              onClick={() => setSelectedProperty(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default HomePage;
