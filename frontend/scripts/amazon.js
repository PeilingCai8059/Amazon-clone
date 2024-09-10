
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
            <select class = "js-quantity-selector-${product.id}">
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

          <div class="add-to-cart js-add-to-cart-${product.id}">
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
        const quantityAddOn = document.querySelector(`.js-quantity-selector-${productId}`).value;
        const addedMeg = document.querySelector(`.js-add-to-cart-${productId}`);
        addedMeg.classList.add('add-to-cart-clicked');
        setTimeout(() => addedMeg.classList.remove('add-to-cart-clicked'), 1500);
        
        cart.forEach( item =>{
            if(item.productId === productId){
                matchingItem = item;
            }
        })
        if(matchingItem){
            matchingItem.quantity += Number(quantityAddOn);
            console.log(matchingItem.quantity);
        }else{
            cart.push({
                productId : productId,
                quantity : Number(quantityAddOn)
            });
        }

        let cartQuantity = 0;
        cart.forEach(item => {
            cartQuantity += item.quantity;
        })

        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    })
})