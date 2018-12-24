let halfPriceItems = [];
let discount = 0;
let promotion = '';

function bestCharge(selectedItems) {
  let order = processOrder(selectedItems);
  choosePromotion(order);
  return showDetail(order) + showPromotion(promotion) + showTotalPrice(order,discount);
}

function getItemInfo(itemId) {
  let items = loadAllItems();
  for (let item of items) {
    if (item.id === itemId) {
      return item;
    }
  }
}

function calculateFullPrice(order) {
  return order.reduce((fullprice, item) => {
    return fullprice + item.price * item.num;
  }, 0);
}

function processOrder(selectedItems) {
  let order = [];
  selectedItems.forEach((item) => {
    let itemId = item.split(' ')[0];
    order.push({
      id: itemId,
      num: parseInt(item.split(' ')[2]),
      name: getItemInfo(itemId).name,
      price: getItemInfo(itemId).price
    });
  });
  return order;
}

function discountOver30(order) {
  let price = calculateFullPrice(order);
  if (price >= 30) {
    return Math.floor(price / 30) * 6;
  } else {
    return false;
  }
}

function halfPrice(order) {
  halfPriceItems = [];
  let promotionItems = loadPromotions()[1].items;
  let discount = 0;
  for (let item of promotionItems) {
    for (let element of order) {
      if (item === element.id) {
        discount += (element.price / 2 * element.num);
        halfPriceItems.push(getItemInfo(item).name);
      }
    }
  }
  if (!halfPriceItems) {
    return false;
  }
  return discount;
}

function choosePromotion(order) {
  discount = 0;
  promotion = '';
  let promotionDiscount = discountOver30(order);
  let promotionHalfPrice = halfPrice(order);
  if (promotionHalfPrice && promotionDiscount) {
    if (promotionDiscount >= promotionHalfPrice) {
      discount = promotionDiscount;
      promotion = 'discount over 30';
    } else {
      discount = promotionHalfPrice;
      promotion = 'half price';
    }
  } else if (promotionDiscount) {
    discount = promotionDiscount;
    promotion = 'discount over 30';
  } else if (promotionHalfPrice) {
    discount = promotionHalfPrice;
    promotion = 'half price';
  }
}

function showDetail(order) {
  let output = `
============= 订餐明细 =============`;
  order.forEach((item) => {
    output += `\n${item.name} x ${item.num} = ${item.num * item.price}元`;
  });
  return output;
}

function showPromotion(promotion) {
  let output = `
-----------------------------------
使用优惠:`;
  switch (promotion) {
    case 'discount over 30':
      output += `\n${loadPromotions()[0].type}，省${discount}元`;
      break;
    case 'half price':
      output += `\n${loadPromotions()[1].type}(${halfPriceItems.join('，')})，省${discount}元`;
      break;
    default:
      output = '';
  }
  return output;
}

function showTotalPrice(order,diccount) {
  return `
-----------------------------------
总计：${calculateFullPrice(order) - discount}元
===================================`;
}