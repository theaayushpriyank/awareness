import React from 'react'
import { db } from "./firebaseConfig.js"
import { collection, addDoc, getDocs } from "firebase/firestore"
import './styles/App.css'
import EntryForm from './EntryForm'
import EntryTable from './EntryTable'
import SummarySection from "./SummarySection"
import { useAuth } from "./authContext.jsx"


function App() {

  const { user, userData} = useAuth()
  
  const [expenseList, setExpenseList] = React.useState([])
  const [revenueList, setRevenueList] = React.useState([])
  const [balance, setBalance] = React.useState()
  const [avoidable, setAvoidable] = React.useState(0)

  React.useEffect(() => setBalance(Number(totalRevenue) - Number(totalExpense))) 

  const totalExpense = expenseList.reduce((sum, entry) => sum + Number(entry.trxnAmount),0)
  const totalRevenue = revenueList.reduce((sum, entry) => sum + Number(entry.trxnAmount), 0) 

  async function fetchExpenses() {
    try {
    const snapshot = await getDocs(collection(db, "users", user.uid, "expenses")) //gets the expenses of the user based on user uid
    const expenses = snapshot.docs.map(doc => (
      {id: doc.id, ...doc.data()}))
    const orderedExpenses = expenses.sort((a,b) => b.id - a.id) //sorts out items so that latest show up first
    setExpenseList(orderedExpenses)
    } catch(error) {console.log("Firestore fetch error:", error)}
  }

  async function fetchRevenue() {
    try {
    const snapshot = await getDocs(collection(db, "users", user.uid, "revenue"))
    const revenue = snapshot.docs.map(doc => (
      {id: doc.id, ...doc.data()}
    ))
    const orderedRevenue = revenue.sort((a,b)=> b.id - a.id )
    setRevenueList(orderedRevenue)} catch(error){console.log("Firestore fetch error:", error)}
  } 
  


  //update data from firestore
  React.useEffect(() => {fetchExpenses()}, [])
  React.useEffect(() => {fetchRevenue()}, []) 

  return (
    <>
    <header></header>
      <EntryForm 
        expenseList = {expenseList} 
        setExpenseList = {setExpenseList}
        revenueList = {revenueList}
        setRevenueList = {setRevenueList}
        setBalance = {setBalance}
        balance = {balance}
        setAvoidable = {setAvoidable}
        />

      <EntryTable  
        expenseList = {expenseList}
        revenueList = {revenueList}
        setExpenseList = {setExpenseList}
        setRevenueList = {setRevenueList}
        setAvoidable = {setAvoidable}
      />  

      <SummarySection 
        balance = {balance}
        avoidable = {avoidable}
        expenseList = {expenseList}
        totalExpense = {totalExpense}
        totalRevenue = {totalRevenue}
      />
    </>
  )
}

export default App
