// Tip Controller
var tipController = (function() {

 return {

  getTipData: function(bill, percent, people) { // calculate tip data

   return {
    totalTip: bill * percent/100,
    tipPerPerson: bill * percent/100 / people,
    totalPerPerson: bill/people + bill * percent/100 / people,
    totalBillAmount: parseFloat(bill) + parseFloat(bill * percent/100)
   }
  },

  roundTipData: function(totaltip, tipperperson, totalperperson, totalbillamount) { // round tip data before displaying on UI

   arr = [totaltip, tipperperson, totalperperson, totalbillamount];
   for (i = 0; i < arr.length; i++) {
    if ( Number.isInteger(Number(arr[i]))) { // if value is an integer, remove all decimal places 
     arr[i] = arr[i].toFixed(0);
    }
    else {
     arr[i] = arr[i].toFixed(2); // if value is not an integer, round 2 decimal places
    }
   }

   return {
    totalTip: arr[0],
    tipPerPerson: arr[1],
    totalPerPerson: arr[2],
    totalBillAmount: arr[3]
   }
  }
 }
})();

// UI Controller
var UIController = (function() {

 var DOMstrings = {
  inputBill: '.bill',
  inputPercent: '.percent',
  inputPeople: '.people',
  inputSubmit: '.submit-btn',
  addTotalTip: '.add-totaltip',
  addTipPerPerson: '.add-tipperperson',
  addTotalPerPerson: '.add-totalperperson',
  addTotalBillAmount: '.add-totalbillamount'
 };

 return {

  roundInput: function() {
   if ( !(Number.isInteger(Number(document.querySelector(DOMstrings.inputBill).value)))) { // if inputBill isn't an integer, round 2 decimal places
    document.querySelector(DOMstrings.inputBill).value = Number(document.querySelector(DOMstrings.inputBill).value).toFixed(2);
   }
   else if ( !(Number.isInteger(Number(document.querySelector(DOMstrings.inputPercent).value)))) { // round 2 decimal places
    document.querySelector(DOMstrings.inputPercent).value = Number(document.querySelector(DOMstrings.inputPercent).value).toFixed(2);
   }
  },

  getInput: function() { // get input values
   return {
    bill: document.querySelector(DOMstrings.inputBill).value,
    percent: document.querySelector(DOMstrings.inputPercent).value,
    people: document.querySelector(DOMstrings.inputPeople).value
   };
  },

  displayTipData: function(totaltip, tipperperson, totalperperson, totalbillamount) { // add tip data to UI
   document.querySelector(DOMstrings.addTotalTip).innerText = '$' + totaltip;
   document.querySelector(DOMstrings.addTipPerPerson).innerText = '$' + tipperperson;
   document.querySelector(DOMstrings.addTotalPerPerson).innerText = '$' + totalperperson;
   document.querySelector(DOMstrings.addTotalBillAmount).innerText = '$' + totalbillamount;   
  },

  clearAllFields: function() { 
   document.querySelector(DOMstrings.inputBill).value = "";
   document.querySelector(DOMstrings.inputPercent).value = "";
   document.querySelector(DOMstrings.inputPeople).value = "";
   document.querySelector(DOMstrings.addTotalTip).innerText = "";
   document.querySelector(DOMstrings.addTipPerPerson).innerText = "";
   document.querySelector(DOMstrings.addTotalPerPerson).innerText = "";
   document.querySelector(DOMstrings.addTotalBillAmount).innerText = "";   
  },

  getDOMstrings: function() { // exposing the DOMstrings object to the controller module
   return DOMstrings;
  }
 };

})();

// Global App Controller
var controller = (function(tipCtrl, UICtrl) {

 var setupEventListeners = function() { //this is the initialization function which stores the EventListeners
 
  document.querySelector(".submit-btn").addEventListener("click", ctrlTipItem); // invoke ctrlTipItem() when user clicks "Calculate Tip"   
  document.addEventListener("keypress", function(event) {  // invoke ctrlTipItem() when user presses Enter
   if (event.keyCode === 13 || event.which === 13) {
    ctrlTipItem();
   }
  });
 }

 var ctrlTipItem = function() {

  var DOM = UICtrl.getDOMstrings(); // get DOMstrings from the UI Controller

  // if bill value is empty || below zero || above 20,000 return false
  if (document.querySelector(DOM.inputBill).value === "" || document.querySelector(DOM.inputBill).value < 0 || document.querySelector(DOM.inputBill).value > 20000) {
   UICtrl.clearAllFields();
   return false;
  }

  // if percent value is empty || below zero || above 100 return false
  else if (document.querySelector(DOM.inputPercent).value === "" || document.querySelector(DOM.inputPercent).value < 0 || document.querySelector(DOM.inputPercent).value > 100) {
   UICtrl.clearAllFields();
   return false;
  }

  // if people value is empty || less than 1 || above 200 || not an integer
  else if (document.querySelector(DOM.inputPeople).value === "" || document.querySelector(DOM.inputPeople).value < 1 || document.querySelector(DOM.inputPeople).value > 100 || !(Number.isInteger(Number(document.querySelector(".people").value)))) {
   UICtrl.clearAllFields();
   return false;
  }
 
  UICtrl.roundInput();
  var input = UICtrl.getInput();   // get field input data
  var tipData = tipCtrl.getTipData(input.bill, input.percent, input.people); // calculate the tip
  var tipData = tipCtrl.roundTipData(tipData.totalTip, tipData.tipPerPerson, tipData.totalPerPerson, tipData.totalBillAmount); // round tipData 
  UICtrl.displayTipData(tipData.totalTip, tipData.tipPerPerson, tipData.totalPerPerson, tipData.totalBillAmount); // display calculations on the UI
 }

 return {
  init: function() {
   setupEventListeners();
  }
 }

})(tipController, UIController);

controller.init(); // initialize EventListeners