import {deliveryOptions} from "./deliveryOptions.js";
import { products } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart = [];
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
    } else {
        cart.push({
            productId: productId,
            quantity: Number(quantityAddOn),
            deliveryOptionId : '1'
        });
    }
    saveToStorage();
}
export function updateDeliveryOption(productId, optionId){
    cart.forEach( item => {
        if(item.productId === productId){
            item.deliveryOptionId = optionId;
        }
    })
    saveToStorage;
}

export function removeFromCart(productId){
    cart = cart.filter((cartItem) => cartItem.productId !== productId);
    saveToStorage();
}

export function getTotalItems(){
    let total = 0;
    cart.forEach(item => {
        total += item.quantity;
    })
    return total;
}
export function getTotalPrice(){
    let total = 0;
    cart.forEach( item => {
        products.forEach( product => {
            if(item.productId === product.id){
                total += (product.priceCents * item.quantity);
            }
        })
    })
    return total;
}

export function updateQuantity(productId, newQuantity){
    cart.forEach( item => {
        if(item.productId === productId && newQuantity >= 0){
            item.quantity = newQuantity;
        }
        if(newQuantity === 0){
            removeFromCart(productId);
        }
    })
}