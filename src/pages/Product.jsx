import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useStore } from '../store/useStore';
import { useState } from 'react';
import { Star, Check, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Product = () => {
    const { id } = useParams();
    const { addToCart, addToWishlist } = useStore();
    const product = products.find((p) => p.id === parseInt(id));
    const [activeImage, setActiveImage] = useState(product?.images[0]);
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]);

    if (!product) return <div className="pt-32 text-center text-2xl">Product not found</div>;

    return (
        <div className="pt-32 min-h-screen px-4 md:px-8 max-w-7xl mx-auto pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* Gallery */}
                <div className="space-y-4">
                    <motion.div
                        layoutId={`image-${product.id}`}
                        className="aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 relative"
                    >
                        <img src={activeImage || product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                    </motion.div>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveImage(img)}
                                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors shrink-0 ${activeImage === img ? 'border-acid-lime' : 'border-transparent'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 text-white/60 mb-6">
                            <span className="flex items-center gap-1 text-yellow-400"><Star fill="currentColor" size={16} /> {product.rating}</span>
                            <span>|</span>
                            <span>{product.reviews} Reviews</span>
                        </div>
                        <div className="text-3xl font-mono font-bold text-acid-lime">₹{product.price.toLocaleString()}</div>
                    </div>

                    <p className="text-white/70 text-lg leading-relaxed">{product.description}</p>

                    {/* Selectors */}
                    <div className="space-y-6 border-y border-white/10 py-6">
                        {product.colors && (
                            <div>
                                <label className="text-sm font-bold uppercase tracking-wider text-white/50 mb-3 block">Color</label>
                                <div className="flex gap-3">
                                    {product.colors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 rounded-lg border transition-all ${selectedColor === color ? 'bg-white text-black border-white' : 'bg-transparent text-white border-white/20 hover:border-white'}`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.sizes && (
                            <div>
                                <label className="text-sm font-bold uppercase tracking-wider text-white/50 mb-3 block">Size</label>
                                <div className="flex gap-3">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all ${selectedSize === size ? 'bg-acid-lime text-black border-acid-lime' : 'bg-transparent text-white border-white/20 hover:border-white'}`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => addToCart(product, 1, { color: selectedColor, size: selectedSize })}
                            className="flex-1 bg-white text-midnight-indigo font-bold text-lg py-4 rounded-xl hover:bg-acid-lime transition-colors flex items-center justify-center gap-2"
                        >
                            <ShoppingCart size={20} /> Add to Cart
                        </button>
                        <button
                            onClick={() => addToWishlist(product)}
                            className="w-16 h-16 rounded-xl border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                        >
                            <Heart size={24} />
                        </button>
                    </div>

                    {/* Specs */}
                    {product.specs && (
                        <div className="bg-white/5 rounded-2xl p-6">
                            <h3 className="font-bold mb-4 uppercase tracking-wider">Specifications</h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                {Object.entries(product.specs).map(([key, value]) => (
                                    <div key={key}>
                                        <span className="text-white/50 block mb-1">{key}</span>
                                        <span className="font-medium">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
