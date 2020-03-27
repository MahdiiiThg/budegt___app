const UIControler =(function () {
    console.log('UI');

    const DOMStrings = {
        type: ".select--type",
        description: ".add__description",
        value: ".add__value",
        addBtn: ".add_btn",
        incList: ".income__list",
        expList: ".expenses__list",
        budgetVal: ".budget__value",
        incLable: ".budget__income__title",
        expLable: ".budget__expenses__title",
        PercentageLable: ".budget__expenses--percentage",
        deletBtn: ".item__delete--btn",
        container: ".budget__list",
        itemPercentage: ".item__percentage"
    }

    return {
        getInput: () => {
            return {
                type: document.querySelector(DOMStrings.type).value,
                description: document.querySelector(DOMStrings.description).value,
                value: parseFloat(document.querySelector(DOMStrings.value).value),
                budgetVal: document.querySelector(DOMStrings.budgetVal).value,
                percentage: document.querySelector(DOMStrings.PercentageLable).value
            }
        },
        updateUI: (type, obj) => {
            let element , elHTML
            if(type === "inc") {
                element = DOMStrings.incList
                elHTML = `
                        <div class="item fade-in" id="inc-${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${obj.value} $</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-trash-outline"></i></button>
                                </div>
                            </div>
                        </div>`
            } else if (type === 'exp') {
                element = DOMStrings.expList
                elHTML = `
                <div class="item fade-in" id="exp-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${obj.value} $</div>
                        <div class="item__percentage">10%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-trash-outline"></i>
                            </button>
                        </div>
                    </div>
                </div>`
            }
            document.querySelector(element).insertAdjacentHTML('beforeend' ,elHTML)
        },
        // Delet Item view
        deletListItem: (selectorID) => {
            const el = document.getElementById(selectorID)
            el.parentNode.removeChild(el)
        },
        // clearFileds
        clearFileds: function(){
            let fields , fieldsArray
            fields = document.querySelectorAll(DOMStrings.description + ', ' + DOMStrings.value)

            fieldsArray = Array.prototype.slice.call(fields)
            fieldsArray.forEach( (current) => {
                current.value = ''
            })
            fieldsArray[0].focus()
        },
        displayBudget: (obj) => {
            document.querySelector(DOMStrings.budgetVal).textContent = obj.budget + " $"
            document.querySelector(DOMStrings.incLable).textContent = obj.totalInc 
            document.querySelector(DOMStrings.expLable).textContent = obj.totalExp 

            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.PercentageLable).textContent = obj.percentage + "%"
            } else if (obj.percentage <= 0) {
                document.querySelector(DOMStrings.PercentageLable).textContent = "---"
            }
        },
        
        getDOMStrings: function () {
            return DOMStrings
        }
    }
})()

export default UIControler