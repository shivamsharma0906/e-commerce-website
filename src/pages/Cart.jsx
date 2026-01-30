import { useStore } from '../store/useStore'; // Ensure this path is correct!
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    // 1. Destructure safely. 
    // If cartTotal is not a function in your store, remove '()' below.
    const { cart, removeFromCart, updateQuantity, cartTotal } = useStore();

    // 2. Calculate totals safely
    // Default to 0 if cartTotal is undefined to prevent crash
    const total = typeof cartTotal === 'function' ? cartTotal() : (cartTotal || 0);

    const shipping = total > 5000 ? 0 : 500;
    const taxes = total * 0.18; // 18% GST
    const finalTotal = total + taxes + shipping;

    if (!cart || cart.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center pt-24 text-center px-4">
                <h2 className="text-3xl font-display font-bold mb-4 text-white">Your Cart is Empty</h2>
                <p className="text-white/50 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/shop" className="px-8 py-3 bg-acid-lime text-black font-bold rounded-xl hover:bg-white transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-32 min-h-screen px-4 md:px-8 max-w-7xl mx-auto pb-20">
            <h1 className="font-display text-4xl font-bold mb-12 text-white">Shopping Cart ({cart.length})</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence>
                        {cart.map((item) => (
                            <motion.div
                                // 3. Use a unique key. Fallback to index if ids aren't unique enough
                                key={`${item.id}-${item.variant?.size || 'def'}-${item.variant?.color || 'def'}`}
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex gap-6 bg-white/5 p-4 rounded-2xl border border-white/5"
                            >
                                {/* Image Fallback */}
                                <div className="w-24 h-24 bg-black/40 rounded-xl overflow-hidden shrink-0">
                                    <img
                                        src={item.image || item.images?.[0] || 'https://via.placeholder.com/150'}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg text-white">{item.name}</h3>
                                            <p className="text-white/50 text-sm">
                                                {item.variant?.color && <span className="mr-2">{item.variant.color}</span>}
                                                {item.variant?.size && <span>| {item.variant.size}</span>}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id, item.variant)}
                                            className="text-white/30 hover:text-red-500 transition-colors p-2"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-end mt-4">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.variant, Math.max(1, item.quantity - 1))}
                                                className="p-1 hover:bg-white/10 rounded text-white"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-mono w-6 text-center text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                                                className="p-1 hover:bg-white/10 rounded text-white"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <div className="font-mono font-bold text-acid-lime">
                                            ₹{(parseFloat(item.price.toString().replace(/[^0-9.]/g, '')) * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Order Summary Sticky Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 sticky top-32">
                        <h2 className="font-display text-xl font-bold mb-6 text-white">Order Summary</h2>

                        <div className="space-y-4 text-sm mb-8 border-b border-white/10 pb-8">
                            <div className="flex justify-between text-white/60">
                                <span>Subtotal</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-white/60">
                                <span>Estimated Tax (18% GST)</span>
                                <span>₹{taxes.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-white/60">
                                <span>Shipping</span>
                                <span className={shipping === 0 ? "text-acid-lime" : ""}>
                                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-between font-bold text-xl mb-8 text-white">
                            <span>Total</span>
                            <span>₹{finalTotal.toLocaleString()}</span>
                        </div>

                        <Link
                            to="/checkout"
                            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-acid-lime transition-colors flex items-center justify-center gap-2"
                        >
                            Checkout <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;