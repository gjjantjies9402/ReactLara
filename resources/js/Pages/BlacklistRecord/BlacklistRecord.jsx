import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddBlacklistedModal from "@/Components/AddBlacklistedModal";
import axios from "axios";

export default function BlacklistRecord() {
    const [blacklisted, setBlacklisted] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    // Fetch blacklisted data from the API
    useEffect(() => {
        const fetchBlacklisted = async () => {
            try {
                const response = await axios.get("/api/blacklisted");
                setBlacklisted(response.data);
            } catch (error) {
                console.error("Error fetching blacklisted data:", error);
            }
        };
        fetchBlacklisted();
    }, []);

    const handleAddBlacklisted = (newBlacklisted) => {
        setBlacklisted((prev) => [...prev, newBlacklisted]);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Blacklisted
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl font-semibold text-gray-700">Blacklisted</h1>
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                >
                                    Add to Blacklist
                                </button>
                            </div>
                            <table className="w-full border-collapse border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left p-4 border border-gray-200">Name</th>
                                        <th className="text-left p-4 border border-gray-200">Email</th>
                                        <th className="text-left p-4 border border-gray-200">Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blacklisted.map((person) => (
                                        <tr key={person.id} className="hover:bg-gray-50">
                                            <td className="p-4">{person.name}</td>
                                            <td className="p-4">{person.email}</td>
                                            <td className="p-4">{person.reason}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <AddBlacklistedModal
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleAddBlacklisted}
                />
            )}
        </AuthenticatedLayout>
    );
}
