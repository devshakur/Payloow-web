import React, { createContext, useState, useEffect, useContext } from 'react';
import { InvestmentContext } from '../../../AuthContext/InvestmentContext/InvestmentContext';
import useAuth from '../../../hooks/useAuth';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const { GetCart } = useContext(InvestmentContext); 
    const {user} = useAuth();// use GetCart from context
    const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

    useEffect(() => {
        if(user) {
            const fetchCartItems = async () => {
                try {
                    const resp = await GetCart();
                    const info = resp?.data?.data;
    
                    if (info) {
                        const total = info.reduce((sum, item) => sum + item.quantity, 0);
                        setCartTotalQuantity(total);
                    }
                } catch (error) {
                    console.error("Failed to fetch cart items:", error);
                }
            };
    
            if (GetCart) {
                fetchCartItems();
            } else {
                console.error("GetCart function is not available");
            }

        }
    }, [user]);

    // Function to increase cartTotalQuantity
    const increaseCartQuantity = (amount) => {
        setCartTotalQuantity((prevQuantity) => prevQuantity + amount);
    };

    return (
        <CartContext.Provider value={{ cartTotalQuantity, increaseCartQuantity }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
