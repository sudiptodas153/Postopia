import { useEffect, useState } from "react";
import ReportsTable from "./ReportsTable";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ReportedActivities = () => {
    const axiosSecure = useAxiosSecure();
    const [reports, setReports] = useState([]);

    const fetchReports = async () => {
        try {
            const { data } = await axiosSecure.get('/reports');
            setReports(data);
        } catch (error) {
            console.error("Failed to fetch reports", error);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Reported Activities</h2>
            {reports.length === 0 ? (
                <p className="text-center text-gray-500">No reports found.</p>
            ) : (
                <ReportsTable reports={reports} refetch={fetchReports} />
            )}
        </div>
    );
};

export default ReportedActivities;
