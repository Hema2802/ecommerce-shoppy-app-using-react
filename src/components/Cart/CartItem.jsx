

// components,hooks and css files
import { useContext } from 'react';
import { CartContext } from '../../utils/cartContext';
import '../Cart/cart.css'

function CartItem({ item }) {
  // Access cart context methods to update or remove items
  const { updateCartItem, removeFromCart } = useContext(CartContext);

  // Preset size options for dropdown
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  // Handle change in selected size
  const handleSizeChange = (e) => {
    updateCartItem(item.id, item.selectedSize, e.target.value, item.quantity);
  };

  // Handle quantity increase/decrease
  const handleQuantityChange = (type) => {
    const newQty = type === 'inc' ? item.quantity + 1 : Math.max(1, item.quantity - 1);
    updateCartItem(item.id, item.selectedSize, item.selectedSize, newQty);
  };

  // Calculate discounted price (multiplied by 100, then formatted)
  const discountedPrice = (
    (item?.price - (item?.price * item?.discountPercentage / 100)) * 100
  ).toFixed(2);

  // Calculate MRP before discount (also multiplied by 100)
  const mrp = (item?.price * 100).toFixed(2);


  return (
    <div className="cart-item">
      {/* image */}
      <img src={item.images?.[0]} alt={item.title} width="100" />
      <div className="cart-item-details">
        <div>
              <h4>{item.title}</h4>
            <p>{item.brand}</p>
        </div>
        
        <p>
            Rs.{discountedPrice}
                               
        </p>

        <div>
          <label>Size: </label>
          <select value={item.selectedSize} onChange={handleSizeChange}>
            {sizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        {/* quantity controls */}
        <div className="qty-controls">
          <button onClick={() => handleQuantityChange('dec')}>−</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange('inc')}>+</button>
        </div>
        <p>Subtotal: ₹{(discountedPrice * item.quantity).toFixed(2)}</p>
        <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="remove-btn">Remove 🗑</button>
      </div>
    </div>
  );
}

export default CartItem;
