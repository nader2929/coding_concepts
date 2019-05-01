import React, { Component } from 'react';
import character from './images/character.svg';
import { relative } from 'path';
import ChessBoard from './ChessBoard';

class Character extends Component {

    constructor(props) {
        super(props);
        this.state = {
            position: {
                x: 1,
                y: 1
            },
            positionOffset: {
                top: -408,
                left: -153
            },
            collected: { collected_dots: [] }
        };

    }

    moveForward() {
        this.state.position.y++;
        this.state.positionOffset.top += 51;
        this.setState(this.state);
    }

    moveBack() {
        this.state.position.y--;
        this.state.positionOffset.top -= 51;
        this.setState(this.state);
    }

    moveLeft() {
        this.state.position.x--;
        this.state.positionOffset.left -= 51;
        this.setState(this.state);
    }

    moveRight() {
        this.state.position.x++;
        this.state.positionOffset.left += 51;
        this.setState(this.state);
    }
    checkCollection() {

        var check = document.getElementsByClassName("dot_on_board");
        var temp = [];
        var temp_colors = [];
        for (var i = 0; i < check.length; i++) {
            temp.push(check[i].id);
            temp_colors.push(check[i].style.color);
        }
        var location = this.state.position.y + "_" + (this.state.position.x - 1);
        if (temp.includes(location)) {
            var v1 = temp_colors[temp.indexOf(location)];
            var v2= document.getElementById("color_to_collect").innerHTML;
            if ( v1==v2 ) {
                this.state.collected.collected_dots.push(location);
                alert(this.state.collected.collected_dots[this.state.collected.collected_dots.length - 1]);
            }
        }
    }


    render() {
        var style = {
            margin: "0",
            position: "relative",
            left: this.state.positionOffset.left.toString().concat("px"),
            top: this.state.positionOffset.top.toString().concat("px")
        };

        return (
            <img src={character} alt="character" width="50px" id="character" style={style} />
        );
    }
}

export default Character;