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

const ClothSim = ()=>{
  const [points, setPoints] = useState([[]])
  const [sticks, setSticks] = useState([])
  const [n, setN] = useState(29)
  const [m, setM] = useState(14)
  const [ln, setLn] = useState(2)
  const r = PT_RADII

  const mouseDragged = (p5)=>{
    for (var i = 0; i < sticks.length; i++) {
      if(sticks[i].del) continue
      var dis = Vector.disOfPt(p5.mouseX, p5.mouseY, sticks[i].a.x, sticks[i].b.x)
      if(dis < 1){
        sticks[i].del = true
      }
    }
  }

  const start = (p5) => {
  }

  const setup = (p5, canvasParentRef) => {
		var cnv = p5.createCanvas(w,h-5).parent(canvasParentRef)
	}

  const simulate = (p5)=>{
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < m; j++) {
        if(points[i][j].locked) continue

        var prev = [...points[i][j].x]
        points[i][j].x = Vector.diff(Vector.scale(points[i][j].x, 2), points[i][j].x0)
        points[i][j].x = Vector.add(points[i][j].x, [0,1*GV_CONST*p5.deltaTime*p5.deltaTime])
        points[i][j].x0 = prev
      }
    }

    for (var j = 0; j < ITERATIONS; j++) {
      sticks.forEach((stick, i) => {
        if(stick.del) return
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
      if(sticks[i].del) continue
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
    for (var i = 0; i < n; i++) {
      for (var j = 0; j < m; j++) {
        var cr_pos = points[i][j].x
        if(points[i][j].locked) p5.fill(LOCKED_RED)
        else p5.fill(PALE_BLUE)

        p5.strokeWeight(0)
        p5.ellipse(cr_pos[0], cr_pos[1], r, r)
      }
    }

    simulate(p5)
	}

  useEffect(()=>{
    var tmp_pt = [], tmp_st = []
    for (var i = 0; i < n; i++) {
      tmp_pt.push([])
      for (var j = 0; j < m; j++) {
        var tx = (50 + (2*i - n + 1)*ln*0.5)*w/100,
            ty = h/12 + (j*ln*w)/100

        tmp_pt[i].push(new Point(tx,ty, j==0 && i%4==0))
      }
    }

    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < m - 1; j++) {
        tmp_st.push(new Stick(tmp_pt[i][j], tmp_pt[i+1][j], (ln*w)/100))
        tmp_st.push(new Stick(tmp_pt[i][j], tmp_pt[i][j+1], (ln*w)/100))

        if(i+2==n){
          tmp_st.push(new Stick(tmp_pt[i+1][j], tmp_pt[i+1][j+1], (ln*w)/100))
        }

        if(j+2==m){
          tmp_st.push(new Stick(tmp_pt[i][j+1], tmp_pt[i+1][j+1], (ln*w)/100))
        }
      }
    }


    setPoints(tmp_pt)
    setSticks(tmp_st)
  }, [n,m, ln])

	return (
    <div className="boxapp">
      <div className="descrp">
        An Implementation of
        <a href="https://en.wikipedia.org/wiki/Verlet_integration" target="_blank"> Verlet Integration</a>
        {" "} for the simulation of Cloth Mechanics.
        Drag over sticks to cut them apart.
        <br/>
        Inpiration: <a href="https://youtu.be/PGk0rnyTa1U?t=468" target="_blank">
          Sebastian Lague
        </a>
      </div>
      <div className="controls">
        <div>
          <input name="number" type="range" value={n}
            onChange={(e)=>{ setN(e.target.value)}} min="2" max="100"/>
            <label htmlFor="number">N: {n}{" "}</label>
        </div>
        <div>
          <input name="number" type="range" value={m}
            onChange={(e)=>{ setM(e.target.value)}} min="2" max="100"/>
            <label htmlFor="number">M: {m}{" "}</label>
        </div>
        <div>
          <input name="number" type="range" value={ln}
            onChange={(e)=>{ setLn(e.target.value)}} min="1" max="25"/>
            <label htmlFor="number">Length: {ln}{" "}</label>
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

export default ClothSim;
