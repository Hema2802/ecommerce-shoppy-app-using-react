
import { Link } from 'react-router-dom';
import '../ProductItem/ProductItem.css'


function ProductItem(props){
    const discountedPrice = ((props.productDetails?.price - (props.productDetails?.price * props.productDetails?.discountPercentage / 100)) * 100).toFixed(2);
    const mrp = (props.productDetails?.price * 100).toFixed(2);
    return(
        <>
            <div  className='product-card'>
                <img src={props.productDetails?.images?.[0]} alt='image'/>
                <div className='content-product'>
                    
                     <p>{props.productDetails?.title}</p>
                     <p>
                               Rs.{discountedPrice} &nbsp;&nbsp;&nbsp;
                               <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                               MRP: Rs.{mrp}
                               </span>
                    </p>
                    <p>{props.productDetails?.brand} </p>
                    <p><span className='rate-data'>⭐{props.productDetails?.rating}</span>&nbsp;&nbsp;<span className='count-data'>({props.productDetails?.availabilityStatus})</span></p> 
                </div>
                <Link to={`/product_details/${props.productDetails.id}`}>
                      <button>View Details</button>
                </Link>
                
            </div>
        
        </>
    )
}

export default ProductItem;