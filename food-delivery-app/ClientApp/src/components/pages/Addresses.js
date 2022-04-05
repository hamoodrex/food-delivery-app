import React, { Component } from 'react';
import TopHeader from '../doms/TopHeader';
import Address from '../doms/Address';

export default class Addresses extends Component {
    static displayName = Addresses.name;
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
        };
    }
    render() {
        return (
            <>
                <TopHeader text_content="Addresses" />
                <div className="address-list">
                    <Address title="My home" details="What the hell" selected={ true } />
                    <Address title="My home" details="What the hell" />
                    <Address title="My home" details="What the hell" />
                    <Address title="My home" details="What the hell" />
                    <Address title="My home" details="What the hell" />
                    <Address title="My home" details="What the hell" />
                    <Address title="My home" details="What the hell" />
                    <Address title="My home" details="What the hell" />
                    <Address title="My home" details="What the hell" />

                </div>
                <div className="addresses-bottom-div center">
                    <input type="button" className="restaurants-btn" value="Add Address" />
                </div>
            </>
        );
    }

}