export const calculateTotalPrice = (arrayOfSelectedProducts) => {
    let totalValue = 0;

    for (let index = 0; index < arrayOfSelectedProducts.length; index++) {
      totalValue += arrayOfSelectedProducts[index].price;
    }

    return totalValue;
}