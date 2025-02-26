

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


// import { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="w-full bg-gradient-to-r from-[#2c3e50] via-[#34495e] to-[#1c2833] shadow-lg py-4 px-6 fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo/Brand Name */}
//         <h1 className="text-2xl font-bold text-white">Property Management</h1>

//         {/* Desktop Navigation Links */}
//         <div className="hidden md:flex space-x-6 items-center">
//           <Link to="/" className="text-white hover:text-gray-300 font-medium transition duration-300">Home</Link>
//           <Link to="/properties" className="text-white hover:text-gray-300 font-medium transition duration-300">Properties</Link>
//           <Link to="/services" className="text-white hover:text-gray-300 font-medium transition duration-300">Services</Link>
//           <Link to="/contact" className="text-white hover:text-gray-300 font-medium transition duration-300">Contact</Link>
//           <div className="flex space-x-4">
//             <Link 
//               to="/login" 
//               className="text-white bg-[#3498db] hover:bg-[#2980b9] py-2 px-4 rounded-lg font-medium transition duration-300"
//             >
//               Login
//             </Link>
//             <Link 
//               to="/register" 
//               className="text-white bg-[#2ecc71] hover:bg-[#27ae60] py-2 px-4 rounded-lg font-medium transition duration-300"
//             >
//               Register
//             </Link>
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <button 
//           className="md:hidden text-white text-2xl focus:outline-none" 
//           onClick={() => setMenuOpen(!menuOpen)}
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Navigation Links */}
//       {menuOpen && (
//         <div className="md:hidden flex flex-col mt-4 space-y-4 text-center bg-[#34495e] py-4 shadow-lg">
//           <Link to="/" className="text-white hover:text-gray-300 font-medium transition duration-300">Home</Link>
//           <Link to="/properties" className="text-white hover:text-gray-300 font-medium transition duration-300">Properties</Link>
//           <Link to="/services" className="text-white hover:text-gray-300 font-medium transition duration-300">Services</Link>
//           <Link to="/contact" className="text-white hover:text-gray-300 font-medium transition duration-300">Contact</Link>
//           <Link 
//             to="/login" 
//             className="text-white bg-[#3498db] hover:bg-[#2980b9] py-2 px-4 rounded-lg font-medium transition duration-300"
//           >
//             Login
//           </Link>
//           <Link 
//             to="/register" 
//             className="text-white bg-[#2ecc71] hover:bg-[#27ae60] py-2 px-4 rounded-lg font-medium transition duration-300"
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

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d] shadow-lg py-4 px-6 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <h1 className="text-2xl font-bold text-white">Property Management</h1>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:text-gray-300 font-medium transition duration-300">Home</Link>
          <Link to="/properties" className="text-white hover:text-gray-300 font-medium transition duration-300">Properties</Link>
          <Link to="/services" className="text-white hover:text-gray-300 font-medium transition duration-300">Services</Link>
          <Link to="/contact" className="text-white hover:text-gray-300 font-medium transition duration-300">Contact</Link>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="text-white bg-[#3498db] hover:bg-[#2980b9] py-2 px-4 rounded-lg font-medium transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-white bg-[#2ecc71] hover:bg-[#27ae60] py-2 px-4 rounded-lg font-medium transition duration-300"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation Links */}
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-4 space-y-4 text-center bg-[#34495e] py-4 shadow-lg">
          <Link to="/" className="text-white hover:text-gray-300 font-medium transition duration-300">Home</Link>
          <Link to="/properties" className="text-white hover:text-gray-300 font-medium transition duration-300">Properties</Link>
          <Link to="/services" className="text-white hover:text-gray-300 font-medium transition duration-300">Services</Link>
          <Link to="/contact" className="text-white hover:text-gray-300 font-medium transition duration-300">Contact</Link>
          <Link
            to="/login"
            className="text-white bg-[#3498db] hover:bg-[#2980b9] py-2 px-4 rounded-lg font-medium transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-white bg-[#2ecc71] hover:bg-[#27ae60] py-2 px-4 rounded-lg font-medium transition duration-300"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
