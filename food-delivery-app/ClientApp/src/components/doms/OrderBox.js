export default function OrderBox(props){
    return (
        <div className="address" onClick={()=>{props.setOrder(props.orders.find(e=>{return e.id==props.order_id}))}} >
            <div className="inner-padding">
                <label><b>{props.time}</b></label>
                <p>Click to view more details</p>
            </div>
        </div>
    );
}