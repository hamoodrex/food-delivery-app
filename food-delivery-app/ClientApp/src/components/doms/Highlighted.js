import React, { Component } from 'react';

export default class Highlighted extends Component {
    static displayName = Highlighted.name;
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="selected">
                <div style={{ background: '#BB3939'}} className="selected-btn center">Remove</div>
                <div style={{ background: '#5BBB39' }} className="selected-btn center">Edit</div>
            </div>
        );
    }

}