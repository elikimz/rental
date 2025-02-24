// PropertyList.tsx
import React from "react";
import { useGetAllPropertiesQuery } from "../features/properties/propertiesAPI";

const PropertiePage: React.FC = () => {
  const { data: properties, error, isLoading } = useGetAllPropertiesQuery(undefined, {
    pollingInterval: 5000, // Auto-refetch every 5 seconds
  });

  if (isLoading) return <div>Loading properties...</div>;
  if (error) return <div>Error loading properties</div>;
  if (!properties || properties.length === 0) return <div>No properties available</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Available Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property: any) => (
          <div
            key={property.id}
            className="p-4 border rounded-lg shadow-lg bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
            <p className="text-gray-600">Location: {property.location}</p>
            <p className="text-gray-600">Description: {property.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertiePage;

