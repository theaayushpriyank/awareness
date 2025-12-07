import React from 'react'
import { useAuth } from "../../firebase/authContext.jsx"
import { updateFinanceList } from "./EntryFunctions.js"
import { getFinanceInputs } from "./DataArrays.jsx"
import { createInput } from './ReusableComponent.jsx'

export default function EntryForm({financeForm, setFinanceForm, optionsList, setTrxnList}) {   //get the current expenses and revenue options 
    const financeInputsArray = getFinanceInputs({formState:financeForm, setFormState: setFinanceForm, optionsList})
    const { user } = useAuth()

    function entrySubmit(formData){ //at form submit, push expenses and revenue to different functions
    const data = Object.fromEntries(formData)
    const displayDate = new Date(data.trxnDate).toLocaleDateString("en-GB")
    updateFinanceList({...data, id: Date.now(), displayDate: displayDate}, user, setTrxnList, setFinanceForm)
    }

    return (
    <section id="form-section">
      <form className="entry-form" action={entrySubmit}>
        <div className="entry-row1">
          {createInput("trxnAmount", financeInputsArray)}
          <button id="add-record" className="primary btn">Add To Records</button>
        </div>
        <div className="entry-row2">
          {createInput("trxnType", financeInputsArray)}
          {createInput("trxnSource", financeInputsArray)}
          <div className="date-input">
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {createInput("trxnDate", financeInputsArray)}
            </label>
          </div>
        </div>
          {createInput("trxnNote", financeInputsArray)}
      </form>
    </section>
    )
}