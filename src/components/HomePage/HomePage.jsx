
// imported components and hooks 
import '../HomePage/Home.css'
import shopping_background from '../Images/shopping_background.jpg'
import { Link } from 'react-router-dom';

// home page

function HomePage(){
    return(
        <>
{/* home page presentation */}
        <div className='Home_page'>
            <div className='box1'>
                     <h1>Discover the Best Deals <br/>of the Season!</h1>
                     <p>Exclusive offers on top brands. <br/>Limited-time discounts just for you!</p>
                     
                     <img className='box1-img' src="https://png.pngtree.com/png-vector/20191120/ourmid/pngtree-special-offer-sale-banner-template-design-with-colorful-design-isolated-on-png-image_2007314.jpg" alt='shop-logo'/>

                     <button className='shop-btn'><Link className='head-shop-link' to="/#shop-item">Shop Here 🚀</Link></button>

            </div>
                
            <div className='box2'>
                  <img src='https://img.freepik.com/free-photo/girl-sunglasses-posing-with-shopping-bags_23-2147825644.jpg?t=st=1747044600~exp=1747048200~hmac=6668b185ff1abb97f9b3f75ffba879b1facdeb50cfdf8f71ae52f1063097a298&w=740' alt='children_shopping'/>
            </div>

            <div className='box3'>
                <img src={shopping_background} alt='background-image'/>
            </div>
        </div>



        </>
    )

}

export default HomePage;