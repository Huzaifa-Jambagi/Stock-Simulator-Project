import React from 'react'
import Navbar from './Navbar'

const NotFound = () => {
   
    return (
        <> 
   <Navbar/>
  <div className="container p-5 mb-5">
    <div className="row text-center">
        <h1 className='mt-5'>404 Not Found</h1>
        <p>Sorry, the page you're looking for does not exist.</p>
    </div>
  </div>
  </>
  )  
}

export default NotFound
