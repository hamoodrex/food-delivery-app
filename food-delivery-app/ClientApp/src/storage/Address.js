
export function get_current_address(){
    let addresses = JSON.parse(localStorage.getItem("addresses"))
    return addresses.find(e=>{return e.name.toLowerCase() == localStorage.getItem("address").toLowerCase()});
}
