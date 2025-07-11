// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckoutForm'; // stripe checkout component
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import useAuth from '../../Hooks/useAuth';
import CheckoutForm from './CheckoutForm';
import useAuth from '../../Hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Membership = () => {
 const {userInfo} = useAuth();

    return (
        <div className="max-w-xl mx-auto md:mt-20 my-10 p-6 bg-white shadow-xl rounded-2xl">
            {userInfo.isMember ? (
                <div className="text-center md:mt-10">
                    <h2 className="text-2xl font-bold mb-4 text-green-600">🎉 You are already a Gold Member!</h2>
                    <p className="text-gray-600">Thank you for supporting us. Enjoy your exclusive features!</p>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-center mb-6">💳 Become a Member</h2>
                    <p className="text-center mb-4 text-gray-600">
                        Pay <span className="font-bold text-indigo-600">৫০০ টাকা</span> to become a premium member.
                        You will get a <span className="text-yellow-500 font-semibold">Gold Badge</span> and can post more than 5 times.
                    </p>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </>
            )}
        </div>
    );
};

export default Membership;
