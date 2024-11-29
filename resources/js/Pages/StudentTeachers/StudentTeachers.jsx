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
    const [toastMessage, setToastMessage] = useState("");
    const [modalOpen, setModalsOpen] = useState(null);

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
                                {/* <h1 className="text-xl font-semibold text-gray-700 mb-4 md:mb-0">
                                    Student Teachers
                                </h1> */}
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {Array.isArray(filteredTeachers) &&
                                filteredTeachers.length > 0 ? (
                                    filteredTeachers.map((teacher) => (
                                        <div
                                            key={teacher?.id}
                                            className="border border-gray-200 rounded-lg shadow-md p-4 bg-white hover:shadow-lg relative"
                                        >
                                            {/* Kebab menu button (three dots) */}
                                            <div className="absolute top-2 right-2">
                                                <button
                                                    onClick={() =>
                                                        openModal(teacher?.id)
                                                    }
                                                    className="text-gray-600 hover:text-gray-800"
                                                    aria-label="Options"
                                                >
                                                    <span className="block w-1.5 h-1.5 bg-gray-600 rounded-full mb-1"></span>
                                                </button>
                                            </div>

                                            <div className="mb-2">
                                                <h3 className="font-semibold text-lg">
                                                    {teacher?.first_name}{" "}
                                                    {teacher?.last_name}
                                                </h3>
                                            </div>
                                            <div className="mb-2 text-sm text-gray-600">
                                                <strong>Province:</strong>{" "}
                                                {teacher?.location_province}
                                            </div>
                                            <div className="mb-2 text-sm text-gray-600">
                                                <strong>School:</strong>{" "}
                                                {teacher?.university}
                                            </div>
                                            <div>
                                                <span
                                                    className={`inline-block px-3 py-1 text-sm rounded-lg ${
                                                        teacher?.status ===
                                                        "notblacklisted"
                                                            ? "bg-green-100 text-green-600"
                                                            : "bg-red-100 text-red-600"
                                                    }`}
                                                >
                                                    {teacher?.status ===
                                                    "notblacklisted"
                                                        ? "Not Blacklisted"
                                                        : "Blacklisted"}
                                                </span>
                                            </div>

                                            {/* Conditional rendering for the modal */}
                                            {modalOpen === teacher?.id && (
                                                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
                                                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                                                        <h3 className="font-semibold text-lg mb-4">
                                                            Teacher Details
                                                        </h3>
                                                        <p>
                                                            <strong>
                                                                Name:
                                                            </strong>{" "}
                                                            {
                                                                teacher?.first_name
                                                            }{" "}
                                                            {teacher?.last_name}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Province:
                                                            </strong>{" "}
                                                            {
                                                                teacher?.location_province
                                                            }
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                School:
                                                            </strong>{" "}
                                                            {
                                                                teacher?.university
                                                            }
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Status:
                                                            </strong>{" "}
                                                            {teacher?.status ===
                                                            "notblacklisted"
                                                                ? "Not Blacklisted"
                                                                : "Blacklisted"}
                                                        </p>
                                                        <div className="mt-4 flex justify-end gap-4">
                                                            <button
                                                                onClick={
                                                                    closeModal
                                                                }
                                                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                                            >
                                                                Close
                                                            </button>
                                                            {/* Add other modal actions here */}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full text-center text-gray-500">
                                        No Student Teachers found.
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
            {isModalOpen && (
                <AddStudentTeacherModal
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleAddStudentTeacher}
                />
            )}
        </AuthenticatedLayout>
    );
}
