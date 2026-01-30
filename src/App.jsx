import { ReactLenis } from 'lenis/react'
import { Toaster } from 'sonner'
import Dock from './components/Dock'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
// import { CartProvider } from './context/CartContext'; // Deprecated in favor of Zustand

import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';

// Pages - We'll create these next, temporarily using placeholders
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';

// Placeholder Home Page Component (Keep Hero + Category Sections)
const Home = () => {
  // Mock Data for Sections moved here
  const electronicsData = [
    { id: 101, name: 'Sony PlayStation 5 Pro', brand: 'Sony', price: '₹54,990', image: '/images/ps5_pro.png' },
    { id: 102, name: 'MacBook Air M3', brand: 'Apple', price: '₹1,14,900', image: '/images/macbook_air_m3.png' },
    { id: 103, name: 'Canon EOS R5', brand: 'Canon', price: '₹3,29,990', image: '/images/canon_eos_r5.png' },
  ];

  const fashionData = [
    { id: 201, name: 'Oversized Street Tee', brand: 'Urban Monkey', price: '₹1,999', image: '/images/oversized_street_tee.png' },
    { id: 202, name: 'Cargo Tech Pants', brand: 'Jaywalking', price: '₹5,499', image: '/images/cargo_tech_pants.png' },
    { id: 203, name: 'Silk Saree Luxe', brand: 'Sabyasachi x H&M', price: '₹12,999', image: '/images/silk_saree_luxe.png' },
  ];

  const trendingData = [
    { id: 1, name: 'Nothing Phone (2a)', brand: 'Nothing', price: '₹23,999', image: '/images/nothing_phone_2a.png' },
    { id: 2, name: 'Sony WH-1000XM5', brand: 'Sony', price: '₹29,990', image: '/images/sony_wh1000xm5.png' },
    { id: 3, name: 'Air Jordan 1 High OG', brand: 'Jordan', price: '₹16,995', image: '/images/air_jordan_1_high.png' },
    { id: 4, name: 'Modern Fusion Kurta', brand: 'Manyavar', price: '₹4,499', image: '/images/modern_fusion_kurta.png' },
    { id: 5, name: 'Oversized Street Tee', brand: 'Urban Monkey', price: '₹1,999', image: '/images/urban_monkey_tee.png' },
    { id: 201, name: 'Oversized Street Tee (Ltd)', brand: 'Urban Monkey', price: '₹1,999', image: '/images/oversized_street_tee.png' },
  ];

  return (
    <>
      <Hero />
      <CategorySection
        title="Trending Now"
        subtitle="The most hyped drops of the season."
        products={trendingData.slice(0, 3)}
        accentColor="bg-acid-lime"
      />
      <CategorySection
        title="Next-Gen Tech"
        subtitle="Upgrade your arsenal with cutting-edge electronics."
        products={electronicsData}
        accentColor="bg-cyan"
      />
      <CategorySection
        title="Urban Aesthetics"
        subtitle="Streetwear meets tradition. The new Indian wave."
        products={fashionData}
        accentColor="bg-neon-red"
      />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="wishlist" element={<Account />} />
          <Route path="orders" element={<Account />} />

          {/* Functional Routes mapped to Shop */}
          <Route path="category/:category" element={<Shop />} />
          <Route path="search" element={<Shop />} />

          {/* Placeholders for new links */}
          <Route path="deals" element={<div className="pt-32 text-center text-4xl">Flash Deals Coming Soon</div>} />
          <Route path="new" element={<div className="pt-32 text-center text-4xl">New Arrivals Coming Soon</div>} />
          <Route path="bestsellers" element={<div className="pt-32 text-center text-4xl">Best Sellers Coming Soon</div>} />
          <Route path="help" element={<div className="pt-32 text-center text-4xl">Help Center</div>} />
          <Route path="about" element={<div className="pt-32 text-center text-4xl">About Us</div>} />
          <Route path="login" element={<div className="pt-32 text-center text-4xl">Login Page</div>} />
          <Route path="register" element={<div className="pt-32 text-center text-4xl">Register Page</div>} />
          <Route path="settings" element={<div className="pt-32 text-center text-4xl">Settings</div>} />
          <Route path="addresses" element={<div className="pt-32 text-center text-4xl">Saved Addresses</div>} />

          <Route path="*" element={<div className="pt-32 text-center text-4xl">404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
