import React, { useEffect, useState } from 'react';

import { useLocation, Navigate } from 'react-router'; // ✅ 'react-router-dom' not just 'react-router'
import Loading from '../page/Loading/Loading';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';


const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [userRole, setUserRole] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        const fetchUserByEmail = async () => {
            if (user?.email) {
                try {
                    const res = await axiosSecure.get(`/users/${user.email}`);
                    setUserRole(res.data?.role);
                } catch (err) {
                    console.error("User fetch failed", err);
                } finally {
                    setRoleLoading(false);
                }
            }
        };

        fetchUserByEmail();
    }, [user, axiosSecure]);

    if (loading || roleLoading) {
        return <h2><Loading /></h2>;
    }
console.log(userRole)
    if (!user || userRole !== 'admin') {
        return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
    }

    return children;
};

export default AdminRoutes;
