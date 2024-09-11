export const cart = [];

export function addToCart(productId, quantityAddOn) {
    let matchingItem;
    cart.forEach((item) => {
        if (item.productId === productId) {
        matchingItem = item;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += Number(quantityAddOn);
        console.log(matchingItem.quantity);
    } else {
        cart.push({
        productId: productId,
        quantity: Number(quantityAddOn),
        });
    }
    console.log(cart);
}
