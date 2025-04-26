import { Route, Routes } from 'react-router-dom'
import NotFound from './components/NotFound'
import HomePage from './landing_page/home/HomePage'
import Login from './landing_page/login/Login'
import Signup from './landing_page/signup/Signup'

function App() {

  return (
    <>
    <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<Signup/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='*' element={<NotFound/>}/>
    </Routes>      
    </>
  )
}

export default App
