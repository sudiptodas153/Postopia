import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = () => {
 const {user, loading} = useAuth()

 if(loading){
    return <h2>dipt</h2>
 }

 if(!user){
    <Navigate to={'/login'}></Navigate>
 }

    return (
        <div>
            
        </div>
    );
};

export default PrivateRoute;