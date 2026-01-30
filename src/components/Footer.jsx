import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-rich-black border-t border-white/5 pt-24 pb-12 px-6 md:px-20 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-midnight-indigo opacity-20 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
                {/* Brand Section */}
                <div className="max-w-md space-y-6">
                    <h2 className="font-display text-4xl font-bold text-white tracking-tight">NAVYA</h2>
                    <p className="text-white/60 text-lg leading-relaxed">
                        Curating the finest in next-gen technology and avant-garde fashion.
                        We exist to bridge the gap between utility and art.
                    </p>
                </div>

                {/* Newsletter Section */}
                <div className="w-full md:max-w-sm space-y-6">
                    <h3 className="font-display text-xl font-bold text-white">Join the Inner Circle</h3>
                    <p className="text-white/50 text-sm">Get early access to drops and exclusive offers.</p>

                    <form className="flex gap-0" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-white/5 border border-white/10 border-r-0 rounded-l-lg px-6 py-4 w-full text-white placeholder-white/30 focus:outline-none focus:bg-white/10 transition-colors"
                        />
                        <button className="bg-acid-lime text-black font-bold px-6 py-4 rounded-r-lg hover:bg-white transition-colors">
                            <ArrowRight size={20} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 uppercase tracking-wider relative z-10">
                <p>&copy; 2026 NAVYA Commerce</p>
            </div>
        </footer>
    );
};

export default Footer;
