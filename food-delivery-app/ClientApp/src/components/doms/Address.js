import React, { Component } from 'react';
import Highlighted from './Highlighted';

export default class Address extends Component {
    static displayName = Address.name;
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="address">
                <div className="inner-padding">
                    <label><b>{this.props.title}</b></label>
                    <p>{this.props.details}</p>
                </div>
                {this.props.selected && <Highlighted />}
            </div>
        );
    }
}

