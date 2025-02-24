// import { useState } from 'react';

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="w-full bg-gradient-to-r from-[#9cb5b5] via-[#86a4af] to-[#834f5f] shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-white">Property Management</h1>
//         <div className="hidden md:flex space-x-6">
//           <a href="#" className="text-white hover:text-gray-200 font-medium">Home</a>
//           <a href="#" className="text-white hover:text-gray-200 font-medium">Properties</a>
//           <a href="#" className="text-white hover:text-gray-200 font-medium">Services</a>
//           <a href="#" className="text-white hover:text-gray-200 font-medium">Contact</a>
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
//           <a href="#" className="text-white hover:text-gray-200 font-medium">Home</a>
//           <a href="#" className="text-white hover:text-gray-200 font-medium">Properties</a>
//           <a href="#" className="text-white hover:text-gray-200 font-medium">Services</a>
//           <a href="#" className="text-white hover:text-gray-200 font-medium">Contact</a>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;

import { useState } from 'react';
import { Link } from 'react-router-dom';  // Import the Link component

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-[#9cb5b5] via-[#86a4af] to-[#834f5f] shadow-md py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Property Management</h1>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-gray-200 font-medium">Home</Link>  {/* Updated to Link */}
          <Link to="/properties" className="text-white hover:text-gray-200 font-medium">Properties</Link>
          <Link to="/services" className="text-white hover:text-gray-200 font-medium">Services</Link>
          <Link to="/contact" className="text-white hover:text-gray-200 font-medium">Contact</Link>
          <Link 
            to="/login" 
            className="text-white bg-[#5ec2a2] hover:bg-[#4fa28c] py-2 px-4 rounded-lg font-medium transition duration-300"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="text-white bg-[#5ec2a2] hover:bg-[#4fa28c] py-2 px-4 rounded-lg font-medium transition duration-300"
          >
            Register
          </Link>
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
          <Link to="/" className="text-white hover:text-gray-200 font-medium">Home</Link>  {/* Updated to Link */}
          <Link to="/properties" className="text-white hover:text-gray-200 font-medium">Properties</Link>
          <Link to="/services" className="text-white hover:text-gray-200 font-medium">Services</Link>
          <Link to="/contact" className="text-white hover:text-gray-200 font-medium">Contact</Link>
          <Link 
            to="/login" 
            className="text-white bg-[#5ec2a2] hover:bg-[#4fa28c] py-2 px-4 rounded-lg font-medium transition duration-300"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="text-white bg-[#5ec2a2] hover:bg-[#4fa28c] py-2 px-4 rounded-lg font-medium transition duration-300"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
