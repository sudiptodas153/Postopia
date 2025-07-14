import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";

const COLORS = ["#6366F1", "#F97316", "#10B981"];

const AdminProfile = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const [stats, setStats] = useState({
        totalPosts: 0,
        totalComments: 0,
        totalUsers: 0,
    });

    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axiosSecure.get("/admin/stats");
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch stats", err);
            }
        };

        const fetchTags = async () => {
            try {
                const res = await axiosSecure.get("/tags");
                setTags(res.data);
            } catch (err) {
                console.error("Failed to fetch tags", err);
            }
        };

        fetchStats();
        fetchTags();
    }, [axiosSecure]);

    const handleAddTag = async (e) => {
        e.preventDefault();
        if (!tagInput.trim()) return;

        try {
            const res = await axiosSecure.post("/tags", { name: tagInput.trim() });
            setTags([...tags, res.data]);
            setTagInput("");
            Swal.fire("Success!", "Tag added successfully!", "success");
        } catch (err) {
            Swal.fire("Error!", "Failed to add tag", err);
        }
    };

    const chartData = [
        { name: "Posts", value: stats.totalPosts },
        { name: "Comments", value: stats.totalComments },
        { name: "Users", value: stats.totalUsers },
    ];



    return (
        <div>
        {
            loading ?<Loading /> :

                <div className = "max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
            {/* Title */ }
            <h2 h2 className = "text-3xl sm:text-4xl font-extrabold text-center text-indigo-600" >
        Admin Profile
            </h2 >

    {/* Admin Info */ }
    <div div className = "flex flex-col lg:flex-row items-center lg:items-start gap-8 bg-white shadow rounded-xl p-6" >
                <div className="flex justify-center">
                    <img
                        src={user?.photoURL || "https://via.placeholder.com/150?text=Admin"}
                        alt="Admin"
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-indigo-500 shadow object-cover"
                    />
                </div>

                <div className="flex-1 space-y-3 text-gray-800 text-base w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                        <span className="font-semibold w-28 sm:w-24">Name:</span>
                        <span>{user?.displayName || "N/A"}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                        <span className="font-semibold w-28 sm:w-24">Email:</span>
                        <span className="break-words">{user?.email || "N/A"}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                        <span className="font-semibold w-28 sm:w-24">Role:</span>
                        <span className="text-indigo-600 font-semibold">Admin</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                        <span className="font-semibold w-28 sm:w-24">Posts:</span>
                        <span>{stats.totalPosts}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                        <span className="font-semibold w-28 sm:w-24">Comments:</span>
                        <span>{stats.totalComments}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
                        <span className="font-semibold w-28 sm:w-24">Users:</span>
                        <span>{stats.totalUsers}</span>
                    </div>
                </div>
            </div >

    {/* Chart */ }
    <div div className = "bg-white shadow rounded-xl p-6" >
                <h3 className="text-xl font-semibold text-center mb-4">
                    Site Statistics Overview
                </h3>
                <div className="h-64 w-full">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div >

    {/* Add Tag Section */ }
    <div div className = "bg-white shadow rounded-xl p-6" >
                <h3 className="text-xl font-semibold mb-4">Add New Tag</h3>
                <form
                    onSubmit={handleAddTag}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        placeholder="Enter tag name"
                        className="w-full sm:flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
                    >
                        Add
                    </button>
                </form>

{/* Tags List */ }
{
    tags.length > 0 && (
        <div className="mt-4">
            <h4 className="font-semibold mb-2">Existing Tags:</h4>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                    <span
                        key={idx}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                    >
                        {tag.name}
                    </span>
                ))}
            </div>
        </div>
    )
}
            </div >
        </div >
        }
        </div>
    );
    
};

export default AdminProfile;
