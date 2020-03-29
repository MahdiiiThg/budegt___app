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
        itemPercentage: ".item__percentage",
        currentMonth: ".budget__title__month",
        toggleDark: ".toggle_dark",
        topSec: ".top",
        BottomSec: ".bottom",
        singleItems: ".item ",
        budgetList: ".budget__list"
    }
    const formatNumber = (num,type) => {
        var numSplit, int, dec, type;

        num = Math.abs(num)
        num = num.toFixed(2)

        numSplit = num.split('.')
        int = numSplit[0]
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length -3, 3)
        }
        dec = numSplit[1]

        return (type === "exp" ? '-' : '+') + ' ' + int + '.' + dec;
    }
    // nodeListForEach
    var nodeListForEach = function(list, callback){
        for(var i = 0; i < list.length; i++){
            callback(list[i], i)
        }
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
                                <div class="item__value">${formatNumber(obj.value)} $</div>
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
                        <div class="item__value">${formatNumber(obj.value)} $</div>
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
            document.querySelector(DOMStrings.budgetVal).textContent = formatNumber(obj.budget) + " $"
            document.querySelector(DOMStrings.incLable).textContent = obj.totalInc 
            document.querySelector(DOMStrings.expLable).textContent = obj.totalExp 

            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.PercentageLable).textContent = obj.percentage + "%"
            } else if (obj.percentage <= 0) {
                document.querySelector(DOMStrings.PercentageLable).textContent = "---"
            }
        },
        displayPercentages: (percentages) => {
            var fields = document.querySelectorAll(DOMStrings.itemPercentage)

           
            nodeListForEach(fields ,function(current , index){
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + " %"
                } else {
                    current.textContent = '---'
                }
            })
        },
        displayMonth: () => {
            var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

            var d = new Date();
            var curMonth = d.getMonth()
            var curDay = d.getDate()
            document.querySelector(DOMStrings.currentMonth).textContent = curDay + ' ' + month[curMonth] 

        },
        changeType: () => {
            var fields = document.querySelectorAll(
                DOMStrings.type + ", " +
                DOMStrings.description + ", " +
                DOMStrings.value
            )

            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus');
            })
            document.querySelector(DOMStrings.addBtn).classList.toggle('red')
        },
        toggleTheme: () => {
            var toggleSwtich = document.querySelector(DOMStrings.toggleDark)
            toggleSwtich.addEventListener('change', function(){
                //Body
                document.querySelector("body").classList.toggle('body__dark')
                //Top
                document.querySelector(DOMStrings.topSec).classList.toggle('top__dark')
                //Bottom
               //document.querySelector(DOMStrings.BottomSec).classList.toggle('bottom__dark')
               // budgetList
               document.querySelector(DOMStrings.budgetList).classList.toggle('budget__list__dark')
            })
        },
        getDOMStrings: function () {
            return DOMStrings
        }
    }
})()

export default UIControler