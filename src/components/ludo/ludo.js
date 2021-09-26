import React, {useState, useEffect} from 'react';
import './ludo.css';
import './props.css';

import {
  LudoPiece
} from './pieces.js';

export default class InfLoops extends React.PureComponent{
  constructor(props) {
    super(props);

    this.state = {
      nums: true,
      celln: -2,
      prev: 0,
      diceNum: 0,
      offsets: [50,11,24,37]
    }
  }

  incrementCell(x=0){
    if(this.state.celln<0 || x){
      if(this.state.diceNum==6){
        this.setState({celln: 0});
      }

      if(x==1){
        this.setState({celln: -1});
      }
    }else{
      var moveInt = setInterval(()=>{
        this.setState({celln: (this.state.celln+1)%52});
        if(this.state.celln -this.state.prev + 52*(this.state.prev>this.state.celln)>=this.state.diceNum){
          clearInterval(moveInt);
        }
      },170);
    }
  }

  throwDice(){
    this.setState({
      diceNum: Math.floor(Math.random()*6)+1,
      prev: this.state.celln
    },()=>{
      var dice = document.getElementById('dice');
      dice.classList.add('animDice');

      setTimeout(()=>{
        dice.classList.remove('animDice');
      },200);
      this.incrementCell();
    })
  }

  giveNum(x, ln){

    if(ln==0){
      if(x%3==0) return 23 - Math.floor(x/3);
      else if(x==1) return 24;
      else if(x%3==2) return 25 + Math.floor((x-2)/3);
      else return Math.floor((x-1)/3)+51;
    }

    if(ln==1){
      if(x>11) return 22-x;
      else if(x==6) return 11;
      else if(x<6) return 12+x;
      else return x+45;
    }

    if(ln==2){
      if(x<6) return 31+x;
      else if(x==11) return 37;
      else if(x>11) return 55-x;
      else return 62-x; //
    }

    if(ln==3){
      if(x%3==0) return (Math.floor((12-x)/3)+52)%52;
      else if(x==16) return 50;
      else if(x%3==2) return Math.floor((x-2)/3) + 44;
      else return Math.floor((13-x)/3)+52;
    }
  }

  specialCell(x, ln){
    var nm = this.giveNum(x, ln);

    var cs = "";

    if(nm>51 || nm%13==0){
      if(ln==0) cs+="greencell ";
      if(ln==1) cs+="redcell ";
      if(ln==2) cs+="yellowcell ";
      if(ln==3) cs+="bluecell ";
    }

    if(nm%13==0 && nm<52){
      cs+="star";
    }

    if((nm+2)%13==0 && nm<52){
      if(ln==0) cs+="arrowcell greenarrow";
      if(ln==1) cs+="arrowcell redarrow";
      if(ln==2) cs+="arrowcell yellowarrow";
      if(ln==3) cs+="arrowcell bluearrow";
    }

    if((nm+5)%13==0 && nm<52){
      if(ln==0) cs+="starcell";
      if(ln==1) cs+="starcell";
      if(ln==2) cs+="starcell";
      if(ln==3) cs+="starcell";
    }

    return cs;
  }

  givePos(x){
    if(x>=0){
      var cell = document.getElementById('cell'+x);

      if(cell){
        return [cell.offsetTop, cell.offsetLeft];
      }else{
        return null;
      }
    }else{
      var cell = document.getElementById('blueh'+Math.abs(x));

      if(cell){
        return [cell.offsetTop, cell.offsetLeft];
      }else{
        return null;
      }
    }
  }

  componentWillMount(){
    setTimeout(()=>{
      this.incrementCell(1);
    },50);
  }

  render(){
    var a = [];
    for (var i = 0; i < 18; i++) {
      a.push(i);
    }

    return(
      <div className="boxapp">
        <div className="ludoscreen">
          <div className="ludoContainer">
            <div className="layer1">
              <div className="homeCont homeRed">
                <div className="incell"></div>
                <div className="incell"></div>
                <div className="incell"></div>
                <div className="incell"></div>
              </div>
              <div className="sand1">
                {a.map(x=>{
                  return (
                    <div
                      className={"bcell bcell1 "+this.specialCell(x,0)}
                      id={this.giveNum(x,0)!=null?"cell"+this.giveNum(x,0):null}
                      key={x}>{this.state.nums?this.giveNum(x,0):null}</div>
                    );
                })}
              </div>
              <div className="homeCont homeGreen">
                <div className="incell"></div>
                <div className="incell"></div>
                <div className="incell"></div>
                <div className="incell"></div>
              </div>
            </div>
            <div className="layer2">
              <div className="sand2">
                {a.map(x=>{
                  return (
                    <div
                      className={"bcell bcell2 "+this.specialCell(x,1)}
                      id={this.giveNum(x,1)!=null?"cell"+this.giveNum(x,1):null}
                      key={x}>{this.state.nums?this.giveNum(x,1):null}</div>
                    );
                })}
              </div>
              <div className="destiny"></div>
              <div className="sand3">
                {a.map(x=>{
                  return (
                    <div
                      className={"bcell bcell2 "+this.specialCell(x,2)}
                      id={this.giveNum(x,2)!=null?"cell"+this.giveNum(x,2):null}
                      key={x}>{this.state.nums?this.giveNum(x,2):null}</div>
                    );
                })}
              </div>
            </div>
            <div className="layer3">
              <div className="homeCont homeBlue">
                <div className="incell" id="blueh1"></div>
                <div className="incell" id="blueh2"></div>
                <div className="incell" id="blueh3"></div>
                <div className="incell" id="blueh4"></div>
              </div>
              <div className="sand1">
                {a.map(x=>{
                  return (
                    <div
                      className={"bcell bcell1 "+this.specialCell(x,3)}
                      id={"cell"+this.giveNum(x,3)}
                      key={x}
                      >{this.state.nums?this.giveNum(x,3):null}</div>
                    );
                })}
              </div>
              <div className="homeCont homeYellow">
                <div className="incell"></div>
                <div className="incell"></div>
                <div className="incell"></div>
                <div className="incell"></div>
              </div>
            </div>
            <div className="props">
              <LudoPiece pos={this.givePos(this.state.celln)}/>
            </div>
          </div>
          <div className="btncell">
            <button onClick={this.throwDice.bind(this)}>Move</button>
            <div className="dice" id="dice">
              <div className="face face1"></div>
              <div className="face face2"></div>
              <div className="face face3"></div>
              <div className="face face4"></div>
              <div className="face face5"></div>
              <div className="face face6"></div>
              <div className="diceNum">{this.state.diceNum}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
