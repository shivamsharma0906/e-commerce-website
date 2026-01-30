import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, ShoppingBag, Eye } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const CategorySection = ({ title, subtitle, products, accentColor = 'bg-neon-saffron' }) => {
    const containerRef = useRef(null);

    // Parallax Title Effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const titleY = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <section ref={containerRef} className="py-24 px-4 md:px-8 w-full border-t border-white/5 bg-rich-black relative overflow-hidden">

            {/* 1. Cinematic Background Noise */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
            </div>

            {/* Ambient Glow */}
            <div className={`absolute top-0 right-0 w-[600px] h-[600px] ${accentColor} opacity-10 blur-[150px] rounded-full pointer-events-none mix-blend-screen`} />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* 2. Editorial Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-8">
                    <div>
                        <motion.div style={{ y: titleY }}>
                            <span className="font-display text-acid-lime text-xl tracking-widest uppercase mb-2 block">
                                Collection 2026
                            </span>
                            <h2 className="font-display text-5xl md:text-8xl font-bold uppercase text-transparent stroke-text hover:text-white transition-colors duration-500 cursor-default">
                                {title}
                            </h2>
                        </motion.div>
                        <p className="text-gray-400 mt-4 text-lg max-w-md font-light leading-relaxed">
                            {subtitle}
                        </p>
                    </div>

                    <button className="hidden md:flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all group">
                        <span className="uppercase font-bold tracking-widest text-xs">View Full Collection</span>
                        <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* 3. Asymmetrical "Magazine" Grid */}
                <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                    {products.map((product, idx) => (
                        <CategoryCard
                            key={idx}
                            product={product}
                            index={idx}
                            // Mobile: Default col-span-1 (fits 2 in grid-cols-2). Desktop: First item larger.
                            spanClass={idx === 0 ? "col-span-2 md:col-span-6 md:row-span-2" : "col-span-1 md:col-span-3 md:row-span-1"}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const CategoryCard = ({ product, index, spanClass }) => {
    const { addToCart } = useStore();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className={`group relative rounded-sm overflow-hidden bg-white/5 border border-white/5 ${spanClass}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Layer */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[0.25, 1, 0.5, 1] group-hover:scale-110"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
            </div>

            {/* 4. "Quick Action" Overlay (Appears on Hover) */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-black/40 backdrop-blur-sm"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="w-14 h-14 rounded-full bg-acid-lime text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_rgba(192,235,117,0.4)]"
                            title="Add to Cart"
                        >
                            <ShoppingBag size={24} />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/product/${product.id}`);
                            }}
                            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                            title="Quick View"
                        >
                            <Eye size={24} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Info Layer (Always Visible but animates) */}
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-10 pointer-events-none">
                <div className="flex justify-between items-end transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <div>
                        <p className="text-acid-lime font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2 border-l-2 border-acid-lime pl-2">
                            {product.brand || 'NAVYA Originals'}
                        </p>
                        <h3 className="font-display text-lg md:text-3xl font-bold text-white leading-none mb-1">
                            {product.name}
                        </h3>
                    </div>
                    <div className="text-right">
                        <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider mb-1">Price</p>
                        <p className="font-display text-lg md:text-2xl font-bold text-white">{product.price}</p>
                    </div>
                </div>
            </div>


        </motion.div>
    );
};

export default CategorySection;