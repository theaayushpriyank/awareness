export default function MonthSelection({totalExpensesToday, financeForm, setFinanceForm}) {
    return (
        <div id="table-header">
            <p>Daily Expenses: ₹{totalExpensesToday}</p>
            <input className="month-selection" 
            name="MonthSelector"
            type="month"
            value={financeForm.monthYear}
            onChange={(e) => setFinanceForm(prev => ({...prev, monthYear: e.target.value}))}/>
        </div>
    )
    }