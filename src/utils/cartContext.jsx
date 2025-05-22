// Importing createContext for context creation and useState 
import { createContext, useState } from "react";

// Creating a context object for cart functionality
export const CartContext = createContext();

// CartProvider component that wraps children components 
export function CartProvider({ children }) {
  // cartItems will hold all products added to the cart
  const [cartItems, setCartItems] = useState([]);

  /**
   * Adds a product to the cart.
   * - If the product with the same size already exists in the cart, increase its quantity.
   * - Else, add it as a new entry.
   */
  const addToCart = (product, selectedSize, quantity = 1) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === product.id && item.selectedSize === selectedSize
    );

    if (existingItemIndex !== -1) {
      // Item exists → update quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      // Item doesn't exist → add new entry
      setCartItems(prev => [
        ...prev,
        {
          ...product,
          selectedSize,
          quantity,
        },
      ]);
    }
  };

  /**
   * Updates an item in the cart.
   
   */
  const updateCartItem = (productId, oldSize, newSize, newQuantity) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === productId && item.selectedSize === oldSize) {
          return {
            ...item,
            selectedSize: newSize || item.selectedSize,
            quantity: newQuantity || item.quantity,
          };
        }
        return item;
      })
    );
  };

  /**
   * Removes an item from the cart based on product ID and size.
   */
  const removeFromCart = (productId, selectedSize) => {
    setCartItems(prev =>
      prev.filter(item => !(item.id === productId && item.selectedSize === selectedSize))
    );
  };

  // Providing cart-related state and actions to any child components
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
