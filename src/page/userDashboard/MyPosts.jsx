// import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const MyPosts = () => {
    const { posts, refetch } = useAuth();
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate();
    //   const [posts, setPosts] = useState([]);


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete this post from your account!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/posts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your post has been deleted.',
                                'success'
                            );
                            refetch();
                        }
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'Something went wrong.',
                            'error'
                        );
                    });
            }
        })
    };





    return (
        <div>
            <div className="overflow-x-auto max-w-5xl mx-auto border border-gray-100 p-4 bg-white rounded shadow">
                <h2 className="text-3xl font-bold mb-6 text-center">My Posts</h2>
                <div className="max-h-72 overflow-y-auto rounded-lg">
                    <table className="min-w-full border border-gray-300">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th className="p-3 border-b bg-gray-100">Post Title</th>
                                <th className="p-3 border-b bg-gray-100">Votes</th>
                                <th className="p-3 border-b bg-gray-100">Comment</th>
                                <th className="p-3 border-b bg-gray-100">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts?.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="h-40 text-center p-4 text-gray-600">
                                        No posts found.
                                    </td>
                                </tr>
                            )}
                            {posts?.map(({ _id, title, upVote, downVote }) => (
                                <tr key={_id} className="hover:bg-gray-50 cursor-default text-center">
                                    <td className="p-3 border-b">{title}</td>
                                    <td className="p-3 border-b">{upVote - downVote}</td>
                                    <td className="p-3 border-b">
                                        <button onClick={() => navigate(`/comments/${_id}`)} className="btn btn-sm btn-info hover:bg-sky-200">
                                            Comments
                                        </button>
                                    </td>
                                    <td className="p-3 border-b">
                                        <button onClick={() => handleDelete(_id)} className="btn btn-sm btn-error hover:text-white hover:bg-red-700">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default MyPosts;
