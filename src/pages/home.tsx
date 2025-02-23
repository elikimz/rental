import Navbar from "../components/navbar"; 
import Footer from "../components/footer";

function HomePage() {
  return (
    <div className="w-full">
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#9cb5b5] to-[#834f5f] text-white text-center py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Find Your Perfect Home with Ease</h1>
          <p className="text-lg mt-4">Discover, rent, and manage properties seamlessly</p>
          <button className="mt-6 px-6 py-3 bg-white text-[#834f5f] font-bold rounded-lg shadow-lg hover:bg-gray-200 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Showcase Sections */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
          {/* Properties Showcase */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-[#834f5f]">Properties</h3>
            <p className="text-gray-600 mt-2">Explore a variety of properties available for rent and sale.</p>
          </div>

          {/* Services Showcase */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-[#834f5f]">Services</h3>
            <p className="text-gray-600 mt-2">We offer top-notch property management services to meet your needs.</p>
          </div>

          {/* Contact Showcase */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold text-[#834f5f]">Contact</h3>
            <p className="text-gray-600 mt-2">Get in touch with us for inquiries and consultations.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
