import useAxiosSecure from "../../Hooks/useAxiosSecure";


const ReportsTable = ({ reports, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleDeletePost = async (postId) => {
        await axiosSecure.delete(`/posts/${postId}`);
        refetch();
    };

    const handleDismiss = async (reportId) => {
        await axiosSecure.delete(`/reports/${reportId}`);
        refetch();
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Reported By</th>
                    <th>Reason</th>
                    <th>Post/Comment</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {reports.map(report => (
                    <tr key={report._id}>
                        <td>{report.reportedByName}</td>
                        <td>{report.reason}</td>
                        <td>{report.targetText}</td>
                        <td className="space-x-2">
                            <button onClick={() => handleDeletePost(report.targetId)} className="btn btn-sm btn-error">Delete</button>
                            <button onClick={() => handleDismiss(report._id)} className="btn btn-sm btn-success">Dismiss</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReportsTable;
