import config from './config.json';

const request = async (method,path,body) => {
    const rawResponse = await fetch(`${config.api}/${path}`, {
      method: method.toUpperCase(),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authToken: localStorage.getItem("auth") || ""
      },
      body: JSON.stringify(body)
    });
    return await rawResponse.json();
};

const get_active_orders = async(restaurant_id) => {
    return await request("get",`get_active_orders?restaurant_id=${restaurant_id}`);
}

const login = async(credentials) => {
    return await request("post","login", credentials);
}

export {request,get_active_orders,login}