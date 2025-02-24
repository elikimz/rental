const API_URL = "https://rentals-dxd5gdg2c0a8dhdt.southafricanorth-01.azurewebsites.net";

export const createPayment = async (amountPaid: number) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage

    const response = await fetch(`${API_URL}/payments/pay`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Send token in header
        },
        body: JSON.stringify({ amount_paid: amountPaid }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Payment failed");
    }

    return await response.json();
};
