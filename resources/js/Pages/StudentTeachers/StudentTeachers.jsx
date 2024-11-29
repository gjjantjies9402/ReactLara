import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddStudentTeacherModal from "@/Components/AddStudentTeacherModal";
import axios from "axios";

export default function StudentTeachers({ studentTeachers }) {
    const [studentTeacher, setStudentTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState(studentTeachers);
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [toastMessage, setToastMessage] = useState(""); // Toast notification

    // Fetch student teachers from the API
    useEffect(() => {
        const fetchStudentTeachers = async () => {
            try {
                const response = await axios.get("/api/student-teachers");
                if (Array.isArray(response.data)) {
                    setStudentTeachers(response.data);
                    // setFilteredTeachers(response.data);
                } else {
                    console.error(
                        "Response data is not an array:",
                        response.data
                    );
                }
            } catch (error) {
                console.error("Error fetching student teachers:", error);
            }
        };
        fetchStudentTeachers();
    }, []);

    // Close toast message after 3 seconds
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(""), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);
    // Filter student teachers when search query or status filter changes
    useEffect(() => {
        const filtered = Array.isArray(studentTeachers)
            ? studentTeachers.filter((teacher) => {
                  const matchesSearch = teacher.first_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase());
                  const matchesStatus =
                      statusFilter === "" || teacher.status === statusFilter;

                  return matchesSearch && matchesStatus;
              })
            : [];
        setFilteredTeachers(filtered);
    }, [searchQuery, statusFilter, studentTeachers]);
    const handleCsvUpload = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        try {
            const response = await axios.post("/upload-csv-student", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setToastMessage("CSV upload completed successfully!");
            const studentTeachersResponse = await axios.get(
                "/api/student-teachers"
            );
            setStudentTeachers(studentTeachersResponse.data);
            setFilteredTeachers(studentTeachersResponse.data);
        } catch (error) {
            console.log("Error uploading CSV:", error.response || error);
            setToastMessage("CSV upload failed. Please try again.");
        }
    };

    const handleAddStudentTeacher = async (newStudentTeacher) => {
        try {
            const response = await axios.post(
                "/api/student-teachers",
                newStudentTeacher
            );
            setSchools((prev) => [...prev, response.data]);
            setFilteredTeachers((prev) => [...prev, response.data]);
            setModalOpen(false); // Close the modal
            setToastMessage("School added successfully!");
        } catch (error) {
            console.log("Error adding new school:", error);
            setToastMessage("Failed to add the school?. Please try again.");
        }
        // setStudentTeachers((prev) => [...prev, newStudentTeacher]);
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
                                        <option value="notblacklisted">
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
                            <table className="w-full border-collapse border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left p-4 border border-gray-200">
                                             Full Name
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Province
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            School
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(filteredTeachers) &&
                                    filteredTeachers.length > 0 ? (
                                        filteredTeachers.map((teacher) => (
                                            <tr
                                                key={teacher?.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="p-4">
                                                    {teacher?.first_name}{" "}
                                                    {teacher?.last_name}
                                                </td>
                                                <td className="p-4">
                                                    {teacher?.location_province}
                                                </td>
                                                <td className="p-4">
                                                    {teacher?.university}
                                                </td>
                                                <td className="p-4">
                                                    <span
                                                        className={`px-2 py-1 text-sm rounded-lg ${
                                                            teacher?.status ===
                                                            "notblacklisted"
                                                                ? "bg-red-100 text-red-600"
                                                                : "bg-green-100 text-green-600"
                                                        }`}
                                                    >
                                                        {teacher?.status ===
                                                        "notblacklisted"
                                                            ? "not blacklisted"
                                                            : "blacklisted"}
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
                                                No Student Teachers found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {toastMessage && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded shadow-lg">
                    {toastMessage}
                </div>
            )}
            {isModalOpen && (
                <AddStudentTeacherModal
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleAddStudentTeacher}
                />
            )}
        </AuthenticatedLayout>
    );
}
