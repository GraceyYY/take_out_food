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
            <input type='number' value=0/>
        </div>`
    });
  }
  loadMenu();
}

function calculatePrice() {}

function clear() {
  // 清除用户的选择，以及页面显示的信息
  // 清除之后，用户可以继续正常使用各项功能
}