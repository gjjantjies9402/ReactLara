import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

/**
 * Page to display a list of schools.
 *
 * @returns {JSX.Element} The component.
 */

export default function Index() {
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
                                    Users
                                </h1>
                                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                                    Add user
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mb-6">
                                A list of all the users in your account
                                including their name, title, email, and role.
                            </p>
                            <table className="w-full border-collapse border border-gray-200 rounded-lg">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="text-left p-4 border border-gray-200">
                                            Name
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Title
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Status
                                        </th>
                                        <th className="text-left p-4 border border-gray-200">
                                            Role
                                        </th>
                                        <th className="p-4 border border-gray-200">
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-4 flex items-center">
                                            <img
                                                className="h-10 w-10 rounded-full mr-3"
                                                src="https://via.placeholder.com/40"
                                                alt="Lindsay Walton"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-700">
                                                    Lindsay Walton
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    lindsay.walton@example.com
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-medium text-gray-700">
                                                Front-end Developer
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Optimization
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded-lg">
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-4">Member</td>
                                        <td className="p-4 text-purple-600 font-medium cursor-pointer">
                                            Edit
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50">
                                        <td className="p-4 flex items-center">
                                            <img
                                                className="h-10 w-10 rounded-full mr-3"
                                                src="https://via.placeholder.com/40"
                                                alt="Courtney Henry"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-700">
                                                    Courtney Henry
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    courtney.henry@example.com
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <p className="font-medium text-gray-700">
                                                Designer
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Intranet
                                            </p>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-green-100 text-green-600 text-sm px-2 py-1 rounded-lg">
                                                Active
                                            </span>
                                        </td>
                                        <td className="p-4">Admin</td>
                                        <td className="p-4 text-purple-600 font-medium cursor-pointer">
                                            Edit
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
