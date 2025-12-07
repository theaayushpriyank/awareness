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

# 14 Nov 

[18.10 - ]

- Remove the budgeted and unbudgeted distinction [20 mins]
- Add an optional description section for each source
- Add edit option for entries [1.5+ hours, still unfinished]
- Fix luxury calculation [scans text for keyword and includes relevant items to luxury spend calculation]
- Fix runway calculation [2 mins]


What is the objective of luxury?  {replace it with indulgence}
- Become aware of how much I spent on things that were not necessary for lifestyle maintenance.
- Do I want to be an expense category or do I want it to be a separate datapoint
    - if i make it an expense category, I will not be able to add it to other expense categories (ex- a category of books, or a category of food, or such). Especially in the context of eating out or other such purchases, it will be useful to know which actual category am I indulging in.  
    - adding a dropdown for this will involve UI changes, see if I can check traxn note for "#indulgence" or "#luxury" and identify these kind of transactions. 


# 15 Nov 
[14.40 -21.30 ]

- Edit option finalised []

15.30: Replaced manual inputs with a function that takes the input name, finds the object with that data, and uses that data to render the input.

16.00: Moved the userSideData function to a separate component and most things are working except date isn't changing (since it was passed in the function rather than as props)

20.00 edit option works properly with acceptable UI - need to set this up for revenue as well + make date button functional again

21.30 date button is functional again + revenue edits work as well



# 17 Nov 
[08.35 - 11.30 ]



//to build 

- User can change defaults 
- Nutrition section layout 
- Merge Entry Form & Entry Table sections
- AI connect setup

- created financeOptions in state, created function to update state with value in cloud. 
- push value to cloud whenever edited or changed.


# 1 Dec

- what do I know about this bug?
    - when financeState changes, App ends up creating a new FinanceApp element [making dependency array of useEffect ineffective]
    - when the financeApp is rendered directly in App's return, this issue does not happen.
    - when the useEffect is called inside the App itself, this issue does not happen.

- there seems a disadvantage of creating one big state and having all others as keys inside it: changing any of the items leads to re-renders everywhere - even where it's not required. 