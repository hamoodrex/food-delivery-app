import React, { Component } from 'react';

export default class TopHeader extends Component {
    static displayName = TopHeader.name;
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="top-header">
                { this.props.text_content }
            </div>
        );
    }

}