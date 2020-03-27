var budgetController =(function () {
    var Expense = function(id, description, value){
        this.id = id
        this.description = description
        this.value = value
        this.percentage = -1
    }
    Expense.prototype.calcPercentage = (totalIncome) => {
        debugger
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100) 
        } else {
            this.percentage = -1
        }
    }

    Expense.prototype.getPercentage = () => {
        return this.percentage
    }
   
    var Income = function(id, description, value){
        this.id = id
        this.description = description
        this.value = value
    }

    const calculateTotal = (type) => {
        var sum
        sum = 0
        data.allItems[type].forEach((cur) => {
            sum += cur.value
        })
        data.total[type] = sum
        console.log(sum);
    }

   

    let data = {
        // storing All the Items
        allItems: {
            inc:[],
            exp:[]
        },
        // storing Total incomes and expenses
        total: {
            inc:[],
            exp:[]
        },
        budget: 0,
        percentage: -1
    }
    return {
        addItem: function(type,desc,val){
            let newItem, ID;
            
            // Creating new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                ID = 0
            }
            // Creating new item base on type
            if(type === "exp"){
                newItem = new Expense(ID,desc,val)
            } else if (type === "inc"){
                newItem = new Income(ID,desc,val)
            }
            // saving new items in to allItems 
            data.allItems[type].push(newItem)

            return newItem
        },
        deletItem: (type , id) => {
            let ids , index
            ids = data.allItems[type].map( current => {
                return current.id
            })
            index = ids.indexOf(id)

            if (index !== -1) {
                data.allItems[type].splice(index ,1)
            } 
        },
        calculateBudget: () => {
            // calc totall inc and exp
            calculateTotal('inc')
            calculateTotal('exp')
            // calc the budget totall inc - total exp
            data.budget = data.total.inc - data.total.exp
            // calc the percentage of exp
            if(data.total.inc > 0) {
                data.percentage = Math.round( (data.total.exp / data.total.inc) * 100)
            } else {
                data.percentage = -1
            }
        },
       calculatePercentages: () => {
           debugger
           data.allItems.exp.forEach(function(cur){
               cur.calcPercentage(data.total.inc)
           })
       },
       getPercentages: () => {
           debugger
           var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage()
           })
           return allPerc
       },
        getBudget: () => {
            return {
                budget: data.budget,
                totalInc: data.total.inc,
                totalExp: data.total.exp,
                percentage: data.percentage
            }

        },
        tests: function(){
            console.log(data);
        }
    }

})()

export default budgetController;