import React from 'react'
import { db } from "./firebaseConfig.js"
import { collection, doc, deleteDoc } from "firebase/firestore"
import { useAuth } from "./authContext.jsx"

export default function EntryTable ({expenseList, revenueList, setExpenseList, setRevenueList, setAvoidable}){

    const {user} = useAuth()

    const [selectedId, setSelectedId] = React.useState(null)

    function handleEntryClick(entry) {
        setSelectedId(entry.id)
    }
    // remove active tab when clicked outside the entry table
    React.useEffect( () => {
        function handleEmptyClick(e) {
            if(!e.target.closest(".overview-item")){
                setSelectedId(null)
            }
        }
        document.addEventListener("click", handleEmptyClick)
        return () => document.removeEventListener("click", handleEmptyClick)
    }, [selectedId])

    const deleteExpenseOption = (entry) => {
        return (
        <p
        style = {{color: "red"}}
        onClick={() => deleteExpense(entry)}
        >Delete</p>
    )}

    const deleteRevenueOption = (id) => {
        return (
            <p
            style = {{color: "red"}}
            onClick = {() => deleteRevenue(id)}
            >Delete</p>
        )
    }


    const expenseEntries = expenseList.map(item => (
        <li 
            className= "overview-item" 
            key={item.id}
            onClick= {() => handleEntryClick(item)}
            style = {{backgroundColor: selectedId === item.id ? 'lightgray': "#fafafa"}} 
        >
            <span className="li-text"> {item.trxnSource} | {item.trxnNote} </span>
            <span className="li-number">INR {item.trxnAmount}</span>
            {item.id === selectedId && deleteExpenseOption(item)}
        </li>
    )
    )

    const revenueEntries = revenueList.map(item => (
        <li 
            className="overview-item"
            key={item.id}
            onClick= {()=> handleEntryClick(item)}
            style = {{backgroundColor: selectedId === item.id ? 'lightgray': "#fafafa"}} 
        >
            <span className="li-text"> {item.trxnSource} | {item.trxnNote} </span>
            <span className="li-number">INR {item.trxnAmount}</span>
            {item.id===selectedId && deleteRevenueOption(item.id)}
        </li>
    ))

    const budgetEntries = []

    const [activeTab, setActiveTab] = React.useState("expenses-tab-btn")
    const tabs = [
        {id: "expenses-tab-btn", label: "Expenses", content: expenseEntries},
        {id: "revenue-tab-btn", label: "Revenue", content: revenueEntries},
        {id: "budget-tab-btn", label: "Budget", content: budgetEntries},
    ]

    async function deleteExpense(entry) {
        await deleteDoc(doc(db, "users", user.uid, "expenses", String(entry.id)))
        setExpenseList(prev => prev.filter(exp => exp.id !== entry.id))
        if(entry.trxnSource === "Luxury"){
        setAvoidable(prev => Number(prev) - Number(entry.trxnAmount))
    }
    }

    async function deleteRevenue(id){
        await deleteDoc(doc(db, "users", user.uid, "revenue", String(id)))
        setRevenueList(prev => prev.filter(rev => rev.id !== id))
    }

    return (
    <section>
        <div id="tabs-container">
            {tabs.map(tab => (
                <button
                    key= {tab.id} 
                    id= {tab.id} 
                    onClick = {() => {setActiveTab(tab.id)}}
                    className = {activeTab === tab.id ? "active-tab" : ""}
                > {tab.label}
                </button>
            ))}
        </div>
        <div id="overview-list">
            {tabs.find(t => t.id === activeTab)?.content}
        </div>
    </section>
    )
}