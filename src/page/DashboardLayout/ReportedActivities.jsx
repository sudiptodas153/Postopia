import { useEffect, useState } from "react";
import ReportsTable from "./ReportsTable";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const ReportedActivities = () => {
    const axiosSecure = useAxiosSecure();
    const [reports, setReports] = useState([]);

    const fetchReports = async () => {
        const { data } = await axiosSecure.get('/reports');
        setReports(data);
    };

    useEffect(() => {
        fetchReports();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Reported Activities</h2>
            <ReportsTable reports={reports} refetch={fetchReports} />
        </div>
    );
};

export default ReportedActivities;
