const form = document.getElementById('add-expense');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const amount = document.getElementById('amount').value;
  const desc = document.getElementById('desc').value;
  const category = document.getElementById('category').value;

  const list = document.createElement('li');
  list.innerHTML = `Rs.${amount} - ${category}<p style="font-style:italic">${desc}</p>`;

  const records = document.getElementById('records');
  records.appendChild(list);

  const obj = { amount, category, desc };
  localStorage.setItem(desc, JSON.stringify(obj));

  document.getElementById('amount').value = '';
  document.getElementById('desc').value = '';
  document.getElementById('category').value = '';

  deletAndEditButton();
  function deletAndEditButton() {
    const delBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete';
    delBtn.className = 'btn btn-danger btn-sm';
    delBtn.addEventListener('click', function () {
      records.removeChild(delBtn.parentElement);
      localStorage.removeItem(desc);
    });

    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    editBtn.className = 'btn btn-danger btn-sm';
    editBtn.addEventListener('click', function () {
      document.getElementById('amount').value = amount;
      document.getElementById('desc').value = desc;
      document.getElementById('category').value = category;
      records.removeChild(delBtn.parentElement);
      localStorage.removeItem(desc);
    });

    list.appendChild(delBtn);
    list.appendChild(editBtn);
  }
});
