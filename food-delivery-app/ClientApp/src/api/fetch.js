import config from './config.json';

const request = async (method,path) => {
    const rawResponse = await fetch(`${config.api}/${path}`, {
      method: method.toUpperCase(),
      headers: {
        Accept: "application/json"
      },
    });
    return await rawResponse.json();
};

const get_menu = async (restaurant_id) => {
    return await request("get",`menu?restaurant_id=${restaurant_id}`);
}

const get_restaurants = async() =>{
    return await request("get", "restaurants")
}

const get_item = async(item_id) => {
    return await request("get",`item?item_id=${item_id}`)
}

export {request,get_menu,get_restaurants,get_item}