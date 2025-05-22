
// Importing needed components and hooks
import React, { createContext, useState } from 'react';

// Creating the context object to share product data across components
export const ProductContext = createContext();

// Provider component that holds and manages product-related state
export const ProductProvider = ({ children }) => {
  // Full list of products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  /**
   * Filters products based on the search term and current path.
   * If path is '/mens_wear' or '/womens_wear', it filters accordingly.
   */
  const handleSearch = (searchTerm, path) => {
    const lowerSearch = searchTerm.toLowerCase();

    // First filter by search term
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(lowerSearch)
    );

    // Then apply category filter based on path
    if (path === '/mens_wear') {
      filtered = filtered.filter((product) => {
  console.log(product.category); // Debug here
  return product.category.toLowerCase().includes('men') ;
});

    }
     
    else if (path === '/womens_wear') {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes('women')
      );
    }else if (path === '/phone_laptops') {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes('phone') || product.category.toLowerCase().includes('laptop')
      );
    }else if (path === '/beauty_products') {
      
      filtered = filtered.filter((product) => {
              // console.log(product.category); // Debug here
              // return product.category.toLowerCase().includes('beauty');  
            const category = product.category.toLowerCase();
             return category.toLowerCase().includes('womens-jewellery') || category.toLowerCase().includes('fragrances');

           });
    }




    setFilteredProducts(filtered);
    return filtered; // Return filtered list for further checks
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        filteredProducts,
        setFilteredProducts,
        handleSearch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
