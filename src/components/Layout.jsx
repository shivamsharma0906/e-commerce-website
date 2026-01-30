import { Outlet } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { Toaster } from 'sonner';
import Dock from '../components/Dock';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <ReactLenis root>
            <div className="min-h-screen bg-midnight-indigo text-white selection:bg-acid-lime selection:text-rich-black flex flex-col">
                <Toaster position="top-center" theme="dark" />
                <Navbar />

                <main className="flex-grow">
                    <Outlet />
                </main>

                <Footer />
                <Dock />
            </div>
        </ReactLenis>
    );
};

export default Layout;
