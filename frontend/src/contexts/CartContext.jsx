import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [buyItems, setBuyItems] = useState({});
  const [cartItems, setCartItems] = useState({});
  function addToCart(productID) {
    setCartItems((prev) => {
      if (prev[productID]) {
        return { ...prev, [productID]: prev[productID] + 1 };
      }
      return { ...prev, [productID]: 1 };
    });
  }

  function removeFromCart(productID) {
    setCartItems((prev) => {
      if (prev[productID] === 1) {
        const newCartItems = { ...prev };
        delete newCartItems[productID];
        return newCartItems;
      }
      return { ...prev, [productID]: prev[productID] - 1 };
    });
  }

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, buyItems, setBuyItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
