let halfPriceItems = [];
let discount = 0;
let promotion = '';

function bestCharge(selectedItems) {
  let order = processOrder(selectedItems);
  choosePromotion(order);
  return showDetail(order) + showPromotion() + showTotalPrice(order);
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
  if (price >= 30) {
    return Math.floor(price / 30) * 6;
  }
}

function halfPrice(order) {
  halfPriceItems = [];
  let promotionItems = loadPromotions()[1].items;
  let discount = 0;
  for (let item of promotionItems) {
    for (let element of order) {
      if (item === element.id) {
        discount += (getItemInfo(element.id).price / 2 * element.num);
        halfPriceItems.push(getItemInfo(item).name);
      }
    }
  }
  return discount;
}

function showDetail(order) {
  let output = `
============= 订餐明细 =============`;
  order.map((item) => {
    let name = getItemInfo(item.id).name;
    let num = item.num;
    let price = getItemInfo(item.id).price;
    output += `\n${name} x ${num} = ${num * price}元`;
  })
  return output;
}

function choosePromotion(order) {
  let promotionDiscount = discountOver30(order);
  let promotionHalfPrice = halfPrice(order);
  if (promotionDiscount >= promotionHalfPrice) {
    discount = promotionDiscount;
    promotion = 'discount over 30';
  } else {
    discount = promotionHalfPrice;
    promotion = 'half price';
  }
}

function showPromotion() {
  let output = `
-----------------------------------
使用优惠:`;
  switch (promotion) {
    case 'discount over 30':
      output += `\n${loadPromotions()[0].type}，省${discount}元`;
      break;
    case 'half price':
      output += `\n${loadPromotions()[1].type}(${halfPriceItems.join('，')})，省${discount}元`;
  }
  return output;
}

function showTotalPrice(order) {
  let totalPrice = calculateFullPrice(order) - discount;
  return `
-----------------------------------
总计：${totalPrice}元
===================================`;
}