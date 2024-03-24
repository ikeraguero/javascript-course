/*import './shoppingCart.js';
import { addToCart } from './shoppingCart.js'; */
import add, {cart} from './shoppingCart.js'
console.log("Importing")
add("apples", 21)
console.log(cart)

// Top level use of the await word is only allowed on modules
// Top level await will block the execution in the entire module and also where the module is being exported to.


const getLastPost = async function() {

    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await res.json()
    console.log(data);
    return {title: data.at(-1).title, text: data.at(-1).body}
}
const lastPost = getLastPost();
console.log(lastPost);

const lastPost2 = await getLastPost();
console.log(lastPost2);


// MODULE PATTERN

const ShoppingCart2 = (function() {
    const cart = [];
    const shoppingCart = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function(product, quantity) {
        cart.push({product, quantity});
        console.log(`${quantity} ${product} added to cart`);
    }

    const orderStock = function(product, quantity) {
        cart.push({product, quantity});
        console.log(`${quantity} ${product} ordered from supplier`);
    }
    
return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity
}


})()
ShoppingCart2.addToCart("pineapple", 3)
console.log(ShoppingCart2.cart);

import { cloneDeep } from 'lodash-es';