import React, {useState, useEffect} from 'react';
import './infLoops.css';

import {
  OneCell,
  TwoLcell,
  TwoLineCell,
  Threecell,
  FourCell
} from './cells.js';

import levels from './levels.js';

export default class InfLoops extends React.PureComponent{
  constructor(props) {
    super(props);

    this.state = {
      arr: [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]
      ],
      color: "#5c6374",
      level: 0,
      isCompleted: false,
      devch: false
    }
  }

  oneStep(x){
    var y = Math.floor(x/4);
    x%=4;
    x+=1;
    x%=4;
    x+=4*y;
    return x;
  }

  oneTypeAhead(x){
    var y = Math.floor(x/4);
    y+=1;
    y%=6;
    x%=4;
    x+=4*y;
    return x;
  }

  isValid(i,j){
    var ln = this.state.arr.length;
    return i>=0 && j>=0 && i<ln && j<ln;
  }

  cellCon(i,j){
    var validStates = {
      0: [],
      1: [0],
      2: [0,3],
      3: [0,2],
      4: [0,2,3],
      5: [0,1,2,3]
    };

    var x = this.state.arr[i][j];

    var cm = validStates[Math.floor(x/4)];
    for (var k = 0; k < cm.length; k++) {
      cm[k]+=x%4;
      cm[k]%=4;
    }

    return cm;
  }

  hasWon(){
    if(this.state.level==0) return;
    console.log("Checking");

    var chk = this.state.arr.map(function(row) {
      return row.slice();
    });

    var ln = chk.length;

    var d = [[-1,0],[0,1],[1,0],[0,-1]]

    for (var i = 0; i < ln; i++) {
      for (var j = 0; j < ln; j++) {
        var cm = this.cellCon(i,j);

        for (var k = 0; k < cm.length; k++) {
          var x1 = i+d[cm[k]][0],
              y1 = j+d[cm[k]][1];

          if(this.isValid(x1,y1)){
            if(!this.cellCon(x1,y1).includes((cm[k]+2)%4)) {
              return false;
            }
          }else{
            return false
          }
        }
      }
    }

    this.setState({color: "#43de6a", isCompleted: true});
  }

  rotateShuff(lv){
    // console.log("Lv");

    var tmp = levels["level"+lv].map(function(row) {
      return row.slice();
    });

    var ln = tmp.length;

    var tmp2 = tmp.map(function(row) {
      return row.slice();
    });

    for (var i = 0; i < ln; i++) {
      for (var j = 0; j < ln; j++) {
        var tp = Math.floor(tmp[i][j]/4);
        tmp[i][j]%=4;
        tmp[i][j]+=Math.floor(Math.random()*4);
        // tmp[i][j]=0;
        tmp[i][j]%=4;
        tmp[i][j]+=4*tp;
        if(i==0 && this.state.devch) break;
      }
      if(i==0 && this.state.devch) break;
    }

    this.setState({
      arr: tmp,
      level: lv,
      isCompleted: false,
      color: "#5c6374"
    });
  }

  playLevel(lv){
    if(levels["level"+lv]!=null){
      this.rotateShuff(lv);
    }
  }

  rotCell(i,j,bt){
    // console.log(i,j);
    if(this.state.isCompleted) return;

    var tmp = this.state.arr.map(function(row) {
      return row.slice();
    });

    if(bt==0){
      tmp[i][j]=this.oneStep(tmp[i][j]);
      this.setState({arr: tmp}, ()=>{
        this.hasWon();
      });
    }else{
      if(this.state.level!=0) return;
      tmp[i][j]=this.oneTypeAhead(tmp[i][j]);
      this.setState({arr: tmp});
    }
  }

  floorGang(i,j){
    return Math.floor(this.state.arr[i][j]/4);
  }

  randArr(){
    var tmp = [
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0]
    ];

    var ln = tmp.length;

    for (var i = 0; i < ln; i++) {
      for (var j = 0; j < ln; j++) {
        if(i%(ln-1) + j%(ln-1) == 0){
          tmp[i][j] = Math.floor(Math.random()*12);
        }else if ((i%(ln-1))*(j%(ln-1)) == 0) {
          tmp[i][j] = Math.floor(Math.random()*20);
        }else{
          tmp[i][j] = Math.floor(Math.random()*24);
        }
      }
    }

    this.setState({arr: tmp});
  }

  componentWillMount(){
    window.addEventListener('contextmenu', event => event.preventDefault());
    window.addEventListener('keydown', (e) => {
      if(e.repeat) return;

      // flag = true;
      if (e.keyCode === 81) {
        console.log("CURR");
        console.log(this.state.arr);
        // console.log("ORG");
        // console.log(this.state.org);
      }

      if(e.keyCode>48 && e.keyCode<58){
        this.playLevel(e.keyCode-48)
      }

      if (e.keyCode == 32) {
        console.log("Space was pressed!");
      }

    })

    this.randArr();
  }

  render(){
    return(
      <div className="boxapp">
        <div className="infscreen">
          <div className="infContainer">
            {this.state.arr.map((row,i)=>{
              return (
                <div key={i} className="infrowContainer">
                  {row.map((sq,j)=>{
                    return (
                      <div
                        className="infcont"
                        key={i*100+j}
                        onMouseDown={(e)=>{
                          this.rotCell(i,j,e.button);
                        }}
                        >
                        {this.floorGang(i,j)==1?
                          <OneCell
                            rot={this.state.arr[i][j]%4}
                            color={this.state.color}
                          />
                          :null}

                        {this.floorGang(i,j)==2?
                          <TwoLcell
                            rot={this.state.arr[i][j]%4}
                            color={this.state.color}
                          />
                          :null}

                        {this.floorGang(i,j)==3?
                          <TwoLineCell
                            rot={this.state.arr[i][j]%4}
                            color={this.state.color}
                          />
                          :null}

                          {this.floorGang(i,j)==4?
                            <Threecell
                              rot={this.state.arr[i][j]%4}
                              color={this.state.color}
                            />
                            :null}

                          {this.floorGang(i,j)==5?
                            <FourCell
                              rot={this.state.arr[i][j]%4}
                              color={this.state.color}
                            />
                            :null}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          <div className="oth-options">
            <div className="playoption">
              <span>
                {this.state.level==0?"Design":"Level "+this.state.level}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
