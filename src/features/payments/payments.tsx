// import React, { useState } from "react";
// import {
//   useCreatePaymentMutation,
//   useGetAllPaymentsQuery,
//   useGetPaymentByIdQuery,
//   useUpdatePaymentMutation,
//   useDeletePaymentMutation,
// } from "./paymentsAPI";

// const PaymentComponent: React.FC = () => {
//   const {
//     data: payments,
//     isLoading,
//     error,
//     refetch,
//   } = useGetAllPaymentsQuery();

//   const [createPayment] = useCreatePaymentMutation();
//   const [updatePayment] = useUpdatePaymentMutation();
//   const [deletePayment] = useDeletePaymentMutation();

//   const [paymentId, setPaymentId] = useState("");
//   const [amountPaid, setAmountPaid] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState("");
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const { data: singlePayment } = useGetPaymentByIdQuery(paymentId, {
//     skip: !paymentId,
//   });

//   React.useEffect(() => {
//     if (singlePayment) {
//       setAmountPaid(singlePayment.amount_paid);
//       setPaymentStatus(singlePayment.payment_status);
//     }
//   }, [singlePayment]);

//   const handleCreatePayment = async () => {
//     if (!amountPaid || isNaN(Number(amountPaid))) {
//       setErrorMessage("Please enter a valid amount");
//       return;
//     }

//     try {
//       await createPayment({ amount_paid: Number(amountPaid), payment_status: paymentStatus }).unwrap();
//       setSuccessMessage("Payment created successfully");
//       setAmountPaid("");
//       setPaymentStatus("");
//       refetch();
//     } catch {
//       setErrorMessage("Failed to create payment");
//     }
//   };

//   const handleUpdatePayment = async () => {
//     if (!paymentId || isNaN(Number(paymentId))) {
//       setErrorMessage("Please enter a valid Payment ID");
//       return;
//     }

//     if (!amountPaid || isNaN(Number(amountPaid))) {
//       setErrorMessage("Please enter a valid amount");
//       return;
//     }

//     try {
//       await updatePayment({
//         id: Number(paymentId),
//         paymentData: { amount_paid: Number(amountPaid), payment_status: paymentStatus },
//       }).unwrap();
//       setSuccessMessage("Payment updated successfully");
//       setPaymentId("");
//       setAmountPaid("");
//       setPaymentStatus("");
//       refetch();
//     } catch {
//       setErrorMessage("Failed to update payment");
//     }
//   };

//   const handleDeletePayment = async (payment_id: number) => {
//     if (!payment_id) {
//       console.error("Error: Payment ID is undefined");
//       return;
//     }

//     console.log("Deleting payment with ID:", payment_id);

//     try {
//       await deletePayment(payment_id).unwrap();
//       setSuccessMessage(`Payment ${payment_id} deleted successfully`);
//       refetch();
//     } catch (error) {
//       console.error("Failed to delete payment:", error);
//       setErrorMessage(`Failed to delete payment: ${error.message}`);
//     }
//   };

//   if (isLoading) return <div className="text-center">Loading payments...</div>;
//   if (error) return <div className="text-center text-red-500">Error loading payments</div>;

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-3xl font-bold mb-6 text-center">Payments Management</h1>

//       {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
//       {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Create Payment</h2>
//         <input
//           type="number"
//           value={amountPaid}
//           onChange={(e) => setAmountPaid(e.target.value)}
//           placeholder="Amount Paid"
//           className="p-2 border border-gray-300 rounded-md"
//         />
//         <input
//           type="text"
//           value={paymentStatus}
//           onChange={(e) => setPaymentStatus(e.target.value)}
//           placeholder="Payment Status"
//           className="p-2 border border-gray-300 rounded-md"
//         />
//         <button
//           onClick={handleCreatePayment}
//           className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
//         >
//           Create Payment
//         </button>
//       </section>

//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Update Payment</h2>
//         <input
//           type="number"
//           value={paymentId}
//           onChange={(e) => setPaymentId(e.target.value)}
//           placeholder="Enter Payment ID"
//           className="p-2 border border-gray-300 rounded-md"
//         />

//         {singlePayment && (
//           <div className="mt-4">
//             <input
//               type="number"
//               value={amountPaid}
//               onChange={(e) => setAmountPaid(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md"
//             />
//             <input
//               type="text"
//               value={paymentStatus}
//               onChange={(e) => setPaymentStatus(e.target.value)}
//               className="p-2 border border-gray-300 rounded-md"
//             />
//             <button
//               onClick={handleUpdatePayment}
//               className="bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600"
//             >
//               Update Payment
//             </button>
//           </div>
//         )}
//       </section>

//       <section>
//         <h2 className="text-2xl font-semibold mb-4">All Payments</h2>
//         {payments?.map((payment) => (
//           <div key={payment.payment_id} className="p-4 border border-gray-300 rounded-md bg-gray-50 mb-4">
//             <p><strong>ID:</strong> {payment.payment_id}</p>
//             <p><strong>Amount Paid:</strong> {payment.amount_paid}</p>
//             <p><strong>Status:</strong> {payment.payment_status}</p>
//             <button
//               onClick={() => handleDeletePayment(payment.payment_id)}
//               className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mt-2"
//             >
//               Delete Payment
//             </button>
//           </div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default PaymentComponent;

import React, { useState, useEffect } from "react";
import {
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} from "./paymentsAPI";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

const PaymentComponent: React.FC = () => {
  const { data: payments, isLoading, error, refetch } = useGetAllPaymentsQuery();
  const [createPayment] = useCreatePaymentMutation();
  const [updatePayment] = useUpdatePaymentMutation();
  const [deletePayment] = useDeletePaymentMutation();

  const [paymentId, setPaymentId] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: singlePayment } = useGetPaymentByIdQuery(paymentId, { skip: !paymentId });

  useEffect(() => {
    if (singlePayment) {
      setAmountPaid(singlePayment.amount_paid);
      setPaymentStatus(singlePayment.payment_status);
    }
  }, [singlePayment]);

  const handleCreatePayment = async () => {
    if (!amountPaid || isNaN(Number(amountPaid))) {
      setErrorMessage("Please enter a valid amount");
      return;
    }

    try {
      await createPayment({ amount_paid: Number(amountPaid), payment_status: paymentStatus }).unwrap();
      setSuccessMessage("Payment created successfully");
      setAmountPaid("");
      setPaymentStatus("");
      refetch();
    } catch {
      setErrorMessage("Failed to create payment");
    }
  };

  const handleUpdatePayment = async () => {
    if (!paymentId || isNaN(Number(paymentId)) || !amountPaid || isNaN(Number(amountPaid))) {
      setErrorMessage("Please enter valid values");
      return;
    }

    try {
      await updatePayment({
        id: Number(paymentId),
        paymentData: { amount_paid: Number(amountPaid), payment_status: paymentStatus },
      }).unwrap();
      setSuccessMessage("Payment updated successfully");
      setPaymentId("");
      setAmountPaid("");
      setPaymentStatus("");
      refetch();
    } catch {
      setErrorMessage("Failed to update payment");
    }
  };

  const handleDeletePayment = async (payment_id: number) => {
    try {
      await deletePayment(payment_id).unwrap();
      setSuccessMessage(`Payment ${payment_id} deleted successfully`);
      refetch();
    } catch {
      setErrorMessage("Failed to delete payment");
    }
  };

  if (isLoading) return <div className="text-center">Loading payments...</div>;
  if (error) return <div className="text-center text-red-500">Error loading payments</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Payments Management</h1>

      {errorMessage && <div className="text-red-500 text-center">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 text-center">{successMessage}</div>}

      {/* Payment Chart - NOW PLACED HIGHER */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-center mb-4">Payments Overview</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={payments} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="payment_id" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#fff", borderRadius: "8px", borderColor: "#ccc" }} />
            <Legend verticalAlign="top" height={30} />
            <Bar dataKey="amount_paid" fill="#4CAF50" barSize={30} radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Create Payment */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Create Payment</h2>
        <input
          type="number"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
          placeholder="Amount Paid"
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          placeholder="Payment Status"
          className="p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleCreatePayment}
          className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
        >
          Create Payment
        </button>
      </section>

      {/* Update Payment */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Update Payment</h2>
        <input
          type="number"
          value={paymentId}
          onChange={(e) => setPaymentId(e.target.value)}
          placeholder="Enter Payment ID"
          className="p-2 border border-gray-300 rounded-md"
        />
        <button className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600">
          Get Payment
        </button>

        {singlePayment && (
          <div className="mt-4">
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleUpdatePayment}
              className="bg-yellow-500 text-white p-3 rounded-md hover:bg-yellow-600"
            >
              Update Payment
            </button>
          </div>
        )}
      </section>

      {/* All Payments List */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Payments</h2>
        {payments?.map((payment) => (
          <div key={payment.payment_id} className="p-4 border border-gray-300 rounded-md bg-gray-50 mb-4">
            <p><strong>ID:</strong> {payment.payment_id}</p>
            <p><strong>Amount Paid:</strong> {payment.amount_paid}</p>
            <p><strong>Status:</strong> {payment.payment_status}</p>
            <button
              onClick={() => handleDeletePayment(payment.payment_id)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 mt-2"
            >
              Delete Payment
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PaymentComponent;
