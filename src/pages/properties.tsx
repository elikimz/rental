import { useState, useEffect } from 'react';
import Navbar from '../components/navbar';  // Import Navbar
import Footer from '../components/footer';  // Import Footer

interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  fullDescription: string;
}

function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Example data, replace this with your API call
  useEffect(() => {
    const fetchProperties = () => {
      setProperties([
        {
          id: 1,
          title: "Beautiful Villa",
          description: "A spacious villa with modern amenities.",
          price: "$500,000",
          image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/438314153.jpg?k=75bed2f32ab49352cc0e1692986f49533dc6a0827f2bbb074fb67cd6e33f3c45&o=&hp=1",
          fullDescription: "This beautiful villa offers spacious rooms, a large garden, and is located in a peaceful neighborhood. It has 4 bedrooms, 3 bathrooms, and a swimming pool."
        },
        {
          id: 2,
          title: "Luxury Apartment",
          description: "An upscale apartment in a prime location.",
          price: "$350,000",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhPsUscBte7_Sg-HnQLb0THlytruIvG1i2A&s",
          fullDescription: "This luxury apartment is located in the heart of the city with 2 bedrooms, 2 bathrooms, and an open-plan kitchen. Enjoy breathtaking views of the skyline."
        },
        {
          id: 3,
          title: "Cozy Cottage",
          description: "A peaceful cottage by the lake.",
          price: "$250,000",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO2qJbOyamAwJxE9fJo1xBptxE_7_g-uO2IQ&s",
          fullDescription: "This cozy cottage is perfect for a weekend getaway, featuring 2 bedrooms, 1 bathroom, and a beautiful view of the lake. Perfect for nature lovers."
        },
        // More cards
        {
          id: 4,
          title: "Modern Loft",
          description: "A sleek and modern loft in a quiet neighborhood.",
          price: "$420,000",
          image: "https://www.urbnlivn.com/wp-content/uploads/2018/08/item_9-1.jpg",
          fullDescription: "A modern loft with 1 bedroom, 1 bathroom, and a spacious living area. Enjoy city views from your large windows. Includes a home office space."
        },
        {
          id: 5,
          title: "Charming Townhouse",
          description: "A charming townhouse with a beautiful garden.",
          price: "$320,000",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgxFx4XxE6RrepxhFJRxriaRjdrdpKUPsgg&s",
          fullDescription: "This lovely townhouse comes with 3 bedrooms, 2 bathrooms, and a private backyard. Located near great schools and parks."
        }
      ]);
    };

    fetchProperties();
  }, []);

  // Function to handle the modal open
  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />  {/* Importing Navbar */}
      <main className="flex-grow p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Properties for Sale
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#5ec2a2] transition duration-300">
                  {property.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{property.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold text-[#5ec2a2]">{property.price}</span>
                  <button 
                    onClick={() => handleViewDetails(property)}
                    className="text-white bg-[#5ec2a2] py-2 px-4 rounded-lg font-medium hover:bg-[#4fa28c] transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal for Property Details */}
      {selectedProperty && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-2xl font-semibold text-gray-800">{selectedProperty.title}</h3>
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="w-full h-64 object-cover mt-4 rounded-lg"
            />
            <p className="text-gray-600 mt-4">{selectedProperty.fullDescription}</p>
            <div className="mt-6">
              <span className="text-lg font-bold text-[#5ec2a2]">{selectedProperty.price}</span>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-[#5ec2a2] text-white py-2 px-4 rounded-lg hover:bg-[#4fa28c] transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />  {/* Importing Footer */}
    </div>
  );
}

export default PropertiesPage;
