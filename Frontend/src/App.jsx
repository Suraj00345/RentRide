import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/carDetails' element={<CarDetails />} /> */}
        {/* <Route path='/' element={<Userdashboard />} />  */}
      </Routes>
    </div>
  )
}

export default App
