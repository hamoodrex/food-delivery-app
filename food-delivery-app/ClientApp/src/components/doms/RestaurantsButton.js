import React, { Component } from 'react';

export default class RestaurantsButton extends Component {
    static displayName = RestaurantsButton.name;
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <input type="button" className="restaurants-btn" value="Restaurants"/>
        );
    }

}