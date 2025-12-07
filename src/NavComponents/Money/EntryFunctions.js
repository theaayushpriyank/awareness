import { db } from "../../firebase/firebaseConfig.js"
import { collection, writeBatch, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore"
import { optionsDatabase } from "../../data/data.js"

export function updateTransaction(user, data, setTrxnList, setEditingId){
    setDoc(doc(db, "users", user.uid, data.trxnType, String(data.id)), data, {merge: true})
    setTrxnList(prev => (
    {...prev, expenseList: prev.expenseList.map(trxn => trxn.id === data.id? data : trxn),
    revenueList: prev.revenueList.map(trxn => trxn.id === data.id ? data : trxn)
    }))
    setEditingId(null)
    }

export async function deleteTransaction (entryData, user, setTrxnList) { //removes the entry from cloud storage
    await deleteDoc(doc(db, "users", user.uid, entryData.trxnType, String(entryData.id)))
      if (entryData.trxnType === "expenses"){
          setTrxnList(prev => ({...prev, expenseList: prev.expenseList.filter(exp => exp.id !== entryData.id)}))}
      else if (entryData.trxnType === "revenue"){
          setTrxnList(prev => ({...prev, revenueList: prev.revenueList.filter(exp => exp.id !== entryData.id)}))}
          }

export async function updateFinanceList(entryData, user, setTrxnList, setFinanceForm) {
  const docRef = doc(db, "users", user.uid, entryData.trxnType, String(entryData.id))
    if (entryData.trxnType === "expenses") {
      setTrxnList(prev => ({...prev, expenseList: [entryData, ...prev.expenseList]}))
    } if (entryData.trxnType === "revenue") {
      setTrxnList(prev => ({...prev, revenueList: [entryData, ...prev.revenueList]}))
    }
    await setDoc(docRef, entryData)
    setFinanceForm(prev => ({...prev, trxnType: "expenses"}))
  }

export function updateState(setState, key, data) {
  if (data.target) {
    setState(prev => ({...prev, [key]: data.target.value}))}
  else {
    setState(prev => ({...prev, [key]: data}))}
}


export async function deleteOption({item, user, setOptionsList}) {
  await deleteDoc(doc(db, "users", user.uid, "options", String(item.id)))
  setOptionsList(prev => prev.filter(option => option.id !== item.id))
}

export async function updateOption({user, itemState, optionsList, setOptionsList, setEditingId}){
  setEditingId(null)
  console.log("Ran update Options")
  const docRef = doc(db, "users", user.uid, "options", String(itemState.id))
  await setDoc(docRef, itemState)
  const existsAlready = optionsList.some(option => option.id === itemState.id)
  if (!existsAlready) {setOptionsList(prev => ([...prev, itemState]))}
  if (existsAlready) {setOptionsList(prev => prev.map(option => option.id === itemState.id ? itemState : option))}
}

export async function fetchExpenses({setTrxnList, user}) {
  try {
      const snapshot = await getDocs(collection(db, "users", user.uid, "expenses")) //gets the expenses of the user based on user uid
      const expenses = snapshot.docs.map(doc => (
        {id: doc.id, ...doc.data()}))
      const orderedExpenses = expenses.sort((a,b) => new Date(b.trxnDate) - new Date(a.trxnDate)) //sorts out items so that latest show up first
      setTrxnList(prev => ({...prev, expenseList: orderedExpenses}))
  } catch(error) {console.log("Firestore fetch error:", error)}
}

export async function fetchRevenue({setTrxnList, user}) {
  try {
      const snapshot = await getDocs(collection(db, "users", user.uid, "revenue")) //gets the expenses of the user based on user uid
      const revenue = snapshot.docs.map(doc => (
        {id: doc.id, ...doc.data()}))
      const orderedRevenue = revenue.sort((a,b) => new Date(b.trxnDate) - new Date(a.trxnDate)) //sorts out items so that latest show up first
      setTrxnList(prev => ({...prev, revenueList: orderedRevenue}))
  } catch(error) {console.log("Firestore fetch error:", error)}
} 

export async function fetchOptions({user, setOptionsList}){
  try {
      const snapshot = await getDocs(collection(db, "users", user.uid, "options")) //gets the expenses of the user based on user uid
      const options = snapshot.docs.map(doc => (
        {id: doc.id, ...doc.data()}))
        console.log(options)
      if (options.length < 5) { //if options in firebase are less than 5, use + upload defaults
          setOptionsList(optionsDatabase)
          await setDefaultOptions(user)
          console.log("Uploaded defaults to firestore")
      }
      if (options.length > 5) {
          setOptionsList(options) 
          console.log("Pulled options from firestore")
        }
  } catch(error) {console.log("Firestore fetch error:", error)}
}

async function setDefaultOptions(user){
  const batch = writeBatch(db)
  const optionsCollection = collection(db, "users", user.uid, "options")
  optionsDatabase.forEach((sourceObj) => {
    const optionDoc = doc(optionsCollection, sourceObj.id)
    batch.set(optionDoc, sourceObj)
  })
  await batch.commit()
  console.log("Added an option to firebase!")
}

export function filterOptions(optionsList){
  const expenseSource = optionsList?.filter(option => option.type === "expenseSource")
  const revenueSource = optionsList?.filter(option => option.type === "revenueSource")
  const sessionSource = optionsList?.filter(option => option.type === "sessionSource")
  return {expenseSource, revenueSource, sessionSource}
}