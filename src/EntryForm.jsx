import React from 'react'
import { db } from "./firebaseConfig.js"
import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "./authContext.jsx"

import getDefaultArrays from './Components/DefaultArrays.jsx'

export default function EntryForm(props) {
  //get the default budget, unbudget, and revenue options 
  const {budgetedOptionsArray, revenueOptionsArray, unbudgetedOptionsArray} = getDefaultArrays()

  const { user } = useAuth()

  //at form submit, push expenses and revenue to different functions
  function entrySubmit(formData){

    const data = Object.fromEntries(formData)
    if (data.trxnType === "expense") {
      addToExpenseList({...data, id: Date.now()}) //creating an id for each item in the expense list
    } else if (data.trxnType === "revenue") {
      addToRevenueList({...data, id: Date.now()})
    }
    if(data.trxnSource === "Luxury"){
      props.setAvoidable(prev => Number(prev) + Number(data.trxnAmount))
    }
    setTrxnType("expense")
  }

  //update expense list in state and cloud storage
  async function addToExpenseList(data){
    props.setExpenseList(prev => [data, ...prev])
    props.setBalance(prev => Number(prev) - Number(data.trxnAmount))
    await setDoc(doc(db, "users", user.uid, "expenses", String(data.id)), data)
  }

  async function addToRevenueList(data){
    props.setRevenueList(prev => [data, ...prev])
    props.setBalance(prev => Number(prev) + Number(data.trxnAmount))
    await setDoc(doc(db, "users", user.uid, "revenue", String(data.id)), data)
  }

  const expensesOptionsArray = (
     <>
     <option value="" disabled> Budgeted</option>
       {budgetedOptionsArray}
       <option disabled>Unbudgeted</option>
       {unbudgetedOptionsArray}
     </>
  )
  const [trxnType, setTrxnType] = React.useState("expense") //use React from the drop down so that trxnSource is re-rendered upon change

  const trxnSource = trxnType === "expense" ? expensesOptionsArray : revenueOptionsArray

    return (
    <section id="form-section">
      <form id="entry-form" action={entrySubmit}>
        <div id="row1">
          <input 
          required
          type="number"
          placeholder="INR"
          name="trxnAmount"
          id="trxnAmount"
          /> 
          <button id="trxn-btn" className="primary btn">Add To Records</button>
        </div>
        <div id="row2">
          <select 
            required
            id="trxnType"
            name="trxnType"
            defaultValue="Expense"
            onChange = {e => setTrxnType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="revenue">Revenue</option>
          </select>

          <select
            required
            id="trxnSource"
            name="trxnSource"
            defaultValue="Food"
          >
            {trxnSource}
          </select> 

          <i className="fa-regular fa-calendar"></i>
        </div>
        <textarea defaultValue="-" name="trxnNote" id="trxnNote"/>
      </form>
    </section>
    )
}