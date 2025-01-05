// import React, { createContext, useContext, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import useInvestment from "../hooks/useInvetment";

// // Create the Cart context
// const CartContext = createContext();

// // Custom hook to use the Cart context
// export const UseCart = () => {
//   return useContext(CartContext);
// };

// // Cart provider to manage cart data
// export const CartProvider = ({ children }) => {
//   const { GetCart } = useInvestment()
//   const [cartItems, setCartItems] = useState([]);
//   const [totalQuantity, setTotalQuantity] = useState(0);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const resp = await GetCart();
//         const info = resp?.data?.data;

//         if (info) {
//           setCartItems(info); // Update cart items
//           // Calculate the total quantity and update state
//           const total = info.reduce((sum, item) => sum + item.quantity, 0);
//           setTotalQuantity(total);
//           toast.success("Fetched cart items successfully");
//         } else {
//           toast.warning("No cart items found");
//         }
//       } catch (error) {
//         const errorMsg =
//           error?.response?.data?.msg || "Failed to fetch Cart Items";
//         toast.error(errorMsg);
//       }
//     };

//     fetchCartItems();
//   }, [GetCart]);

//   return (
//     <CartContext.Provider value={{ cartItems, totalQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
