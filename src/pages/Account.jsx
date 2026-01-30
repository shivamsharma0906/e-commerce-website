import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, User, Settings, LogOut, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';

const Account = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const { wishlist, user } = useStore();

    // Mock Data linked to real images
    const orders = [
        {
            id: '#LUM-1024',
            date: 'Oct 24, 2025',
            status: 'Delivered',
            total: '₹23,999',
            items: [
                { name: 'Nothing Phone (2a)', image: '/images/nothing_phone_2a.png' }
            ]
        },
        {
            id: '#LUM-0988',
            date: 'Sep 12, 2025',
            status: 'In Transit',
            total: '₹4,499',
            items: [
                { name: 'Modern Fusion Kurta', image: '/images/modern_fusion_kurta.png' }
            ]
        },
    ];

    return (
        <div className="pt-32 min-h-screen px-4 md:px-8 max-w-7xl mx-auto pb-20">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full md:w-64 shrink-0 space-y-2">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center mb-6">
                        <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-acid-lime">
                            {user?.avatar ? (
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-acid-lime to-emerald-green flex items-center justify-center text-black font-bold text-2xl">S</div>
                            )}
                        </div>
                        <h2 className="font-bold text-xl">{user?.name || 'Guest User'}</h2>
                        <p className="text-white/50 text-sm">Platinum Member</p>
                    </div>

                    <nav className="space-y-1">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <User size={18} /> Overview
                        </button>
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <Package size={18} /> Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('wishlist')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'wishlist' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <Heart size={18} /> Wishlist ({wishlist.length})
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"><Settings size={18} /> Settings</button>
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-8">
                    <h1 className="font-display text-4xl font-bold capitalize">{activeTab}</h1>

                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-acid-lime/10 border border-acid-lime/20 p-6 rounded-2xl">
                                    <h3 className="text-acid-lime font-bold uppercase tracking-wider text-xs mb-2">Total Spent</h3>
                                    <p className="text-3xl font-mono font-bold text-white">₹28,498</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                    <h3 className="text-white/50 font-bold uppercase tracking-wider text-xs mb-2">Active Orders</h3>
                                    <p className="text-3xl font-mono font-bold text-white">1</p>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                                    <h3 className="text-white/50 font-bold uppercase tracking-wider text-xs mb-2">Wishlist</h3>
                                    <p className="text-3xl font-mono font-bold text-white">{wishlist.length}</p>
                                </div>
                            </div>

                            <section className="bg-white/5 p-8 rounded-2xl border border-white/5">
                                <h2 className="font-bold text-xl mb-6 text-white/80">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Full Name</label>
                                        <input type="text" value={user?.name || "Guest"} readOnly className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white/80" />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Email</label>
                                        <input type="email" value={user?.email || "guest@example.com"} readOnly className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white/80" />
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {(activeTab === 'overview' || activeTab === 'orders') && (
                        <section>
                            <h2 className="font-bold text-xl mb-4 text-white/80">{activeTab === 'overview' ? 'Recent Orders' : 'All Orders'}</h2>
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-wrap items-center justify-between gap-6"
                                    >
                                        <div className="flex items-center gap-4">
                                            {/* Order Images */}
                                            <div className="flex -space-x-4">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="w-16 h-16 rounded-lg border-2 border-rich-black overflow-hidden relative z-0 hover:z-10 transition-all">
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div>
                                                <div className="font-mono font-bold text-acid-lime mb-1">{order.id}</div>
                                                <div className="text-white/50 text-xs">{order.date}</div>
                                            </div>
                                        </div>

                                        <div className="flex-1 px-4 min-w-[200px]">
                                            <div className="font-medium text-white line-clamp-1">{order.items.map(i => i.name).join(', ')}</div>
                                            <div className="text-xs text-white/40">{order.items.length} Items</div>
                                        </div>

                                        <div className="text-right">
                                            <div className="font-bold mb-1">{order.total}</div>
                                            <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block ${order.status === 'Delivered' ? 'bg-emerald-green/20 text-emerald-green' : 'bg-amber-500/20 text-amber-500'}`}>
                                                {order.status}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === 'wishlist' && (
                        <section>
                            {wishlist.length === 0 ? (
                                <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/5">
                                    <Heart size={48} className="mx-auto text-white/20 mb-4" />
                                    <p className="text-white/50">Your wishlist is empty.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {wishlist.map(item => (
                                        <div key={item.id} className="bg-white/5 rounded-2xl border border-white/5 overflow-hidden group">
                                            <div className="aspect-square relative">
                                                <img src={item.image || item.images?.[0]} alt={item.name} className="w-full h-full object-cover" />
                                                <button className="absolute bottom-4 right-4 bg-acid-lime text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Package size={20} />
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-white mb-1">{item.name}</h3>
                                                <p className="text-acid-lime font-mono">₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Account;
