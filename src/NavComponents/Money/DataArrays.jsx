import { updateState, filterOptions } from "./EntryFunctions.js"
import { validateDate } from "../../utils/common.js"
import { createOptionsArray } from "./ReusableComponent.jsx"

export function getFinanceInputs({formState, setFormState, optionsList}) {
  const { expenseSource, revenueSource } = filterOptions(optionsList)
  const trxnSource = formState.trxnType === "expenses" ? createOptionsArray(expenseSource) : createOptionsArray(revenueSource)
  
  const handleChange = (e) => updateState(setFormState, e.target.name, e)
  const dateOnchange = (e) => updateState(setFormState, "trxnDate", validateDate(e.target.value, formState.trxnDate))

  const financeInputsArray = [
    {nature: "input", required: true, type: "number", name: "trxnAmount", placeholder: "INR", value: formState.trxnAmount, 
    onChange: handleChange}, 
      
    {nature: "input", required: true, type: "date", name: "trxnDate", defaultValue: formState.trxnDate, viewOnchange: dateOnchange,
    onChange: dateOnchange, value: formState.trxnDate},
      
    {nature: "textarea", required: true, name: "trxnNote", defaultValue: "-", value: formState.trxnNote, 
    onChange: handleChange},

    {nature: "select", required: true, name: "trxnType", defaultValue: "expenses", onChange: handleChange, 
    viewOnchange: handleChange, options: createOptionsArray([{name:"Expenses"}, {name:"Revenue"}], true)},
      
    {nature: "select", required: true, name: "trxnSource", defaultValue: "Food", value: formState.trxnSource,
    onChange: handleChange, options: trxnSource, editClassname: "dropdown"},

  ]
  return financeInputsArray
}

export function getDefaultInputs({itemState = {}, setItemState = false} ) {

  const handleChange = setItemState ? (e) => setItemState(prev => ({...prev, [e.target.name]: e.target.value})) : null
  const optionTypes = createOptionsArray([{name: "expenseSource"}, {name: "revenueSource"}, {name: "sessionSource"}])

  const defaultInputsArray = [
    {nature: "input", required: true, type: "text", name: "name", placeholder: "Name", value: itemState.name || "", onChange: handleChange || ""},
    
    {nature: "input", required: false, type: "text", name: "brief", placeholder: "Brief", value: itemState.brief || "", onChange: handleChange || ""},  

    {nature: "select", required: true, name: "type", defaultValue: "expenseSource", value: itemState.type || "", onChange: handleChange || "", 
      options: optionTypes
    }
  ]

  return defaultInputsArray
}
