
import './womenwear.css'
import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useContext } from 'react';
import { ProductContext } from '../../utils/productContext.jsx';


function WomensWear(){
  const { filteredProducts,setFilteredProducts,setProducts } = useContext(ProductContext);
    const [womenswearProducts, setWomenswearProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWomenswear();
      }, []);
    
      const fetchWomenswear = async () => {
        try {
          const [womensDress, womenshoe,womensWatch] = await Promise.all([
            fetch("https://dummyjson.com/products/category/womens-dresses"),
            fetch("https://dummyjson.com/products/category/womens-shoes"),
            fetch('https://dummyjson.com/products/category/womens-watches')
          ]);
    
          if (!womensDress.ok || !womenshoe.ok ||!womensWatch.ok) {
            throw new Error("Failed to fetch menswear categories");
          }
    
          const dressData = await womensDress.json();
          const WomenshoesData = await womenshoe.json();
          const WomenwatchData = await womensWatch.json()
    
          // Combine both results
          const combinedProducts = [...dressData.products, ...WomenshoesData.products ,...WomenwatchData.products];
          setWomenswearProducts(combinedProducts);
          setProducts(combinedProducts);
          setFilteredProducts(combinedProducts);
        } catch (error) {
          console.error("Error fetching menswear:", error);
        } finally {
          setLoading(false);
        }
      };
    return(
        <>
           <div className='women-cloth'> 
            <h1>❯❯❯❯ Style Woven for the Modern Woman 𓍯𓂃𓏧♡</h1>

            <div className='women-cloth-images'>
                <img src='https://thumbs.dreamstime.com/b/pretty-woman-casual-clothes-poisng-white-background-full-length-portrait-isolated-50885609.jpg' alt='womens-wear'/>
                <img src='https://www.shutterstock.com/image-photo/fashionable-african-woman-curly-hairs-600nw-2284293933.jpg' alt='womens-wear' />
                <img src='https://media.istockphoto.com/id/490875848/photo/beautiful-woman-wearing-cocktail-dress.jpg?s=612x612&w=0&k=20&c=ZGr7cZbeRG90Sfx0WeMFiBDoaXkuQPnJ1DoUhvsyvj0=' alt='womens-wear' />
                <img src='https://www.shutterstock.com/image-photo/lady-evening-dress-elegant-woman-600nw-1011793372.jpg' alt='womens-wear' />
                <img src='https://www.fabfunda.com/blog/wp-content/uploads/2024/07/Alia-Bhatt-in-White-Saree-630x840.jpg' alt='womens-wear'/>
                <img src='https://st4.depositphotos.com/16122460/41590/i/450/depositphotos_415908894-stock-illustration-collage-photos-women-wearing-different.jpg' alt='womens-wear' />
                <img src='https://t3.ftcdn.net/jpg/08/74/81/68/360_F_874816867_yN0WrklfuVUTPEutzy6dIqzsHrJHRBP0.jpg' alt=' womens-wear' />
            </div>
             <h1>Where Elegance Meets Everyday</h1>
             <h2> Exclusive offers!!!</h2>
             <br/>
              {loading ? (
                        <div className="loading-process">
                  <p>Loading...</p>
                  <img src="https://cdn-icons-gif.flaticon.com/17905/17905715.gif" alt="loading gif"/>
                        </div>
                          ) : (
                         <div className="display-items" id='shop-item'>
                               {womenswearProducts.length === 0 ? (
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

export default WomensWear;