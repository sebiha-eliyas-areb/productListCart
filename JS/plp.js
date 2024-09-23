   // storing item
let cart=[];

    //ADD ITEM
function addToCart(name,price){
    const item=cart.find(i=>i.name===name);
    if(item){
        item.quantity++;
    }
      else{
        cart.push({name,price,quantity:1});
      }
      updateCart();
        
    }
    //UPDATE CART

function updateCart(){
    const cartContainer=document.getElementById('cart-items');
    cartContainer.innerHTML=``;        
let total=0;
    cart.forEach(item=>{
        const totalitem=item.price*item.quantity;
        total+=totalitem;
        cartContainer.innerHTML+=`<div class="cart-items" > <span>${item.name}</span>
        <div>
            <button onclick="changeQuantity('${item.name}',-1)">-</button>
            <input type="text" value="${item.quantity}"readonly/>
            <button onclick="changeQuantity('${item.name}',-1)">+</button>
        </div>
        <span>$${totalitem.toFixed(2)}</span>
        <button onclick="removeItem('${item.name}',-1)">Remove</button>
        </div> `;
    });
    document.getElementById('total').innerText=`totalOrder:$${total.toFixed(2)}`;
}
function changeQuantity(name,change) {
    const item=cart.find(i=>i.name===name);
    if (item) {
        item.quantity+=change;
        if (item.quantity<=0) {
            removeFromCart(name);
            }
        
     else {
        updateCart();
        
    }
}
}
        //remove item
function removeFromCart(name){
    cart=cart.filter(item=>item.name!==name);
    updateCart();
}

//confirmation
function confirmOrder(){
    const modal=
    document.getElementById('.confirmation');
    modal.style.display='flex';

}
function startNewOrder() {
    cart=[];
    updateCart();
    document.getElementById('.confirmation').style.display='none';
    
}
document.querySelectorAll('.add-to-cart').forEach(button=>{
    button.addEventListener('click',function(){
        const name=this.closest('.item').dataset.name;
        const price=parseFloat(this.closest('.item').dataset.price);
        addToCart(name,price);
    });
});

document.getElementById('confirm-order').addEventListener('click',confirmOrder);
document.getElementById('reset-order').addEventListener('click',startNewOrder);
