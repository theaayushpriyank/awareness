import React from "react"
import { createFooter, createInput, createEditDelete } from "../Money/ReusableComponent.jsx"
import { getFinanceInputs, getDefaultInputs } from "../Money/DataArrays.jsx"
import { deleteTransaction, updateTransaction, updateOption, deleteOption } from "../Money/EntryFunctions.js"
import { useAuth } from "../../firebase/authContext.jsx"

export function FinanceEntryListItem({item, selectedId, setSelectedId, editingId, setEditingId, financeSource, setTrxnList}){ 
    const { user } = useAuth()
    const [itemState, setItemState] = React.useState({...item})
    const financeInputsArray  = getFinanceInputs({formState: itemState, setFormState: setItemState, financeSource})
    const id = item.id
    const footer =  createFooter({editFunction: () => setEditingId(id), text: item.displayDate,
        deleteFunction: () => deleteTransaction(item, user, setTrxnList)})
    return(
    <li
        className= "overview-item"
        onClick= {() => setSelectedId(id)}
        style = {{backgroundColor: selectedId === id ? 'lightgray': "#fafafa"}}
    >
    {editingId !== id && (
        <div className="financeEntry-header" style ={{display: "flex", justifyContent: "space-between"}}> 
            <p> {item.trxnSource} | {item.trxnNote} </p> 
            <p className="li-number"> ₹{Number(item.trxnAmount)?.toLocaleString('en-IN')}</p>
        </div>
    )}
    {editingId !== id && selectedId === id && footer} 

    {editingId === id && (
        <div className="editRow">
            <div className="entry-row1">
                {createInput("trxnSource", financeInputsArray, true)}
                {createInput("trxnAmount", financeInputsArray, true)}
                <button id="updateBtn" 
                    onClick = {() => updateTransaction(user, itemState, setTrxnList, setEditingId)}>
                    Save</button>
            </div>
            <div>
                {createInput("trxnNote", financeInputsArray, true)}
            </div>
            <div>
                <div className="date-input">
                    <label>
                    {createInput("trxnDate", financeInputsArray, true)}
                    </label>
                </div>
            </div>
        </div>)}
    </li>
    )
}

export function DefaultListItem ({item, selectedId, setSelectedId, editingId, setEditingId, optionsList, setOptionsList}) {
    const { user } = useAuth()
    const id = item.name
    const editDelete = createEditDelete(
    {   editFunction: () => {setEditingId(id)}, 
        deleteFunction: () => deleteOption({user, setOptionsList, item})
        })
    const separate = {display: "flex", justifyContent: "space-between"}
    const [itemState, setItemState] = React.useState(item)
    const defaultInputsArray = getDefaultInputs({itemState, setItemState})
    return(
    <li
        className= "overview-item"
        onClick= {() => setSelectedId(id)}
        style = {{backgroundColor: selectedId === id ? 'lightgray': "#fafafa"}}
    >
    {editingId !== id && (
        <>
        <div style = {separate}>
            <p>{item.name}</p>
            {selectedId === id && !item.brief && editDelete}
        </div>
            {selectedId === id && item.brief && (
                <div style = {separate}>
                    {item.brief && <p>{item.brief}</p>}
                    {editDelete}
                </div>
            )}
        </>
        )}

    {editingId === id && (
        <form action = {() => updateOption({user, itemState, optionsList, setOptionsList, setEditingId})}>
            {createInput("name", defaultInputsArray, true)}
            {createInput("brief", defaultInputsArray, true)}
            <button>Save</button>
        </form>
    )}

    </li>)
}