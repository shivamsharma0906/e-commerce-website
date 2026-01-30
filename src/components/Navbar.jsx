import { Search, ShoppingBag, User, Menu, X, Heart, ChevronDown, Package, LogOut, Settings, MapPin, Bell, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const categories = [
    { name: 'Electronics', path: '/category/electronics', icon: '📱' },
    { name: 'Fashion', path: '/category/fashion', icon: '👕' },
    { name: 'Audio', path: '/category/audio', icon: '🎧' },
    { name: 'Accessories', path: '/category/accessories', icon: '⌚' },
    { name: 'Gaming', path: '/category/gaming', icon: '🎮' },
    { name: 'Home & Living', path: '/category/home', icon: '🏠' },
];

const quickLinks = [
    { name: 'Flash Deals', path: '/deals', badge: 'HOT', color: 'text-neon-red' },
    { name: 'New Arrivals', path: '/new', badge: 'NEW' },
    { name: 'Best Sellers', path: '/bestsellers', icon: <TrendingUp size={14} /> },
];

const Navbar = () => {
    const { cart, openCart, wishlist, user } = useStore();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);
    const userMenuRef = useRef(null);

    const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setIsSearchOpen(false);
        }
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                        ? 'bg-midnight-indigo/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'
                        : 'bg-transparent'
                    }`}
            >
                {/* Top Banner */}
                <div className="bg-gradient-to-r from-acid-lime via-emerald-green to-cyan text-midnight-indigo py-2 px-4 text-center text-sm font-semibold">
                    🎉 Flash Sale: Up to 70% OFF on Electronics • Free Shipping on Orders Above ₹999
                </div>

                <div className="px-4 md:px-6 py-3">
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0">
                            <motion.h1
                                className="font-display text-2xl md:text-3xl font-bold tracking-tighter"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-acid-lime via-emerald-green to-cyan">
                                    NAVYA
                                </span>
                            </motion.h1>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {/* Categories Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsCategoriesOpen(true)}
                                onMouseLeave={() => setIsCategoriesOpen(false)}
                            >
                                <button className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                                    <span className="font-medium">Categories</span>
                                    <ChevronDown size={16} className={`transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isCategoriesOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 mt-2 w-64 bg-midnight-indigo/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                        >
                                            <div className="p-2">
                                                {categories.map((category, index) => (
                                                    <Link
                                                        key={category.name}
                                                        to={category.path}
                                                        className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all group"
                                                    >
                                                        <span className="text-2xl">{category.icon}</span>
                                                        <span className="font-medium">{category.name}</span>
                                                        <ChevronDown size={16} className="ml-auto rotate-[-90deg] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="border-t border-white/10 p-2 bg-white/5">
                                                <Link
                                                    to="/categories"
                                                    className="block px-4 py-2 text-center text-acid-lime hover:text-emerald-green font-semibold text-sm transition-colors"
                                                >
                                                    View All Categories →
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Quick Links */}
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="relative px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium group"
                                >
                                    <span className="flex items-center gap-2">
                                        {link.icon}
                                        {link.name}
                                        {link.badge && (
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${link.badge === 'HOT'
                                                    ? 'bg-neon-red text-white'
                                                    : 'bg-acid-lime text-midnight-indigo'
                                                }`}>
                                                {link.badge}
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            ))}
                        </nav>

                        {/* Search Bar */}
                        <div ref={searchRef} className="hidden md:flex flex-1 max-w-xl relative">
                            <form onSubmit={handleSearch} className="w-full">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => setIsSearchOpen(true)}
                                        placeholder="Search for products, brands..."
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/40 focus:outline-none focus:border-acid-lime focus:bg-white/10 transition-all"
                                    />
                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery('')}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                                        >
                                            <X size={18} />
                                        </button>
                                    )}
                                </div>
                            </form>

                            {/* Search Suggestions Dropdown */}
                            <AnimatePresence>
                                {isSearchOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-midnight-indigo/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                    >
                                        <div className="p-4">
                                            <h3 className="text-xs font-semibold text-white/40 uppercase mb-3">Popular Searches</h3>
                                            <div className="space-y-2">
                                                {['iPhone 15', 'Air Jordan', 'Sony Headphones', 'Gaming Laptop'].map((term) => (
                                                    <button
                                                        key={term}
                                                        onClick={() => {
                                                            setSearchQuery(term);
                                                            setIsSearchOpen(false);
                                                            navigate(`/search?q=${encodeURIComponent(term)}`);
                                                        }}
                                                        className="flex items-center gap-3 w-full px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all text-left"
                                                    >
                                                        <Search size={16} className="text-white/40" />
                                                        <span>{term}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="border-t border-white/10 p-4 bg-white/5">
                                            <h3 className="text-xs font-semibold text-white/40 uppercase mb-3">Trending Now</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {['Wireless Earbuds', 'Smartwatch', 'Sneakers'].map((tag) => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => {
                                                            setSearchQuery(tag);
                                                            navigate(`/search?q=${encodeURIComponent(tag)}`);
                                                        }}
                                                        className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-white/80 hover:text-white transition-all"
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-2 md:gap-4">
                            {/* Mobile Search */}
                            <button className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors">
                                <Search size={20} />
                            </button>

                            {/* Notifications (Desktop Only) */}
                            <button className="hidden lg:block relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors group">
                                <Bell size={20} className="group-hover:text-acid-lime transition-colors" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-neon-red rounded-full animate-pulse" />
                            </button>

                            {/* Wishlist */}
                            <Link to="/wishlist" className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors group">
                                <Heart size={20} className="group-hover:text-neon-red transition-colors" />
                                {wishlist?.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-neon-red text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <button
                                onClick={openCart}
                                className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors group"
                            >
                                <ShoppingBag size={20} className="group-hover:text-acid-lime transition-colors" />
                                {cartItemCount > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-acid-lime to-emerald-green text-midnight-indigo text-xs font-bold rounded-full flex items-center justify-center px-1.5"
                                    >
                                        {cartItemCount}
                                    </motion.span>
                                )}
                            </button>

                            {/* User Menu */}
                            <div ref={userMenuRef} className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center gap-2 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-acid-lime to-emerald-green flex items-center justify-center">
                                        {user?.avatar ? (
                                            <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <User size={18} className="text-midnight-indigo" />
                                        )}
                                    </div>
                                    <ChevronDown size={16} className={`hidden md:block transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isUserMenuOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full right-0 mt-2 w-64 bg-midnight-indigo/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                                        >
                                            {user ? (
                                                <>
                                                    <div className="p-4 border-b border-white/10 bg-gradient-to-br from-acid-lime/10 to-emerald-green/10">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-acid-lime to-emerald-green flex items-center justify-center text-xl">
                                                                {user.avatar ? (
                                                                    <img src={user.avatar} alt="" className="w-full h-full rounded-full object-cover" />
                                                                ) : (
                                                                    '👤'
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="font-semibold text-white">{user.name || 'Guest User'}</div>
                                                                <div className="text-xs text-white/60">{user.email || 'guest@NAVYA.com'}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="p-2">
                                                        <Link to="/account" className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                                                            <User size={18} />
                                                            <span>My Account</span>
                                                        </Link>
                                                        <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                                                            <Package size={18} />
                                                            <span>My Orders</span>
                                                        </Link>
                                                        <Link to="/wishlist" className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                                                            <Heart size={18} />
                                                            <span>Wishlist</span>
                                                        </Link>
                                                        <Link to="/addresses" className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                                                            <MapPin size={18} />
                                                            <span>Saved Addresses</span>
                                                        </Link>
                                                        <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                                                            <Settings size={18} />
                                                            <span>Settings</span>
                                                        </Link>
                                                    </div>
                                                    <div className="border-t border-white/10 p-2">
                                                        <button className="flex items-center gap-3 w-full px-4 py-3 text-neon-red hover:bg-neon-red/10 rounded-xl transition-all">
                                                            <LogOut size={18} />
                                                            <span>Logout</span>
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="p-4">
                                                    <p className="text-white/60 text-sm mb-4">Sign in to access your account</p>
                                                    <Link
                                                        to="/login"
                                                        className="block w-full py-3 bg-gradient-to-r from-acid-lime to-emerald-green text-midnight-indigo font-bold rounded-xl text-center hover:shadow-lg hover:shadow-acid-lime/20 transition-all"
                                                    >
                                                        Sign In
                                                    </Link>
                                                    <Link
                                                        to="/register"
                                                        className="block w-full py-3 mt-2 bg-white/5 border border-white/10 text-white font-semibold rounded-xl text-center hover:bg-white/10 transition-all"
                                                    >
                                                        Create Account
                                                    </Link>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-80 bg-midnight-indigo border-r border-white/10 z-50 overflow-y-auto lg:hidden"
                        >
                            <div className="p-6">
                                {/* Mobile Menu Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-acid-lime to-emerald-green">
                                        NAVYA
                                    </h2>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                {/* Mobile Search */}
                                <form onSubmit={handleSearch} className="mb-6">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search products..."
                                            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-acid-lime transition-all"
                                        />
                                    </div>
                                </form>

                                {/* Quick Links */}
                                <div className="mb-6">
                                    <h3 className="text-xs font-semibold text-white/40 uppercase mb-3">Quick Access</h3>
                                    <div className="space-y-1">
                                        {quickLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                to={link.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center justify-between px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                            >
                                                <span className="flex items-center gap-2 font-medium">
                                                    {link.icon}
                                                    {link.name}
                                                </span>
                                                {link.badge && (
                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${link.badge === 'HOT'
                                                            ? 'bg-neon-red text-white'
                                                            : 'bg-acid-lime text-midnight-indigo'
                                                        }`}>
                                                        {link.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="mb-6">
                                    <h3 className="text-xs font-semibold text-white/40 uppercase mb-3">Categories</h3>
                                    <div className="space-y-1">
                                        {categories.map((category) => (
                                            <Link
                                                key={category.name}
                                                to={category.path}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                            >
                                                <span className="text-xl">{category.icon}</span>
                                                <span className="font-medium">{category.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Footer */}
                                <div className="pt-6 border-t border-white/10">
                                    <Link
                                        to="/help"
                                        className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all mb-2"
                                    >
                                        Help & Support
                                    </Link>
                                    <Link
                                        to="/about"
                                        className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                                    >
                                        About Us
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;