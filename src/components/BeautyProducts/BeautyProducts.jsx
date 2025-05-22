
// imported needed hooks ,components and css 


import "../BeautyProducts/beautyproducts.css"
import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useContext } from 'react';
import { ProductContext } from '../../utils/productContext.jsx';


function BeautyProducts(){
     // Access global product context for filtering and setting products
  const { filteredProducts, setFilteredProducts, setProducts } = useContext(ProductContext);

  // Local state to store fetched beauty products
  const [beautyProducts, setBeautyProducts] = useState([]);

  // Loading state to handle the loading indicator
  const [loading, setLoading] = useState(true);

  // Fetch beauty products only once when the component mounts
  useEffect(() => {
    fetchBeautyProducts();
  }, []);

  // Function to fetch data from three beauty-related categories
  const fetchBeautyProducts = async () => {
    try {
      // Fetch all three categories in parallel
      const [skincare, fragrances, womensJewellery] = await Promise.all([
        fetch("https://dummyjson.com/products/category/skincare"),
        fetch("https://dummyjson.com/products/category/fragrances"),
        fetch("https://dummyjson.com/products/category/womens-jewellery")
      ]);

      // Check if all fetches were successful
      if (!skincare.ok || !fragrances.ok || !womensJewellery.ok) {
        throw new Error("Failed to fetch beauty product categories");
      }

      // Parse JSON response data
      const skincareData = await skincare.json();
      const fragranceData = await fragrances.json();
      const jewelleryData = await womensJewellery.json();

      // Combine all products into a single array
      const combinedProducts = [
        ...skincareData.products,
        ...fragranceData.products,
        ...jewelleryData.products
      ];

      // Store the combined products in local and global state
      setBeautyProducts(combinedProducts);
      setProducts(combinedProducts);
      setFilteredProducts(combinedProducts);
    } catch (error) {
      console.error("Error fetching beauty products:", error);
    } finally {
      // Stop showing loading animation
      setLoading(false);
    }
  };

    return(
        <>

        <div className="beauty_products">
            <div className="about-beauty-products">
                  <h1>Glow Up Essentials</h1>
                  <br/>
                  <p>Unlock your inner glow with our curated collection of premium beauty products.
               From skincare saviors to makeup must-haves, we bring you the best in beauty – handpicked for every skin type, tone, and trend. Discover top-rated brands, affordable glam, and everyday essentials all in one place.</p>
                  <br/>
                  <h3>Your beauty journey starts here – shop, shine, and slay!</h3>
            </div>

            <div className="beauty-products-image">
                <img src="https://images.remotehub.com/512bf05e9a7a11ebac3a9a0aaf11a20e/original_thumb/0a026a71.jpg?version=1618113595" alt="beauty-image"/>
            </div>

            <h1 style={{color:'rgb(94, 94, 19)'}}>Flawless Finds...</h1><br/><br/>
              
              
              {loading ? (
                <div className="loading-process">
                  <p>Loading...</p>
                  <img src="https://cdn-icons-gif.flaticon.com/17905/17905715.gif" alt="loading gif"/>
                </div>
        
      ) : (
        <div className="display-items" id='shop-item'>
          {beautyProducts.length === 0 ? (
            <p>No Beauty Product items found.</p>
          ) : (
            filteredProducts.map(product => (
              <ProductItem key={product.id} productDetails={product} />
            ))
          )}
        </div>
      )}

            
        </div>
        
        
        </>
    )
}

export default BeautyProducts;