import React from "react"
import { DefaultListItem } from "../components/ListItems.jsx"
import { logout } from "./../../firebase/authService.js"
import { createTabTable, createInput } from "../Money/ReusableComponent.jsx"
import { getDefaultInputs } from "../Money/DataArrays.jsx"
import { updateOption } from "../Money/EntryFunctions.js"
import { useAuth } from "../../firebase/authContext.jsx"

export default function Account({optionsList, setOptionsList}) {
    const { user } = useAuth()
    const [selectedId, setSelectedId] = React.useState(null)
    const [activeTab, setActiveTab] = React.useState("expenseSource")
    const [editingId, setEditingId] = React.useState(null)

    const shared = {
        selectedId, setSelectedId, 
        editingId, setEditingId, 
        optionsList, setOptionsList
        }

    const optionEntries = () => {
        const list = optionsList.filter(option => option.type === activeTab)
        return (list.map(item => 
            <DefaultListItem 
                item = {item}
                key = {item.name}
                type = {activeTab}
                {...shared}
            />
            )
        )
    }

    const defaultInputsArray = getDefaultInputs({})

    function optionSubmit(formData){
        const data = {...Object.fromEntries(formData), id: Date.now()}
        updateOption({user, itemState: data, optionsList, setOptionsList, setEditingId})
    }

    const tabs = [
        {id: "expenseSource", label: "Expenses", content: optionEntries()},
        {id: "revenueSource", label: "Revenue", content: optionEntries()},
        {id: "sessionSource", label: "Sessions", content: optionEntries()},
    ]

    return (
        <>
            <form className="option-form" action= {optionSubmit}>
                <div className = "optionRow1">
                    {createInput("name", defaultInputsArray)}
                    <button>Add Option</button>
                </div>
                <div className = "optionRow2">
                    {createInput("brief", defaultInputsArray)}
                </div>
                <div className ="optionRow3">
                    {createInput("type", defaultInputsArray)}
                </div>
            </form>
            {createTabTable({tabs, activeTab, setActiveTab})}
            <button onClick ={logout} style={{border: "1px solid red"}}>Logout</button>
        </>
    )
}