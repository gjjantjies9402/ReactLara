import { useState, useEffect } from "react";
import axios from "axios";

export default function AddStudentTeacherModal({ onClose, onSubmit }) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [locationProvince, setLocationProvince] = useState("");
    const [locationCity, setLocationCity] = useState("");
    const [locationStreet, setLocationStreet] = useState("");
    const [university, setUniversity] = useState("");
    const [status, setStatus] = useState("active");
    const [schoolId, setSchoolId] = useState("");
    const [schools, setSchools] = useState([]); // State to hold list of schools

    useEffect(() => {
        const fetchSchools = async () => {
            try {
                const response = await axios.get("/api/schools");
                if (Array.isArray(response.data)) {
                    setSchools(response.data);
                }
            } catch (error) {
                console.error("Error fetching schools:", error);
            }
        };
        fetchSchools();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newStudentTeacherData = {
            first_name: firstName,
            last_name: lastName,
            location_province: locationProvince,
            location_city: locationCity,
            location_street: locationStreet,
            university,
            status,
            school_id: schoolId,
        };

        try {
            await axios.post("/api/student-teachers", newStudentTeacherData);
            onSubmit(newStudentTeacherData); // Call onSubmit with the new student teacher data
            onClose(); // Close the modal
        } catch (error) {
            console.error("Error adding student teacher:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">
                    Add Student Teacher
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Location Province
                        </label>
                        <input
                            type="text"
                            value={locationProvince}
                            onChange={(e) =>
                                setLocationProvince(e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Location City
                        </label>
                        <input
                            type="text"
                            value={locationCity}
                            onChange={(e) => setLocationCity(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Location Street
                        </label>
                        <input
                            type="text"
                            value={locationStreet}
                            onChange={(e) => setLocationStreet(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            University
                        </label>
                        <input
                            type="text"
                            value={university}
                            onChange={(e) => setUniversity(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">School</label>
                        <select
                            value={schoolId}
                            onChange={(e) => setSchoolId(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="">Select a School</option>
                            {schools.length > 0 ? (
                                schools.map((school) => (
                                    <option key={school.id} value={school.id}>
                                        {school.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No schools found</option>
                            )}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
