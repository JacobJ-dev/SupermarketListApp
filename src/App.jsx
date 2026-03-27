import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ListPage from './pages/List'
import HouseholdSetupPage from './pages/HouseholdSetup'


function App() {


  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" element={<LoginPage />}> </Route>
        <Route path="/register" element={<RegisterPage />}> </Route>
        <Route path='/home' element={<ListPage />}></Route>
        <Route path='/setup' element={<HouseholdSetupPage />}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
