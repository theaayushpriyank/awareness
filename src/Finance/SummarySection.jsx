import React from "react"
import {lifestyleCost} from ".././Components/DefaultArrays" 
import { getTransactionsByMonth } from "../calculations.js"
export default function SummarySection(props) {

const expensesThisMonth = getTransactionsByMonth(props.expenseList, props.monthYear).total
const revenueThisMonth = getTransactionsByMonth(props.revenueList, props.monthYear).total
const savingsThisMonth = Number(revenueThisMonth) - Number(expensesThisMonth) 

const summariesArray = [
  {key: "current-balance", name: "Current Balance", content: "₹ " + props.balance?.toLocaleString('en-IN')},
  {key: "luxury-spends", name: "Luxury Spends", content: ((props.avoidable/props.totalExpense)*100 || 0).toFixed(2) + " %"},
  {key: "current-runway", name: "Current Runway", content: (Math.floor(props.balance/Number(lifestyleCost)))*30 + " days"},
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