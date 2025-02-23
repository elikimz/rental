function Footer() {
    return (
      <footer className="w-full bg-gradient-to-r from-[#9cb5b5] via-[#86a4af] to-[#834f5f] text-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <h2 className="text-2xl font-bold">Property Management</h2>
            <p className="text-sm mt-2">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
            <p className="text-sm">Providing top-notch property management services.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="hover:text-gray-200 text-sm">Home</a></li>
              <li><a href="#" className="hover:text-gray-200 text-sm">Properties</a></li>
              <li><a href="#" className="hover:text-gray-200 text-sm">Services</a></li>
              <li><a href="#" className="hover:text-gray-200 text-sm">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm mt-2">Email: info@propertymanagement.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <p className="text-sm">Address: 123 Property St, City, Country</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="text-white hover:text-gray-200 text-lg">🔵</a>
              <a href="#" className="text-white hover:text-gray-200 text-lg">📘</a>
              <a href="#" className="text-white hover:text-gray-200 text-lg">📷</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export default Footer;