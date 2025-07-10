import React from 'react';
import { Outlet } from 'react-router';

const userDashboard = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default userDashboard;