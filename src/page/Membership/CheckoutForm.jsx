import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        const card = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            import.meta.env.VITE_STRIPE_CLIENT_SECRET, {
            payment_method: paymentMethod.id,
        }
        );

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            // Update membership status in backend
            await axiosSecure.patch(`/users/member/${user.email}`);

            Swal.fire({
                icon: 'success',
                title: 'Payment Successful!',
                text: 'You are now a member 🎉',
            });

            navigate('/dashboard/profile');
        }

        setProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement
                className="p-4 border border-gray-300 rounded-md"
                options={{ hidePostalCode: true }}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
                type="submit"
                disabled={!stripe || processing}
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
            >
                {processing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default CheckoutForm;
