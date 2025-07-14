document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const pickup = document.getElementById('pickup').value;

  // Get all checked items + quantities
  const items = [];
  const itemChecks = document.querySelectorAll('.item-check');
  const quantityInputs = document.querySelectorAll('.quantity-input');

  itemChecks.forEach((checkbox, index) => {
    if (checkbox.checked) {
      const itemName = checkbox.value;
      const qty = quantityInputs[index].value;
      items.push(`${itemName} (x${qty})`);
    }
  });

  if (items.length === 0) {
    alert('Please select at least one food item.');
    return;
  }

  const orderId = 'FMX' + Math.floor(Math.random() * 90000 + 10000);

  const data = {
    name: name,
    phone: phone,
    pickup: pickup,
    items: items.join(', '),
    orderId: orderId
  };

  fetch('https://script.google.com/macros/s/AKfycbyvOyDGHtCulH_kMGYMSlC3mpnaoHh_dNc0_IABhk7P55Xg7S4bwXGMC2Ers6lpvVyq/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(res => res.text())
.then(() => {
  window.location.href = `success.html?orderId=${orderId}`;
})
.catch(err => alert('Error submitting order: ' + err));


  .then(res => res.text())
  .then(() => {
    window.location.href = `success.html?orderId=${orderId}`;
  })
  .catch(err => alert('Error submitting order: ' + err));
});
