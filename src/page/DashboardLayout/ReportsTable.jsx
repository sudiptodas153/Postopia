import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReportsTable = ({ reports, refetch }) => {
    const axiosSecure = useAxiosSecure();

   
    const handleDeletePost = async (targetId, reportId) => {
        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "This will delete the reported content permanently.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirmResult.isConfirmed) {
            try {
                await axiosSecure.delete(`/reports/${reportId}`);
                Swal.fire("Deleted!", "The content and report were deleted.", "success");
                refetch();
            } catch (error) {
                Swal.fire("Error", "Failed to delete the content.", error);
            }
        }
    };

    // ✅ Dismiss the report only
    const handleDismiss = async (reportId) => {
        const confirm = await Swal.fire({
            title: "Dismiss report?",
            text: "The content will remain, and this report will be marked as handled.",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Yes, dismiss it",
        });

        if (confirm.isConfirmed) {
            try {
                await axiosSecure.delete(`/reports/${reportId}`);
                Swal.fire("Dismissed!", "The report has been dismissed.", "success");
                refetch();
            } catch (error) {
                Swal.fire("Error", "Failed to dismiss the report.", error);
            }
        }
    };

    return (
        <div className="overflow-x-auto md:h-72 border border-gray-200 rounded-md bg-white">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100  sticky top-0 z-10 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-4 py-3 text-left">Reporter</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3 text-left">Reason</th>
                        <th className="px-4 py-3 text-center">Delete</th>
                        <th className="px-4 py-3 text-center">Dismiss</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {reports.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-500">
                                No reports found.
                            </td>
                        </tr>
                    ) : (
                        reports.map((report) => (
                            <tr key={report._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{report.reportedByName}</td>
                                <td className="px-4 py-3">{report.reportedByEmail}</td>
                                <td className="px-4 py-3">{report.feedback || "N/A"}</td>
                               
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => handleDeletePost(report.commentId || report.postId, report._id)}
                                        className="btn btn-xs bg-red-500 text-white hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        onClick={() => handleDismiss(report._id)}
                                        className="btn btn-xs bg-green-500 text-white hover:bg-green-600"
                                    >
                                        Dismiss
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsTable;
