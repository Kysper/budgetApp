// BUDGET CONTROLLER
var budgetController = (function() {
    var Expense = function(id, dateDue, description, value) {
      this.id = id;
      this.dateDue = dateDue;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    };
  
    Expense.prototype.calcPercentage = function(totalIncome) {
      if (totalIncome > 0) {
        this.percentage = Math.round((this.value / totalIncome) * 100);
      } else {
        this.percentage = -1;
      }
    };
  
    Expense.prototype.getPercentage = function() {
      return this.percentage;
    };
  
    var Income = function(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };
  
    var calculateTotal = function(type) {
      var sum = 0;
      data.allItems[type].forEach(function(cur) {
        sum += cur.value;
      });
      data.totals[type] = sum;
  
      /* Example
      0
      [200,400,100]
      sum = 0 + 200;
      sum = 200 + 400;
      sum = 600 + 100
      sum = 700;
      */
    };
  
    var data = {
      allItems: {
        exp: [],
        inc: []
      },
      totals: {
        exp: 0,
        inc: 0
      },
      budget: 0,
      percentage: -1
    };
  
    return {
      addItem: function(type, des, val) {
        var newItem, ID, dateDue;
  
        //[1 2 3 4 5] next ID = 6
        //[1 2 4 6 8] next ID = 9
        // Id = last ID + 1
  
        // Create new ID
        if (data.allItems[type].length > 0) {
          ID = data.allItems[type][data.allItems[type].length - 1].id;
        } else {
          ID = 0;
        }
        // Create new item based on 'inc' or 'exp' type
  
        if (type === "exp") {
          newItem = new Expense(ID, dateDue, des, val);
        } else if (type === "inc") {
          newItem = new Income(ID, des, val);
        }
        // Push it into our data structure
        data.allItems[type].push(newItem);
  
        // Return the new element
        return newItem;
      },
  
      deleteItem: function(type, id) {
        var ids, index;
  
        // id = 6
        //data.allItems[type][id]
        // ids = [1 2 4 6 8]
        //index = 3
  
        ids = data.allItems[type].map(function(current) {
          return current.id;
        });
        index = ids.indexOf(id);
  
        if (index !== -1) {
          data.allItems[type].splice(index, 1);
        }
      },
  
      calculateBudget: function() {
        //calculate total income and expenses
        calculateTotal("exp");
        calculateTotal("inc");
  
        //calculate budget
        data.budget = data.totals.inc - data.totals.exp;
  
        //calculate percentage of income that we spent
        if (data.totals.inc > 0) {
          data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
          data.percentage = -1;
        }
        //Example: Expense = 100 and income 200, spent 50% = 100/200 = 0.5 * 100
      },
  
      calculatePercentages: function() {
        /*a=20
        b=10
        c=40
        income = 100
        a= 20/100 = 20%
        b=10/100 = 10%
        c=40/100 = 40%*/
  
        data.allItems.exp.forEach(function(cur) {
          cur.calcPercentage(data.totals.inc);
        });
      },
  
      getPercentages: function() {
        var allPercentages = data.allItems.exp.map(function(cur) {
          return cur.getPercentage();
        });
        return allPercentages;
      },
  
      getBudget: function() {
        return {
          budget: data.budget,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp,
          percentage: data.percentage
        };
      },
  
      testing: function() {
        console.log(data);
      }
    };
  })();