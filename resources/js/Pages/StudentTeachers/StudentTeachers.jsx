import { useState, useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import AddStudentTeacherModal from "@/Components/AddStudentTeacherModal";
import axios from "axios";
import NavLink from "@/Components/NavLink";
export default function StudentTeachers({ studentTeachers }) {
    const [teachers, setTeachers] = useState([]);
    const [filteredTeachers, setFilteredTeachers] = useState(studentTeachers);
    const [isModalOpen, setModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [toastMessage, setToastMessage] = useState("");
    const [modalOpen, setModalsOpen] = useState(null);
    const [isCardView, setIsCardView] = useState(true);

    const toggleView = () => {
        setIsCardView((prevView) => !prevView);
    };

    const openModal = (teacherId) => {
        setModalsOpen(teacherId);
    };

    const closeModal = () => {
        setModalsOpen(null);
    };

    // Fetch student teachers from the API
       useEffect(() => {
        const fetchStudentTeachers = async () => {
            try {
                const response = await axios.get("/api/student-teachers");
                if (Array.isArray(response.data)) {
                    setTeachers(response.data);
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
        const filtered = filteredTeachers.filter((teacher) => {
            const matchesSearch = teacher.first_name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            const matchesStatus =
                statusFilter === "" || teacher.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
        setFilteredTeachers(filtered);
    }, [searchQuery, statusFilter, filteredTeachers]);

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
            setTeachers(studentTeachersResponse.data);
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
            setTeachers((prev) => [...prev, response.data]);
            setFilteredTeachers((prev) => [...prev, response.data]);
            setModalOpen(false); // Close the modal
            setToastMessage("Student Teacher added successfully!");
        } catch (error) {
            console.log("Error adding new student teacher:", error);
            setToastMessage(
                "Failed to add the student teacher. Please try again."
            );
        }
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
                                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                                        >
                                            Upload CSV
                                        </button>
                                    </form>
                                </div>
                            </div>
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
                            {/* Card view for displaying student teachers */}
                            {isCardView ? (
                                // Card View
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {filteredTeachers.length > 0 ? (
                                        filteredTeachers.map((teacher) => (
                                            <div
                                                key={teacher.id}
                                                className="border p-4 rounded-lg shadow-md"
                                            >
                                                <h3 className="font-semibold text-lg">
                                                    {teacher.first_name}{" "}
                                                    {teacher.last_name}
                                                </h3>
                                                <div className="text-sm text-gray-600">
                                                    <strong>Province:</strong>{" "}
                                                    {teacher.location_province}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    <strong>School:</strong>{" "}
                                                    {teacher.university}
                                                </div>
                                                <span
                                                    className={`inline-block px-3 py-1 text-sm rounded-lg ${
                                                        teacher.status ===
                                                        "notblacklisted"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-red-100 text-red-600"
                                                    }`}
                                                >
                                                    {teacher?.status ===
                                                    "notblacklisted"
                                                        ? "not blacklisted"
                                                        : "blacklisted"}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full text-center text-gray-500">
                                            No Student Teachers found.
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
                                                    Province
                                                </th>
                                                <th className="text-left p-4 border border-gray-200">
                                                    School
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
                                            {filteredTeachers.length > 0 ? (
                                                filteredTeachers.map(
                                                    (teacher) => (
                                                        <tr key={teacher.id}>
                                                            <td className="p-4 border border-gray-200">
                                                                {
                                                                    teacher.first_name
                                                                }{" "}
                                                                {
                                                                    teacher.last_name
                                                                }
                                                            </td>
                                                            <td className="p-4 border border-gray-200">
                                                                {
                                                                    teacher.location_province
                                                                }
                                                            </td>
                                                            <td className="p-4 border border-gray-200">
                                                                {
                                                                    teacher.university
                                                                }
                                                            </td>
                                                            <td className="p-4 border border-gray-200">
                                                                <span
                                                                    className={`px-2 py-1 text-sm rounded-lg ${
                                                                        teacher.status ===
                                                                        "notblacklisted"
                                                                            ? "bg-green-100 text-green-600"
                                                                            : "bg-red-100 text-red-600"
                                                                    }`}
                                                                >
                                                                    {teacher?.status ===
                                                        "notblacklisted"
                                                            ? "not blacklisted"
                                                            : "blacklisted"}
                                                                </span>
                                                            </td>
                                                            {/* <td className="p-4 border border-gray-200">
                                                                  
                                                                  <NavLink
                                                                      href={route(
                                                                          "studentTeacher.edit",
                                                                          {
                                                                              studentTeacher: teacher.id,
                                                                          }
                                                                      )}
                                                                      active={route().current(
                                                                        "studentTeachers.edit"
                                                                      )}
                                                                  >
                                                                      Edit
                                                                  </NavLink>
                                                              </td> */}
                                                        </tr>
                                                    )
                                                )
                                            ) : (
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="text-center p-4 text-gray-500"
                                                    >
                                                        No Student Teachers
                                                        found.
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
