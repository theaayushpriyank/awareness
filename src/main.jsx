import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'
import { AuthProvider } from "./authContext.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element = {<Signup />} />
          <Route path="/login" element = {<Login />} />
          <Route
          path = "/"
          element = {
           <PrivateRoute>
             <App />   
           </PrivateRoute>
          }
          />
        </Routes>
      </Router>
    </AuthProvider>
  </StrictMode>,
)
