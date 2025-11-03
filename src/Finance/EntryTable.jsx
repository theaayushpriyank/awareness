import React from 'react'
import { db } from "../firebase/firebaseConfig.js"
import { doc, deleteDoc } from "firebase/firestore"
import { useAuth } from "../firebase/authContext.jsx"

export default function EntryTable ({expenseList, revenueList, setExpenseList, setRevenueList, setAvoidable, monthYear, setMonthYear, date}){

    
    const {user} = useAuth()
    const [selectedId, setSelectedId] = React.useState(null)
    const [activeTab, setActiveTab] = React.useState("expenses-tab-btn")

    function handleEntryClick(entry) {
        setSelectedId(entry.id)
    }
    
    React.useEffect( () => {
        function handleEmptyClick(e) { // remove active tab when clicked outside the entry table
            if(!e.target.closest(".overview-item")){setSelectedId(null)}
        }
        document.addEventListener("click", handleEmptyClick)
        return () => document.removeEventListener("click", handleEmptyClick)
    }, [selectedId])

    function generateEntries(list){ // converts transactions into an array of list items
        return (list.map(item => <li 
            className= "overview-item" 
            key={item.id}
            onClick= {() => handleEntryClick(item)}
            style = {{backgroundColor: selectedId === item.id ? 'lightgray': "#fafafa"}} 
        > 
            <div className="overview-header">
                <p> {item.trxnSource} | {item.trxnNote} </p>
                <p className="li-number"> ₹{Number(item.trxnAmount)?.toLocaleString('en-IN')}</p>
            </div>
            {item.id === selectedId && <div className="overview-footer">
                <p>{item.displayDate}</p>
                <p 
                    style = {{color: "red", cursor: "pointer"}}
                    onClick={(e) => deleteTransaction(item)}>Delete</p>
            </div>}
        </li>))
    }

    const expensesToday = expenseList.filter(expense => expense.trxnDate === date).sort((a,b) => b.trxnAmount - a.trxnAmount)
    const totalExpensesToday = expenseList.filter(expense => expense.trxnDate === date).reduce((sum, expense) => sum + Number(expense.trxnAmount), 0)
    const revenueThisMonth = revenueList.filter(revenue => revenue.trxnDate?.startsWith(monthYear))

    const expenseEntries = generateEntries(expensesToday)
    const revenueEntries = generateEntries(revenueThisMonth)

    const budgetEntries = []
  
    const tabs = [
        {id: "expenses-tab-btn", label: "Expenses", content: expenseEntries},
        {id: "revenue-tab-btn", label: "Revenue", content: revenueEntries},
        {id: "budget-tab-btn", label: "Budget", content: budgetEntries},
    ]

    async function deleteTransaction (entry) { //removes the entry from cloud storage
        await deleteDoc(doc(db, "users", user.uid, entry.trxnType, String(entry.id)))
        if (entry.trxnType === "expenses"){
            setExpenseList(prev => prev.filter(exp=> exp.id !== entry.id))
            if(entry.trxnSource === "Luxury"){
            setAvoidable(prev => Number(prev) - Number(entry.trxnAmount))
            }}
        else if (entry.trxnType === "revenue"){
            setRevenueList(prev => prev.filter(rev => rev.id !== entry.id))
        }}

    function MonthSelection() {
    return (
        <div id="table-header">
            <p>Expenses Today: ₹{totalExpensesToday}</p>
            <input className="month-selection" 
            type="month"
            value={monthYear}
            onChange={(e) => setMonthYear(e.target.value)}/>
        </div>
    )
    }

    return (
        <section>
        <MonthSelection />
        <div id="tabs-container">
            {tabs.map(tab => (
                <button
                    key= {tab.id} 
                    id= {tab.id} 
                    onClick = {() => {setActiveTab(tab.id)}}
                    className = {activeTab === tab.id ? "active-tab" : ""}
                > {tab.label} </button>
            ))}
        </div>
        <div id="overview-list">
            {tabs.find(t => t.id === activeTab)?.content}
        </div>
    </section>
    )
}