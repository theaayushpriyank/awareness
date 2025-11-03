import "../styles/Focus.css"
import {defaultFocus, getDefaultFocusOptions} from "../Components/DefaultArrays.jsx"
import { useAuth } from "../firebase/authContext.jsx"
import { collection, doc, deleteDoc, setDoc, getDocs} from "firebase/firestore"
import { db } from "../firebase/firebaseConfig.js"
import FocusTable from "./FocusTable"
import React from "react"

export default function FocusSection() {
    const focusOptions = getDefaultFocusOptions(defaultFocus)
    const { user } = useAuth()
    
    const [allSessions, setAllSessions] = React.useState([])
    const [date, setDate] = React.useState(new Date().toISOString().split("T")[0])

    async function fetchSessions() {
        try{
            const snapshot = await getDocs(collection(db, "users", user.uid, "sessions"))
            const sessions = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            setAllSessions(sessions)
        } catch(error){console.log("Firestone fetch error:", error)}
    }

    React.useEffect(() => {fetchSessions()}, []) 

    async function submitSession(formData){
        const data = {...Object.fromEntries(formData), id: Date.now()}
        setAllSessions(prev => [...prev, {...data}])
        await setDoc(doc(db, "users", user.uid, "sessions", String(data.id)), data)
    }

    return (
    <>
        <form id="focus-form" action={submitSession}>
            <div id="focus-row1">
                <label htmlFor="startTime">Start Time: 
                <input 
                    required
                    name="startTime"
                    id="startTime"
                    type="time"
                    step="60"
                    defaultValue="09:00"
                    />
                </label>
               
            </div>
            <div id="focus-row2">
                <label htmlFor="sessionDuration">Duration: 
                <input 
                    required
                    id="sessionDuration"
                    name="sessionDuration"
                    type="text"
                    defaultValue="60"
                    /> minutes
                </label>
                <select
                    required
                    name="sessionTarget"
                    id="sessionTarget">
                    {focusOptions}
                </select>
            </div>
            <div>
                <textarea 
                    required
                    name="sessionNote"
                    id="sessionNote"/>
            </div>
            <div id="focus-row4">
                <input 
                    required
                    name="sessionDate"
                    id ="sessionDate"
                    type="date"
                    value = {date}
                    onChange= { (e) => setDate(new Date(e.target.value).toISOString().split("T")[0])}
                />
                <button id="record-session">Record Session</button>
            </div>
        </form>

        <div id="focus-table">
            <h1>Sessions today:</h1>
            <FocusTable 
                allSessions = {allSessions}
                setAllSessions = {setAllSessions}
                date = {date}/>
        </div>
    </>
    )
}