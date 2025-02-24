import React from "react";
import { useGetAllPropertiesQuery } from "../features/properties/propertiesAPI";
import { toast } from "react-toastify";

const PropertiePage: React.FC = () => {
  const { data: properties, error, isLoading } = useGetAllPropertiesQuery(undefined, {
    pollingInterval: 5000, // Poll every 5 seconds for real-time updates
  });

  if (isLoading) return <div>Loading properties...</div>;
  if (error) {
    toast.error("Failed to fetch properties. Please try again.");
    return <div>Error loading properties</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((property: any) => (
          <div
            key={property.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{property.name}</h3>
            <p className="text-gray-600 mb-2">Location: {property.location}</p>
            <p className="text-gray-800 mb-2">Units: {property.units.length}</p>
            <p className="text-gray-500">{property.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiePage;

// Let me know if you want any changes to the layout or want to add more property details! ✨
