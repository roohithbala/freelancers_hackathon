import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from './ui/Toast';
import { Zap, ShieldCheck, RefreshCw } from 'lucide-react';

const PaymentButton = ({ amount = 499, plan = 'pro', onSuccess }) => {
    const { currentUser, setTier } = useAuth();
    const { success, error } = useToast();
    const [loading, setLoading] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);
        const res = await loadRazorpayScript();

        if (!res) {
            error('Razorpay SDK failed to load.');
            setLoading(false);
            return;
        }

        try {
            const orderResponse = await fetch('http://localhost:5000/api/payment/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, currency: 'INR' })
            });

            const orderData = await orderResponse.json();
            const { order } = orderData;

            const options = {
                key: 'rzp_test_SI9HMhDsvUPR1o',
                amount: order.amount,
                currency: order.currency,
                name: "IdeaForge Premium",
                description: `Upgrade to ${plan.toUpperCase()}`,
                order_id: order.id,
                handler: async (response) => {
                    const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response)
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        setTier(plan);
                        if (onSuccess) onSuccess();
                    }
                },
                prefill: { email: currentUser?.email },
                theme: { color: "#6366F1" }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            error('Payment failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handlePayment}
            disabled={loading}
            className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 uppercase tracking-widest text-sm"
        >
            {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
                <>
                    <Zap className="w-5 h-5 fill-current" />
                    <span>Unlock Startup Mode</span>
                    <ShieldCheck className="w-5 h-5" />
                </>
            )}
        </button>
    );
};

export default PaymentButton;
