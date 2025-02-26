

// import { useState } from 'react';
// import { Link } from 'react-router-dom';  // Import the Link component

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="w-full bg-gradient-to-r from-[#9cb5b5] via-[#86a4af] to-[#834f5f] shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-white">Property Management</h1>
//         <div className="hidden md:flex space-x-6">
//           <Link to="/" className="text-white hover:text-gray-200 font-medium">Home</Link>  {/* Updated to Link */}
//           <Link to="/properties" className="text-white hover:text-gray-200 font-medium">Properties</Link>
//           <Link to="/services" className="text-white hover:text-gray-200 font-medium">Services</Link>
//           <Link to="/contact" className="text-white hover:text-gray-200 font-medium">Contact</Link>
//           <Link 
//             to="/login" 
//             className="text-white bg-[#5ec2a2] hover:bg-[#4fa28c] py-2 px-4 rounded-lg font-medium transition duration-300"
//           >
//             Login
//           </Link>
//           <Link 
//             to="/register" 
//             className="text-white bg-[#5ec2a2] hover:bg-[#4fa28c] py-2 px-4 rounded-lg font-medium transition duration-300"
//           >
//             Register
//           </Link>
//         </div>
//         <button 
//           className="md:hidden text-white text-2xl" 
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </button>
//       </div>
//       {menuOpen && (
//         <div className="md:hidden flex flex-col mt-4 space-y-4 text-center bg-[#7d7b9a] py-4 shadow-lg">
//           <Link to="/" className="text-white hover:text-gray-200 font-medium">Home</Link>  {/* Updated to Link */}
//           <Link to="/properties" className="text-white hover:text-gray-200 font-medium">Properties</Link>
//           <Link to="/services" className="text-white hover:text-gray-200 font-medium">Services</Link>
//           <Link to="/contact" className="text-white hover:text-gray-200 font-medium">Contact</Link>
//           <Link 
//             to="/login" 
//             className="text-white bg-[#5ec2a2] hover:bg-[#4fa28c] py-2 px-4 rounded-lg font-medium transition duration-300"
//           >
//             Login
//           </Link>
//           <Link 
//             to="/register" 
//             className="text-white bg-[#5ec2a2] hover:bg-[#4fa28c] py-2 px-4 rounded-lg font-medium transition duration-300"
//           >
//             Register
//           </Link>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'react-feather';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold text-gray-800">Property Management</h1>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-gray-800 hover:text-[#5ec2a2] font-medium transition">Home</Link>
          <Link to="/properties" className="text-gray-800 hover:text-[#5ec2a2] font-medium transition">Properties</Link>
          <div className="relative">
            <button
              onClick={() => setServicesDropdown(!servicesDropdown)}
              className="text-gray-800 hover:text-[#5ec2a2] font-medium flex items-center transition"
            >
              Services <ChevronDown className="ml-1" size={18} />
            </button>
            {servicesDropdown && (
              <div className="absolute top-10 left-0 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                <Link to="/maintenance" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Maintenance</Link>
                <Link to="/billing" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Billing</Link>
                <Link to="/support" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Support</Link>
              </div>
            )}
          </div>
          <Link to="/contact" className="text-gray-800 hover:text-[#5ec2a2] font-medium transition">Contact</Link>
          <Link to="/login" className="bg-[#5ec2a2] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#4fa28c] transition">Login</Link>
          <Link to="/register" className="bg-[#5ec2a2] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#4fa28c] transition">Register</Link>
        </div>

        <button className="md:hidden text-gray-800" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-4 text-center bg-gray-50 py-4 shadow-lg">
          <Link to="/" className="text-gray-800 hover:text-[#5ec2a2] font-medium">Home</Link>
          <Link to="/properties" className="text-gray-800 hover:text-[#5ec2a2] font-medium">Properties</Link>
          <Link to="/services" className="text-gray-800 hover:text-[#5ec2a2] font-medium">Services</Link>
          <Link to="/contact" className="text-gray-800 hover:text-[#5ec2a2] font-medium">Contact</Link>
          <Link to="/login" className="bg-[#5ec2a2] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#4fa28c] transition">Login</Link>
          <Link to="/register" className="bg-[#5ec2a2] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#4fa28c] transition">Register</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
