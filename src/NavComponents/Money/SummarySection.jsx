import {lifestyleCost} from "../../data/data.js" 
import { getTransactionsByMonth } from "../../calculations.js"

export default function SummarySection({trxnList, financeForm}) {
  const expensesThisMonth = getTransactionsByMonth(trxnList.expenseList, financeForm.monthYear).total
  const revenueThisMonth = getTransactionsByMonth(trxnList.revenueList, financeForm.monthYear).total
  const savingsThisMonth = Number(revenueThisMonth) - Number(expensesThisMonth) 
  const indulgenceList = trxnList.expenseList.filter(trxn => trxn.trxnNote.includes("#luxury"))
  const indulgenceAmount = indulgenceList.reduce((sum, trxn) => Number(sum) + Number(trxn.trxnAmount),0)
  const totalExpense = trxnList.expenseList.reduce((sum, entry) => sum + Number(entry.trxnAmount),0)
  const totalRevenue = trxnList.revenueList.reduce((sum, entry) => sum + Number(entry.trxnAmount), 0)
  const currentBalance =  totalRevenue - totalExpense     
  
  const summariesArray = [
  {key: "current-balance", name: "Current Balance", content: "₹ " + currentBalance?.toLocaleString('en-IN')},
  {key: "indulgence", name: "Indulgence", content: ((indulgenceAmount/totalExpense)*100 || 0).toFixed(2) + " %"},
  {key: "current-runway", name: "Current Runway", content: Math.floor(currentBalance/Number(lifestyleCost)*30) + " days"},
  {key: "total-expenses", name: "Expenses This Month", content: "₹ " + expensesThisMonth?.toLocaleString('en-IN')},
  {key: "total-revenue", name: "Revenue This Month", content: "₹ " + revenueThisMonth?.toLocaleString('en-IN')},
  {key: "monthly-savings", name: "Savings This Month", content: "₹" + savingsThisMonth?.toLocaleString('en-IN')} 
]

    return (
      <section id="summary-section">
        <ul id="summary-list">
          {summariesArray.map(summary => (
            <li key={summary.key}>
              <span className="li-name">{summary.name}</span>
              <span className="li-number">{summary.content}</span>
            </li>))
          }
        </ul>
      </section>
    )
}