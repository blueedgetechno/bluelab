import React, {useState} from 'react';

export const OneCell = (props)=>{
  return (
    <svg
      className={"infcell rot"+props.rot*90}
      width={100}
      height={100}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx={50} cy={50} r={20} stroke={props.color} strokeWidth={10} />
        <rect x={45} width={10} height={26} fill={props.color} />
      </g>
    </svg>
  )
}

export const TwoLcell = (props)=>{
  return (
    <svg
      className={"infcell rot"+props.rot*90}
      width={100} height={100}
      viewBox="0 0 100 100"
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cy={0} r={50} stroke={props.color} strokeWidth={10} />
      </g>
    </svg>
  )
}

export const TwoLineCell = (props)=>{
  return (
    <svg
      className={"infcell rot"+props.rot*90}
      width={100} height={100}
      viewBox="0 0 100 100"
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <rect x={45} width={10} height={100} fill={props.color}/>
      </g>
    </svg>
  )
}

export const Threecell = (props)=>{
  return (
    <svg
      className={"infcell rot"+props.rot*90}
      width={100} height={100}
      viewBox="0 0 100 100"
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cy={100} r={50} stroke={props.color} strokeWidth={10} />
        <circle cy={0} r={50} stroke={props.color} strokeWidth={10} />
      </g>
    </svg>
  )
}

export const FourCell = (props)=>{
  return (
    <svg
      className={"infcell rot"+props.rot*90}
      width={100} height={100}
      viewBox="0 0 100 100"
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cy={100} r={50} stroke={props.color} strokeWidth="10"/>
        <circle r={50} stroke={props.color} strokeWidth="10"/>
        <circle cx={100} cy={100} r={50} stroke={props.color} strokeWidth="10"/>
        <circle cx={100} r={50} stroke={props.color} strokeWidth="10"/>
      </g>
    </svg>
  )
}
