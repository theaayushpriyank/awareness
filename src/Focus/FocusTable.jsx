import React from "react"
import { useAuth } from "../firebase/authContext.jsx"
import { doc, deleteDoc, setDoc, getDocs} from "firebase/firestore"
import { db } from "../firebase/firebaseConfig.js"

export default function FocusTable({ allSessions, setAllSessions, date }){
    const {user, userData} = useAuth()
    const filteredSessions = allSessions.filter(session => session.sessionDate === date)
    const totalHours = filteredSessions.reduce((sum, session) => sum + Number(session.sessionDuration), 0)/60

    async function deleteSession(id){
        await deleteDoc(doc(db, "users", user.uid, "sessions", String(id)))
        setAllSessions(allSessions.filter(session => session.id !== id))
    }
    
    const sessionEntries = filteredSessions.map(session => (
        <div key={session.id} className="session-entry">
            <p className="entry-header">{session.sessionTarget}</p>
            <p className="entry-description">{session.sessionNote}</p>
            <p className="entry-footer">
                <span className="session-details">
                {session.startTime} | {session.sessionDuration < 120 ? session.sessionDuration + " minutes": (session.sessionDuration/60).toFixed(2) + " hours"} </span>
                <span 
                    className="delete-session"
                    onClick={() => deleteSession(session.id)}>Delete</span>
            </p>
        </div>))
    return (
        <>
            {sessionEntries}
            <p>Total hours: {totalHours.toFixed(2)} hours</p>
        </>

    )
    } 