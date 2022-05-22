import config from './config.json';

const request = async (method,path,body) => {
    const rawResponse = await fetch(`${config.api}/${path}`, {
      method: method.toUpperCase(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    return await rawResponse.json();
};

const get_menu = async (restaurant_id) => {
    return await request("get",`menu?restaurant_id=${restaurant_id}`);
}

const get_restaurants = async(address) => {
    return await request("post", "restaurants", address);
}

const get_item = async(item_id) => {
    return await request("get",`item?item_id=${item_id}`);
}

const create_order = async (order) => {
    return await request("post", "create_order", order);
}

const get_status = async (order_id) => {
    return await request("get", `order_status?order_id=${order_id}`);
}
export {request,get_menu,get_restaurants,get_item,create_order,get_status}