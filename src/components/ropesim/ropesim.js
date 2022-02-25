import React, {useState, useEffect} from 'react';
import Sketch from "react-p5";
import * as math from 'mathjs';

import {
  Vector,
  Point,
  Stick,
  shuffle
} from './items';

const BG_BLUE = '#0e0e16'
const PALE_BLUE = '#53546c'
const LOCKED_RED = '#f04c4c'
const LOCKED_GREEN = '#4cf07a'
const STROKE_WEIGHT = 4
const PT_RADII = 10
const GV_CONST = 9.8 * 1e-4
const ITERATIONS = 101
const FRAMERATE = 24
const w = window.innerWidth
const h = window.innerHeight

const RopeSim = ()=>{
  const [points, setPoints] = useState([])
  const [sticks, setSticks] = useState([])
  const [dix, setDix] = useState(0)
  const [final, setFinal] = useState([w*0.6, h/5])
  const [n, setN] = useState(96)
  const [ln, setLn] = useState(0.5)
  const r = PT_RADII

  const mouseDragged = (p5)=>{
    setFinal([p5.mouseX, p5.mouseY])
  }

  const start = (p5) => {
    var mnd = w*w + h*h, ix = -1

    for (var i = 0; i < points.length; i++) {
      if(!points[i].locked) continue

      var dis = Vector.dis(points[i].x, [p5.mouseX, p5.mouseY])
      if(dis < mnd){
        mnd = dis
        ix = i
      }
    }

    if(ix != -1) setDix(ix)
  }

  const setup = (p5, canvasParentRef) => {
		var cnv = p5.createCanvas(w,h-5).parent(canvasParentRef)
	}



  const simulate = (p5)=>{
    for (var i = 0; i < points.length; i++) {
      if(points[i].locked) continue

      var prev = [...points[i].x]
      points[i].x = Vector.diff(Vector.scale(points[i].x, 2), points[i].x0)
      points[i].x = Vector.add(points[i].x, [0,1*GV_CONST*p5.deltaTime*p5.deltaTime ])
      points[i].x0 = prev
    }

    for (var j = 0; j < ITERATIONS; j++) {
      sticks.forEach((stick, i) => {
        var center = Vector.scale(Vector.add(stick.a.x, stick.b.x),0.5),
            dir = Vector.unit(Vector.diff(stick.a.x, stick.b.x))

        if(!stick.a.locked){
          stick.a.x = Vector.add(center, Vector.scale(dir, stick.ln*0.5))
        }

        if(!stick.b.locked){
          stick.b.x = Vector.diff(center, Vector.scale(dir, stick.ln*0.5))
        }
      })
    }
  }

	const draw = (p5) => {
		p5.background(BG_BLUE)
    p5.frameRate(FRAMERATE)

    // paint sticks
    for (var i = 0; i < sticks.length; i++) {
      p5.stroke(PALE_BLUE)
      p5.strokeWeight(STROKE_WEIGHT)
      p5.line(
        sticks[i].a.x[0],
        sticks[i].a.x[1],
        sticks[i].b.x[0],
        sticks[i].b.x[1]
      )
    }

    // paint points
    for (var i = 0; i < points.length; i++) {
      var cr_pos = points[i].x
      if(points[i].locked) p5.fill(LOCKED_RED)
      else p5.fill(PALE_BLUE)

      if(i==n-1) p5.fill(LOCKED_GREEN)

      p5.strokeWeight(0)
      if(points[i].locked){
        p5.ellipse(cr_pos[0], cr_pos[1], r, r)
      }
    }

    simulate(p5)
	}

  useEffect(()=>{
    if(points[dix]){
      points[dix].x = [...final]
    }
  }, [final])

  useEffect(()=>{
    var tmp_pt = [], tmp_st = []
    for (var i = 0; i < n; i++) {
      if(i < n-1){
        tmp_pt.push(new Point((33 + i*ln)*w/100, h/5, i==0))
      }else{
        tmp_pt.push(new Point(...final, true))
      }

      if(i!=0){
        tmp_st.push(new Stick(tmp_pt[i-1], tmp_pt[i], (ln*w)/100))
      }
    }

    setPoints(tmp_pt)
    setSticks(tmp_st)
  }, [n, ln])

	return (
    <div className="boxapp">
      <div className="descrp">
        An Implementation of
        <a href="https://en.wikipedia.org/wiki/Verlet_integration" target="_blank"> Verlet Integration</a>
        {" "} for the simulation of Rope Mechanics.
        Drag the dots to interact.
        <br/>
        Inpiration: <a href="https://youtu.be/PGk0rnyTa1U?t=295" target="_blank">
          Sebastian Lague
        </a>
      </div>
      <div className="controls">
        <div>
          <label htmlFor="number">N: {n}{" "}</label>
          <input name="number" type="range" value={n}
            onChange={(e)=>{ setN(e.target.value)}} min="2" max="100"/>
        </div>
        <div>
          <label htmlFor="number">Length: {ln}{" "}</label>
          <input name="number" type="range" value={ln}
            onChange={(e)=>{ setLn(e.target.value)}} min="1" max="25"/>
        </div>
      </div>
      <Sketch
        setup={setup}
        draw={draw}
        mouseDragged={mouseDragged}
        mousePressed={start}
      />
    </div>
  )
}

export default RopeSim;
