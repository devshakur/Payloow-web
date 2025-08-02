import React, { createContext, useState, useEffect, useContext } from "react";
import { InvestmentContext } from "../../../AuthContext/InvestmentContext/InvestmentContext";
import useAuth from "../../../hooks/useAuth";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { GetCart } = useContext(InvestmentContext);
  const { user } = useAuth();

  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

  // Rehydrate cart from localStorage on first load
  useEffect(() => {
    const stored = localStorage.getItem("cart_quantity");
    if (stored) {
      setCartTotalQuantity(parseInt(stored));
    }
  }, []);

  // Sync to localStorage on change
  useEffect(() => {
    localStorage.setItem("cart_quantity", cartTotalQuantity);
  }, [cartTotalQuantity]);

  // Refresh cart from backend
  const refreshCart = async () => {
    try {
      const resp = await GetCart();
      const items = resp?.data?.data || [];
      const total = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartTotalQuantity(total);
    } catch (error) {
      console.error("Failed to refresh cart:", error);
    }
  };

  // Fetch once on login
  useEffect(() => {
    if (user && GetCart) {
      refreshCart();
    }
  }, [user]);

  return (
    <CartContext.Provider value={{ cartTotalQuantity, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
