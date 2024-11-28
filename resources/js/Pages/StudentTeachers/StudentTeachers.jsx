import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddStudentTeacherModal from "@/Components/AddStudentTeacherModal";
import axios from "axios";

export default function StudentTeachers() {
    const [studentTeachers, setStudentTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    // Fetch student teachers from the API
    useEffect(() => {
        const fetchStudentTeachers = async () => {
            try {
                const response = await axios.get("/api/student-teachers");
                setStudentTeachers(response.data);
                setFilteredTeachers(response.data);
            } catch (error) {
                console.error("Error fetching student teachers:", error);
            }
        };
        fetchStudentTeachers();
    }, []);

    // Filter student teachers when search query or status filter changes
    useEffect(() => {
        const filtered = studentTeachers.filter((teacher) => {
            const matchesSearch = teacher.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesStatus =
                statusFilter === "" || teacher.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
        setFilteredTeachers(filtered);
    }, [searchQuery, statusFilter, studentTeachers]);

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
                            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                                <h1 className="text-xl font-semibold text-gray-700 mb-4 md:mb-0">
                                    Student Teachers
                                </h1>
                                <div className="flex flex-col md:flex-row gap-4 items-center">
                                    <input
                                        type="text"
                                        placeholder="Search by name"
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
                                        <option value="not_blacklisted">
                                            Not Blacklisted
                                        </option>
                                        <option value="blacklisted">
                                            Blacklisted
                                        </option>
                                    </select>
                                    <button
                                        onClick={() => setModalOpen(true)}
                                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                    >
                                        Add Student Teacher
                                    </button>
                                </div>
                            </div>
                            <table className="w-full border-collapse border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left p-4 border border-gray-200">
                                            Name
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Email
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Course
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTeachers.map((teacher) => (
                                        <tr
                                            key={teacher.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="p-4">
                                                {teacher.name}
                                            </td>
                                            <td className="p-4">
                                                {teacher.email}
                                            </td>
                                            <td className="p-4">
                                                {teacher.course}
                                            </td>
                                            <td className="p-4">
                                                <span
                                                    className={`px-2 py-1 text-sm rounded-lg ${
                                                        teacher.status ===
                                                        "blacklisted"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-green-100 text-green-600"
                                                    }`}
                                                >
                                                    {teacher.status ===
                                                    "blacklisted"
                                                        ? "Blacklisted"
                                                        : "Not Blacklisted"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredTeachers.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="4"
                                                className="text-center p-4 text-gray-500"
                                            >
                                                No student teachers found.
                                            </td>
                                        </tr>
                                    )}
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
