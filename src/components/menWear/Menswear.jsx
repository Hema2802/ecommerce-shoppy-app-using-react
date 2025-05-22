
import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useContext } from 'react';
import { ProductContext } from '../../utils/productContext.jsx';
import './Menswear.css';
import { useLocation } from 'react-router-dom';


function Menswear(){
        // Accessing global product context for filtering and state sync
  const { filteredProducts, setFilteredProducts, setProducts } = useContext(ProductContext);

  // Local state for storing men's wear products and loading indicator
  const [menswearProducts, setMenswearProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();  // for navigation
  
 
  

  // Fetch data on component mount
  useEffect(() => {
    fetchMenswear();
  }, []);

  // Fetch products from multiple men's categories
  const fetchMenswear = async () => {
    try {
      const [shirtsRes, shoesRes, watchRes] = await Promise.all([
        fetch("https://dummyjson.com/products/category/mens-shirts"),
        fetch("https://dummyjson.com/products/category/mens-shoes"),
        fetch("https://dummyjson.com/products/category/mens-watches")
      ]);

      // Handle response errors
      if (!shirtsRes.ok || !shoesRes.ok || !watchRes.ok) {
        throw new Error("Failed to fetch menswear categories");
      }

      // Parse JSON responses
      const shirtsData = await shirtsRes.json();
      const shoesData = await shoesRes.json();
      const watchData = await watchRes.json();

      // Combine all fetched product lists
      const combinedProducts = [
        ...shirtsData.products,
        ...shoesData.products,
        ...watchData.products
      ];

      // Update states and global context
      setMenswearProducts(combinedProducts);
      setProducts(combinedProducts);
      setFilteredProducts(combinedProducts);
    } catch (error) {
      console.error("Error fetching menswear:", error);
    } finally {
      setLoading(false); // Hide loading after fetch
    }
  };
    return(
        <>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
             <div className='mens-fashion'>
               <img src='https://i.pinimg.com/736x/88/d3/c8/88d3c815f5ffbfd4ab1b4d8f7d977385.jpg' alt='mens-fashion'/>
             </div>

             <div className='gens-wear'>
                <div className='mens-cloth'>
                     <img src='https://m.media-amazon.com/images/I/61sucYObagL._AC_UY1100_.jpg' alt='mens1'/>
                </div>

                <div className='mens-cloth'>
                     <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmsasZ_zWhMu3UOJgSxmAuf8Rwmw8Kty4Bfg&s' alt='mens1'/>
                </div>

                <div className='mens-cloth'>
                     <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ92SJrPeYIdMNhpOUr_aeKaQB91RKJ_Wara7yFlrL-vi6lCdJLrUZetPt62Iw_EH7OiEo&usqp=CAU' alt='mens1'/>
                </div>

                <div className='mens-cloth'>
                     <img src='https://i.pinimg.com/736x/5c/77/51/5c77519a1ecf9189cde180d4fe0d3549.jpg' alt='mens1'/>
                </div>
             </div>
             <h1 className='mens-cloth-title'>From Casual to Classic: Men’s Wear Reimagined</h1>

                    {loading ? (
        <div className="loading-process">
                  <p>Loading...</p>
                  <img src="https://cdn-icons-gif.flaticon.com/17905/17905715.gif" alt="loading gif"/>
                </div>
      ) : (
        <div className="display-items" id='shop-item'>
          {menswearProducts.length === 0 ? (
            <p>No men's wear items found.</p>
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

export default Menswear;