// imported neede hooks and css file
import '../components/error.css'
import { useRouteError } from 'react-router-dom';


function Error(){
    //  error data get form console
    const err=useRouteError()
    console.log(err)
    return(
        <>
          <div className='error-part'>
            {/* displaying the error message */}
               <h1>Oops!</h1>
               <h2>{err.status}- PAGE IS NOT FOUND 😔</h2>
               <p>The page you are looking for might have been removed had its name changed or is temporarly not available</p>
               <h3>{err.data}</h3>
               {/* error gif */}
               <img src='https://cdn.dribbble.com/userupload/24450589/file/original-7a69eb5b87401ce59325c3291535aebc.gif' alt='error-image'/>
          </div>

        </>
    )
}
export default Error;