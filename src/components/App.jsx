
import React from 'react';
import Header from './NavBar/Header';
import { Outlet } from 'react-router-dom';
import { products } from '../utils/DummyItem';
import { useState } from 'react';
import { ProductProvider } from '../utils/productContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from '../utils/cartContext.jsx';
import { UserProvider } from '../utils/userContext.jsx';


// wraps your entire layout (Header, context providers, and nested pages).
function App() {

  return (
    <div>
         <UserProvider>
           <ProductProvider>
                 <CartProvider>
            
                 <Header />
                 {/* outlet renders any child route like Home, Login, etc */}
                 <Outlet />
                 
                 </CartProvider>
            
             </ProductProvider>
          </UserProvider>
    </div>
  );
}

export default App;