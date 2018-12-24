window.onload = function() {
  let items = document.getElementById('items');
  let promotions = document.getElementById('promotions');
  let message = document.getElementById('message');

  function loadMenu() {
    loadAllItems().forEach(item => {
      items.innerHTML += `
        <div class='menu'>
            <p>${item.name}</p>
            <p>${item.price}元</p>
            <input class='num' id=${item.id} type='number' value=0 min=0 />
        </div>`
    });
  }

  function loadPromotion() {
    PROMOTIONS.forEach(promotion => {
      let promotionItems = [];
      let result = '';
      if (promotion.items) {
        promotion.items.forEach(item => {
          promotionItems.push(getItemInfo(item).name);
        });
        result = `(${promotionItems.join('、')})`;
      }
      promotions.innerHTML += `
            <p>${promotion.type}${result}</p>`;
    });
  }
  loadMenu();
  loadPromotion();
}

function calculatePrice() {
  let order = [];
  loadAllItems().forEach(item => {
    let id = item.id;
    let num = document.getElementById(id).value;
    if (num > 0) {
      order.push(`${id} x ${num}`);
    }
  });
  message.innerText = bestCharge(order);
}

function clearOrder() {
  document.querySelectorAll('.num').forEach(element => {
    element.value = 0;
  });
  message.innerText = '';
}