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
            collected: { collected_dots: [] },
            movesmade:0
        };

    }

    moveForward() {
        this.state.movesmade++;
        this.state.position.y++;
        this.state.positionOffset.top += 51;
        this.setState(this.state);
    }

    moveBack() {
        this.state.movesmade++;
        this.state.position.y--;
        this.state.positionOffset.top -= 51;
        this.setState(this.state);
    }

    moveLeft() {
        this.state.movesmade++;
        this.state.position.x--;
        this.state.positionOffset.left -= 51;
        this.setState(this.state);
    }

    moveRight() {
        this.state.movesmade++;
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
            var color_for_removal = document.getElementById("color_to_collect").innerHTML;
            if (temp_colors[temp.indexOf(location)] == color_for_removal) {
                this.state.collected.collected_dots.push(location);
                var index_to_remove = temp.indexOf(location);
                temp_colors.splice(index_to_remove, 1);
                document.getElementById(location).remove();
                var counting_remaning_color_to_remove = 0;
                
                    for (var y = 0; y < temp_colors.length; y++) {
                        if (temp_colors[y] == color_for_removal) {
                            counting_remaning_color_to_remove++;
                        }
                    }
                
                if(temp_colors.length==0) {
                    alert("Congrats you have won the game. YAY!!! :) It took you "+ this.state.movesmade+" moves to complete the game");
  
                    document.getElementById("color_to_collect").innerHTML = "COMPLETED :)";
                }

                if (counting_remaning_color_to_remove <= 0) {
                    while(true){
                    var random = Math.floor(Math.random() * 3) + 1;
                    var colour = color_for_removal;
                    if (random == 1 && temp_colors.includes("red")) {
                        colour = "red";
                        break;
                    }
                    else if (random == 2 && temp_colors.includes("green")) {
                        colour = "green";
                        break;
                    }
                    else if (temp_colors.includes("blue")) {
                        colour = "blue";
                        break;
                    }
                    
                }
                document.getElementById("color_to_collect").innerHTML = colour;
                }
                //alert(this.state.collected.collected_dots[this.state.collected.collected_dots.length - 1]);
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