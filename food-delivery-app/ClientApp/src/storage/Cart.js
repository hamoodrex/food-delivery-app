import { get_menu } from "../api/fetch";

export function add_to_cart(item){
    let cart = localStorage.getItem("cart");
    if (!cart){
        cart = [];
    } 
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
}

export async function get_cart(restaurant_id){
    let menu = JSON.parse(await get_menu(restaurant_id));
    var cart = localStorage.getItem("cart");
    if (!cart) return [];
    cart = JSON.parse(cart);
    let valid_cart = [];
    menu.menu.sub_menus.forEach(sub_menu => {
        sub_menu.items.forEach(item => {
            const found = cart.find(e => {return e.id == item.id});
            if (found)
                valid_cart.push(found);
        })
    });
    return valid_cart;
}