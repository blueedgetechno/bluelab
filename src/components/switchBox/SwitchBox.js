import React from 'react';

import './switchBox.css';

export default class SwitchBox extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state={
      arr: [0,0,0,0,0,0,0,0],
      tmp: 0,
      edges: [
        [2,3],
        [5,7],
        [4,6],
        [1,8,5],
        [7],
        [1],
        [],
        [6,4]
      ]
    }
  }

  toggleButton(t){
    var arr = this.state.arr;
    arr[t]^=1;
    for (var i = 0; i < this.state.edges[t].length; i++) {
      arr[this.state.edges[t][i]-1]^=1;
    }
    this.setState({arr: arr, tmp: this.state.tmp^1});
  }

  render(){
    return(
      <div className="boxapp">
        <div className="container">
          <div className="switchContainer">
            {this.state.arr.map((sw,i)=>{
              return(
                <div className="switch" key={i}>
                  <div onClick={()=>{
                    this.toggleButton(i);
                  }} className={sw?"onSign":"offSign"}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
