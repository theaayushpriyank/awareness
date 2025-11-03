# finance awareness
set current balance
update current balance based on item 
if item is revenue, increase total money by amount
if item is expense, decrease total money by amount
each item is to be an object, containing following data:
    -  date
    -  amount
    -  expense or revenue 
    -  nature of expense: budgeted, unavoidable, avoidable
    -  category of expense: accomodation, transport, food, etc
    -  category of revenue: languify, rocketrush, daily protein, other
    -  note for further details 


# tricky parts
- creating different options show up in category based on whether the item is revenue or an expense


# 11 Sep

- Create something where I can at least store data when I update
- Make the expenses or revenue reflect in my total amount 


# 4 Oct

Create custom components that render the Entry Form, which includes
    - Trxn Amount
    - Trxn Category
    - Trxn Source
    - Overview list


# 20 Oct

- Make entries 'active' when clicked. Active entries should have a change in color and reveal 'delete' option.
- Fetch data from localStorage and save it in localStorage
- Make tabs 'active' when clicked. Active tabs will render the data that is relevant to them.
- Reorganise files for clarity 

How I did it:
* 

Output:
 Wow - this was crazy! I sorted out the active entries and added the delete option. Instead of localStorage, I directly set up my data on Firecloud. I solved the active tabs thing and added the revenueList to be rendered. I handled all the related changes so that things sync properly across state and storage. Made the code cleaner. And it's all working!


 Firecloud

 - during useState, check whether there is existing data in cloud and use that if it exists
 - update addToExpenseList function so that the expenses are added in expenses collection
 - update addToRevenueList function so that the revenue is added to revenue collection

 tomorrow do something to calculate balance also, it's relying on state. 

 # 22 Oct 

 - Sort out the balance
 - Create a user login system 

 # 30 Oct

 - Create a work session section (design + basics)
 - Set up conditional rendering

 Process:
 - Create a nav inside header
 - Map through a const appSections and return an array of buttons
 - When a button is clicked, the relevant section is to be rendered on the screen
    - create state activeSection and set default to "Finances"
    - clicking a button setsState to the name of the button
    - under return part of App, use {activeTab === "finances" & <Finances /> }
        - but this gets quite lengthy. a cleaner approach would be if I could scan through an array of objects, find the name that is passed as parameter upon click, and then content associated with that array. 

Realised an issue - right now I'm sorting the entries by timestamp but that assumes the time of creation is the same as the actual event date. Implications:
- for finance entries: If i log expenses of a previous day, it will still show up on the uploaded day if I rely on timestamp to filter. I don't need sequential transactions in finances, but I need them to be on the relevant day so I can generate accurate insights. So if i use dd/mm/yy (that's already selected by user) and add a random number (001, 002, 0003) on top of it, that should solve the issue. 
- for focus entries: I want the exact timing, so I can generate useful insights around what time I generally work etc. Fortunately I am already collecting the specific start time and by the nature of it no two sessions will have the same start time. So if I take the user generated start time and sort according to that, I should be fine. 


# 31 Oct 

Session Objectives
- Fix how time is calculated for both finances and focus
- Render category totals for finances 

