export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart = []
}


function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}

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
    saveToStorage();
}
export function removeFromCart(productId){
    cart = cart.filter((cartItem) => cartItem.productId !== productId);
    saveToStorage();
}

export function getTotalItems(){
    return cart.length;
}

