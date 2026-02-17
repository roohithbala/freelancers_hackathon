import React, { useState } from 'react';
import { CreditCard, Lock, Check } from 'lucide-react';

const PaymentModal = ({ onClose, onUpgrade }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoading(false);
        onUpgrade();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full border border-slate-700 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                        <Lock className="h-6 w-6 mr-2 text-green-500" /> Secure Checkout
                    </h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
                </div>

                <div className="mb-6 bg-slate-900 p-4 rounded-lg border border-slate-700">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-slate-400">Total due today</span>
                        <span className="text-2xl font-bold text-white">$9.00</span>
                    </div>
                    <p className="text-sm text-slate-500">Premium Subscription (Monthly)</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Cardholder Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="John Doe"
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Card Number</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="cardNumber"
                                required
                                maxLength="19"
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="0000 0000 0000 0000"
                                onChange={handleChange}
                            />
                            <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-slate-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Expiry Date</label>
                            <input
                                type="text"
                                name="expiry"
                                required
                                maxLength="5"
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="MM/YY"
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                required
                                maxLength="3"
                                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="123"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 py-3 px-6 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all flex justify-center items-center"
                    >
                        {loading ? (
                            <span>Processing...</span>
                        ) : (
                            <>
                                Pay $9.00 <Check className="ml-2 h-5 w-5" />
                            </>
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-500 mt-4">
                    <Lock className="inline h-3 w-3 mr-1" /> encrypted via 256-bit SSL
                </p>
            </div>
        </div>
    );
};

export default PaymentModal;
