import { useState } from "react";
import AddSchoolModal from "@/Components/AddSchoolModal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";
/**
 * Page to display a list of schools.
 *
 * @returns {JSX.Element} The component.
 */
export default function Schools({ schools }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Schools, setSchools] = useState();

    const handleAddSchoolClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddSchoolSubmit = async (schoolData) => {
        try {
            const response = await axios.post("/api/schools", {
                name: schoolData.schoolName,
                location: schoolData.location,
                email: schoolData.email,
                status: schoolData.status,
            });
            console.log("School added successfully:", response.data);
            setSchools([...schools, newSchool])
            onClose();
        } catch (error) {
            console.error("Error adding school:", error);
            alert("Failed to add school. Please try again.");
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Schools
                </h2>
            }
        >
            <Head title="Schools" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl font-semibold text-gray-700">
                                    Schools List
                                </h1>
                                <button
                                    onClick={handleAddSchoolClick}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                >
                                    Add School
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-6">
                                A list of all the schools in your account
                                including their name, location, and status.
                            </p>
                            <table className="w-full border-collapse border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left p-4 border border-gray-200">
                                            School Name
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Location
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Status
                                        </th>
                                        <th className="p-4 border border-gray-200">
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {schools.map((school) => (
                                        <tr
                                            key={school.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="p-4 flex items-center">
                                                <div>
                                                    <p className="font-medium text-gray-700">
                                                        {school.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {school.email}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <p className="font-medium text-gray-700">
                                                    {school.location}
                                                </p>
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`bg-${
                                                        school.status ===
                                                        "active"
                                                            ? "green"
                                                            : "gray"
                                                    }-100 text-${
                                                        school.status ===
                                                        "active"
                                                            ? "green"
                                                            : "gray"
                                                    }-600 text-sm px-2 py-1 rounded-lg`}
                                                >
                                                    {school.status === "active"
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-purple-600 font-medium cursor-pointer">
                                                Edit
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add School Modal */}
            <AddSchoolModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleAddSchoolSubmit}
            />
        </AuthenticatedLayout>
    );
}
