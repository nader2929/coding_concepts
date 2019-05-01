import React, { Component } from 'react';
import left_arrow from './images/left_arrow.svg';

class DirectionControls extends Component{
    


    forwardClick(e){
      //instance of Character.js injected as property during instantiation
      var character = this.props.characterRef.current;
      character.moveForward();
      this.checkcoll(e);
      this.a_p(e);
    }
    backClick(e){
      //instance of Character.js injected as property during instantiation
      var character = this.props.characterRef.current;
      character.moveBack();
      this.checkcoll(e);
      this.a_p(e);
    }
    leftClick(e){
      //instance of Character.js injected as property during instantiation
      var character = this.props.characterRef.current;
      character.moveLeft();
      this.checkcoll(e);
      this.a_p(e);
    }
    rightClick(e){
      //instance of Character.js injected as property during instantiation
      var character = this.props.characterRef.current;
      character.moveRight();
      this.checkcoll(e);
      this.a_p(e);
    }
    checkcoll(e){
      var character = this.props.characterRef.current;
      character.checkCollection();
    }
    
    a_p(e){
      var character = this.props.characterRef.current;
      character.alertpos();
    }

    render(){
        return(
            <div id="directionControls" class="columnLayout">
              <div class="rowLayout">
                <img src={left_arrow} class="arrow backArrow" onClick={(e) => this.backClick(e)}/>
                <div class="columnLayout">
                  <img src={left_arrow} class="arrow" onClick={(e) => this.leftClick(e)}/>
                  <img src={left_arrow} class="arrow forwardArrow" onClick={(e) => this.forwardClick(e)} />
                  <img src={left_arrow} class="arrow rightArrow" onClick={(e) => this.rightClick(e)} />
                </div>
              </div>
            </div>
        )
    }
}

export default DirectionControls;