import React from "react"
import EntryForm from "./EntryForm"
import EntryTable from "./EntryTable"
import SummarySection from "./SummarySection"
import FinanceMetrics from "./FinanceMetrics"
import { db } from "../firebase/firebaseConfig.js"
import { useAuth } from "../firebase/authContext.jsx"
import { collection, getDocs } from "firebase/firestore"
import "../styles/Finance.css"

export default function FinanceSection() {
    const { user, userData} = useAuth()
    const [expenseList, setExpenseList] = React.useState([])
    const [revenueList, setRevenueList] = React.useState([])
    const [balance, setBalance] = React.useState()
    const [avoidable, setAvoidable] = React.useState(0)
    const [monthYear, setMonthYear] = React.useState(new Date().toISOString().slice(0, 7))
    const totalExpense = expenseList.reduce((sum, entry) => sum + Number(entry.trxnAmount),0)
    const totalRevenue = revenueList.reduce((sum, entry) => sum + Number(entry.trxnAmount), 0)
    const [date, setDate] = React.useState(new Date().toISOString().split("T")[0])

    React.useEffect(() => setBalance(Number(totalRevenue) - Number(totalExpense)), [totalRevenue, totalExpense]) 
    
    async function fetchExpenses() {
        try {
        const snapshot = await getDocs(collection(db, "users", user.uid, "expenses")) //gets the expenses of the user based on user uid
        const expenses = snapshot.docs.map(doc => (
          {id: doc.id, ...doc.data()}))
        const orderedExpenses = expenses.sort((a,b) => new Date(b.trxnDate) - new Date(a.trxnDate)) //sorts out items so that latest show up first
        setExpenseList(orderedExpenses)
        } catch(error) {console.log("Firestore fetch error:", error)}
      }
    
    async function fetchRevenue() {
        try {
        const snapshot = await getDocs(collection(db, "users", user.uid, "revenue"))
        const revenue = snapshot.docs.map(doc => (
          {id: doc.id, ...doc.data()}
        ))
    const orderedRevenue = revenue.sort((a,b)=> new Date(b.trxnDate) - new Date(a.trxnDate) )
        setRevenueList(orderedRevenue)} catch(error){console.log("Firestore fetch error:", error)}
      } 
      
    //update data from firestore
    React.useEffect(() => {fetchExpenses()}, [])
    React.useEffect(() => {fetchRevenue()}, []) 
    
    return (
        <>
            <EntryForm 
                expenseList = {expenseList} 
                setExpenseList = {setExpenseList}
                revenueList = {revenueList}
                setRevenueList = {setRevenueList}
                setBalance = {setBalance}
                balance = {balance}
                setAvoidable = {setAvoidable}
                date = {date}
                setDate = {setDate}
                />
        
            <EntryTable  
                expenseList = {expenseList}
                revenueList = {revenueList}
                setExpenseList = {setExpenseList}
                setRevenueList = {setRevenueList}
                setAvoidable = {setAvoidable}
                monthYear = {monthYear}
                setMonthYear = {setMonthYear}
                date = {date}
                />  
            
            <SummarySection 
                balance = {balance}
                avoidable = {avoidable}
                expenseList = {expenseList}
                revenueList = {revenueList}
                monthYear = {monthYear}
                />

            <FinanceMetrics 
              expenseList = {expenseList}
              revenueList = {revenueList}
              monthYear = {monthYear}/>
        </>
    )

}