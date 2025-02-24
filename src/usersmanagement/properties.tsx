import React from "react";
import { useGetAllPropertiesQuery } from "../features/properties/propertiesAPI";

const PropertiePage: React.FC = () => {
  const { data: properties, error, isLoading } = useGetAllPropertiesQuery(undefined, {
    pollingInterval: 5000,
  });

  if (isLoading) return <div>Loading properties...</div>;
  if (error) return <div>Error loading properties. Please try again later.</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Available Properties</h2>
      {properties?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: any) => (
            <div
              key={property.id}
              className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <img
                src={property.image_url || "https://via.placeholder.com/300"}
                alt={property.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold">{property.name}</h3>
              <p className="text-gray-700">Location: {property.location}</p>
              <p className="text-gray-500">Units: {property.units?.length || 0}</p>
              <p className="text-gray-600 mt-2">{property.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No properties found.</div>
      )}
    </div>
  );
};

export default PropertiePage;
