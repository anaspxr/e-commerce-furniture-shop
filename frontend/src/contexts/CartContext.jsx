import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const [buyItems, setBuyItems] = useState({});
  const { currentUser } = useContext(UserContext);
  const [cartItems, setCartItems] = useState(
    currentUser
      ? JSON.parse(localStorage.getItem("users"))[currentUser]?.cart || {}
      : {}
  );
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

  useEffect(() => {
    if (!currentUser || Object.keys(cartItems).length === 0) {
      return;
    }
    const localData = JSON.parse(localStorage.getItem("users"));
    localStorage.setItem(
      "users",
      JSON.stringify({
        ...localData,
        [currentUser]: { ...localData[currentUser], cart: cartItems },
      })
    );
  }, [cartItems, currentUser]);
  useEffect(() => {
    if (!currentUser) {
      setCartItems({});
    }
    setCartItems(
      currentUser
        ? JSON.parse(localStorage.getItem("users"))[currentUser]?.cart || {}
        : {}
    );
  }, [currentUser]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        buyItems,
        setBuyItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
