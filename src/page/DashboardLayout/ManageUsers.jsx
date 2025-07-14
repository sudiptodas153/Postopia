import { useEffect, useState } from 'react';
import UsersTable from './UsersTable';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [fetching, setFetching] = useState(false); // <-- local loading state

    const usersPerPage = 10;
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const fetchUsers = async () => {
        try {
            setFetching(true);
            const res = await axiosSecure.get(`/users-pag?search=${search}&page=${page}&limit=${usersPerPage}`);
            setUsers(res.data.users);
            setTotalUsers(res.data.total);
        } catch (err) {
            console.error("Error loading users", err);
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [search, page]);

    const { data: payments = [], isLoading: paymentsLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        },
    });

    const paidEmails = payments.map(payment => payment.email);
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    // ✅ Combined loading condition
    if (loading || fetching || paymentsLoading) {
        return (
            <div className="min-h-[200px] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="ml-3 text-gray-600">Loading users...</p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>

            <input
                type="text"
                placeholder="Search by username"
                className="input input-bordered mb-4"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            <div className="border border-gray-300 rounded-md shadow-sm">
                <UsersTable
                    users={users}
                    refetch={fetchUsers}
                    paidEmails={paidEmails}
                    loggedInUserEmail={user?.email}
                />
            </div>

            {/* Pagination */}
            <div className="border-t border-gray-300 p-4 bg-white flex justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setPage(idx + 1)}
                        className={`btn btn-sm ${page === idx + 1
                            ? 'btn-active bg-gradient-to-r from-[#ad4df1] to-[#5191f7] text-white'
                            : 'btn-outline'
                            }`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;
