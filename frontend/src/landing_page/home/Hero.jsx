import { Link } from "react-router-dom"

const Hero = () => {
  return (
    <div className='container p-4'>
      <div className="row text-center">
        <img src='assets/homeHero.png' className='mb-5 img-fluid' />
        <h1 className='mt-4'>Invest in everything</h1>
        <h5 className='mt-2'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</h5>
        <Link style={{textDecoration:'none'}} to='/register'>
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-success fw-bold text-white w-50 w-md-25 mb-3" style={{  maxWidth: "200px",backgroundColor: "#027a5c", border: "none" }}>
            Signup Now
          </button>
      </div>
      </Link>
      </div>
    </div>
  )
}

export default Hero


