import React, {useState, useEffect} from 'react';
import Sketch from "react-p5";
import * as math from 'mathjs';

import './invkin.css';

const InvKin = ()=>{
  const [arr, setArr] = useState([])
  const [final, setFinal] = useState(math.complex(0,0))
  const [allset, setAll] = useState(true)
  const [drag, setDrag] = useState(true)
  const [n, setN] = useState(4)
  const [ln, setLn] = useState(10)
  const w = window.innerWidth
  const h = window.innerHeight
  const r = 30

  const adjust = ()=>{
    var tmp = [...arr]
    var stl = ln*w/100, count = 2*10, i = n-1, d = -1

    while(count){
      if(i+1==n && d+1==0){
        tmp[n - 1] = math.clone(final)
      }else if (i==0 && d==1) {
        tmp[0] = math.complex(w/2, h/2)
      }

      i+=d
      while (i+1>0 && i<n){
        var dir = math.subtract(tmp[i-d],tmp[i])
        dir = math.divide(dir, -1*math.abs(dir))
        tmp[i] = math.add(tmp[i-d], math.multiply(dir,stl))
        i+=d
      }

      d*=-1
      i+=d
      count--
    }

    setArr(tmp)
    setAll(true)
  }

  const mouseDragged = (p5)=>{
    if(drag){
      setFinal(math.complex(p5.mouseX, p5.mouseY))
      setAll(false)
    }
  }

  const stop = ()=>setDrag(false)
  const start = ()=>setDrag(true)

  const setup = (p5, canvasParentRef) => {
		p5.createCanvas(w,h-5).parent(canvasParentRef)
	}

	const draw = (p5) => {
    if(!allset && !drag) return
		p5.background('#0e0e16')

		for (var i = 0; i < n; i++) {
      p5.fill('#53546c')
      p5.stroke('#53546c')
      p5.strokeWeight(0)
      p5.ellipse(arr[i].re,arr[i].im, r, r)
      if(i!=0){
        p5.strokeWeight(6)
        p5.line(
          arr[i-1].re,
          arr[i-1].im,
          arr[i].re,
          arr[i].im
        )
      }
    }

    p5.fill(51, 215, 120)
    p5.strokeWeight(0)
    p5.ellipse(final.re,final.im, r*0.6, r*0.6)
    p5.fill(20, 172, 254)
    p5.ellipse(w/2,h/2, r*0.6, r*0.6)
	}

  useEffect(()=>{
    if(!allset){
      adjust()
    }
  }, [allset])

  useEffect(()=>{
    var tmp = []
    for (var i = 0; i < n; i++) {
      tmp.push(math.complex((50 + i*ln)*w/100, h/2))
    }

    setArr(tmp)
    if(math.abs(final)==0){
      console.log("Ok");
      setFinal(math.complex(w/5, h/4))
    }

    setAll(false)
  }, [n, ln])

	return (
    <div className="boxapp">
      <div className="descrp">
        An Implementation of
        <a href="http://andreasaristidou.com/FABRIK" target="_blank"> FABRIK</a>
        {" "}algorithm for the simulation of Inverse Kinemetics.
        Drag the green dot to interact
        <br/>
        Inpiration: <a href="https://youtu.be/PGk0rnyTa1U?t=177" target="_blank">
          Sebastian Lague
        </a>
      </div>
      <div className="controls" onMouseOver={stop} onMouseOut={start}>
        <div>
          <label htmlFor="number">N: {n}{" "}</label>
          <input name="number" type="range" value={n}
            onChange={(e)=>{ setN(e.target.value)}} min="2" max="16"/>
        </div>
        <div>
          <label htmlFor="number">Length: {ln}{" "}</label>
          <input name="number" type="range" value={ln}
            onChange={(e)=>{ setLn(e.target.value)}} min="5" max="25"/>
        </div>
      </div>
      <Sketch
        setup={setup}
        draw={draw}
        mouseDragged={mouseDragged}
      />
    </div>
  )
}

export default InvKin;
