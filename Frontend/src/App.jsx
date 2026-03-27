import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/carDetails' element={<CarDetails />} /> */}
        {/* <Route path='/' element={<Userdashboard />} />  */}
      </Routes>
    </div>
  )
}

export default App
