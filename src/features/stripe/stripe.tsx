import { useState } from "react";
import { createPayment } from "./stripeAPI";

const Payment = () => {
    const [amount, setAmount] = useState<number>(0);
    const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePayment = async () => {
        try {
            const paymentResponse = await createPayment(amount);
            setCheckoutUrl(paymentResponse.checkout_url);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">Make a Payment</h1>
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                className="border p-2 mb-4 w-full"
            />
            <button
                onClick={handlePayment}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Pay with Stripe
            </button>

            {checkoutUrl && (
                <div className="mt-4">
                    <p>Payment created! Click below to complete:</p>
                    <a
                        href={checkoutUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        Go to Checkout
                    </a>
                </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default Payment;
