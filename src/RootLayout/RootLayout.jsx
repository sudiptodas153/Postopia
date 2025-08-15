import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../page/Footer/Footer';

const RootLayout = () => {
    return (
        <div className=''>
            <div className='sticky top-0 z-50'>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;