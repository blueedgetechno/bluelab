import React, {useState, useEffect} from 'react';
import Sketch from "react-p5";
import * as math from 'mathjs';

import './bezcrv.css';

const BezCrv = ()=>{
  const [arr, setArr] = useState([])
  const [idx, setIdx] = useState(-1)
  const [cord, setCord] = useState([])
  const [n, setN] = useState(4)
  const [drag, setDrag] = useState(true)
  const [showLines, setLines] = useState(true)
  const w = window.innerWidth
  const h = window.innerHeight
  const r = 10, offY = 0.72, spd = 250

  const preload = (tmp)=>{
    var tmp2 = []
    for (var i = 0; i < spd; i++) {
      var z
      if(tmp!=null){
        z = compute(null, i/spd, 0, tmp)
      }else z = compute(null, i/spd)

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
    if(drag){
      if(idx+1>0){
        var tmp = [...arr]
        tmp[idx] = math.complex(p5.mouseX, p5.mouseY)
        setArr(tmp)
      }else if (idx+1==0) {
        mouseClicked(p5)
      }
    }
  }

  const mouseReleased = (p5) => {
    preload()
    setIdx(-1)
  }

  const setup = (p5, canvasParentRef) => {
		p5.createCanvas(w,h).parent(canvasParentRef)
	}

  const compute = (p5,t=0.5,fr=0,tmp=[...arr])=>{
    if(tmp.length==0) return math.complex(0,0)

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

  const osmod = (x,y)=>{
    var z = Math.floor(x/y), rm = x%y
    if(z&1) rm = y - rm

    return rm
  }

  const lerp = (t)=>{
    var col1 = [73, 240, 143],//[48, 168, 255],
        col2 = [5, 152, 71] //[177, 50, 232]

    return [
      col1[0]*(1-t) + t*col2[0],
      col1[1]*(1-t) + t*col2[1],
      col1[2]*(1-t) + t*col2[2]
    ]
  }

	const draw = (p5) => {
		p5.background('#0e0e16')
    var rm = osmod(p5.frameCount,spd)

    var pz = compute(p5, 0, 1)
    document.getElementById('val').innerText = Math.round(rm*100/spd)/100
    for (var t = 1; t <= rm; t++) {
      var fr = t==rm?1:0,z
      if(fr) z = compute(p5, t/spd, fr)
      else{
        z = cord[t]
        // p5.stroke("#33d778")
        p5.stroke(lerp(t/spd))
        p5.strokeWeight(4)
        p5.line(pz.re,pz.im,z.re,z.im)
        pz = math.clone(z)
      }
    }

    for (var i = 0; i < arr.length; i++) {
      p5.fill(20, 172, 254)
      p5.strokeWeight(0)
      p5.ellipse(arr[i].re,arr[i].im, r, r)
    }
	}

  const stop = ()=>setDrag(false)
  const start = ()=>setDrag(true)

  useEffect(()=>{
    var tmp = [],
        ln = 1/n,
        z = math.complex(w/2, h*offY),
        dir = math.complex(-ln*w,0),
        arg = 2*math.pi/n

    z = math.add(z, math.multiply(dir, 0.5))
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
    preload(tmp)
  }, [n])

	return (
    <div className="boxapp">
      <div className="valbox">t = <span id="val">0</span></div>
      <div className="descrp">
        A Simple Visualization of
        <a href="https://en.wikipedia.org/wiki/B%C3%A9zier_curve" target="_blank">
        {" "}Bézier Curve
        </a>{" "}using recursive approach. Drag the blue dots to change the
        shape of curve.<br/>
        Inspiration: <a href="https://youtu.be/aVwxzDHniEw?t=116" target="_blank">
          Freya Holmér
        </a>
      </div>
      <div className="controls" onMouseOver={stop} onMouseOut={start}>
        <div>
          <label htmlFor="number">N: {n}{" "}</label>
          <input name="number" type="range" value={n}
            onChange={(e)=>{ setN(e.target.value)}} min="2" max="16"/>
        </div>
        <div>
          <label htmlFor="showlines">showLines: {" "}</label>
          <input name="showlines" type="checkbox" checked={showLines}
            onChange={(e)=>{ setLines(e.target.checked)}}
            min="5" max="25"/>
        </div>
      </div>
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
