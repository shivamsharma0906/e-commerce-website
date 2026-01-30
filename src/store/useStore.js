import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

export const useStore = create(
    persist(
        (set, get) => ({
            // Cart State
            cart: [],
            isCartOpen: false,

            openCart: () => set({ isCartOpen: true }),
            closeCart: () => set({ isCartOpen: false }),
            toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

            addToCart: (product, quantity = 1, variant = {}) => {
                const { cart } = get();
                const existingItem = cart.find(
                    (item) =>
                        item.id === product.id &&
                        JSON.stringify(item.variant) === JSON.stringify(variant)
                );

                if (existingItem) {
                    set({
                        cart: cart.map((item) =>
                            item.id === product.id && JSON.stringify(item.variant) === JSON.stringify(variant)
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity, variant }] });
                }

                toast.success(`Added ${product.name} to cart`);
            },

            removeFromCart: (itemId, variant) => {
                set((state) => ({
                    cart: state.cart.filter(
                        (item) => !(item.id === itemId && JSON.stringify(item.variant) === JSON.stringify(variant))
                    ),
                }));
                toast.info("Item removed from cart");
            },

            updateQuantity: (itemId, variant, quantity) => {
                if (quantity < 1) return;
                set((state) => ({
                    cart: state.cart.map((item) =>
                        item.id === itemId && JSON.stringify(item.variant) === JSON.stringify(variant)
                            ? { ...item, quantity }
                            : item
                    ),
                }));
            },

            clearCart: () => set({ cart: [] }),

            cartTotal: () => {
                const { cart } = get();
                return cart.reduce((total, item) => {
                    const price = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
                    return total + price * item.quantity;
                }, 0);
            },

            // Wishlist State
            wishlist: [],
            addToWishlist: (product) => {
                const { wishlist } = get();
                if (wishlist.find((item) => item.id === product.id)) {
                    set((state) => ({
                        wishlist: state.wishlist.filter((item) => item.id !== product.id)
                    }));
                    toast.info("Removed from wishlist");
                } else {
                    set((state) => ({ wishlist: [...state.wishlist, product] }));
                    toast.success("Added to wishlist");
                }
            },

            // User/Auth State
            user: {
                name: 'Shivam',
                email: 'shivam@NAVYA.design',
                avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1760&auto=format&fit=crop'
            },
            login: (userData) => set({ user: userData }),
            logout: () => set({ user: null }),
        }),
        {
            name: 'NAVYA-storage', // unique name
            partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist, user: state.user }), // Persist all
        }
    )
);
