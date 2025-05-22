import "../phones&laptops/phones&laptops.css"
import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useContext } from 'react';
import { ProductContext } from '../../utils/productContext.jsx';



function PhonesLaptops(){
           const { filteredProducts,setFilteredProducts,setProducts } = useContext(ProductContext);
           const [electronicProducts, setElectronicProducts] = useState([]);
            const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        fetchElectronicProducts();
      }, []);
    
      const fetchElectronicProducts = async () => {
        try {
          const [smartPhones,Laptops] = await Promise.all([
            fetch("https://dummyjson.com/products/category/smartphones"),
            fetch("https://dummyjson.com/products/category/laptops"),
            
          ]);
    
          if (!smartPhones.ok || !Laptops.ok) {
            throw new Error("Failed to fetch menswear categories");
          }
    
          const smartPhoneData = await smartPhones.json();
          const LaptopsData = await Laptops.json();
          
    
          // Combine both results
          const combinedProducts = [...smartPhoneData.products, ...LaptopsData.products ];
          setElectronicProducts(combinedProducts);
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
           <div className="phone-laptops-container">
               <div className="phones_laptops-image">
                <img src="https://img.freepik.com/free-psd/black-friday-sale-social-media-cover-design-template_47987-25244.jpg?ga=GA1.1.80076905.1731431899&semt=ais_hybrid&w=740" alt="banner"/>
               </div>
               <h1>Introducing the Next Level of Tech Devices</h1>
               <h1>˗ˏˋ ♡ ˎˊ˗Explore More˗ˏˋ ♡ ˎˊ˗</h1>
               <br></br>


               {loading ? (
                <div className="loading-process">
                  <p>Loading...</p>
                  <img src="https://cdn-icons-gif.flaticon.com/17905/17905715.gif" alt="loading gif"/>
                </div>
       
      ) : (
        <div className="display-items" id='shop-item'>
          {electronicProducts.length === 0 ? (
            <p>No smart phones and Laptops items found.</p>
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

export default PhonesLaptops;