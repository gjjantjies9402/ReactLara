import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddStudentTeacherModal from "@/Components/AddStudentTeacherModal";
import axios from "axios";

export default function StudentTeachers() {
    const [studentTeachers, setStudentTeachers] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    // Fetch student teachers from the API
    useEffect(() => {
        const fetchStudentTeachers = async () => {
            try {
                const response = await axios.get("/api/student-teachers");
                setStudentTeachers(response.data);
            } catch (error) {
                console.error("Error fetching student teachers:", error);
            }
        };
        fetchStudentTeachers();
    }, []);

    const handleAddStudentTeacher = (newStudentTeacher) => {
        setStudentTeachers((prev) => [...prev, newStudentTeacher]);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Student Teachers
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl font-semibold text-gray-700">
                                    Student Teachers
                                </h1>
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                >
                                    Add Student Teacher
                                </button>
                            </div>
                            <table className="w-full border-collapse border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left p-4 border border-gray-200">Name</th>
                                        <th className="text-left p-4 border border-gray-200">Email</th>
                                        <th className="text-left p-4 border border-gray-200">Course</th>
                                        <th className="text-left p-4 border border-gray-200">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentTeachers.map((teacher) => (
                                        <tr key={teacher.id} className="hover:bg-gray-50">
                                            <td className="p-4">{teacher.name}</td>
                                            <td className="p-4">{teacher.email}</td>
                                            <td className="p-4">{teacher.course}</td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2 py-1 text-sm rounded-lg ${
                                                        teacher.status === "blacklisted"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-green-100 text-green-600"
                                                    }`}
                                                >
                                                    {teacher.status === "blacklisted"
                                                        ? "Blacklisted"
                                                        : "Not Blacklisted"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <AddStudentTeacherModal
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleAddStudentTeacher}
                />
            )}
        </AuthenticatedLayout>
    );
}
