import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home/Home'
import Header from './components/Nav/Header'
import LogInPage from './components/Login/Login'
import SignUp from './components/Login/SignUp'
import Venues from './components/Pages/Venues'
import Events from './components/Pages/Events'
 import AddEventAndVenue from './components/Pages/AddEventAndVenue'
import { createContext, useEffect, useState } from 'react'

export const LoginContext = createContext(null)

function App() {

  const storageCheck = () =>{
    return localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) : `{}`
  }

  const [clientSecret, setClientSecret] = useState("")
  const [user,setUser] = useState(storageCheck())
  const [signedIn, setSignedIn] = useState(false)
  const [showLoginButton, setShowLoginButton] = useState(true)

  return (
    <LoginContext.Provider value={{ user, setUser, signedIn, setSignedIn, showLoginButton, setShowLoginButton }}>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' exact element={<Home/>}></Route>
          <Route path='/login' element={<LogInPage/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/venues' element={<Venues/>}></Route>
          <Route path='/events' element={<Events/>}></Route>
          <Route path='/addEventAndVenue' element={<AddEventAndVenue/>}></Route>
          
        </Routes>
      </Router>
      </LoginContext.Provider>
  )
}

export default App
