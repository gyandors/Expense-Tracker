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

//Displaying the details stored in local storage on window load
window.addEventListener('DOMContentLoaded', function () {
  Object.keys(this.localStorage).forEach((val) => {
    displayExpences(JSON.parse(this.localStorage.getItem(val)));
  });
});

function displayExpences(obj) {
  const list = document.createElement('li');
  list.className = ' list-group-item list-group-item-dark';
  list.innerHTML = `Rs. ${obj.amount} - ${obj.category}<p style="font-style:italic">${obj.desc}</p>`;

  const delBtn = document.createElement('button');
  delBtn.innerHTML = 'Delete';
  delBtn.className = 'btn btn-danger btn-sm';
  delBtn.setAttribute(
    'style',
    'padding-y: .25rem; padding-x: .5rem; font-size: .6rem;'
  );
  delBtn.addEventListener('click', function () {
    records.removeChild(delBtn.parentElement);
    localStorage.removeItem(obj.keyForobj);
  });
  list.appendChild(delBtn);

  const editBtn = document.createElement('button');
  editBtn.innerHTML = 'Edit';
  editBtn.className = 'btn btn-danger btn-sm';
  editBtn.setAttribute(
    'style',
    'padding-y: .25rem; padding-x: .5rem; font-size: .6rem; margin-left:10px'
  );
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
