import React, { useState } from "react";
import {
  useGetAllUnitsQuery,
  useCreateUnitMutation,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} from "../features/units/unitsAPI";
import { jwtDecode } from "jwt-decode";

const UnitManagementPage: React.FC = () => {
  const token = localStorage.getItem("token");
  const decodedToken: any = token ? jwtDecode(token) : null;
  const role = decodedToken?.role;

  const { data: units, isLoading, error, refetch } = useGetAllUnitsQuery();
  const [createUnit] = useCreateUnitMutation();
  // eslint-disable-next-line no-empty-pattern
  const [] = useUpdateUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();

  const [formData, setFormData] = useState({ name: "", status: "Available" });
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateUnit = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await createUnit(formData).unwrap();
      refetch();
      setMessage({ type: 'success', text: "Unit created successfully!" });
      setFormData({ name: "", status: "Available" });
    } catch (error: any) {
      setMessage({ type: 'error', text: error?.data?.detail || "Failed to create unit" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUnit = async (unitId: number) => {
    if (!confirm("Are you sure you want to delete this unit?")) return;
    try {
      await deleteUnit(unitId).unwrap();
      refetch();
    } catch (error: any) {
      setMessage({ type: 'error', text: error?.data?.detail || "Failed to delete unit" });
    }
  };

  if (isLoading) return <div>Loading units...</div>;
  if (error) return <div>Error loading units</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Unit Management</h2>
      {message && (
        <div className={`p-4 mb-4 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}

      {role === "Admin" && (
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Unit Name"
            className="w-full p-3 border"
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
          <button
            type="button"
            onClick={handleCreateUnit}
            className={`bg-blue-500 text-white px-6 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
            disabled={loading}
          >
            {loading ? "Creating Unit..." : "Create Unit"}
          </button>
        </form>
      )}

      <h3 className="text-2xl font-semibold mt-8">Existing Units</h3>
      <ul className="mt-4">
        {units?.map((unit: any) => (
          <li key={unit.id} className="p-4 border-b">
            <p>Unit ID: {unit.id}</p>
            <p>Name: {unit.name}</p>
            <p>Status: {unit.status}</p>
            {role === "Admin" && (
              <button
                onClick={() => handleDeleteUnit(unit.id)}
                className="text-red-500 hover:underline mt-2"
              >
                Delete Unit
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UnitManagementPage;

// Let me know if you want me to refine anything! 🚀


