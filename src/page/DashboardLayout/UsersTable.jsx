import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UsersTable = ({ users, refetch, paidEmails, loggedInUserEmail }) => {
    const axiosSecure = useAxiosSecure();

    const adminProEmail = "adminpro@gmail.com";

    const handleMakeAdmin = async (id) => {
        await axiosSecure.patch(`/users/admin/${id}`);
        refetch();
    };

    const handleRemoveAdmin = async (id) => {
        await axiosSecure.patch(`/users/remove-admin/${id}`);
        refetch();
    };

    const sortedUsers = [...users].sort((a, b) => {
        if (a.role?.includes('admin') && !b.role?.includes('admin')) return -1;
        if (!a.role?.includes('admin') && b.role?.includes('admin')) return 1;
        if (a.role?.includes('admin') && b.role?.includes('admin')) {
            if (a.email === adminProEmail) return -1;
            if (b.email === adminProEmail) return 1;
        }
        return new Date(a.createdAt) - new Date(b.createdAt);
    });

    return (
        <div className="overflow-x-auto overflow-auto max-h-64">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className=" sticky top-0 z-10 shadow-sm">
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Name</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Email</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Subscription</th>
                        <th className="border border-gray-300 px-2 sm:px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {sortedUsers.map(user => (
                        <tr key={user._id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">{user.name}</td>
                            <td className="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">{user.email}</td>
                            <td className="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">
                                {user.role?.includes('admin') ? (
                                    <span className="text-purple-600 font-semibold">
                                        Admin {user.email === adminProEmail && "(Super Admin)"}
                                    </span>
                                ) : paidEmails.includes(user.email) ? (
                                    <span className="text-green-600 font-semibold">Member</span>
                                ) : (
                                    <span className="text-gray-500">Non-Member</span>
                                )}
                            </td>
                            <td className="border border-gray-300 px-2 sm:px-4 py-2 whitespace-nowrap">
                                {loggedInUserEmail === adminProEmail && user.email !== adminProEmail && (
                                    <>
                                        {!user.role?.includes('admin') ? (
                                            <button
                                                onClick={() => handleMakeAdmin(user._id)}
                                                className="btn btn-sm bg-gradient-to-r from-[#ad4df1] to-[#5191f7] text-white mr-2"
                                            >
                                                Make Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleRemoveAdmin(user._id)}
                                                className="btn btn-sm bg-gradient-to-r from-[#f97316] to-[#f43f5e] text-white"
                                            >
                                                Remove Admin
                                            </button>
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
