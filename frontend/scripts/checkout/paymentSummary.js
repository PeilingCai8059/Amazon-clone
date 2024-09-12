import { cart, removeFromCart,getTotalItems, updateQuantity, getTotalPrice, updateDeliveryOption } from "../../data/cart.js";
import { formatCurrency, TAXRATE } from "../utils/money.js";

export function updatePayment(){
    const sellingCents = getTotalPrice();
    const shippingFeeCents= calculateShippingFee();
    const subTotalCents = (sellingCents + shippingFeeCents) ;
    const tax = subTotalCents * TAXRATE;
    const total =subTotalCents + tax;
    
    let paymentHtml = 
    `
        <div class="payment-summary-titil">Order Summary</div>
        <div class="payment-summary-row">
            <div>Item (${getTotalItems()})</div>
            <div class="payment-summary-row-money ">$${formatCurrency(sellingCents)}</div>
        </div>
        <div class="payment-summary-row">
            <div>Shipping & handling</div>
            <div class="payment-summary-row-money sub-total-row">$${formatCurrency(shippingFeeCents)}</div>
        </div>
        <div class="payment-summary-row">
            <div>Total before tax:</div>
            <div class="payment-summary-row-money ">$${formatCurrency(subTotalCents)}</div>
        </div>
        <div class="payment-summary-row">
            <div>Estimated tax(${TAXRATE * 100}%)</div>
            <div class="payment-summary-row-money">$${formatCurrency(tax)}</div>
        </div>
        <hr class="total-row-divider" />
        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-row-money">$${formatCurrency(total)}</div>
        </div>

        <a href="order.html">
            <button class="place-order-button button-primary"> 
                Place your order
            </button>
        </a>
    `
    document.querySelector('.js-payment-summary').innerHTML = paymentHtml

}
function calculateShippingFee(){
    let totalShippingFee = 0;
    const allSelected = document.querySelectorAll('.delivery-option-select').forEach( option => {
        if(option.checked){
            totalShippingFee += Number(option.value);
        }
    })
    return totalShippingFee;

}