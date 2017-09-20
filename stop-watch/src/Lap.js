import React, { Component } from 'react';

    class Lap extends Component {
        render(){
            return (
                <li>{this.props.text.seconds}.{this.props.text.milliseconds}</li>
            );
        }
    }

export default Lap;