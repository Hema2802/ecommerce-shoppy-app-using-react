// imported needed componentts and hooks 
import { useContext } from 'react';
import { CartContext } from '../../utils/cartContext';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import './cart.css';

function Cart() {

  // used useContext hook to know cart items ,to perform remeove from cart and updating process
  const { cartItems, removeFromCart, updateCartItem } = useContext(CartContext);
  

  return (
    <div className='cart-component'>
      {/* heading */}
      <h1>Items in Your Cart</h1>  
      {/*  go back to home */}
      <button className='back-butt'><Link to="/">Continue Shopping</Link></button>

      {cartItems.length === 0 ? ( 
        // empty notification
        <p className='cart-empty-notification'>Your cart is empty😞</p>
      ) : (
        // mapping the items
        cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
        ))
      )}
    </div>
  );
}

export default Cart;
