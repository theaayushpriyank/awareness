export function startSmall(word) {
  if (!word) return ""
  return word.charAt(0).toLowerCase() + word.slice(1)
}

export function validateDate(value, fallback){
  const date = new Date (value)
  const validDate = !isNaN(date.getTime())? date.toISOString().split("T")[0]: fallback
  return validDate
}
