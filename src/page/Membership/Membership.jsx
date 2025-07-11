import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from './CheckoutForm'; // stripe checkout component
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Membership = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [clientSecret, setClientSecret] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || loading) return;

        // Call backend to create payment intent
        axiosSecure.post('/create-payment-intent', { amount: 500 }) // ৫০০ টাকা ধরলাম
            .then(res => {
                setClientSecret(res.data.clientSecret);
            });
    }, [user, loading, axiosSecure]);

    return (
        <div className="max-w-xl mx-auto my-10 p-6 bg-white shadow-xl rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-6">💳 Become a Member</h2>
            <p className="text-center mb-4 text-gray-600">
                Pay <span className="font-bold text-indigo-600">৫০০ টাকা</span> to become a premium member.
                You will get a <span className="text-yellow-500 font-semibold">Gold Badge</span> and can post more than 5 times.
            </p>

            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
};

export default Membership;
