import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import UserDashboard from './components/dashboard/UserDashboard/userDashboard'
import OwnerDashboard from './components/dashboard/OwnerDashboard/ownerDashboard'

function App() {

  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        {/* <Route path='/' element={<OwnerDashboard/>} /> */}
        {/* <Route path='/carDetails' element={<CarDetails />} /> */}
        <Route path='/' element={<UserDashboard />} /> 
      </Routes>
    </div>
  )
}

export default App
