import { useEffect, useState } from 'react';
import UsersTable from './UsersTable';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth()
    const fetchUsers = async () => {
        const { data } = await axiosSecure.get(`/users?search=${search}`);
        setUsers(data);
    };

    useEffect(() => {
        fetchUsers();
    }, [search]);


    const { data: payments = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        },
    });

    const paidEmails = payments.map(payment => payment.email);



    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>
            <input
                type="text"
                placeholder="Search by username"
                className="input input-bordered mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <UsersTable users={users} refetch={fetchUsers} paidEmails={paidEmails} loggedInUserEmail={user?.email} />

        </div>
    );
};

export default ManageUsers;
