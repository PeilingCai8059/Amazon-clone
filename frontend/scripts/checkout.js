import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartHtml = ``;
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartHtml += `
    <div class="cart-item-container">
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
                    <span>1</span>
                    <span class="update-quantity-link "> Update </span>
                    <span class="delete-quantity-link"> Delete </span>
                </div>
            </div>
        </div>
        <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            <div class="delivery-option">
                <input type="radio" name="delivery-option-${productId}" class="delivery-option-select" />
                <div class="delivery-option-detail">
                    <div class="delivery-option-date">Tuesday, June 21</div>
                    <div class="delivery-option-price">
                        <span>FREE</span> Shipping
                    </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" name="delivery-option-${productId}" class="delivery-option-select" />
                <div class="delivery-option-detail">
                    <div class="delivery-option-date">Wednesday, June 15</div>
                    <div class="delivery-option-price">
                        <span>$4.99 -</span> Shipping
                    </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio" name="delivery-option-${productId}" class="delivery-option-select" />
                <div class="delivery-option-detail">
                    <div class="delivery-option-date">Monday, June 13</div>
                    <div class="delivery-option-price">
                        <span>$9.99 -</span> Shipping
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;
  document.querySelector('.js-cart-items').innerHTML = cartHtml;
});
