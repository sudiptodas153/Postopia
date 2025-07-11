import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
// import { useNavigate } from 'react-router';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    // const navigate = useNavigate();

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!stripe || !elements) return;

    //     setProcessing(true);

    //     const card = elements.getElement(CardElement);
    //     if (!card) return;
    //     const { error, paymentMethod } = await stripe.createPaymentMethod({
    //         type: 'card',
    //         card,
    //     });

    //     if (error) {
    //         setError(error.message);
    //         setProcessing(false);
    //         return;
    //     }
    //     else {
    //         setError('')
    //     }

    //     const res = await axiosSecure.post('/create-payment-intent',
    //         {
    //             amount: 50000
    //         }
    //     )
    //     console.log(res)



    //         setProcessing(false);
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            setError(paymentError.message);
            setProcessing(false);
            return;
        } else {
            setError('');
        }
        const email = user?.email

        // Get clientSecret from backend
        const res = await axiosSecure.post('/create-payment-intent', { amount: 50000, email });
        const clientSecret = res.data.clientSecret;
        // console.log(res)
        // Confirm payment with Stripe
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id,
        });

        if (confirmError) {
            setError(confirmError.message);
            setProcessing(false);
            return;
        }

        if (paymentIntent.status === 'succeeded') {

            const paymentData = {
                name: user?.displayName || 'Unknown',
                email: user?.email,
                amount: 50000, // cents
                transactionId: paymentIntent.id,
                createdAt: new Date(),
            }

            await axiosSecure.post('/payments', paymentData)
            const updateRes = await axiosSecure.patch(`/users/membership/${user?.email}`);
            if (updateRes.data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Payment Successful!',
                    text: 'You are now a Gold Member!',
                });
            }
            else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Payment saved but membership update failed!',
                });
            }

            // console.log(paymentRes)

            // TODO: Update user membership status in DB here

        }

        setProcessing(false);
    };


    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-4 border border-gray-300 rounded-md" />
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
