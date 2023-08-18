let amountInput = document.querySelector("#amount");
let descriptionInput = document.querySelector("#description");
let catagoryInput = document.querySelector("#catagory");
let saveBtn = document.querySelector("#save-btn");
let updateBtn = document.querySelector("#update-btn");
let cancelBtn = document.querySelector("#cancel-btn");
let tableBody = document.querySelector("#table-body");
let id = null;

updateBtn.style.display = "none"; // Making the update button invisable
cancelBtn.style.display = "none"; // Making the cancel button invisable

// Function to save expenses in Local Storage
function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to get expenses from local storage
function loadExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

// Function to remove expenses from local storage
function removeExpenses(id) {
  const expenses = loadExpenses();
  expenses.splice(id, 1);
  saveExpenses(expenses);
  displayExpenses();
}

// Function to edit expenses
function editExpenses(editId) {
  document.getElementById("form-heading").innerHTML = "Update Expense";
  const expenses = loadExpenses();
  const deleteBtn = document.querySelectorAll(".delete-btn");
  const editBtn = document.querySelectorAll(".edit-btn");
  id = editId;
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].disabled = true; // disabling the delete button
    editBtn[i].disabled = true; // disabling the edit button
  }
  amountInput.value = expenses[editId].amount;
  descriptionInput.value = expenses[editId].description;
  saveBtn.style.display = "none"; // Making the add expense button invisable
  updateBtn.style.display = "inline-block"; // Making the update button visable
  cancelBtn.style.display = "inline-block"; // Making the cancel button visable
}

// Function to display expenses in the table
function displayExpenses() {
  const expenses = loadExpenses();
  tableBody.innerHTML = "";
  if (expenses != null) {
    let html = "";
    for (let i in expenses) {
      html =
        html +
        `<tr>
            <td>${expenses[i].amount}</td>
            <td>${expenses[i].description}</td>
            <td>${expenses[i].catagory}</td>
            <td><button id="delete-btn" class="delete-btn btn btn-danger" onclick="removeExpenses(${i})">Delete Expense</button>
            <button id="edit-btn" class="edit-btn btn btn-primary" onclick="editExpenses(${i})">Edit Expense</button></td>
        </tr>`;
    }
    tableBody.innerHTML = html;
  }
}

// Adding function to add expense button when we click
saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const expenses = loadExpenses();
  const amount = Number(amountInput.value);
  const description = descriptionInput.value;
  const catagory = catagoryInput.value;
  if (amount && description && catagory) {
    let expense = {
      amount,
      description,
      catagory,
    };
    expenses.push(expense);
    saveExpenses(expenses);
    displayExpenses();
    amountInput.value = "";
    descriptionInput.value = "";
    catagoryInput.value = "";
  }
});

// Adding function to update button when we click
updateBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(id);
  const expenses = loadExpenses();
  const amount = Number(amountInput.value);
  const description = descriptionInput.value;
  const catagory = catagoryInput.value;
  if (amount > 0 && description !== "" && catagory !== "") {
    let expense = {
      amount,
      description,
      catagory,
    };
    expenses.splice(id, 1, expense);
    saveExpenses(expenses);
    document.getElementById("form-heading").innerHTML = "Add Expense";
    displayExpenses();
    amountInput.value = "";
    descriptionInput.value = "";
    catagoryInput.value = "";
    saveBtn.style.display = "inline-block"; // Making the add expense button visable
    updateBtn.style.display = "none"; // Making the upddate button invisable
    cancelBtn.style.display = "none"; // Making the cancel button invisable
    const deleteBtn = document.querySelectorAll(".delete-btn");
    const editBtn = document.querySelectorAll(".edit-btn");
    for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].disabled = false; // Enabling the delete button
      editBtn[i].disabled = false; // Enabling the edit button
    }
  }
});

// Adding function to cancel button when we click
cancelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("form-heading").innerHTML = "Add Expense";
  saveBtn.style.display = "inline-block"; // Making the add expense button visable
  updateBtn.style.display = "none"; // Making the upddate button invisable
  cancelBtn.style.display = "none"; // Making the cancel button invisable
  amountInput.value = "";
  descriptionInput.value = "";
  catagoryInput.value = "";
  const deleteBtn = document.querySelectorAll(".delete-btn");
  const editBtn = document.querySelectorAll(".edit-btn");
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].disabled = false; // Enabling the delete button
    editBtn[i].disabled = false; // Enabling the edit button
  }
});

displayExpenses();
