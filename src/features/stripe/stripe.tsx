import React, { useState } from 'react';
import { useCreatePaymentMutation } from './stripeAPI';

const Payment: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const [createPayment, { isLoading, error }] = useCreatePaymentMutation();

  const handlePayment = async () => {
    try {
      const response = await createPayment({ amount_paid: amount }).unwrap();
      if (response.checkout_url) {
        window.location.href = response.checkout_url; // Redirect to Stripe Checkout
      }
    } catch (err) {
      console.error('Payment error:', err);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Make a Payment</h1>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        className="border p-2 mb-4 w-64"
      />
      <button
        onClick={handlePayment}
        disabled={isLoading || amount <= 0}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        {isLoading ? 'Processing...' : 'Pay with Stripe'}
      </button>
      {error && <p className="text-red-500 mt-4">Payment failed. Try again.</p>}
    </div>
  );
};

export default Payment;
