import { signup, login } from "./firebase/authService.js"
import React from "react"
import "./styles/Login.css"

export default function Signup() {

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    async function handleSignup() {
        try{
            await signup(email, password)
            alert("Signup successful, creating your account!")
        }catch(error){"Error in signing up:", error.message}
    }

    return (
        <form className="access-form"action={handleSignup}>
            <label>
                <input 
                    type="email"
                    placeholder="aayush@something.com"
                    onChange = {e => setEmail(e.target.value)}
                    />
            </label>
            <label>
                <input 
                    type="password"
                    placeholder="******"
                    onChange = {e => setPassword(e.target.value)}
                    />
            </label>
            <button>Create an account</button>
            <a href="/login">Already a user?</a>
        </form>

    )
}