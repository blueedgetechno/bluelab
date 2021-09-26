import React, {
  useState
} from 'react';

export const Spring = (props) => {
  var arr = [];
  for (var i = 0; i < 12; i++) {
    arr.push(i);
  }

  const f = ()=>{
    if(props.h%6==0) return 0.1;

    var d = Math.floor(props.h/3);
    if(d&1) return 3 - props.h%3;
    else return props.h%3;
  }

  var scv = `scale(1,-${f()})`;

  return (
    <div className="springCont" style={{transform: scv}}>
      {arr.map(x=>{
        return <div className="circ" key={x}></div>
      })}
    </div>
  )
}

export const EmptyHolder = () => {
  return (
    <div className="empCont">
    </div>
  )
}

export const SpButton = () => {
  return (
    <div className="spbtn">
    </div>
  )
}

export const BluePin = (props) => {
  const f = (v) => {
    var d = Math.floor(v/3);
    if(d&1) return 3 - v%3;
    else return v%3;
  }

  return (
    <div className="bluepin" style={{
      top: 25*(3-f(props.h))+'%',
      background: props.done ? '#1ae250':'#3184d2',
      borderColor: props.done ? '#0d9933':'#2a5dc7'
    }}>
    </div>
  )
}
