import {
    Container,
    Form,
    Button,
    Alert
  } from "react-bootstrap"
  import "bootstrap/dist/css/bootstrap.min.css"
  import React, { useEffect, useState, useContext } from "react"
  import jwt_decode from "jwt-decode"
  import "../../App.css"
  import { LoginContext } from "../../App.jsx"
  import { Link } from "react-router-dom"
  import AccountPage from "./AccountPage"
  import axios from "axios"
  
  const URL = import.meta.env.VITE_API_URL
  
  const LogInPage = () => {
    const contextValue = useContext(LoginContext)
    const user = contextValue.user
    const setUser = contextValue.setUser
    const signedIn = contextValue.signedIn
    const setSignedIn = contextValue.setSignedIn
    const showLoginButton = contextValue.showLoginButton
    const setShowLoginButton = contextValue.setShowLoginButton
  
    const [usersList, setUsersList] = useState(null)
  
    useEffect(() => {
      const getUsersList = async () => {
        const users = await axios.get(`${URL}/users`)
        await setUsersList(users.data)
      }
      getUsersList()
    }, [])
  
    const handleCallbackResponse = async (response) => {
      let userCredentials = jwt_decode(response.credential)
      let username = userCredentials.name
      let email = userCredentials.email
  
      try {
        const users = await axios.get(`${URL}/users`)
        const usersList = users.data
        const existingUser = usersList.find((user) => user.email === email)
  
        if (existingUser) {
          delete existingUser.password
          setUser(existingUser)
          setSignedIn(true)
          localStorage.setItem("user", JSON.stringify(existingUser))
          setShowLoginButton(false)
        } else {
          const newUser = {
            username: username,
            email: email,
            password: "",
            role: "user",
            address: {
              firstName: "",
              lastName: "",
              state: "",
              city: "",
              zipCode: "",
              street: "",
              apartmentNo: "",
            },
            google: { isGoogle: true, hasChangedPassword: false },
            stripe_id: "",
          }
  
          await axios.post(`${URL}/users`, newUser)
          const users = await axios.get(`${URL}/users`)
          const usersList = users.data
          const existingUser = usersList.find((user) => user.email === email)
  
          setUser(existingUser)
          setSignedIn(true)
          localStorage.setItem("user", JSON.stringify(existingUser))
          setShowLoginButton(false)
        }
      } catch (error) {
        console.error(error)
      }
    }
  
    function handleSignOut(event) {
      localStorage.setItem("user", JSON.stringify({}))
      setUser({})
      setSignedIn(false)
      setShowLoginButton(true)
    }
  
    useEffect(() => {
      /* global google */
      if (showLoginButton) {
        google.accounts.id.initialize({
          client_id:
            "1028178874548-nkbko3ashqikqg0km1kl852iv5v4imdr.apps.googleusercontent.com",
          callback: handleCallbackResponse,
        })
  
        google.accounts.id.renderButton(document.getElementById("log-in-div"), {
          theme: "outline",
          size: "large",
        })
      }
    }, [showLoginButton])
  
    const [errorMsg, setErrorMsg] = useState(null)
  
    function LoginForms({ setShowLoginButton }) {
      const contextValue = useContext(LoginContext)
      const user = contextValue.user
      const setUser = contextValue.setUser
      const signedIn = contextValue.signedIn
      const setSignedIn = contextValue.setSignedIn
  
      const signInHandler = async () => {
        const email = document.getElementById(`formBasicEmail`).value
        const passwordVal = document.getElementById(`formBasicPassword`).value
        try {
          const response = await axios.post(`${URL}/users/login`, {
            email,
            password: passwordVal,
          })
          const user = response.data
          setUser(user)
          localStorage.setItem("user", JSON.stringify(user))
          setSignedIn(true)
          setShowLoginButton(false)
        } catch (error) {
          setSignedIn(false)
          setUser({})
          setErrorMsg("Account not found. Please try again.")
        }
      }
  
      return (
        
        <Container className="login-page">
          <h1 className="pt-5 pb-5" style={{fontSize:`5rem`}}>Login</h1>
          <Container className="login-container">
            {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                />
                <Form.Text>
                  We'll never share your password with anyone else.
                </Form.Text>
              </Form.Group>
            </Form>
            <Button
              
              variant='info'
              onClick={signInHandler}
            >
              Sign In
            </Button>
            <p className="pt-5">
              <i>
                Don't have an account?{" "}
                <a href="/SignUp" as={Link} to="/SignUp">
                  Sign up.
                </a>
              </i>
            </p>
          </Container>
        </Container>
      )
    }
  
    return (
      <Container >
        {signedIn == true ? (
          <AccountPage />
        ) : (
          <Container className="bg-light rounded py-5 px-0 my-5" style={{width:`30rem`, boxShadow: `0vw 1vw 2vw 1vw rgba(0, 0, 0, 0.318)`}}>
            <LoginForms setShowLoginButton={setShowLoginButton} />
            {showLoginButton && <Container id="log-in-div"></Container>}
          </Container>
        )}
      </Container>
    )
  }
  
  export default LogInPage
  