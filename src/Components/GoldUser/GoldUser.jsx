import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../../page/Loading/Loading';
import { FaCrown } from "react-icons/fa";

const GoldUser = () => {
    const [topUsers, setTopUsers] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        const fetchGoldUsers = async () => {
            try {
                setFetching(true);
                const res = await axiosSecure.get('gold-users');
                setTopUsers(res.data || []);
            } catch (err) {
                console.error('Gold users fetch failed', err);
            } finally {
                setFetching(false);
            }
        };
        fetchGoldUsers();
    }, [axiosSecure]);

    if (fetching) return <Loading />;

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8 flex justify-center items-center gap-3">
                <FaCrown className="text-yellow-500" /> Gold Badge Users
            </h2>

            {topUsers.length === 0 ? (
                <p className="text-center text-gray-500">No gold badge users found.</p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {topUsers.map((user, index) => (
                        <div
                            key={user._id || index}
                            className="card bg-white shadow-lg rounded-2xl p-6 border border-yellow-200 hover:shadow-xl transition duration-300"
                        >
                            <div className="flex items-center gap-4">
                                {/* User Profile Image */}
                                <div className="relative">
                                    <img
                                        src={user.
photoURL || "https://i.ibb.co/Z8w9Yw0/default-user.png"}
                                        alt={user.name}
                                        className="w-16 h-16 rounded-full border-2 border-yellow-500 object-cover"
                                    />
                                    {/* Gold Crown Icon on top */}
                                    <FaCrown className="absolute -top-3 -right-3 text-yellow-500 text-xl bg-white rounded-full p-1 shadow-md" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{user.name}</h3>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                    🏅 Gold Badge
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GoldUser;
