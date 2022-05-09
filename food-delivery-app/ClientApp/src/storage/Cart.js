import { get_menu } from "../api/fetch";

export function add_to_cart(item, restaurant_id){
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!(restaurant_id in cart))
        cart[restaurant_id] = [];
    cart[restaurant_id].push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function get_cart(restaurant_id){
    var cart = JSON.parse(localStorage.getItem("cart"));
    return cart[restaurant_id] || [];
}