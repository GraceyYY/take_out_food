function bestCharge(selectedItems) {
  return;
}

function getItemInfo(itemId) {
    let items = loadAllItems();

    for(let item of items) {
        if(item.id === itemId) {
            return item;
        }
    }
}