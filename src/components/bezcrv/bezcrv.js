import React, {useState, useEffect} from 'react';
import Sketch from "react-p5";
import * as math from 'mathjs';

import './bezcrv.css';

const BezCrv = ()=>{
  const [arr, setArr] = useState([])
  const [idx, setIdx] = useState(-1)
  const [cord, setCord] = useState([])
  const w = window.innerWidth
  const h = window.innerHeight
  const r = 10, n = 5, offY = 0.72,
        ln = (0.24*4)/n, spd = 250,
        showLines = false

  if(!arr.length){
    var tmp = [],
        z = math.complex(w/2, h*offY),
        dir = math.complex(-ln*w,0),
        arg = 2*math.pi/n

    z = math.add(z, math.multiply(dir, 0.5))
    // console.log(dir, math.arg(dir)/math.pi)
    tmp.push(z)
    for (var i = 0; i < n-1; i++) {
      dir = math.multiply(dir, math.complex(
        math.cos(arg),
        math.sin(arg)
      ))

      z = math.add(z, dir)
      tmp.push(z)
    }

    setArr(tmp)
  }

  const preload = (p5)=>{
    var tmp2 = []
    for (var i = 0; i < spd; i++) {
      var z = compute(p5, i/spd)
      tmp2.push(z)
    }

    setCord(tmp2)
  }

  const mouseClicked = (p5) => {
    var d = w, z = 0

    for (var i = 0; i < arr.length; i++) {
      var dt = math.abs(math.subtract(
        arr[i],
        math.complex(p5.mouseX, p5.mouseY)
      ))

      if(dt<d){
        d = dt
        z = i
      }
    }

    if(d<30){
      setIdx(z)
    }else{
      setIdx(-2)
    }
  }

  const mouseDragged = (p5) => {
    if(idx+1>0){
      var tmp = [...arr]
      tmp[idx] = math.complex(p5.mouseX, p5.mouseY)
      setArr(tmp)
    }else if (idx+1==0) {
      mouseClicked(p5)
    }
  }

  const mouseReleased = (p5) => {
    preload(p5)
    setIdx(-1)
  }

  const setup = (p5, canvasParentRef) => {
		p5.createCanvas(w,h).parent(canvasParentRef)
    // p5.frameRate(24)
    preload(p5)
	}

  const compute = (p5,t=0.5,fr=0,tmp=[...arr])=>{
    var lv = tmp.length,
        tmp2 = []
    for (var i = 0; i < lv-1; i++) {
      var z = math.subtract(tmp[i+1],tmp[i])
      z = math.add(tmp[i],math.multiply(z,t))
      tmp2.push(z)
      if(fr && showLines){
        p5.stroke(83, 84, 108)
        p5.strokeWeight(2)
        p5.line(
          tmp[i].re,
          tmp[i].im,
          tmp[i+1].re,
          tmp[i+1].im
        )

        p5.fill(83, 84, 108)
        p5.strokeWeight(0)
        p5.ellipse(z.re,z.im, r*0.6, r*0.6)
      }
    }

    if(tmp2.length==1){
      if(fr){
        p5.fill('#33d778')
        p5.strokeWeight(0)
        p5.ellipse(tmp2[0].re,tmp2[0].im, r*0.8, r*0.8)
      }
      return tmp2[0]
    }

    return compute(p5, t, fr, tmp2)
  }

	const draw = (p5) => {
		p5.background('#0e0e16')

    var z = Math.floor(p5.frameCount/spd), rm = p5.frameCount%spd
    if(z&1) rm = spd-rm

    var pz = compute(p5, 0, 1)
    document.getElementById('val').innerText = Math.round(rm*100/spd)+" %"
    for (var t = 1; t <= rm; t++) {
      // p5.fill('#33d778')
      p5.stroke('#33d778')
      p5.strokeWeight(4)

      var fr = t==rm?1:0,z
      if(fr) z = compute(p5, t/spd, fr)
      else z = cord[t]

      p5.line(pz.re,pz.im,z.re,z.im)
      pz = z
      // p5.ellipse(tmp2[0].re,tmp2[0].im, r*0.8, r*0.8)
    }

    for (var i = 0; i < arr.length; i++) {
      p5.fill(20, 172, 254)
      p5.strokeWeight(0)
      p5.ellipse(arr[i].re,arr[i].im, r, r)
    }
	}

	return (
    <div className="boxapp">
      <div className="valbox">t = <span id="val">0</span></div>
      <div className="bezbox">
        <Sketch
          setup={setup}
          draw={draw}
          mouseDragged={mouseDragged}
          mouseReleased={mouseReleased}
        />
      </div>
    </div>
  )
}

export default BezCrv;
