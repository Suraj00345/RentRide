import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import UserDashboard from './components/dashboard/UserDashboard/userDashboard'
import OwnerDashboard from './components/dashboard/OwnerDashboard/ownerDashboard'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* <Route path='/' element={<Home />} /> */}
        {/* <Route path='/' element={<OwnerDashboard/>} /> */}
        {/* <Route path='/carDetails' element={<CarDetails />} /> */}
        <Route path='/' element={<UserDashboard />} /> 
      </Routes>
    </div>
  )
}

export default App
