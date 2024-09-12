import { cart, removeFromCart,getTotalItems, updateQuantity, getTotalPrice } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency, TAXRATE } from "./utils/money.js";
import deliveryOptions from "../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

document.querySelector('.js-return-to-home-link').innerHTML = `${getTotalItems()} items`;
updatePayment();

let cartHtml = ``;
cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });

    if(matchingProduct){
        cartHtml += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="deliver-date">Delivery date: Tuesday, June 21</div>
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
                ${deliveryOptionsHtml(matchingProduct.id)}
            </div>
        </div>
    </div>
    `
  }
  document.querySelector('.js-cart-items').innerHTML = cartHtml;
});

function deliveryOptionsHtml(productId){
    let deliveryHtml = '';
    deliveryOptions.forEach(option => {
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDays,'days');
        const dateString = deliveryDate.format('dddd, MMM D ');
        const priceString = option.priceCents === 0? 'FREE' : formatCurrency(option.priceCents);
        console.log(option.id === "1");
        deliveryHtml += 
        `  <div class="delivery-option">
                <input type="radio" name="delivery-option-${productId}"  ${option.id === "1" ? 'checked' :''}
                    class="delivery-option-select" value = "${option.priceCents}"/>
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
        updatePayment()
    })
});
function calculateShippingFee(){
    let totalShippingFee = 0;
    const allSelected = document.querySelectorAll('.delivery-option-select').forEach( option => {
        if(option.checked){
            totalShippingFee += Number(option.value);
        }
    })
    return formatCurrency(totalShippingFee);

}

function updatePayment(){
    const sellingPrice = Number(formatCurrency(getTotalPrice()));
    const shippingFee = Number(calculateShippingFee());
    const subTotal = (sellingPrice + shippingFee).toFixed(2) ;
    const tax = (Number(subTotal) * TAXRATE).toFixed(2);
    const total = (Number(subTotal) + Number(tax)).toFixed(2);

    document.querySelector('.js-payment-selling-price').innerHTML = ` $${sellingPrice} `
    document.querySelector('.js-payment-shipping-price').innerHTML = ` $${shippingFee} `
    document.querySelector('.js-payment-subtotal').innerHTML = ` $${subTotal} `
    document.querySelector('.js-payment-tax').innerHTML = ` $${tax} `
    document.querySelector('.js-payment-total').innerHTML = ` $${total} `
}