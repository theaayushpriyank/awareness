import React from 'react'
import './styles/App.css'
import FinanceApp from "./NavComponents/Money/FinanceApp.jsx"
import FocusSection from "./NavComponents/Sessions/FocusSection.jsx"
import Nutrition from "./NavComponents/Nutrition/NutritionApp.jsx"
import Account from "./NavComponents/Account/Account.jsx"
import { useAuth } from "./firebase/authContext.jsx"
import { fetchOptions } from "./NavComponents/Money/EntryFunctions.js"

export default function App() {
  const { user } = useAuth()
  const [optionsList, setOptionsList] = React.useState([])
  
  React.useEffect(() => {
    fetchOptions({user, setOptionsList})}, [])

  const appSections = [
    { name: "Money", component: FinanceApp },
    { name: "Sessions", component: FocusSection },
    { name: "Nutrition", component: Nutrition },
    { name: "Account", component: Account }
]

  function RenderNav() {
    return appSections.map(section => (
      <button
      key={section.name}
      name={section.name}
      className = {section.name === activeSection ? "active-section" : ""}
      onClick={(e) => setActiveSection(e.target.id)}
      id={section.name}>{section.name}</button>))
  }

  const [activeSection, setActiveSection] = React.useState(appSections[0].name)

  function renderSection() {
    const Comp = appSections.find(s => s.name === activeSection).component
    return <Comp optionsList = {optionsList} setOptionsList= {setOptionsList} />
  }
  
  return (
    <>
    <header>
      <nav><RenderNav /></nav>
    </header>
      {renderSection()}
    </>
  )
}
