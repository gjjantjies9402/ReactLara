import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddSchoolModal from "@/Components/AddSchoolModal"; 
import axios from "axios";

export default function Schools({ schools }) {
    const [school, setSchools] = useState([]);
    const [filteredSchools, setFilteredSchools] = useState(schools);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState(""); 
    const [selectedSchool, setSelectedSchool] = useState(null);
    // Fetch schools from the API
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get("/api/schools");
                console.log(response.data);
                if (Array.isArray(response.data)) {
                    setSchools(response.data);
                    console.log("Schools fetched successfully!", response.data);
                } else {
                    console.error(
                        "Response data is not an array:",
                        response.data
                    );
                }
            } catch (error) {
                console.error("Error fetching schools:", error);
            }
        };
        fetchSchools();
    }, []);

    useEffect(() => {
        const filtered = Array.isArray(schools)
            ? schools.filter((school) => {
                  const matchesSearch =
                      school.name
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                      school.location
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase());
                  const matchesStatus =
                      statusFilter === "" || school.status === statusFilter;

                  return matchesSearch && matchesStatus;
              })
            : [];

        setFilteredSchools(filtered);
    }, [searchQuery, statusFilter, schools]);

    const handleAddSchool = async (newSchool) => {
        try {
            const response = await axios.post("/api/schools", newSchool);
            setSchools((prev) => [...prev, response.data]);
            setFilteredSchools((prev) => [...prev, response.data]);
            setIsModalOpen(false); // Close the modal
            setToastMessage("School added successfully!");
        } catch (error) {
            console.log("Error adding new school:", error);
            setToastMessage("Failed to add the school?. Please try again.");
        }
    };

    // Handle CSV file upload
    const handleCsvUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            const response = await axios.post("/upload-csv", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setToastMessage("CSV upload completed successfully!");
            const schoolsResponse = await axios.get("/api/schools");
            setSchools(schoolsResponse.data);
            setFilteredSchools(schoolsResponse.data);
        } catch (error) {
            console.log("Error uploading CSV:", error.response || error);
            setToastMessage("CSV upload failed. Please try again.");
        }
    };

    // Close toast message after 3 seconds
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Schools
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
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
                                        <option value="active">Active</option>
                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                    >
                                        Add School
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
                                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                        >
                                            Upload CSV
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Array.isArray(filteredSchools) &&
                                filteredSchools.length > 0 ? (
                                    filteredSchools.map((school) => (
                                        <div
                                            key={school?.id}
                                            className="border border-gray-200 rounded-lg shadow-md p-4 bg-white hover:shadow-lg"
                                        >
                                            <div className="mb-2">
                                                <h3 className="font-semibold text-lg">
                                                    {school?.name}
                                                </h3>
                                            </div>
                                            <div className="mb-2 text-sm text-gray-600">
                                                <strong>Location:</strong>{" "}
                                                {school?.location}
                                            </div>
                                            <div className="mb-2 text-sm text-gray-600">
                                                <strong>Email:</strong>{" "}
                                                {school?.email}
                                            </div>
                                            <div>
                                                <span
                                                    className={`inline-block px-3 py-1 text-sm rounded-lg ${
                                                        school?.status ===
                                                        "active"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-red-100 text-red-600"
                                                    }`}
                                                >
                                                    {school?.status === "active"
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-500">
                                        No schools found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}
            <AddSchoolModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddSchool}
            />
        </AuthenticatedLayout>
    );
}
