import React from 'react'
import { FinanceEntryListItem } from "../components/ListItems.jsx"
import { createTabTable } from "./ReusableComponent.jsx"
import MonthSelection from './MonthSelection.jsx'

export default function EntryTable ({financeForm, setFinanceForm, trxnList, setTrxnList, financeSource}){
    
    const [selectedId, setSelectedId] = React.useState(null)
    const [activeTab, setActiveTab] = React.useState("expenses-tab-btn")
    const [editingId, setEditingId] = React.useState(null)
    const shared = {
        selectedId, setSelectedId, 
        editingId, setEditingId, 
        financeSource, setTrxnList, 
        financeForm, setFinanceForm}
    
    React.useEffect( () => {
        function handleEmptyClick(e) { // remove active tab when clicked outside the entry table
        if(!e.target.closest(".overview-item")){
            setSelectedId(null)
        }
        }
        document.addEventListener("click", handleEmptyClick)
        return () => document.removeEventListener("click", handleEmptyClick)
    }, [selectedId])

    const expensesToday = trxnList.expenseList.filter(expense => expense.trxnDate === financeForm.trxnDate).sort((a,b) => b.trxnAmount - a.trxnAmount)
    const totalExpensesToday = trxnList.expenseList.filter(expense => expense.trxnDate === financeForm.trxnDate).reduce((sum, expense) => sum + Number(expense.trxnAmount), 0)
    const revenueThisMonth = trxnList.revenueList.filter(revenue => revenue.trxnDate?.startsWith(financeForm.monthYear))

    const expenseEntries = generateEntries(expensesToday, shared)
    const revenueEntries = generateEntries(revenueThisMonth, shared)

    const tabs = [
        {id: "expenses-tab-btn", label: "Expenses", content: expenseEntries},
        {id: "revenue-tab-btn", label: "Revenue", content: revenueEntries},
    ]
    
    function generateEntries(list, shared){ // converts transactions into an array of list items
        return list.map(item => 
            <FinanceEntryListItem 
            item = {item}
            key= {item.id}
            {...shared}
            />)
    } 

    return (
        <section>
        <MonthSelection 
        totalExpensesToday= {totalExpensesToday}
        financeForm = {financeForm}
        setFinanceForm = {setFinanceForm}
        />
        {createTabTable({tabs, activeTab, setActiveTab})}
    </section>
    )
}