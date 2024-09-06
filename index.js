const form = document.getElementById("add-expense");
let editing = false,
  editingId = null;

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("desc").value;

  const obj = { amount, category, description };

  if (!editing) {
    fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        displayExpences(data);
        document.getElementById("amount").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("category").value = "";
      })
      .catch((err) => console.log(err));
  } else {
    fetch(`http://localhost:3000/api/expenses/${editingId}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        displayExpences({ ...obj, _id: editingId });
        document.getElementById("amount").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("category").value = "";
        editing = false;
        editingId = null;
      })
      .catch((err) => console.log(err));
  }
});

window.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:3000/api/expenses")
    .then((res) => res.json())
    .then((data) => {
      for (const val of data) displayExpences(val);
    })
    .catch((err) => console.log(err));
});

function displayExpences(obj) {
  const list = document.createElement("li");
  list.className = " list-group-item list-group-item-dark";
  list.innerHTML = `Rs. ${obj.amount} - ${obj.category}<p style="font-style:italic">${obj.description}</p>`;

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "Delete";
  delBtn.className = "btn btn-danger btn-sm";
  delBtn.setAttribute(
    "style",
    "padding-y: .25rem; padding-x: .5rem; font-size: .6rem;"
  );
  delBtn.addEventListener("click", function () {
    fetch(`http://localhost:3000/api/expenses/${obj._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        records.removeChild(delBtn.parentElement);
      })
      .catch((err) => console.log(err));
  });
  list.appendChild(delBtn);

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "Edit";
  editBtn.className = "btn btn-danger btn-sm";
  editBtn.setAttribute(
    "style",
    "padding-y: .25rem; padding-x: .5rem; font-size: .6rem; margin-left:10px"
  );
  editBtn.addEventListener("click", function () {
    editing = true;
    editingId = obj._id;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("desc").value = obj.description;
    document.getElementById("category").value = obj.category;
    records.removeChild(editBtn.parentElement);
  });
  list.appendChild(editBtn);

  const records = document.getElementById("records");
  records.appendChild(list);
}
