
import FrontPage from '../FrontPage/FrontPage';
import HomePage from '../HomePage/HomePage';
import '../ProductList/ProductList.css'
import { useEffect } from 'react';
import ProductItem from '../ProductItem/ProductItem';
import { useContext } from 'react';
import { ProductContext } from '../../utils/productContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../NavBar/Header.jsx';


function ProductList(){


    const { filteredProducts,setFilteredProducts,setProducts } = useContext(ProductContext);
    // set loading to products view
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();  // for navigation
  useEffect(() => {
  if (location.hash === '#shop-item') {
    setTimeout(() => {
      const element = document.getElementById('shop-item');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}, [location]);

// to fetch data
    useEffect(()=>{
         fetchData();
    },[])

    async function fetchData() {
  try {
    // dummy json data
    const response = await fetch("https://dummyjson.com/products?limit=20");
    // if response is not ok show the error
    if (!response.ok) throw new Error("Failed to fetch");
    // json format
    const data = await response.json();
    setProducts(data.products);
    setFilteredProducts(data.products);  //initialize product list
    console.log(data.products)
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    // final loading false
    setLoading(false);
  }
}
    return(
        <>
        
        <div>
            <HomePage/>
            <FrontPage/>
        </div>

        <div>
            <h1 className='pl-heading' id='shop-item'>𓍯𓂃𓂃Top Picks for You 𓂃 ⸝⸝⟢</h1>

         
         {/* mapping the items */}
         <div  className='display-items' >
               {/* if products length is 0 -no products means */}
             {filteredProducts.length === 0 ? (
                 <p>No items found.</p>
                 ) : (
                  // mapping the products
                filteredProducts.map((data) => (
                     <ProductItem key={data.id} productDetails={data} />
                 ))
                )}

        </div>
        
             
            
        </div>
        
        
        
        </>
    )
}

export default ProductList;