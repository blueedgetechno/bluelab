import React, {useState, useEffect} from 'react';
import Sketch from "react-p5";
import * as math from 'mathjs';

import './invkin.css';

const InvKin = ()=>{
  const [arr, setArr] = useState([])
  const [final, setFinal] = useState([0,0])
  const [allset, setAll] = useState(true)
  const w = window.innerWidth
  const h = window.innerHeight
  const r = 30, ln = 10, n = 4

  if(!arr.length){
    var tmp = []
    for (var i = 0; i < n; i++) {
      tmp.push(math.complex((50 + i*ln)*w/100, h/2))
    }

    setArr(tmp)
    setFinal(math.complex(w/5, h/4))
    setAll(false)
  }

  const setup = (p5, canvasParentRef) => {
		p5.createCanvas(w,h-5).parent(canvasParentRef)
	}

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
    setFinal(math.complex(p5.mouseX, p5.mouseY))
    setAll(false)
  }

	const draw = (p5) => {
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
      // console.log("Ok")
      adjust()
    }
  }, [allset])

	return (
    <div className="boxapp">
      <Sketch
        setup={setup}
        draw={draw}
        mouseDragged={mouseDragged}
      />
    </div>
  )
}

export default InvKin;
