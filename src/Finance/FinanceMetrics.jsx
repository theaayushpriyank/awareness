import { getCategoryTransactionsByMonth } from "../calculations.js"

export default function FinanceMetrics(props) {

const categoryExpensesByMonth = getCategoryTransactionsByMonth(props.expenseList, props.monthYear)

const categoryList = categoryExpensesByMonth.sort((a,b) => b.total - a.total).map(obj => (
    <li key={obj.category}>
        <span>{obj.category}</span>
        <span>₹{obj.total}</span>
    </li>))
    
    return (
    <div className="finance-metrics-table">
    <div className="finance-metric">
        <p className="metric-title">Category Totals</p>
        <ul className="metric-content">
            {categoryList}
        </ul>
    </div>
</div>)
}
