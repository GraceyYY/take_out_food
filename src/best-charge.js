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
    let id = item.split(' ')[0];
    let num = parseInt(item.split(' ')[2]);
    return fullprice + getItemInfo(id).price * num;
  }, 0);
}

