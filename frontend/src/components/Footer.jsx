 import React from 'react'
 
 const Footer = () => {
   return (
    <div style={{backgroundColor: "#D3D3D3"}} className="text-center text-dark py-3">
    <div className="container">
      <p className="mb-2">&copy; {new Date().getFullYear()} Stockify. All rights reserved.</p>
      <div className="d-flex justify-content-center gap-3">
        <a href="/about" className="text-dark text-decoration-none">About</a>
        <a href="/privacy-policy" className="text-dark text-decoration-none">Privacy Policy</a>
        <a href="/terms" className="text-dark text-decoration-none">Terms of Service</a>
        <a href="/contact" className="text-dark text-decoration-none">Contact</a>
      </div>
    </div>
  </div>
   )
 }
 
 export default Footer
 
