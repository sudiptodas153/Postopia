import { useEffect, useState } from "react";
import ReportsTable from "./ReportsTable";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ReportedActivities = () => {
    const axiosSecure = useAxiosSecure();
    const [reports, setReports] = useState([]);
    const [page, setPage] = useState(1);
    const [totalReports, setTotalReports] = useState(0);
    const reportsPerPage = 10;

    const fetchReports = async () => {
        try {
            const res = await axiosSecure.get(`/reports?page=${page}&limit=${reportsPerPage}`);
            setReports(res.data.reports); // backend will return { reports: [], total: number }
            setTotalReports(res.data.total);
        } catch (error) {
            console.error("Failed to fetch reports", error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, [page]);

    const totalPages = Math.ceil(totalReports / reportsPerPage);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-md flex flex-col" style={{ height: "600px" }}>
            <h2 className="text-2xl font-bold mb-4 text-center">Reported Activities</h2>

            {/* Scrollable Table */}
            <div className="overflow-auto flex-grow border rounded">
                {reports.length === 0 ? (
                    <p className="text-center text-gray-500 py-10">No reports found.</p>
                ) : (
                    <ReportsTable reports={reports} refetch={fetchReports} />
                )}
            </div>

            {/* Fixed Pagination Footer */}
            <div className="border-t pt-4 mt-2 flex justify-center bg-white">
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setPage(idx + 1)}
                        className={`btn btn-sm mx-1 ${page === idx + 1 ? "btn-primary" : "btn-outline"}`}
                    >
                        {idx + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ReportedActivities;
