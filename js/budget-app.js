var incomeArr = [];
var expensesArr = [];
var type = "inc"; //type can be inc or exp
var dataIncome, dataExpenses; //data from local storage

var incomeList = document.querySelector('.income-list');
var expensesList = document.querySelector('.expenses-list');
var displayIncome = document.querySelector('.tot-income');
var displayExpenses = document.querySelector('.tot-expenses');
var displayBudget = document.querySelector('.current-budget');
var submitBtn = document.querySelector("input[type='submit']");
var clearBtn = document.querySelector(".clearBtn");
var descInput = document.querySelector('#form__desc');
var valInput = document.querySelector('#form__val');
var incomeTable = document.querySelector('.income-table');
var expensesTable = document.querySelector('.expenses-table');
var tablesSection = document.querySelector('.tables-section');



function calcBudget() {
	return calcTotalIncome() - calcTotalExpenses();
}

function calcTotalIncome() {
	var totalIncome = 0;
	for (var i = 0; i < incomeArr.length; i++) {
		totalIncome += incomeArr[i].val;
	}
	return totalIncome;
}


function calcTotalExpenses() {
	var totalExpenses = 0;
	for (var i = 0; i < expensesArr.length; i++) {
		totalExpenses += expensesArr[i].val;
	}
	return totalExpenses;
}


function init() {
	
	//check if there are any incomes in local storage
	if (localStorage.getItem('income')) {
		dataIncome = JSON.parse(localStorage.getItem('income'));
		console.log("dataIncome :");
		console.dir(dataIncome);
		dataIncome.forEach(function(item) {
			incomeArr.push(item);
		});
	} 

	//check if there are any expenses in local storage
	if (localStorage.getItem('expenses')) {
		dataExpenses = JSON.parse(localStorage.getItem('expenses'));
		console.log('dataExpenses:');
		console.dir(dataExpenses);	
		dataExpenses.forEach(function(item) {
			expensesArr.push(item);
		});
	};

	//calculate and show totalIncome, totalExpenses and totalBudget
	displayIncome.textContent = calcTotalIncome();
	displayExpenses.textContent = calcTotalExpenses();
	displayBudget.textContent = calcBudget();

	//display tables of income and expenses
	showListElements("inc", incomeArr);
	showListElements("exp", expensesArr);
}


function resetForm() {
	descInput.value = "";
	valInput.value = "";
}


function showListElements(type, arr) {
	var code, tr;
	arr.forEach(function(item) {
		tr = document.createElement('tr');
		code = "<td>" + item.desc + "</td><td>" + item.val + "</td><td><button class='delBtn'>delete</button></td>";
		tr.innerHTML += code;
		if (type === "inc") {
			incomeTable.append(tr);
		} else if (type === "exp") {
			expensesTable.append(tr);
		}
	});	
}


function createTableRow(type, desc, val) {
	var tr = document.createElement('tr');
	var code = "<td>" + desc + "</td><td>" + val + "</td><td><button class='delBtn'>delete</button></td>";
	tr.innerHTML = code;
	if (type === "inc") {
		incomeTable.append(tr); 
	} else {
		expensesTable.append(tr);
	}
}

init();


//submit event listener
submitBtn.addEventListener('click', function(e) {
	e.preventDefault();
	//add form validation!!!!!!!!!!!!!!!!!!!!!



	//get description
	var desc = descInput.value;
	//get value
	var val = Number(valInput.value);
	//check type
	type = form.type.value; 

	//act depending of type
	if (type === 'inc') {
		incomeArr.push({desc: desc, val: val});
		//show total income
		displayIncome.textContent = calcTotalIncome();
		//show current budget
		displayBudget.textContent = calcBudget();
		//display new income
		createTableRow(type, desc, val);
		//update local storage with new income
		localStorage.setItem('income', JSON.stringify(incomeArr));
		dataIncome = JSON.parse(localStorage.getItem('income'));
		console.log("dataincome: ");
		console.dir(dataIncome);
	} else {
		expensesArr.push({desc: desc, val: val});
		//show total expenses
		displayExpenses.textContent = calcTotalExpenses();
		//show current budget
		displayBudget.textContent = calcBudget();
		//display new expense
		createTableRow(type, desc, val);
		//update local storage with new expense
		localStorage.setItem('expenses', JSON.stringify(expensesArr));
		dataExpenses = JSON.parse(localStorage.getItem('expenses'));
		console.log("dataExpenses: ");
		console.dir(dataExpenses);
	}
	
	resetForm();
});


//clear all button event listener
clearBtn.addEventListener('click', function(){
	localStorage.clear();
	incomeArr = [];
	expensesArr = [];

	//calculate and show totalIncome, totalExpenses and totalBudget
	displayIncome.textContent = calcTotalIncome();
	displayExpenses.textContent = calcTotalExpenses();
	displayBudget.textContent = calcBudget();

	//delete data rows from income and expenses tables
	var incomeTableRows = incomeTable.querySelectorAll("tr");
	for (var i = 1; i < incomeTableRows.length; i++) {
		incomeTable.removeChild(incomeTableRows[i]);
	}
	var expensesTableRows = expensesTable.querySelectorAll("tr");
	for (var i = 1; i < expensesTableRows.length; i++) {
		expensesTable.removeChild(expensesTableRows[i]);
	}
});


//event delegation for delete buttons
tablesSection.addEventListener('click', function(e) {
	console.log(e);
	if (e.target.className === "delBtn") {
		//delete row from the table
		var td = e.target.parentElement;
		var tr = td.parentElement;
		var table = tr.parentElement;
		table.removeChild(tr); 

		//delete item from local storage
		

		//delete item from array
	}
});