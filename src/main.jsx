import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Error from './components/Error'
import { products } from './utils/DummyItem'
import { lazy } from 'react'
import { Suspense } from 'react'




// code spilliting or lazy load

const  Menswear =lazy(()=> import ('./components/menWear/Menswear.jsx'))
const WomensWear = lazy(()=>import ('./components/womenswear/WomensWear.jsx'))
const PhonesLaptops = lazy(()=>import ('./components/phones&laptops/PhonesLaptops.jsx'))
const BeautyProducts = lazy(()=>import ('./components/BeautyProducts/BeautyProducts.jsx'))
const Login =lazy(()=>import ('./components/Login/Login.jsx'))
const Cart =lazy(()=>import ('./components/Cart/Cart.jsx'))
const ProductList =lazy(()=>import ('./components/ProductList/ProductList.jsx'))
const ProductDetails =lazy(()=>import('./components/ProductDetails/ProductDetails.jsx'))

const appRouter=createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>,
      children:[
        {
          path:'/',
          element:(
          <Suspense fallback={
          <div style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px'}}>
            <img style={{width:'200px',height:'200px'}} src='https://cdn-icons-gif.flaticon.com/17905/17905715.gif' alt='loading gif'/>
            <br/>
            <p style={{fontSize:'20px'}}>Loading...</p>
          </div>} >

                   <ProductList productData={products} />,
          
          </Suspense>
          )
        },
        {
          path:'/mens_wear',
          element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px'}}>
            <img style={{width:'200px',height:'200px'}} src='https://cdn-icons-gif.flaticon.com/17905/17905715.gif' alt='loading gif'/>
            <br/>
            <p style={{fontSize:'20px'}}>Loading...</p>
          </div>}>
            <Menswear/>
          </Suspense>
          )
        },
        {
          path:'/womens_wear',
          element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px'}}>
            <img style={{width:'200px',height:'200px'}} src='https://cdn-icons-gif.flaticon.com/17905/17905715.gif' alt='loading gif'/>
            <br/>
            <p style={{fontSize:'20px'}}>Loading...</p>
          </div>}>
            <WomensWear/>
          </Suspense>
          )
        },
        {
          path:'/phone_laptops',
          element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px'}}>
            <img style={{width:'200px',height:'200px'}} src='https://cdn-icons-gif.flaticon.com/17905/17905715.gif' alt='loading gif'/>
            <br/>
            <p style={{fontSize:'20px'}}>Loading...</p>
          </div>}>
            <PhonesLaptops/>
          </Suspense>
          )
        },
        {
          path:'/beauty_products',
          element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px',alignItems:'center'}}>
            <img style={{width:'200px',height:'200px'}} src='https://cdn-icons-gif.flaticon.com/17905/17905715.gif' alt='loading gif'/>
            <br/>
            <p style={{fontSize:'20px'}}>Loading...</p>
          </div>}>
            <BeautyProducts/>
          </Suspense>
          )
        },
        {
          path:'/login',
          element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px'}}>
            <img style={{width:'200px',height:'200px'}} src='https://cdn-icons-gif.flaticon.com/17905/17905715.gif' alt='loading gif'/>
            <br/>
            <p style={{fontSize:'20px'}}>Loading...</p>
          </div>}>
            <Login/>
          </Suspense>
          )
        },
        {
          path:'/my_cart',
          element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px'}}>
            <img style={{width:'200px',height:'200px'}} src='https://cdn-icons-gif.flaticon.com/17905/17905715.gif' alt='loading gif'/>
            <br/>
            <p style={{fontSize:'20px'}}>Loading...</p>
          </div>}>
            <Cart/>
          </Suspense>
          )
        },
        {
          path:"/product_details/:id",
          element:(
          <Suspense fallback={<div style={{display:'flex',justifyContent:'center',flexDirection:'column',gap:'20px'}}>
            <img style={{width:'200px',height:'200px'}} src='https://cdn-icons-gif.flaticon.com/17905/17905715.gif' alt='loading gif'/>
            <br/>
            <p style={{fontSize:'20px'}}>Loading...</p>
          </div>}>
            <ProductDetails/>
          </Suspense>
          )
        }
    ],
      errorElement:<Error/>

    },
    

  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider  router={appRouter}/>
  </StrictMode>,
)
