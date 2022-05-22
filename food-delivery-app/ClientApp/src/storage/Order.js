export function add_order(order){
    let orders = get_orders();
    orders.push(order);
    localStorage.setItem("order_history", JSON.stringify(orders));
}

export function get_orders(){
    return JSON.parse(localStorage.getItem("order_history"));
}

export function get_order_by_id(id){
    let orders = get_orders();
    return orders.find(e => {return e.id = id});
}