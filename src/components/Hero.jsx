import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
    {
        id: 1,
        title: "Future of Sound",
        subtitle: "Sony WH-1000XM5",
        description: "Experience audio purity with industry-leading noise cancellation. Designed for the audiophile in you.",
        image: "/images/sony_wh1000xm5.png",
        accent: "from-acid-lime to-emerald-green",
        textAccent: "text-acid-lime",
        link: "/product/101"
    },
    {
        id: 2,
        title: "Urban Aesthetics",
        subtitle: "Streetwear Collection",
        description: "Redefining Indian street fashion with oversized fits and bold textures. The new wave is here.",
        image: "/images/air_jordan_1_high.png",
        accent: "from-neon-red to-purple-600",
        textAccent: "text-neon-red",
        link: "/category/fashion"
    },
    {
        id: 3,
        title: "Next-Gen Gaming",
        subtitle: "PlayStation 5 Pro",
        description: "Push the boundaries of play with hyper-realistic graphics and lightning-fast loading.",
        image: "/images/ps5_pro.png",
        accent: "from-cyan to-blue-600",
        textAccent: "text-cyan",
        link: "/category/gaming"
    }
];

const Hero = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-rich-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0 w-full h-full"
                >
                    <img
                        src={slides[current].image}
                        alt={slides[current].title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center px-6 md:px-20 z-10 pt-20">
                <div className="max-w-4xl w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center gap-3">
                                <span className={`h-px w-12 bg-gradient-to-r ${slides[current].accent}`} />
                                <span className={`text-sm font-bold tracking-widest uppercase ${slides[current].textAccent}`}>
                                    {slides[current].subtitle}
                                </span>
                            </div>

                            <h1 className="font-display text-5xl md:text-8xl font-bold text-white leading-[0.9] tracking-tight">
                                {slides[current].title.split(" ").map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h1>

                            <p className="text-white/70 text-lg md:text-xl max-w-xl leading-relaxed">
                                {slides[current].description}
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link
                                    to={slides[current].link}
                                    className={`px-8 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-opacity-90 transition-all flex items-center gap-2 group`}
                                >
                                    Shop Now
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                                </Link>
                                <Link
                                    to="/shop"
                                    className="px-8 py-4 border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all backdrop-blur-sm"
                                >
                                    View Collection
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="absolute bottom-12 right-6 md:right-20 z-20 flex items-center gap-8">
                <div className="flex gap-4">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrent(idx)}
                            className={`h-1 rounded-full transition-all duration-300 ${current === idx ? "w-12 bg-white" : "w-4 bg-white/20 hover:bg-white/40"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;