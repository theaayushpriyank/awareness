//this will contain the raw data to be used in rendering jsx
export const expenseSource = 
    {budgeted: [], 
    unbudgeted: []}

export const revenueSource = []

export const defaultFinances = {
  budget: ["Food", "Accomodation", "Coffee", "Transport", "Groceries", "Outing", "Debt", "Laundry", "Coworking"],
  unbudget: ["Necessity", "Luxury", "Business"],
  revenue: ["Languify", "RocketRush", "DailyProtein", "Lumpsum", "Interest"]
} 

export const lifestyleCost = 25000

export default function getDefaultFinanceOptions(financeObject) {
  // take the array passed in parameter and create an array of jsx objects 
  const budgetedOptionsArray = financeObject.budget.map(name => <option key={name} value={name}>{name}</option>)
  const unbudgetedOptionsArray = [financeObject.unbudget.map(name => <option key={name} value={name}>{name}</option>)]
  const revenueOptionsArray = [financeObject.revenue.map(name => <option key={name} value={name}>{name}</option>)]

  return {budgetedOptionsArray, unbudgetedOptionsArray, revenueOptionsArray} 
  
}

export const defaultFocus = {
  items: ["Daily Protein", "Zettelkasten", "App Development", "Coding", "Reading", "RocketRush", "Languify"]
}

export function getDefaultFocusOptions(focusObject){
  const focusOptionsArray = focusObject.items.map(item => <option key={item} value={item}>{item}</option> )
  return focusOptionsArray
  }