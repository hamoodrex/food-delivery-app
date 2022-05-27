import {status} from '../../storage/Enums';

export default function OrderBox(props){
    return (
        <div className="address">
            <div className="inner-padding">
                <label style={{color:status[props.status].color}}>{status[props.status].name}</label>
                <p>{props.date}</p>
            </div>
        </div>
    );
}