import { Navigate } from "react-router-dom"
import { useAuth } from "./firebase/authContext.jsx"

export default function PrivateRoute( {children} ) {
    const { user, loading } = useAuth()
    if (loading) return null 
    
    return user ? children : <Navigate to="/signup" replace/>
}