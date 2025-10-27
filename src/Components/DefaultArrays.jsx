export const expenseSource = 
    {budgeted: [], 
    unbudgeted: []}

export const revenueSource = []

export const defaultBudget = 
    ["Food", "Accomodation", "Transport", "Groceries", "Outing", "Debt", "Laundry", "Coworking"]

export const defaultUnbudget = 
    ["Necessity", "Luxury"]

export const defaultRevenue = 
    ["Languify", "RocketRush", "DailyProtein", "Lumpsum", "Interest"]

export const lifestyleCost = 25000

export default function getDefaultArrays() {
//these are all default arrays and will not be updated by user interaction.

  const budgetedOptionsArray = []
  const unbudgetedOptionsArray = []
  const revenueOptionsArray = []

    function addToBudget(name, budget = {}, actual = {}) {
    //push the argument passed into the budgeted array in expense source
    expenseSource.budgeted.push({name, budget, actual})
    //add the argument into the list of budgeted options rendered in client
    budgetedOptionsArray.push(<option key={name} value={name}>{name}</option>)
  }
  function addToUnbudget(name){
    //push the argument passed into the unbudgeted array in expense source
    expenseSource.unbudgeted.push({name}) 
    //add the argument into the list of unbudgeted options rendered in client
    unbudgetedOptionsArray.push(<option key={name}value={name}>{name}</option>) 
  }

  function addToRevenue(name){
    //push the argument into the revenue source array
    revenueSource.push({name})
    //add the argument into the revenue options rendered in client  
    revenueOptionsArray.push(<option key={name}value={name}>{name}</option>)
  }

  defaultBudget.forEach(name => addToBudget(name))
  defaultUnbudget.forEach(name => addToUnbudget(name))
  defaultRevenue.forEach(name => addToRevenue(name))

  return {budgetedOptionsArray, unbudgetedOptionsArray, revenueOptionsArray} 
  
}

