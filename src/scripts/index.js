import '../styles/index.scss';
// Model
// Importing UI & Budget Controller
import budgetController from './Controller';
import UIControler from './View'

const controller = (function(budgetCtrl,UICtrl){
    // Getting DOM elements
    let DOM; 
    DOM = UICtrl.getDOMStrings()
    // Setup Event Listeners
    const SetupEventListeners = () => {
        document.querySelector(DOM.addBtn).addEventListener('click',addItems)

        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                addItems()
            }
        })
        document.querySelector(DOM.container).addEventListener('click', ctrlDeletItem)

        UICtrl.toggleTheme()
    }
    const updateBudget = () => {
        // Calc the budget
        budgetCtrl.calculateBudget()

        // Return the budget
        let budget = budgetController.getBudget()

        // Display the budget
        UICtrl.displayBudget(budget)
    } 
    // Update percentages 
    const updatePercentage = () => {
        var percentages
        // calc the %
        budgetCtrl.calculatePercentages()
        // Get the % from controller
        percentages = budgetCtrl.getPercentages()
        // Update the UI
        console.log(percentages);
       // UICtrl.displayPercentages(percentages)
    }
    // ADD Item
    const addItems = () => {
        let input , newItems
        // 1.Get the filed input data
        input = UICtrl.getInput()
        // Check the values !== null
        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // Add Items
            newItems = budgetCtrl.addItem(input.type, input.description, input.value)
            // Update UI
            UICtrl.updateUI(input.type , newItems)
            // Clear Fileds
            UICtrl.clearFileds()
            // Calc the update budget
            updateBudget()
            // Update %
            updatePercentage()
            // Test
            budgetCtrl.tests();
        } else {
            alert("Please type a correct description and value")
        }
    }
    const ctrlDeletItem = (e) => {
        let itemID , splitID, type , ID
        itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID) {
            splitID = itemID.split('-')
            type = splitID[0]
            ID = parseInt(splitID[1])
        }
        // delet the item
        budgetCtrl.deletItem(type , ID)
        // delet List Item from UI
        UICtrl.deletListItem(itemID)
        // Update Budget
        updateBudget()
        // Update %
        updatePercentage()
    }
    return {
        init: () => {
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            })
            // updateBudget()
            SetupEventListeners()
            UICtrl.displayMonth()
            UICtrl.toggleTheme()
        }
    }
})(budgetController,UIControler)

controller.init()

