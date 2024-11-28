import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Schools() {
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
                        <div class="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h1 class="text-xl font-semibold text-gray-700">
                                    Users
                                </h1>
                                <button class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                                    Add user
                                </button>
                            </div>
                            <p class="text-sm text-gray-500 mb-6">
                                A list of all the users in your account
                                including their name, title, email and role.
                            </p>
                            <table class="w-full border-collapse border border-gray-200 rounded-lg">
                                <thead>
                                    <tr class="bg-gray-50">
                                        <th class="text-left p-4 border border-gray-200">
                                            Name
                                        </th>
                                        <th class="text-left p-4 border border-gray-200">
                                            Title
                                        </th>
                                        <th class="text-left p-4 border border-gray-200">
                                            Status
                                        </th>
                                        <th class="text-left p-4 border border-gray-200">
                                            Role
                                        </th>
                                        <th class="p-4 border border-gray-200">
                                            Edit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="hover:bg-gray-50">
                                        <td class="p-4 flex items-center">
                                            <img
                                                class="h-10 w-10 rounded-full mr-3"
                                                src="https://via.placeholder.com/40"
                                                alt="Lindsay Walton"
                                            />
                                            <div>
                                                <p class="font-medium text-gray-700">
                                                    Lindsay Walton
                                                </p>
                                                <p class="text-sm text-gray-500">
                                                    lindsay.walton@example.com
                                                </p>
                                            </div>
                                        </td>
                                        <td class="p-4">
                                            <p class="font-medium text-gray-700">
                                                Front-end Developer
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                Optimization
                                            </p>
                                        </td>
                                        <td class="p-4">
                                            <span class="bg-green-100 text-green-600 text-sm px-2 py-1 rounded-lg">
                                                Active
                                            </span>
                                        </td>
                                        <td class="p-4">Member</td>
                                        <td class="p-4 text-purple-600 font-medium cursor-pointer">
                                            Edit
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-gray-50">
                                        <td class="p-4 flex items-center">
                                            <img
                                                class="h-10 w-10 rounded-full mr-3"
                                                src="https://via.placeholder.com/40"
                                                alt="Courtney Henry"
                                            />
                                            <div>
                                                <p class="font-medium text-gray-700">
                                                    Courtney Henry
                                                </p>
                                                <p class="text-sm text-gray-500">
                                                    courtney.henry@example.com
                                                </p>
                                            </div>
                                        </td>
                                        <td class="p-4">
                                            <p class="font-medium text-gray-700">
                                                Designer
                                            </p>
                                            <p class="text-sm text-gray-500">
                                                Intranet
                                            </p>
                                        </td>
                                        <td class="p-4">
                                            <span class="bg-green-100 text-green-600 text-sm px-2 py-1 rounded-lg">
                                                Active
                                            </span>
                                        </td>
                                        <td class="p-4">Admin</td>
                                        <td class="p-4 text-purple-600 font-medium cursor-pointer">
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
