window.onload = function() {
  let items = document.getElementById('items');
  let promotions = document.getElementById('promotions');
  let message = document.getElementById('message');

  function loadMenu() {
    let order = loadAllItems();
    order.map((item) => {
      items.innerHTML += `
        <div class='menu'>
            <p>${item.name}</p>
            <p>${item.price}元</p>
            <input class='num' id=${item.id} type='number' value=0 min=0 />
        </div>`
    });
  }

  function loadPromotion() {
    let promotionInfo = loadPromotions();
    promotionInfo.map((item) => {
      let result = '';
      let promotionItems = [];
      if (item.items) {
        item.items.map((element) => {
          promotionItems.push(getItemInfo(element).name);
        });
        result = `(${promotionItems.join('、')})`;
      }
      promotions.innerHTML += `
            <p>${item.type}${result}</p>`;
    });
  }
  loadMenu();
  loadPromotion();
}

function calculatePrice() {
  let items = loadAllItems();
  let order = [];
  items.map((item) => {
    let id = item.id;
    let num = document.getElementById(id).value;
    if (num > 0) {
      order.push(`${id} x ${num}`);
    }
  });
  let output = bestCharge(order);
  message.innerText = output;
}

function clearOrder() {
  document.querySelectorAll('.num').forEach((element) => {
    element.value = 0;
  });
  message.innerText = '';
}