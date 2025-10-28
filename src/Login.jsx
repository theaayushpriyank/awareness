import React from "react"
import { login } from "./authService.js"
import "./styles/Login.css"
import { useNavigate } from "react-router-dom"

export default function Login() {
    
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate()

    async function handleLogin() {
        try{
            await login(email, password)
            alert("Login successful!")
            navigate("/")
        } catch(error){"Error", error.message}
    }

     return (
        <form className="access-form" action={handleLogin}>

            <label>
                <input 
                    required
                    type="email"
                    label="email"
                    placeholder="aayush@something.com"
                    onChange = {e => setEmail(e.target.value)}
                    />
            </label>
            <label>
                <input 
                    required
                    type="password"
                    label="password"
                    placeholder="******"
                    onChange = {e => setPassword(e.target.value)}
                    />
            </label>
            <button>Log In</button>
            <a href="/signup">Don't have an account?</a>
        </form>)
}