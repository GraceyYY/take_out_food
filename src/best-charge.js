function bestCharge(selectedItems) {
  return;
}

function getItemInfo(itemId) {
  let items = loadAllItems();
  for (let item of items) {
    if (item.id === itemId) {
      return item;
    }
  }
}

function calculateFullPrice(selectedItems) {
  return selectedItems.reduce((fullprice, item) => {
    return fullprice + getItemInfo(item.id).price * item.num;
  }, 0);
}

function processOrder(selectedItems) {
  let order = [];
  selectedItems.map((item) => {
    order.push({
      id: item.split(' ')[0],
      num: parseInt(item.split(' ')[2])
    });
  });
  return order;
}

function discountOver30(order) {
  let price = calculateFullPrice(order);
  return price - Math.floor(price / 30) * 6;
}

function halfPrice(order) {
  let promotionItems = loadPromotions()[1].items;
  let discount = 0;
  for (let item of promotionItems) {
    for (let element of order) {
      if (item === element.id) {
        discount += (getItemInfo(element.id).price / 2 * element.num);
      }
    }
  }
  return discount;
}