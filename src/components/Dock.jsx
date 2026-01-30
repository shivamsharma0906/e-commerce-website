import { motion } from 'framer-motion';
import { Home, Search, ShoppingBag, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

const Dock = () => {
    const { cart } = useStore();

    const dockItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: Search, label: 'Search', path: '/search' },
        { icon: ShoppingBag, label: 'Cart', count: cart.length, path: '/cart' },
        { icon: User, label: 'Profile', path: '/account' },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100, delay: 0.5 }}
                className="flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full shadow-2xl"
            >
                {dockItems.map((item, index) => (
                    <Link key={index} to={item.path}>
                        <DockItem icon={item.icon} label={item.label} count={item.count} />
                    </Link>
                ))}
            </motion.div>
        </div>
    );
};

const DockItem = ({ icon: Icon, label, count }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.2, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 text-white/70 hover:text-acid-lime hover:bg-white/5 rounded-full transition-colors relative group"
        >
            <Icon size={24} strokeWidth={1.5} />
            {count > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-neon-red rounded-full" />
            )}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-rich-black/90 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 whitespace-nowrap pointer-events-none">
                {label}
            </span>
        </motion.button>
    );
};

export default Dock;
