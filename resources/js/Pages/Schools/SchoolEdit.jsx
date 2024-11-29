import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/inertia-react"; 
import axios from "axios";

export default function SchoolEdit() {
    const { school } = usePage().props; 
    const [studentTeachers, setStudentTeachers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedSchool, setUpdatedSchool] = useState(school); 

    useEffect(() => {
        console.log(school);
        if (school) {
            const fetchStudentTeachers = async () => {
                try {
                    const response = await axios.get(
                        `/api/schools/${school.id}/student-teachers`
                    );
                    setStudentTeachers(response.data);
                } catch (error) {
                    console.error("Error fetching student teachers:", error);
                }
            };

            fetchStudentTeachers();
        }
    }, [school]);

    const handleUpdateSchool = async () => {
        try {
            const response = await axios.put(
                `/api/schools/${school.id}`,
                updatedSchool
            );
            setUpdatedSchool(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating school:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedSchool({ ...updatedSchool, [name]: value });
    };

    return (
        <div className="p-6">
            {school ? (
                <>
                    <h2 className="text-2xl font-bold mb-4">{school.name}</h2>

                    {/* Edit Form */}
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={updatedSchool.name}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded mb-2"
                            />
                            <input
                                type="text"
                                name="location"
                                value={updatedSchool.location}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded mb-2"
                            />
                            <input
                                type="email"
                                name="email"
                                value={updatedSchool.email}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded mb-2"
                            />
                            <button
                                onClick={handleUpdateSchool}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p>
                                <strong>Location:</strong> {school.location}
                            </p>
                            <p>
                                <strong>Email:</strong> {school.email}
                            </p>
                            <p>
                                <strong>Status:</strong>{" "}
                                {school.status === "active"
                                    ? "Active"
                                    : "Inactive"}
                            </p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
                            >
                                Edit School
                            </button>
                        </div>
                    )}

                    <h3 className="text-xl font-semibold mt-8">
                        Student Teachers
                    </h3>
                    <table className="min-w-full table-auto mt-4 border-collapse border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="text-left p-4 border border-gray-200">
                                    Name
                                </th>
                                <th className="text-left p-4 border border-gray-200">
                                    Province
                                </th>
                                <th className="text-left p-4 border border-gray-200">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentTeachers.length > 0 ? (
                                studentTeachers.map((teacher) => (
                                    <tr key={teacher.id}>
                                        <td className="p-4 border border-gray-200">
                                            {teacher.name}
                                        </td>
                                        <td className="p-4 border border-gray-200">
                                            {teacher.province}
                                        </td>
                                        <td className="p-4 border border-gray-200">
                                            <span
                                                className={`px-2 py-1 text-sm rounded-lg ${
                                                    teacher.status === "active"
                                                        ? "bg-green-100 text-green-600"
                                                        : "bg-red-100 text-red-600"
                                                }`}
                                            >
                                                {teacher.status === "active"
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="p-4 text-center text-gray-500"
                                    >
                                        No student teachers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
