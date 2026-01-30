import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Checkout = () => {
    const { cartTotal, clearCart } = useStore();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const total = cartTotal() * 1.18; // Approx with tax

    const handlePayment = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            clearCart();
            toast.success("Order placed successfully!");
            navigate('/');
        }, 2000);
    };

    return (
        <div className="pt-32 min-h-screen px-4 md:px-8 max-w-4xl mx-auto pb-20">
            <h1 className="font-display text-3xl font-bold mb-8 text-center uppercase tracking-widest">Checkout</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-8">
                    {/* Step 1: Shipping */}
                    <div className={`p-6 rounded-2xl border ${step >= 1 ? 'border-acid-lime bg-acid-lime/5' : 'border-white/10 bg-white/5'}`}>
                        <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-acid-lime text-black flex items-center justify-center text-sm">1</span>
                            Shipping Information
                        </h2>
                        {step === 1 && (
                            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input required type="text" placeholder="First Name" className="bg-black/20 border border-white/10 rounded-lg p-3 w-full" />
                                    <input required type="text" placeholder="Last Name" className="bg-black/20 border border-white/10 rounded-lg p-3 w-full" />
                                </div>
                                <input required type="email" placeholder="Email Address" className="bg-black/20 border border-white/10 rounded-lg p-3 w-full" />
                                <input required type="text" placeholder="Street Address" className="bg-black/20 border border-white/10 rounded-lg p-3 w-full" />
                                <div className="grid grid-cols-2 gap-4">
                                    <input required type="text" placeholder="City" className="bg-black/20 border border-white/10 rounded-lg p-3 w-full" />
                                    <input required type="text" placeholder="ZIP Code" className="bg-black/20 border border-white/10 rounded-lg p-3 w-full" />
                                </div>
                                <button type="submit" className="bg-white text-black font-bold px-6 py-3 rounded-xl mt-4 hover:bg-acid-lime transition-colors">
                                    Continue to Payment
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Step 2: Payment */}
                    <div className={`p-6 rounded-2xl border ${step === 2 ? 'border-acid-lime bg-acid-lime/5' : 'border-white/10 bg-white/5 opacity-50'}`}>
                        <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center text-sm">2</span>
                            Payment
                        </h2>
                        {step === 2 && (
                            <form onSubmit={handlePayment} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 p-4 border border-white/20 rounded-xl cursor-pointer hover:bg-white/5">
                                        <input type="radio" name="payment" defaultChecked className="accent-acid-lime" />
                                        <span>Credit / Debit Card</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border border-white/20 rounded-xl cursor-pointer hover:bg-white/5">
                                        <input type="radio" name="payment" className="accent-acid-lime" />
                                        <span>UPI / Netbanking</span>
                                    </label>
                                    <label className="flex items-center gap-3 p-4 border border-white/20 rounded-xl cursor-pointer hover:bg-white/5">
                                        <input type="radio" name="payment" className="accent-acid-lime" />
                                        <span>Cash on Delivery</span>
                                    </label>
                                </div>
                                <button disabled={loading} type="submit" className="w-full bg-acid-lime text-black font-bold py-4 rounded-xl mt-6 hover:bg-white transition-colors disabled:opacity-50">
                                    {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Summary Sidebar */}
                <div>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                        <h3 className="font-bold mb-4">Order Summary</h3>
                        <div className="flex justify-between font-bold text-xl">
                            <span>Total To Pay</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
