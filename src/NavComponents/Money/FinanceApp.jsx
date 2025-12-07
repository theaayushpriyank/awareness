import React from "react"
import EntryForm from "./EntryForm.jsx"
import EntryTable from "./EntryTable.jsx"
import SummarySection from "./SummarySection.jsx"
import FinanceMetrics from "./FinanceMetrics.jsx"
import { useAuth } from "../../firebase/authContext.jsx"
import { fetchExpenses, fetchRevenue } from "./EntryFunctions.js"
import "../../styles/Finance.css"

export default function FinanceSection({ optionsList, setOptionsList }) {
  const { user } = useAuth()
  const [financeForm, setFinanceForm] = React.useState(
    {trxnType: "expenses",
      trxnDate: new Date().toISOString().split("T")[0], 
      monthYear: new Date().toISOString().slice(0, 7),
    })
  const [trxnList, setTrxnList] = React.useState({expenseList: [], revenueList: []})
  const shared = {financeForm, setFinanceForm, trxnList, setTrxnList, optionsList, setOptionsList}
    
    React.useEffect(() => {
      fetchRevenue({setTrxnList, user});
      fetchExpenses({setTrxnList, user})
    }, [])

    return (
        <>
            <EntryForm {...shared} />
            <EntryTable {...shared} />  
            <SummarySection {...shared} />
            <FinanceMetrics {...shared} />
        </>
    )

}