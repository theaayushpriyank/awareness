import React from 'react'
import './styles/App.css'
import FinanceSection from "./Finance/FinanceSection"
import FocusSection from "./Focus/FocusSection"

function App() {

  const appSections = [
    {name: "Finances", content: <FinanceSection />}, 
    {name: "Focus", content: <FocusSection />},
    {name: "Nutrition", content: "Nutrition rendered!"}
  ]

  function RenderNav() {
    return appSections.map(section => (
      <button
      key={section.name}
      name={section.name}
      className = {section.name === activeSection ? "active-section" : ""}
      onClick={(e) => changeSection(e.target.id)}
      id={section.name}>{section.name}</button>))
  }

  const [activeSection, setActiveSection] = React.useState(appSections[0].name)
  
  function changeSection(id) {
    setActiveSection(id)
  }

  function RenderSection() {
    return appSections.find(app => app.name === activeSection).content
  }
  
  return (
    <>
    <header>
      <nav><RenderNav /></nav>
    </header>
      <RenderSection />
    </>
  )
}

export default App
