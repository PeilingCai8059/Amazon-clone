
let productHtml = ``;

products.forEach((product)=>{
    productHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name">
            ${product.name}
          </div>

          <div class="product-rating">
            <img
              src="images/ratings/rating-${product.rating.stars * 10}.png"
              alt="${product.rating.stars}"
              class="product-rating-stars"
            />
            <div class="product-rating-count">${product.rating.count}</div>
          </div>

          <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="add-to-cart">
            <img src="images/icons/checkmark.png" >
            added
          </div>

          <button class="add-to-cart-button button-primary js-add-cart" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
    `
});

document.querySelector('.js-product-grid').innerHTML = productHtml;
document.querySelectorAll('.js-add-cart').forEach((button) => {
    button.addEventListener('click',() => {
        const productId = button.dataset.productId;
        let matchingItem ;
        cart.forEach( item =>{
            if(item.productId === productId){
                matchingItem = item;
            }
        })
        if(matchingItem){
            matchingItem.quantity += 1;
        }else{
            cart.push({
                productId : productId,
                quantity : 1
            });
        }
    })
})