// imported needed hooks ,componenets and css 


import './navbar.css'   
import login_user from '../Images/login_user.png'
import shopping_cart from '../Images/shopping_cart.png'
import { Link } from 'react-router-dom'
import React, { useState } from "react";
import { products } from '../../utils/DummyItem';
import { useContext } from 'react';
import { ProductContext } from '../../utils/productContext.jsx';
import { useRef } from 'react';
import { CartContext } from '../../utils/cartContext.jsx';
import { UserContext } from '../../utils/userContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';




function Header(){
  // State for showing the search input field,user's search query
  const [showInput, setShowInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  // Access handleSearch from ProductContext
  const { handleSearch } = useContext(ProductContext);

  // Access cartItems from CartContext
  const { cartItems } = useContext(CartContext);

  // Access user and logout from UserContext
  const { user, logout } = useContext(UserContext); 

  
const navigate = useNavigate();



  // Show the search input field when search is clicked
  const handleSearchClick = () => {
    setShowInput(true);
  };

  // Update search value as user types
  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Submit search query and reset input field
  const location = useLocation(); // Add this if not present

const handleSearchSubmit = () => {
  if (searchValue.trim() === "") {
    alert("Kindly enter product name!!!");
    return;
  }

  // Detect route and pass it to handleSearch
  const result = handleSearch(searchValue, location.pathname);
  setSearchValue('');

  if (result.length === 0) {
    alert("Product not available or you entered invalid product name!");
    return;
  }

  const scrollToFilteredProducts = () => {
    setTimeout(() => {
      const element = document.getElementById('shop-item');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300); // small delay to ensure DOM is rendered
  };

  if (location.pathname === '/') {
    navigate('/');
    scrollToFilteredProducts();
  } else if (location.pathname === '/mens_wear') {
    navigate('/mens_wear');
    scrollToFilteredProducts();
  } else if (location.pathname === '/womens_wear') {
    navigate('/womens_wear');
    scrollToFilteredProducts();
  }else if (location.pathname === '/phone_laptops') {
    navigate('/phone_laptops');
    scrollToFilteredProducts();
  }else if (location.pathname === '/beauty_products') {
    navigate('/beauty_products');
    scrollToFilteredProducts();
  } else {
    navigate('/');
    scrollToFilteredProducts();
  }

};

  
  


    return(
        <>
              <div className='navbar-container'>
                    <h1 style={{height:'40px',backgroundColor:'#7c6a0a',textAlign:'center',fontSize:'16px',padding:'8px ',color:'whitesmoke'}}>Get 15% off your first purchase. <span><Link className='head-shop-link' to="/#shop-item">Shop Now!</Link></span> </h1>

                    <nav className='nav-bar'>

                        {/* search box */}

                        <div>
                            <ul style={{listStyleType:'none',fontWeight:'500' , fontSize:'20px'}}>
                                <li onClick={handleSearchClick} className='search-item'>🔍︎ Search</li>
                            </ul>

                            {showInput && (
                                <>

                                <div className='search-input'>
                                      <input className='display-input-btn'
                                         type="text"
                                         placeholder="Enter Product Name..."
                                         value={searchValue}
                                         onChange={handleChange}
                                         onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                                        />
                                        <button className='display-input-btn' onClick={handleSearchSubmit}>  🔍︎
                                              

                                        </button>
                                </div>
                                     
                                
                                
                                </>
                                       
                                        
                                    )}
                              
                        </div>

                        <div className='center-part'>

                            {/* <img style={{width:'200px', height:'200px'}} src='https://i.pinimg.com/originals/ce/56/99/ce5699233cbc0f142250b520d967dff7.png' alt=''/> */}
                            
                            <ul className='nav-items'>
                                <Link to="/"><li>Home</li></Link>
                                <Link to="/mens_wear"><li>Men</li></Link>
                                <Link to="/womens_wear"><li>Women</li></Link>
                                <Link to="/phone_laptops"><li>Phones & Laptops</li></Link>
                                <Link to='/beauty_products'><li>Beauty Products</li></Link>
                                
                                
                                
                            </ul>

                        </div>

                        <div>
                            <ul className='nav-items'>
                                <div className='nav-items-1'>
                                      {/* <img className='login-user' src={} alt='login' /> */}
                                         {user.isLoggedIn ? (
                                       <>
                                      <li onClick={logout}>🔓Logout <br/>({user.name})</li> {/* ✅ Show logout and name */}
                                       </>
                                      ) : (
                                     <Link to='/login'><li>🔒Login</li></Link> // ✅ Show login if not logged in
                                       )}
                              </div>
                                <div className='nav-items-1'>
                                    {/* <img className='login-user' src={shopping_cart} alt='cart'/> */}
                                    <Link to='/my_cart'><li>🛒My Cart <span className="cart-count">({cartItems.length})</span></li></Link>
                                </div>
                                
                            </ul>
                        </div>
                    </nav>


              </div>
        </>
    )
}

export default Header;