import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Home from './components/Home/Home'
import Header from './components/Nav/Header'
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
        </Routes>
      </Router>
      </LoginContext.Provider>
  )
}

export default App
