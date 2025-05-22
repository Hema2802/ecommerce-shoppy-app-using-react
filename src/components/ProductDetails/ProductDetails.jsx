
import '../ProductDetails/productDetails.css'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CartContext } from '../../utils/cartContext';
import { useContext } from 'react';


function ProductDetails(){
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate();  // for navigation
    const [product, setProduct] = useState(null);  // usestate 
    const [selectedSize, setSelectedSize] = useState('');  // to select required size
    const [quantity, setQuantity] = useState(1); // quatity selection
    const { addToCart } = useContext(CartContext);

// to increase and decrease quantity
    const increaseQty = () => setQuantity(prev => prev + 1);
    const decreaseQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    useEffect(() => {
      // fetch data
               fetchProduct();
        }, []);

    const fetchProduct = async () => {
    try {
      // dummy json data
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      console.log(data)
      setProduct(data);
    } catch (error) {
      console.error('Failed to fetch product:', error);
              }
                  };
// different sizes
        const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];


        //calculation of  mrp and discount

        const discountedPrice = ((product?.price - (product?.price * product?.discountPercentage / 100)) * 100).toFixed(2);
        const mrp = (product?.price * 100).toFixed(2);
    return(

        <>

        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>

            <div className='product-details'>
                            {/* image details */}
                       <div className='image-data'>
                             <img src={product?.images?.[0]} alt={product?.tags?.[1]}/>
                             <h3>🔖{product?.discountPercentage}%</h3>
                             <p>{product?.availabilityStatus}</p>
                             {/* add to cart */}
                             <button
                                    onClick={() => {
                               if (!selectedSize) {
                                    alert("Please select a size");
                               return;
                                  }
                                 addToCart(product, selectedSize, quantity);
                                 alert("Added to cart!");
                                }}
                                >
  
                                    Add to Cart 🛍️
</button>

                             
                       </div>
                             {/* content div */}
                       <div className='product-info'>
                           <h2>{product?.title}</h2>
                           <p className='info-rate'>⭐{product?.rating} &nbsp;&nbsp;&nbsp; "<span>{product?.rating >= 4 ? "Highly recommended" : "Good"}</span>"</p>
                           <p><span>SKU : </span>{product?.sku}</p>

                           {/* Sale Price = MRP - (MRP × Discount%) */}
                        

                           <p>
                               Rs.{discountedPrice} &nbsp;&nbsp;&nbsp;
                               <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                               MRP: Rs.{mrp}
                               </span>
                           </p>


                           <p><span>Category : </span>{product?.category}</p>
                           <p><span>Brand : </span>{product?.brand}</p>


                           {/* size editing */}

                            <p><strong>Size:</strong></p>
                            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                              {sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                style={{
                                padding: '8px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                backgroundColor: selectedSize === size ? '#007bff' : '#fff',
                                color: selectedSize === size ? '#fff' : '#000',
                                cursor: 'pointer'
                             }}
                           >
                           {size}
                          </button>
                           ))}
                      </div>
                    {selectedSize && (
                          <p style={{ marginTop: '10px', color: 'green' }}>
                          Selected Size: {selectedSize}
                          </p>
                           )}

                           

                        <p className='desc-product'><span>Description :</span> <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product?.description}</p>

                        {/* setting quantity */}

                           <p><strong>Quantity:</strong> <span>(Available-qty :</span>{product?.stock || 10})</p>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <button
                                onClick={decreaseQty}
                                style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                             }}
                                  >
                                       −
                             </button>
                             <span>{quantity}</span>
                            <button
                                 onClick={increaseQty}
                                 style={{
                                 padding: '6px 12px',
                                 borderRadius: '6px',
                                 border: '1px solid #ccc',
                                 cursor: 'pointer',
                                 fontWeight: 'bold'
                              }}
                                  >
                                        +
                            </button>
                       </div>
                        <br/>
                         <h3>Additional Info:</h3>
                         <p><span>⟳</span> {product?.returnPolicy}</p>
                         <p>🛡️{product?.warrantyInformation}</p>
                         <p>🚛{product?.shippingInformation}</p>

                       </div>

                       </div>
                        <Link to="/"><button className='back-btn'>Back to Home 🏠︎</button></Link>
                        
  


            </div>

        
            
        
        </>
    )
}

export default ProductDetails;