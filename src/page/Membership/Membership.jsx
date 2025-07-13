import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import useAuth from '../../Hooks/useAuth';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);

const Membership = () => {
    const { userInfo } = useAuth();

    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-10">
            <div className="max-w-2xl mx-auto my-10 md:my-20 p-6 md:p-10 bg-white shadow-lg rounded-2xl">
                {userInfo.isMember ? (
                    <div className="text-center space-y-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-green-600">
                            🎉 You are already a Gold Member!
                        </h2>
                        <p className="text-gray-600">
                            Thank you for supporting us. Enjoy your exclusive features!
                        </p>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-700 mb-4">
                            💳 Become a Member
                        </h2>
                        <p className="text-center text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                            Pay <span className="font-bold text-indigo-600">৫০০ টাকা</span> to become a premium member.<br className="hidden md:block" />
                            You will get a <span className="text-yellow-500 font-semibold">Gold Badge</span> and can post more than 5 times.
                        </p>

                        <Elements stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    </>
                )}
            </div>
        </div>
    );
};

export default Membership;
