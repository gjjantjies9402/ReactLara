import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import axios from "axios";

export default function StudentTeacherEdit({ studentTeacher }) {
    const [studentTeacherData, setStudentTeacherData] =
        useState(studentTeacher);
    const [schools, setSchools] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch linked schools data
    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get(
                    `/api/student-teachers/${studentTeacher.id}/schools`
                );
                setSchools(response.data);
            } catch (error) {
                console.error("Error fetching schools:", error);
            }
        };

        fetchSchools();
    }, [studentTeacher.id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `/api/student-teachers/${studentTeacher.id}`,
                studentTeacherData
            );
            setStudentTeacherData(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating student teacher:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentTeacherData({ ...studentTeacherData, [name]: value });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Edit Student Teacher
                </h2>
            }
        >
            <Head title="Edit Student Teacher" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        {/* Update Profile Form */}
                        <div className="max-w-xl">
                            <h3 className="text-lg font-semibold">
                                Student Teacher Information
                            </h3>
                            {isEditing ? (
                                <form onSubmit={handleUpdate}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={studentTeacherData.name}
                                        onChange={handleChange}
                                        className="p-2 border border-gray-300 rounded mb-2"
                                        placeholder="Name"
                                    />
                                    <input
                                        type="text"
                                        name="province"
                                        value={studentTeacherData.province}
                                        onChange={handleChange}
                                        className="p-2 border border-gray-300 rounded mb-2"
                                        placeholder="Province"
                                    />
                                    <input
                                        type="text"
                                        name="status"
                                        value={studentTeacherData.status}
                                        onChange={handleChange}
                                        className="p-2 border border-gray-300 rounded mb-2"
                                        placeholder="Status"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Save Changes
                                    </button>
                                </form>
                            ) : (
                                <div>
                                    <p>
                                        <strong>Name:</strong>{" "}
                                        {studentTeacherData.name}
                                    </p>
                                    <p>
                                        <strong>Province:</strong>{" "}
                                        {studentTeacherData.province}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>{" "}
                                        {studentTeacherData.status}
                                    </p>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
                                    >
                                        Edit Information
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* List of Schools Linked to Student Teacher */}
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <h3 className="text-xl font-semibold">
                            Schools Linked to this Student Teacher
                        </h3>
                        {schools.length > 0 ? (
                            <table className="min-w-full table-auto mt-4 border-collapse border border-gray-200 rounded-lg">
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {schools.map((school) => (
                                        <tr key={school.id}>
                                            <td className="p-4 border border-gray-200">
                                                {school.name}
                                            </td>
                                            <td className="p-4 border border-gray-200">
                                                {school.location}
                                            </td>
                                            <td className="p-4 border border-gray-200">
                                                {school.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No schools found for this student teacher.</p>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
