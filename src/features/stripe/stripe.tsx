// import React, { useState } from 'react';
// import { useCreatePaymentMutation } from './stripeAPI';

// const Payment: React.FC = () => {
//   const [amount, setAmount] = useState<string>(''); // Start as an empty string
//   const [createPayment, { isLoading, error }] = useCreatePaymentMutation();

//   const handlePayment = async () => {
//     const amountNumber = parseFloat(amount); // Convert to number before sending
//     if (isNaN(amountNumber) || amountNumber <= 0) return;

//     try {
//       const response = await createPayment({ amount_paid: amountNumber }).unwrap();
//       if (response.checkout_url) {
//         window.location.href = response.checkout_url; // Redirect to Stripe Checkout
//       }
//     } catch (err) {
//       console.error('Payment error:', err);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-6">
//       <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
//       <input
//         type="number"
//         placeholder="Enter amount"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         className="border p-2 mb-4 w-64"
//       />
//       <button
//         onClick={handlePayment}
//         disabled={isLoading || !amount || parseFloat(amount) <= 0}
//         className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
//       >
//         {isLoading ? 'Processing...' : 'Pay with Stripe'}
//       </button>
//       {error && <p className="text-red-500 mt-4">Payment failed. Try again.</p>}
//     </div>
//   );
// };

// export default Payment;


import React, { useState } from 'react';
import { useCreatePaymentMutation } from './stripeAPI';

const Payment: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [createPayment, { isLoading, error }] = useCreatePaymentMutation();
  const [validationError, setValidationError] = useState<string | null>(null);

  const handlePayment = async () => {
    const amountNumber = parseFloat(amount);

    // Validate input
    if (isNaN(amountNumber) || amountNumber <= 0) {
      setValidationError('Please enter a valid amount greater than 0.');
      return;
    }

    setValidationError(null); // Clear validation errors

    try {
      const response = await createPayment({ amount_paid: amountNumber }).unwrap();
      if (response.checkout_url) {
        window.location.href = response.checkout_url; // Redirect to Stripe Checkout
      }
    } catch (err) {
      console.error('Payment processing failed:', err);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Make a Payment</h1>
      
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-300 p-2 mb-4 w-64 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        min="0.01"
        step="0.01"
      />

      {validationError && (
        <p className="text-red-500 text-sm mb-4">{validationError}</p>
      )}

      <button
        onClick={handlePayment}
        disabled={isLoading || !amount || parseFloat(amount) <= 0}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Pay with Stripe'}
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-4">
          Payment failed. Please try again or contact support.
        </p>
      )}
    </div>
  );
};

export default Payment;