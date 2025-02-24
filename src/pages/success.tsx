import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircleIcon } from "lucide-react";

const Success = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [message, setMessage] = useState("Verifying your payment...");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (sessionId) {
            fetch(`/api/payments/verify?session_id=${sessionId}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.status === "succeeded") {
                        setIsSuccess(true);
                        setMessage("Payment successful! 🎉 Thank you for your payment.");
                    } else {
                        setIsSuccess(false);
                        setMessage("Payment verification failed. Please contact support.");
                    }
                })
                .catch(() => {
                    setIsSuccess(false);
                    setMessage("Error verifying payment. Please try again.");
                });
        }
    }, [sessionId]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
            <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl text-center">
                {isSuccess ? (
                    <>
                        <CheckCircleIcon className="text-green-500 w-24 h-24 mx-auto mb-6" />
                        <h1 className="text-3xl font-bold mb-4">Success!</h1>
                        <p className="text-lg mb-6">{message}</p>
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded w-full" onClick={() => window.location.href = '/dashboard'}>
                            Go to Dashboard
                        </button>
                    </>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-4">Payment Status</h1>
                        <p className="text-lg mb-6">{message}</p>
                        <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-3 px-6 rounded w-full" onClick={() => window.location.href = '/billing'}>
                            Try Again
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Success;

// Let me know if you want any adjustments or extra animations! 🚀
