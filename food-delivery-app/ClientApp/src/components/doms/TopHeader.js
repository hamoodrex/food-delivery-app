import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';

export default function TopHeader(props) {
    const history = useHistory();
    const click = () => {
        history.goBack();
    }
    return (
        <div className="top-header">
            {!props.noBack && <img src="images/left-arrow.svg" style={{
                height:"0.7em",
                position:"absolute", left:"1em", top:"40%"}}
                onClick={click} />}
            { props.text_content }
        </div>
    );
}