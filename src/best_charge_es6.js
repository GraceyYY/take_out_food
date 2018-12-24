let halfPriceItems = [];
const ITEMS = loadAllItems();
const PROMOTIONS = loadPromotions();

function bestCharge(selectedItems) {
  let order = processOrder(selectedItems);
  let bestPromotion = choosePromotion(order);
  return showDetail(order) + showPromotion(bestPromotion.promotion, bestPromotion.discount) + showTotalPrice(order, bestPromotion.discount);
}

function getItemInfo(itemId) {
  for (item of ITEMS) {
    if (item.id === itemId) {
      return item;
    }
  }
}

function calculateFullPrice(order) {
  return order.reduce((fullprice, item) => fullprice + item.price * item.num, 0);
}

function processOrder(selectedItems) {
  return selectedItems.map(item => {
    let itemId = item.split(' ')[0];
    return {
      id: item.split(' ')[0],
      num: parseInt(item.split(' ')[2]),
      name: getItemInfo(itemId).name,
      price: getItemInfo(itemId).price
    }
  });
}

function discountOver30(order) {
  let price = calculateFullPrice(order);
  return price >= 30 ? Math.floor(price / 30) * 6 : false;
}

function halfPrice(order) {
  halfPriceItems = [];
  let discount = 0;
  if (!halfPriceItems) {
    return false;
  } else {
    PROMOTIONS[1].items.forEach(item => {
      halfPriceItems = order.map(element => {
        if (item === element.id) {
          discount += (element.price / 2 * element.num);
          return getItemInfo(item).name;
        }
      });
    });
    return discount;
  }
}

function choosePromotion(order) {
  let tmp = {
    discount: 0,
    promotion: ''
  }
  let promotionDiscount = discountOver30(order);
  let promotionHalfPrice = halfPrice(order);
  if (promotionHalfPrice && promotionDiscount) {
    tmp = promotionDiscount >= promotionHalfPrice？ {
      discount: promotionDiscount,
      promotion: 'discount over 30'
    }: {
      discount: promotionHalfPrice,
      promotion: 'half price'
    };
  } else if (promotionDiscount) {
    tmp.discount = promotionDiscount;
    tmp.promotion = 'discount over 30';
  } else if (promotionHalfPrice) {
    tmp.discount = promotionHalfPrice;
    tmp.promotion = 'half price';
  }
  return tmp
}

function showDetail(order) {
  let output = `
============= 订餐明细 =============`;
  order.forEach(item => {
    output += `\n${item.name} x ${item.num} = ${item.num * item.price}元`;
  });
  return output;
}

function showPromotion(promotion, discount) {
  let output = `
-----------------------------------
使用优惠:`;
  switch (promotion) {
    case 'discount over 30':
      output += `\n${PROMOTIONS[0].type}，省${discount}元`;
      break;
    case 'half price':
      output += `\n${PROMOTIONS[1].type}(${halfPriceItems.join('，')})，省${discount}元`;
      break;
    default:
      output = '';
  }
  return output;
}

function showTotalPrice(order, discount) {
  return `
-----------------------------------
总计：${calculateFullPrice(order) - discount}元
===================================`;
}