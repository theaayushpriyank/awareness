import React from "react"
import {lifestyleCost} from "./Components/DefaultArrays" 

export default function SummarySection(props) {

const summariesArray = [
  {key: "current-balance", name: "Current Balance", content: "INR " + props.balance},
  {key: "luxury-spends", name: "Luxury Spends", content: ((props.avoidable/props.totalExpense)*100 || 0).toFixed(2) + " %"},
  {key: "current-runway", name: "Current Runway", content: (props.balance/Number(lifestyleCost))*30 + " days"},
  {key: "total-expenses", name: "Total Expenses", content: "INR " + props.totalExpense},
]

    return (
    <section id="summary-section">
      <ul>
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