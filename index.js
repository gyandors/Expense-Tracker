const form = document.getElementById('add-expense');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  //Grabing the values from input fields
  const amount = document.getElementById('amount').value;
  const desc = document.getElementById('desc').value;
  const category = document.getElementById('category').value;

  //Creating object from input field values
  const date = new Date();
  const keyForobj = Number(
    `${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
  );
  const obj = { keyForobj, amount, category, desc };
  localStorage.setItem(keyForobj, JSON.stringify(obj));

  displayExpences(obj);

  //Clearing the input fields
  document.getElementById('amount').value = '';
  document.getElementById('desc').value = '';
  document.getElementById('category').value = '';
});

//Displaying the details stored in local storage
window.addEventListener('DOMContentLoaded', function () {
  Object.keys(this.localStorage).forEach((keyForobj) => {
    displayExpences(JSON.parse(this.localStorage.getItem(keyForobj)));
  });
});

function displayExpences(obj) {
  const list = document.createElement('li');
  list.className = 'list-inline';
  list.innerHTML = `Rs.${obj.amount} - ${obj.category}<p style="font-style:italic">${obj.desc}</p>`;

  const delBtn = document.createElement('button');
  delBtn.innerHTML = 'Delete';
  delBtn.className = 'btn btn-danger btn-sm';
  delBtn.addEventListener('click', function () {
    records.removeChild(delBtn.parentElement);
    localStorage.removeItem(obj.keyForobj);
  });
  list.appendChild(delBtn);

  const editBtn = document.createElement('button');
  editBtn.innerHTML = 'Edit';
  editBtn.className = 'btn btn-danger btn-sm';
  editBtn.addEventListener('click', function () {
    document.getElementById('amount').value = obj.amount;
    document.getElementById('desc').value = obj.desc;
    document.getElementById('category').value = obj.category;
    records.removeChild(delBtn.parentElement);
    localStorage.removeItem(obj.keyForobj);
  });
  list.appendChild(editBtn);

  const records = document.getElementById('records');
  records.appendChild(list);
}
