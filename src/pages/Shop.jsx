import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { Link, useSearchParams, useParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';

const Shop = () => {
    const { addToCart } = useStore();
    const [searchParams] = useSearchParams();
    const { category } = useParams();

    // Initial State based on URL
    const query = searchParams.get('q') || '';
    const initialCategory = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [priceRange, setPriceRange] = useState(50000); // Max price

    // Update state when URL changes
    useEffect(() => {
        if (category) {
            setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1));
        } else {
            setSelectedCategory('All');
        }
    }, [category]);

    const categories = ['All', 'Electronics', 'Fashion', 'Footwear'];

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
        const priceMatch = product.price <= priceRange;
        const searchMatch = query === '' ||
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.brand.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase());

        return categoryMatch && priceMatch && searchMatch;
    });

    return (
        <div className="pt-24 min-h-screen px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 shrink-0 space-y-8">
                <div className="sticky top-24">
                    <div className="flex items-center gap-2 mb-6 text-xl font-bold font-display uppercase tracking-wider">
                        <Filter size={20} className="text-acid-lime" /> Filters
                    </div>

                    {/* Category Filter */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4">Category</h3>
                        <div className="space-y-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`block text-left w-full hover:text-white transition-colors ${selectedCategory === cat ? 'text-acid-lime font-bold' : 'text-white/70'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white/50 mb-4">Max Price: ₹{priceRange.toLocaleString()}</h3>
                        <input
                            type="range"
                            min="1000"
                            max="100000"
                            step="1000"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full accent-acid-lime bg-white/10 h-2 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-display font-bold">
                        {query ? `Search Results for "${query}"` : `Shop / ${selectedCategory}`}
                    </h2>
                    <span className="text-white/50 text-sm">{filteredProducts.length} Results</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ShopProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="py-20 text-center text-white/50">
                        No products found in this range.
                    </div>
                )}
            </div>
        </div>
    );
};

const ShopProductCard = ({ product, addToCart }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors"
        >
            <div className="relative aspect-square overflow-hidden bg-black/40">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 bg-white text-black font-bold px-4 py-2 rounded-full translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-acid-lime"
                >
                    Add
                </button>
                {product.tags && product.tags[0] && (
                    <span className="absolute top-4 left-4 bg-acid-lime text-black text-xs font-bold px-2 py-1 rounded">
                        {product.tags[0]}
                    </span>
                )}
            </div>
            <div className="p-4">
                <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-1">{product.brand}</p>
                <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-display font-bold text-lg mb-2 hover:text-cyan transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                    <span className="text-white font-mono font-medium">₹{product.price.toLocaleString()}</span>
                    {product.rating && (
                        <span className="flex items-center gap-1 text-xs text-yellow-400">★ {product.rating}</span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default Shop;
