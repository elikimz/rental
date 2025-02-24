import { useState } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Handle form submission logic here (e.g., send data to server)
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ec2a2] transition"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ec2a2] transition"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-lg font-medium text-gray-600 mb-2">Phone (Optional)</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ec2a2] transition"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-lg font-medium text-gray-600 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5ec2a2] transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#5ec2a2] text-white rounded-lg font-medium hover:bg-[#4fa28c] transition duration-300"
              >
                Send Message
              </button>
            </form>

            {submitted && <p className="mt-4 text-green-500">Thank you for contacting us. We'll get back to you soon!</p>}
          </div>

          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Our Contact Information</h3>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Address:</strong> 123 Property St, City, Country
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Email:</strong> info@propertymanagement.com
            </p>
            <p className="text-lg text-gray-700 mb-4">
              <strong>Phone:</strong> +123 456 7890
            </p>
            
            {/* Optional: Embed a Google Map */}
            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.024187046031!2d-122.08424908468724!3d37.42206597982487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbe4e4b2e857b%3A0x92bfe9da5fd528ad!2sGoogleplex!5e0!3m2!1sen!2sus!4v1678014898901!5m2!1sen!2sus"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen={true} 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ContactPage;
