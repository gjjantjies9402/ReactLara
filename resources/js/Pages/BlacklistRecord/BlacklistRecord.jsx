import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import axios from "axios";
import Select from "react-select"; // Install using `npm install react-select`

export default function BlacklistRecord({ blacklistedRecords }) {
    const [blacklistedRecord, setBlacklistedRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState(blacklistedRecords);
    const [selectedName, setSelectedName] = useState(null); // Selected option from the dropdown
    const [statusFilter, setStatusFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [newRecord, setNewRecord] = useState({
        name: "",
        reason: "",
        date: "",
        status: "temporary", // Default status
    });
    const [toastMessage, setToastMessage] = useState(""); // Toast notification

    // Fetch blacklisted records from the API
    useEffect(() => {
        const fetchBlacklistedRecords = async () => {
            try {
                const response = await axios.get("/api/blacklisted");
                if (Array.isArray(response.data)) {
                    setBlacklistedRecords(response.data);
                } else {
                    console.error(
                        "Response data is not an array:",
                        response.data
                    );
                }
            } catch (error) {
                console.error("Error fetching blacklisted records:", error);
            }
        };
        fetchBlacklistedRecords();
    }, []);

    // Filter blacklisted records based on name and status
    useEffect(() => {
        const filtered = Array.isArray(blacklistedRecords)
            ? blacklistedRecords.filter((record) => {
                  const matchesName =
                  record.reason
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                  record.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase());
                  const matchesStatus =
                      statusFilter === "" || record.status === statusFilter;

                  return matchesName && matchesStatus;
              })
            : [];
        setFilteredRecords(filtered);
    }, [selectedName, statusFilter, blacklistedRecords]);

    const handleAddRecord = async () => {
        try {
            const response = await axios.post("/api/blacklisted", newRecord);
            const updatedRecords = [...blacklistedRecords, response.data];
            setBlacklistedRecords(updatedRecords);
            setIsModalOpen(false); // Close the modal after adding
            setNewRecord({
                name: "",
                reason: "",
                date: "",
                status: "temporary",
            }); // Reset form
        } catch (error) {
            console.error("Error adding new record:", error);
        }
    };

    const handleCsvUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await axios.post(
                "/upload-csv-blacklist",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setToastMessage("CSV upload completed successfully!");
            const blacklistedResponse = await axios.get("/api/blacklisted");
            setBlacklistedRecords(blacklistedResponse.data);
            setFilteredRecords(blacklistedResponse.data);
        } catch (error) {
            console.log("Error uploading CSV:", error.response || error);
            setToastMessage("CSV upload failed. Please try again.");
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Blacklisted Records
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Header Section */}
                            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                                <h1 className="text-xl font-semibold text-gray-700 mb-4 md:mb-0">
                                    Blacklisted Records
                                </h1>
                                <div className="flex flex-col md:flex-row gap-4 items-center">
                                <input
                                        type="text"
                                        placeholder="Search by name or location"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="p-2 border border-gray-300 rounded-lg"
                                    />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) =>
                                            setStatusFilter(e.target.value)
                                        }
                                        className="p-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">All Statuses</option>
                                        <option value="permanent">
                                            Permanent
                                        </option>
                                        <option value="temporary">
                                            Temporary
                                        </option>
                                    </select>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        Add Blacklisted Record
                                    </button>
                                    <form
                                        id="csvUploadForm"
                                        onSubmit={handleCsvUpload}
                                        encType="multipart/form-data"
                                        className="flex items-center gap-2"
                                    >
                                        <input
                                            type="file"
                                            name="csv_file"
                                            accept=".csv"
                                            required
                                            className="border border-gray-300 rounded-lg p-2"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                        >
                                            Upload CSV
                                        </button>
                                    </form>
                                </div>
                            </div>

                            {/* Table Section */}
                            <table className="w-full border-collapse border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left p-4 border border-gray-200">
                                            Name
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Reason
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Date Blacklisted
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(filteredRecords) &&
                                    filteredRecords.length > 0 ? (
                                        filteredRecords.map((record) => (
                                            <tr
                                                key={record.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="p-4">
                                                    {record.name}
                                                </td>
                                                <td className="p-4">
                                                    {record.reason}
                                                </td>
                                                <td className="p-4">
                                                    {new Date(
                                                        record.date
                                                    ).toLocaleDateString()}
                                                </td>
                                                <td className="p-4">
                                                    <span
                                                        className={`px-2 py-1 text-sm rounded-lg ${
                                                            record.status ===
                                                            "permanent"
                                                                ? "bg-red-100 text-red-600"
                                                                : "bg-yellow-100 text-yellow-600"
                                                        }`}
                                                    >
                                                        {record.status ===
                                                        "permanent"
                                                            ? "Permanent"
                                                            : "Temporary"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center p-4 text-gray-500"
                                            >
                                                No backlisted records found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for adding new record */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-4">
                            Add Blacklisted Record
                        </h3>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleAddRecord();
                            }}
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={newRecord.name}
                                    onChange={(e) =>
                                        setNewRecord({
                                            ...newRecord,
                                            name: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Reason
                                </label>
                                <input
                                    type="text"
                                    value={newRecord.reason}
                                    onChange={(e) =>
                                        setNewRecord({
                                            ...newRecord,
                                            reason: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Date
                                </label>
                                <input
                                    type="date"
                                    value={newRecord.date}
                                    onChange={(e) =>
                                        setNewRecord({
                                            ...newRecord,
                                            date: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    value={newRecord.status}
                                    onChange={(e) =>
                                        setNewRecord({
                                            ...newRecord,
                                            status: e.target.value,
                                        })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="temporary">Temporary</option>
                                    <option value="permanent">Permanent</option>
                                </select>
                            </div>
                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Add
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
