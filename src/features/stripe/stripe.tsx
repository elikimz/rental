// PaymentPage.tsx
import React, { useState } from 'react';
import { useCreatePaymentMutation } from '../stripe/stripeAPI';
import { toast } from 'react-toastify';

const PaymentPage: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [createPayment] = useCreatePaymentMutation();

  const handlePayment = async () => {
    try {
      const response = await createPayment({ amount_paid: amount }).unwrap();
      if (response.checkout_url) {
        toast.success('Redirecting to payment...');
        window.location.href = response.checkout_url;
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Payment</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Enter amount"
        className="w-full p-3 border"
      />
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 mt-4"
      >
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;

// Let me know if you want to add payment status tracking or anything else! 🚀
