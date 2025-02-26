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

// export default PropertiePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  useCreatePropertyMutation,
  useGetAllPropertiesQuery,
  useGetPropertyByIdQuery,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} from '../features/properties/propertiesAPI';
import Spinner from '../components/spinner';

// Define a type for the property
interface Property {
  id: string;
  name: string;
  location: string;
  description?: string;
}

const PropertiesPage: React.FC = () => {
  const [propertyId, setPropertyId] = useState<string>('');
  const [formData, setFormData] = useState<Property>({
    id: '',
    name: '',
    location: '',
    description: '',
  });
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate(); // Initialize useNavigate

  const { data: property, refetch, isFetching, isError } = useGetPropertyByIdQuery(propertyId, { skip: !propertyId });
  const { data: properties, refetch: refetchAllProperties, isLoading: isPropertiesLoading } = useGetAllPropertiesQuery(undefined);
  const [createProperty, { isLoading: isCreating }] = useCreatePropertyMutation();
  const [updateProperty, { isLoading: isUpdating }] = useUpdatePropertyMutation();
  const [deleteProperty, { isLoading: isDeleting }] = useDeletePropertyMutation();

  useEffect(() => {
    if (property) {
      setFormData({
        id: property.id,
        name: property.name,
        location: property.location,
        description: property.description || '',
      });
    }
  }, [property]);

  useEffect(() => {
    if (properties) {
      const localKeys = Object.keys(localStorage).filter((key) => key.startsWith('property_'));
      localKeys.forEach((key) => {
        const id = key.replace('property_', '');
        if (!properties.some((prop: Property) => prop.id === id)) {
          localStorage.removeItem(key);
        }
      });
    }
  }, [properties]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateProperty = async () => {
    if (!formData.name || !formData.location || !formData.description) {
      setMessage('All fields must not be empty.');
      return;
    }
    try {
      await createProperty(formData).unwrap();
      setMessage('Property created successfully!');
      setFormData({ id: '', name: '', location: '', description: '' });
      refetchAllProperties();
    } catch {
      setMessage('Failed to create property.');
    }
  };

  const handleUpdateProperty = async () => {
    try {
      await updateProperty({ propertyId, propertyData: formData }).unwrap();
      setMessage('Property updated successfully!');
      refetchAllProperties();
    } catch {
      setMessage('Failed to update property.');
    }
  };

  const handleDeleteProperty = async () => {
    try {
      await deleteProperty(propertyId).unwrap();
      setMessage('Property deleted successfully!');
      setPropertyId('');
      setFormData({ id: '', name: '', location: '', description: '' });
      localStorage.removeItem(`property_${propertyId}`);
      refetchAllProperties();
    } catch {
      setMessage('Failed to delete property.');
    }
  };

  const handleNavigateToUnits = (propertyId: string) => {
    navigate(`/units/${propertyId}`); // Navigate to the Units page for the specific property
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Properties Management</h1>
      {message && <p className="text-sm text-green-500 mb-4">{message}</p>}

      <div className="mb-6">
        <input
          type="text"
          placeholder="Property ID"
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
          className="border p-2 mr-2 rounded w-1/2"
        />
        <button
          onClick={() => refetch()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Get Property
        </button>
        <button
          onClick={() => refetchAllProperties()}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 ml-2"
        >
          Fetch All Properties
        </button>
      </div>

      {isFetching && <Spinner />}
      {isError && propertyId && <p className="text-red-500">Property not found.</p>}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Properties</h2>
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

      <div className="mb-6">
        <h2 className="text-xl font-semibold">Create/Update Property</h2>
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={formData.name}
          onChange={handleInputChange}
          className="border p-2 mb-2 block w-full rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleInputChange}
          className="border p-2 mb-2 block w-full rounded"
        />
        <textarea
          name="description"
          placeholder="Property Description"
          value={formData.description}
          onChange={handleInputChange}
          className="border p-2 mb-2 block w-full rounded h-24"
        />
        <div className="flex gap-4">
          <button
            onClick={handleCreateProperty}
            disabled={isCreating}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {isCreating ? <Spinner /> : 'Create'}
          </button>
          <button
            onClick={handleUpdateProperty}
            disabled={isUpdating}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            {isUpdating ? <Spinner /> : 'Update'}
          </button>
          <button
            onClick={handleDeleteProperty}
            disabled={isDeleting}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            {isDeleting ? <Spinner /> : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;