import React from "react"

import { startSmall } from "../../utils/common.js"

export function createInput(name, array, editing = false){//find the object inside the array using name and use the properties
    const target = array.find(obj => obj.name === name)
    if (target.nature === "input"){
    return <input 
        required = {target.required}
        type= {target.type}
        name= {target.name}
        {...(!editing && { //render these properties only if not editing
            className: target.viewClassName || "",
            placeholder: target.placeholder || null,
            defaultValue: target.defaultValue || null,
            onChange: target.viewOnchange || null,
        })}
        {...(editing && { //render these properties only if editing
            className: target.editClassname || "",
            value: target.value,
            onChange: target.onChange || null
        })}
        />
    }

    else if (target.nature === "textarea"){
        return <textarea 
        required = {target.required} 
        name = {target.name} 
        {...(!editing && {
            className: target.viewClassname || "",
            placeholder: target.placeholder || null,
            defaultValue: target.defaultValue || "",
            onChange: target.viewOnchange || null,
        })}
        {...(editing && {
            className: target.editClassname || "",
            value: target.value, 
            onChange: target.onChange})}
        />
    }

    else if (target.nature === "select") {
      return <select
        required = {target.required}
        id = {target.name}
        name = {target.name}
        {...(!editing && {
            className: target.viewClassname || "",
            onChange: target.viewOnchange || null,
            defaultValue: target.defaultValue}
        )}
        {...(editing && {
            className: target.editClassname || "",
            value: target.value,
            onChange: target.onChange,
        })}
        >{target.options}</select> 
    }
  }

export function createOptionsArray(list, smallCase = false) {  // use the array in parameter to create an array of jsx objects 
  const optionsArray = smallCase ?
    [list?.map(obj => <option key={obj.name} value={startSmall(obj.name)}>{obj.name}</option>)] :
    [list?.map(obj => <option key={obj.name} value={(obj.name)}>{obj.name}</option>)]
  return optionsArray
}

export function createFooter({editFunction, deleteFunction, text}){
    return(
    <div className="overview-footer">
        {text && <p>{text}</p>}
        {!text && <p></p>}
        <div style={{display: "flex", gap: "1rem",}}>
            <span style= {{color: "#3B82F6", cursor: "pointer"}} onClick={editFunction}>Edit</span>
            <span style = {{color: "red", cursor: "pointer"}} onClick={deleteFunction}>Delete </span>
        </div>
    </div>
    )
}

export function createEditDelete({editFunction, deleteFunction}){
    return (
     <div style={{display: "flex", gap: "1rem",}}>
            <span style= {{color: "#3B82F6", cursor: "pointer"}} onClick={editFunction}>Edit</span>
            <span style = {{color: "red", cursor: "pointer"}} onClick={deleteFunction}>Delete </span>
    </div>
)}

export function createTabTable({tabs, activeTab, setActiveTab}) {
    return(
    <>
        <div className="tabs-container">
                {tabs.map(tab => (
                    <button
                        key= {tab.id} 
                        id= {tab.id} 
                        onClick = {() => {setActiveTab(tab.id)}}
                        className = {activeTab === tab.id ? "active-tab" : ""}
                    > {tab.label} </button>
                ))}
        </div>
        
        <div className="overview-list">
            {tabs.find(t => t.id === activeTab)?.content}
        </div>
    </>
)
}