import { useState } from "react";
import axios from "axios";

/**
 * Modal component to add a new blacklisted individual.
 *
 * @param {Function} onClose - Function to close the modal.
 * @param {Function} onSubmit - Function to handle form submission.
 * @returns {JSX.Element} The modal component.
 */
export default function AddBlacklistedModal({ onClose, onSubmit }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [reason, setReason] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const blacklistedData = {
            name,
            email,
            reason,
        };

        try {
            await axios.post("/api/blacklisted", blacklistedData);
            onSubmit(blacklistedData); // Call onSubmit with the new blacklisted data
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error adding blacklisted individual:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">Add Blacklisted Individual</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Reason</label>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
