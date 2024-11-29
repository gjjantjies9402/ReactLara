import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddSchoolModal from "@/Components/AddSchoolModal";
import axios from "axios";
import NavLink from "@/Components/NavLink";

export default function Schools({ schools: initialSchools }) {
    const [schools, setSchools] = useState(initialSchools); // Updated state name
    const [filteredSchools, setFilteredSchools] = useState(initialSchools);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [isCardView, setIsCardView] = useState(true);

    const toggleView = () => {
        setIsCardView((prevView) => !prevView);
    };

    // Fetch schools from the API if not passed as prop
    useEffect(() => {
        if (!initialSchools || initialSchools.length === 0) {
            const fetchSchools = async () => {
                try {
                    const response = await axios.get("/api/schools");
                    if (Array.isArray(response.data)) {
                        setSchools(response.data);
                        setFilteredSchools(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching schools:", error);
                }
            };
            fetchSchools();
        }
    }, [initialSchools]);

    // Filter schools based on search query and status filter
    useEffect(() => {
        const filtered = schools.filter((school) => {
            const matchesSearch =
                school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                school.location
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            const matchesStatus =
                statusFilter === "" || school.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
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
            console.error("Error adding new school:", error);
            setToastMessage("Failed to add the school. Please try again.");
        }
    };

    // Handle CSV file upload
    const handleCsvUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        try {
            await axios.post("/upload-csv", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setToastMessage("CSV upload completed successfully!");
            const response = await axios.get("/api/schools");
            setSchools(response.data);
            setFilteredSchools(response.data);
        } catch (error) {
            console.error("Error uploading CSV:", error);
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
                            <div>
                                {/* Toggle View Button */}
                                <div className="flex justify-between items-center mb-4">
                                    <button
                                        onClick={toggleView}
                                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                    >
                                        {isCardView
                                            ? "Switch to Table View"
                                            : "Switch to Card View"}
                                    </button>
                                </div>

                                {/* Conditional Rendering: Card View or Table View */}
                                {isCardView ? (
                                    // Card View
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {filteredSchools.length > 0 ? (
                                            filteredSchools.map((school) => (
                                                <div
                                                    key={school.id}
                                                    className="border p-4 rounded-lg shadow-md"
                                                >
                                                    <h3 className="font-semibold text-lg">
                                                        {school.name}
                                                    </h3>
                                                    <div className="text-sm text-gray-600">
                                                        <strong>
                                                            Location:
                                                        </strong>{" "}
                                                        {school.location}
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        <strong>Email:</strong>{" "}
                                                        {school.email}
                                                    </div>
                                                    <span
                                                        className={`inline-block px-3 py-1 text-sm rounded-lg ${
                                                            school.status ===
                                                            "active"
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-red-100 text-red-600"
                                                        }`}
                                                    >
                                                        {school.status ===
                                                        "active"
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-full text-center text-gray-500">
                                                No schools found.
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // Table View
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
                                            <thead>
                                                <tr className="bg-gray-50">
                                                    <th className="text-left p-4 border border-gray-200">
                                                        Name
                                                    </th>
                                                    <th className="text-left p-4 border border-gray-200">
                                                        Location
                                                    </th>
                                                    <th className="text-left p-4 border border-gray-200">
                                                        Email
                                                    </th>
                                                    <th className="text-left p-4 border border-gray-200">
                                                        Status
                                                    </th>
                                                    <th className="text-left p-4 border border-gray-200">
                                                        Update
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredSchools.length > 0 ? (
                                                    filteredSchools.map(
                                                        (school) => (
                                                            <tr key={school.id}>
                                                                <td className="p-4 border border-gray-200">
                                                                    {
                                                                        school.name
                                                                    }
                                                                </td>

                                                                <td className="p-4 border border-gray-200">
                                                                    {
                                                                        school.location
                                                                    }
                                                                </td>
                                                                <td className="p-4 border border-gray-200">
                                                                    {
                                                                        school.email
                                                                    }
                                                                </td>
                                                                <td className="p-4 border border-gray-200">
                                                                    <span
                                                                        className={`px-2 py-1 text-sm rounded-lg ${
                                                                            school.status ===
                                                                            "active"
                                                                                ? "bg-green-100 text-green-600"
                                                                                : "bg-red-100 text-red-600"
                                                                        }`}
                                                                    >
                                                                        {school.status ===
                                                                        "active"
                                                                            ? "Active"
                                                                            : "Inactive"}
                                                                    </span>
                                                                </td>
                                                                <td className="p-4 border border-gray-200">
                                                                    <NavLink
                                                                        href={route(
                                                                            "schools.edit",
                                                                            {
                                                                                school: school.id,
                                                                            }
                                                                        )}
                                                                        active={route().current(
                                                                            "schools.edit"
                                                                        )}
                                                                    >
                                                                        Edit
                                                                    </NavLink>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            colSpan="4"
                                                            className="text-center p-4 text-gray-500"
                                                        >
                                                            No schools found.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
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
