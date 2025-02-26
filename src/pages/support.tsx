import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaCheckCircle } from "react-icons/fa";

const SupportPage: React.FC = () => {
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmitTicket = () => {
    if (!ticketSubject || !ticketDescription) return;
    
    // Simulate ticket submission
    setTimeout(() => {
      setSuccessMessage("Your support ticket has been submitted successfully!");
      setTicketSubject("");
      setTicketDescription("");
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tenant Support</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Submit a Support Ticket</h2>
          {successMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4">
              <FaCheckCircle className="inline mr-2" /> {successMessage}
            </div>
          )}
          <input
            type="text"
            placeholder="Subject"
            value={ticketSubject}
            onChange={(e) => setTicketSubject(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <textarea
            placeholder="Describe your issue or request..."
            value={ticketDescription}
            onChange={(e) => setTicketDescription(e.target.value)}
            rows={5}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <button
            onClick={handleSubmitTicket}
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
          >
            Submit Ticket
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="mb-4">
            <FaEnvelope className="inline mr-2 text-blue-500" />
            <span>support@rentalmanager.com</span>
          </div>
          <div className="mb-4">
            <FaPhoneAlt className="inline mr-2 text-green-500" />
            <span>+254 712 345 678</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="mb-4">
          <h3 className="font-semibold">How do I pay my rent?</h3>
          <p>Rent payments can be made through the tenant dashboard using M-Pesa or card payments.</p>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold">How do I track my ticket status?</h3>
          <p>You can view the status of your submitted tickets in the "Support History" section of your dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;

// Let me know if you’d like me to add a ticket history section or more features! 🚀
