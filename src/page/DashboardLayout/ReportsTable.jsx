import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ReportsTable = ({ reports, refetch }) => {
    const axiosSecure = useAxiosSecure();

    // Delete the post/comment related to this report
    const handleDeletePost = async (targetId) => {
        const confirmResult = await Swal.fire({
            title: "Are you sure?",
            text: "This will delete the reported post/comment permanently!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        });

        if (confirmResult.isConfirmed) {
            try {
                await axiosSecure.delete(`/posts/${targetId}`); // Adjust endpoint if needed
                await axiosSecure.delete(`/reports/${targetId}`); // Optionally remove the report after post delete
                Swal.fire("Deleted!", "The post/comment has been deleted.", "success");
                refetch();
            } catch (error) {
                Swal.fire("Error!", "Failed to delete post/comment.", error);
            }
        }
    };

    // Dismiss the report only (mark as handled)
    const handleDismiss = async (reportId) => {
        try {
            await axiosSecure.delete(`/reports/${reportId}`);
            Swal.fire("Dismissed!", "The report has been dismissed.", "success");
            refetch();
        } catch (error) {
            Swal.fire("Error!", "Failed to dismiss the report.", error);
        }
    };

    return (
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 font-semibold sticky top-0">
                <tr>
                    <th className="p-3 border-b">Reported By</th>
                    <th className="p-3 border-b">Reason</th>
                    <th className="p-3 border-b">Reported Text</th>
                    <th className="p-3 border-b">Actions</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report) => (
                    <tr
                        key={report._id}
                        className="hover:bg-gray-50 border-b text-center"
                    >
                        <td className="p-3">{report.reportedByName || report.reportedByEmail || "Unknown"}</td>
                        <td className="p-3">{report.reason || report.feedback || "N/A"}</td>
                        <td className="p-3 max-w-xs truncate" title={report.targetText}>
                            {report.targetText}
                        </td>
                        <td className="p-3 space-x-2">
                            <button
                                onClick={() => handleDeletePost(report.targetId)}
                                className="btn btn-sm btn-error"
                            >
                                Delete Post/Comment
                            </button>
                            <button
                                onClick={() => handleDismiss(report._id)}
                                className="btn btn-sm btn-success"
                            >
                                Dismiss Report
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReportsTable;
