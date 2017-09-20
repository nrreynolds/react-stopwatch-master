import React, { Component } from 'react';
import Lap from './Lap'

    class Laps extends Component {
        mapLaps(arr){
            return arr.map((el, index) => {
                return <Lap key={index} text={el}/>
            })
        }
        render(){
            return (
                <ol>
                    {this.mapLaps(this.props.laps)}
                </ol>
            );
        }
    }

export default Laps;