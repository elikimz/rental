import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-[#9cb5b5] via-[#86a4af] to-[#834f5f] shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Property Management</h1>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-white hover:text-gray-200 font-medium">Home</a>
          <a href="#" className="text-white hover:text-gray-200 font-medium">Properties</a>
          <a href="#" className="text-white hover:text-gray-200 font-medium">Services</a>
          <a href="#" className="text-white hover:text-gray-200 font-medium">Contact</a>
        </div>
        <button 
          className="md:hidden text-white text-2xl" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-4 text-center bg-[#7d7b9a] py-4 shadow-lg">
          <a href="#" className="text-white hover:text-gray-200 font-medium">Home</a>
          <a href="#" className="text-white hover:text-gray-200 font-medium">Properties</a>
          <a href="#" className="text-white hover:text-gray-200 font-medium">Services</a>
          <a href="#" className="text-white hover:text-gray-200 font-medium">Contact</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
