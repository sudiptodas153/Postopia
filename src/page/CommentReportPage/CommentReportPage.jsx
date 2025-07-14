
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';

const feedbackOptions = [
    "Inappropriate language",
    "Off-topic content",
    "Spam or promotional"
];

const CommentReport = () => {
    const { postId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [comments, setComments] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState({});
    const [reported, setReported] = useState({});
    const [expandedComment, setExpandedComment] = useState(null);
    const { user } = useAuth()


    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axiosSecure.get(`/posts/comment/${postId}`);
                setComments(res.data.comments || []);
            } catch (error) {
                console.error('Failed to load comments:', error);
            }
        };

        fetchComments();
    }, [postId, axiosSecure]);

    useEffect(() => {
        const fetchReportedNamesForAllComments = async () => {
            try {
                const reportedNames = {}; // commentId => reportedByName list or single name

                for (const comment of comments) {
                    const { data } = await axiosSecure.get(`/comments/report/${comment._id}`);

                    if (data?.reported) {
                      
                        reportedNames[comment._id] = data.report.report;
                    }
                }

                // এখন reportedNames স্টেটে সেট করো
                setReported(reportedNames);
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            }
        };

        if (comments.length > 0) {
            fetchReportedNamesForAllComments();
        }
    }, [comments, axiosSecure]);


    console.log(reported)

    const handleReport = async (commentId) => {
        const feedback = selectedFeedback[commentId];

        // ✅ Auth check
        if (!user?.uid || !user?.email || !user?.displayName) {
            return Swal.fire('Error', 'You must be logged in to report a comment.', 'error');
        }

        try {
            await axiosSecure.post(`/comments/report/${commentId}`, {
                feedback,
                reportedById: user.uid,
                reportedByEmail: user.email,
                reportedByName: user.displayName,
            });

            setReported((prev) => ({ ...prev, [commentId]: true }));

            Swal.fire('Reported!', 'The comment has been reported.', 'success');
        } catch (error) {
            console.error('Reporting failed:', error?.response?.data || error.message);
            Swal.fire('Error', error?.response?.data?.message || 'Could not report the comment.', 'error');
        }
    };

    // console.log(reported)

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Comments</h2>

            <div className="overflow-x-auto bg-white border shadow rounded-lg">
                <table className="min-w-full text-sm text-center">
                    <thead className="bg-gray-100 text-gray-600 font-semibold sticky top-0">
                        <tr>
                            <th className="p-3 border-b">Email</th>
                            <th className="p-3 border-b">Comment</th>
                            <th className="p-3 border-b">Feedback</th>
                            <th className="p-3 border-b">Report</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.length === 0 && (
                            <tr>
                                <td colSpan="4" className="p-6 text-gray-500">No comments available.</td>
                            </tr>
                        )}
                        {comments.map((comment) => (

                            <tr key={comment._id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{comment.email}</td>
                                <td className="p-3">
                                    {comment.text.length > 20 ? (
                                        <>
                                            {comment.text.slice(0, 20)}...
                                            <button
                                                onClick={() => setExpandedComment(comment)}
                                                className="ml-1 text-blue-600 hover:underline text-xs"
                                            >
                                                Read More
                                            </button>
                                        </>
                                    ) : (
                                        comment.text

                                    )}

                                </td>
                                <td className="p-3">
                                    <select
                                        className="border px-2 py-1 rounded"
                                        value={selectedFeedback[comment._id] || ''}
                                        onChange={(e) =>
                                            setSelectedFeedback((prev) => ({
                                                ...prev,
                                                [comment._id]: e.target.value
                                            }))
                                        }
                                    >
                                        <option value="">Select feedback</option>
                                        {feedbackOptions.map((option, idx) => (
                                            <option key={idx} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="p-3">
                                    <button
                                        disabled={
                                            !selectedFeedback[comment._id] ||
                                            reported[comment._id] ||
                                            !!comment.reported
                                        }
                                        onClick={() => handleReport(comment._id)}
                                        className={`btn btn-sm ${reported[comment._id] || comment.reported
                                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            : "bg-red-500 text-white hover:bg-red-600"
                                            }`}
                                    >
                                        {reported[comment._id] || comment.reported ? 'Reported' : 'Report'}
                                    </button>

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {/* Modal for Full Comment */}
            {expandedComment && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
                        <h3 className="text-lg font-bold mb-2">Full Comment</h3>
                        <p className="text-gray-700">{expandedComment.text}</p>
                        <button
                            onClick={() => setExpandedComment(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentReport;
