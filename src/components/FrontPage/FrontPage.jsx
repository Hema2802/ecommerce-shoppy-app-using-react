// imported componenents,css files and hooks

import '../FrontPage/Front.css'
import { items } from '../../utils/mockdata';
import { useState } from 'react';
import { useEffect } from 'react';

function FrontPage(){

   // State to track which banner/image is currently shown
  const [index, setIndex] = useState(0);

  // Current item from the items array
  const item = items[index];

  // Go to previous image in the carousel
  function handlePrevious() {
    setIndex(index === 0 ? items.length - 1 : index - 1); // Loop back to last item if at first
  }

  // Go to next image in the carousel
  function handleNext() {
    setIndex(index === items.length - 1 ? 0 : index + 1); // Loop to first if at last
  }

  // Automatically cycle through banners every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // 3000ms = 3 seconds

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
    return(
        <>
           <div className='front-page'>
                <h1> Deals of the Day </h1>

                <div className='display-banner'>
                
                    <button style={{paddingRight:'50px'}}   className='banner-btn' onClick={handlePrevious}>《 </button>
                    <img src={item?.url} alt='banner-image'/>
                    <button style={{paddingLeft:'10px'}} className='banner-btn' onClick={handleNext}> 》</button>
                </div>



           </div>
            
        
        </>
    )
}

export default FrontPage;