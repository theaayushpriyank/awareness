
export function getFinanceMetrics(transactions, monthYear, category) {
    const transactionsByCategory = getTransactionsByCategory(transactions) //all transactions till date on a given category
    const transactionsByMonth = getTransactionsByMonth(transactions, monthYear) //all transactions in a given month
    const categoryTransactionsByMonth = getCategoryTransactionsByMonth(transactions, monthYear) //monthly transactions in each category
    return { transactionsByCategory, transactionsByMonth, categoryTransactionsByMonth }
}

export function getTransactionsByCategory(transactions) {
        const categoryTotals = transactions.reduce((sum, transaction) => {
        sum[transaction.trxnSource] = (sum[transaction.trxnSource] || 0) + Number(transaction.trxnAmount)
        return sum} , {})
        const transactionsByCategory = Object.entries(categoryTotals).map(
            ([category, total]) => ({category: category, total: total, transactions: transactions.filter(transaction => transaction.trxnSource === category)}) )
        return transactionsByCategory //an array of objects, {category, total, transactions: []}
        }

export function getTransactionsByMonth(transactionList, monthYear){
        const transactionsThisMonth = transactionList.filter(object => object.trxnDate.startsWith(monthYear))
        const sumOfTransactionsThisMonth = transactionsThisMonth.reduce((sum, trxn) => sum + Number(trxn.trxnAmount), 0)
        const filteredResults = {transactions: transactionsThisMonth, total: sumOfTransactionsThisMonth}
        return filteredResults //an object with all the transactions for that month + total of the transactions
}

export function getCategoryTransactionsByMonth(transactionList, monthYear) {
        const transactionsByMonth = getTransactionsByMonth(transactionList, monthYear).transactions
        const categoryTransactionsThisMonth = getTransactionsByCategory(transactionsByMonth)
        return categoryTransactionsThisMonth  //an array of objects, {category, total, transactions}
}