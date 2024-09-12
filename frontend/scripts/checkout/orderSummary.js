import { cart, removeFromCart,getTotalItems, updateQuantity, getTotalPrice, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency, TAXRATE } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { updatePayment } from "./paymentSummary.js";

export function renderOrderSummary(){
    document.querySelector('.js-return-to-home-link').innerHTML = `${getTotalItems()} items`;
    let cartHtml = ``;
    cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const deliveryOptionId = cartItem.deliveryOptionId ;
        let deliveryOption;
        deliveryOptions.forEach( option => {
            if(deliveryOptionId === option.id){
                deliveryOption = option;
            }
        })
        const dateString = getDateString(deliveryOption.deliveryDays);


        let matchingProduct;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProduct = product;
            }
        });
    
        if(matchingProduct){
            cartHtml += `
            <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="deliver-date js-deliver-date">Delivery date: ${dateString}</div>
            <div class="cart-item">
                <div class="cart-item-detail">
                    <img src="${matchingProduct.image}" />
                    <div class="cart-item-info">
                        <div class="product-name">
                        ${matchingProduct.name}
                        </div>
                        <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
                        <div class="product-quantity">
                            <span>Quantity: </span>
                            <span class = "current-quantity js-cartItem-quantity-${matchingProduct.id}" data-product-id = "${productId}">${cartItem.quantity}</span>
    
                            <span class="update-quantity-link js-update-link" data-product-id = "${productId}"> 
                                Update 
                            </span>
                            <span class="save-quantity-link js-save-link" data-product-id = "${productId}">
                                Save
                            </span>
    
                            <span class="delete-quantity-link js-delete-link" data-product-id = "${productId}">
                                Delete 
                            </span>
                        </div>
                    </div>
                </div>
                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHtml(matchingProduct,cartItem )}
                </div>
            </div>
        </div>
        `
      }
      document.querySelector('.js-cart-items').innerHTML = cartHtml;
    });
    
    
    document.querySelectorAll('.js-delete-link').forEach ( (link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId) ;
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                container.remove();
                document.querySelector('.js-return-to-home-link').innerHTML = `${getTotalItems()} items`;
                updatePayment();
            })
        });
    
    document.querySelectorAll('.js-update-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
    
            const quantityDom = document.querySelector(`.js-cartItem-quantity-${productId}`);
            const quantity = Number(quantityDom.innerHTML);
    
            const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId} `);
            cartItemContainer.classList.add('is-editing');
            
            quantityDom.innerHTML = 
                ` <input type="text" class="cartItem-quantity-input js-quantity-input" 
                    value="${quantity}" data-product-id = "${productId} ">
                `
        })
    })
    
    document.querySelectorAll('.js-save-link').forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            const quantityInputDom = document.querySelector(`.js-cartItem-quantity-${productId} input`);
            const newQuantity = Number(quantityInputDom.value);
            updateQuantity(productId, newQuantity);
            document.querySelector('.js-return-to-home-link').innerHTML = `${getTotalItems()} items`
            const quantityDom = document.querySelector(`.js-cartItem-quantity-${productId}`);
            quantityDom.innerHTML = newQuantity;
    
            const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId} `);
            cartItemContainer.classList.remove('is-editing');
            updatePayment();
        })
    })
    
    document.querySelectorAll('.delivery-option-select').forEach(option => {
        option.addEventListener("click", () =>{
            updatePayment();
            let productId = (option.name).replace('delivery-option-', '');
            let optionId = option.dataset.optionId
            
            updateDeliveryOption(productId, optionId);
            
            let deliveryOption;
            deliveryOptions.forEach( option => {
                if( option.id === optionId){
                    deliveryOption = option;
                    
                }
            })
            const dateString = getDateString(deliveryOption.deliveryDays);
            document.querySelector('.js-deliver-date').innerHTML = `Delivery date: ${dateString}`;
        })
    });
}


function getDateString(deliveryDays){
    const today = dayjs();
    const deliveryDate = today.add(deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMM D ');
    return dateString;
}

function deliveryOptionsHtml(matchingProduct, cartItem){
    let deliveryHtml = '';
    deliveryOptions.forEach(option => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDays,'days');
        const dateString = deliveryDate.format('dddd, MMM D ');
        const priceString = option.priceCents === 0? 'FREE' : formatCurrency(option.priceCents);
       
        deliveryHtml += 
        `  <div class="delivery-option">
                <input type="radio" name="delivery-option-${matchingProduct.id}"  ${option.id === cartItem.deliveryOptionId ? 'checked' :''}
                    class="delivery-option-select" value = "${option.priceCents}" data-option-id = "${option.id}" />
                <div class="delivery-option-detail">
                    <div class="delivery-option-date">${dateString}</div>
                    <div class="delivery-option-price">
                        <span>$${priceString} -</span> Shipping
                    </div>
                </div>
            </div>
        `
    })
    return deliveryHtml;
}