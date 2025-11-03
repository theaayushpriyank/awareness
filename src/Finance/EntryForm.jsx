import React from 'react'
import { db } from "../firebase/firebaseConfig.js"
import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "../firebase/authContext.jsx"

import getDefaultFinanceOptions, {defaultFinances} from '../Components/DefaultArrays.jsx'

export default function EntryForm(props) {   //get the default budget, unbudget, and revenue options 
  const {budgetedOptionsArray, revenueOptionsArray, unbudgetedOptionsArray} = getDefaultFinanceOptions(defaultFinances)

  const { user } = useAuth()

  function entrySubmit(formData){ //at form submit, push expenses and revenue to different functions

    const data = Object.fromEntries(formData)
    const displayDate = new Date(data.trxnDate).toLocaleDateString("en-GB")
    if (data.trxnType === "expenses") {
      addToExpenseList({...data, id: Date.now(), displayDate: displayDate}) //creating an id for each item in the expense list
    } else if (data.trxnType === "revenue") {
      addToRevenueList({...data, id: Date.now(), displayDate: displayDate})
    }
    if(data.trxnSource === "Luxury"){
      props.setAvoidable(prev => Number(prev) + Number(data.trxnAmount))
    }
    setTrxnType("expenses")
  }

  async function addToExpenseList(data){  //update expense list in state and cloud storage
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

  const [trxnType, setTrxnType] = React.useState("expenses") //use React from the drop down so that trxnSource is re-rendered upon change

  const trxnSource = trxnType === "expenses" ? expensesOptionsArray : revenueOptionsArray

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
            defaultValue="Expenses"
            onChange = {e => setTrxnType(e.target.value)}
          >
            <option value="expenses">Expense</option>
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

          <div id="date-input">
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input 
                type="date"
                name="trxnDate" 
                defaultValue = {props.date}
                onChange = {(e) => props.setDate(new Date(e.target.value).toISOString().split("T")[0])}
                />
            </label>
          </div>

        </div>
        <textarea defaultValue="-" name="trxnNote" id="trxnNote"/>
      </form>
    </section>
    )
}