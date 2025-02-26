// // PropertyList.tsx
// import React from "react";
// import { useGetAllPropertiesQuery } from "../features/properties/propertiesAPI";

// const PropertiePage: React.FC = () => {
//   const { data: properties, error, isLoading } = useGetAllPropertiesQuery(undefined, {
//     pollingInterval: 5000, // Auto-refetch every 5 seconds
//   });

//   if (isLoading) return <div>Loading properties...</div>;
//   if (error) return <div>Error loading properties</div>;
//   if (!properties || properties.length === 0) return <div>No properties available</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Available Properties</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {properties.map((property: any) => (
//           <div
//             key={property.id}
//             className="p-4 border rounded-lg shadow-lg bg-white"
//           >
//             <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
//             <p className="text-gray-600">Location: {property.location}</p>
//             <p className="text-gray-600">Description: {property.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useGetAllPropertiesQuery } from '../features/properties/propertiesAPI';
import Spinner from '../components/spinner';

// Define a type for the property
interface Property {
  id: string;
  name: string;
  location: string;
  description?: string;
}

const PropertiesPage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { data: properties, isLoading: isPropertiesLoading } = useGetAllPropertiesQuery(undefined);

  const handleNavigateToUnits = (propertyId: string) => {
    navigate(`/tenant-dashboard/unit/${propertyId}`); // Navigate to the Units page for the specific property
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Units</h1>

      <div className="mb-6">
        {isPropertiesLoading ? (
          <Spinner />
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {properties?.map((prop: Property) => (
              <li key={prop.id} className="border p-4 rounded bg-white">
                <strong>ID: {prop.id}</strong>
                <p><strong>Name:</strong> {prop.name}</p>
                <p><strong>Location:</strong> {prop.location}</p>
                <p><strong>Description:</strong> {prop.description}</p>
                <button
                  onClick={() => handleNavigateToUnits(prop.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
                >
                  View Units
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;