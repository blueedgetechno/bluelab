const diff = (pt1, pt2) => pt1.map((x,i)=> pt1[i]-pt2[i])
const scale = (pt, f) => pt.map(x => x*f)
const add = (pt1, pt2) => pt1.map((x,i)=> pt1[i]+pt2[i])
const unit = (pt) => {
  var f = Math.pow(pt[0]*pt[0] + pt[1]*pt[1], 0.5)
  return pt.map(x => x/f)
}

const dis = (pt1, pt2)=>{
  var d2 = Math.pow(pt1[0]-pt2[0],2) + Math.pow(pt1[1]-pt2[1],2)
  return Math.pow(d2,0.5)
}

const disOfPt = (x,y,pt1,pt2)=>{
  var dy = pt2[1] - pt1[1], dx = pt2[0] - pt1[0],
      c = pt2[0]*pt1[1] - pt1[0]*pt2[1],
      v = dy*x - dx*y + c, mds = Math.sqrt(dy*dy + dx*dx)

  var ds = Math.abs(v/mds),
      midpt = scale(add(pt1, pt2), 0.5)

  if(3*dis([x,y], midpt) < dis(pt1, pt2)) return ds
  else return 1000
}

export const Vector = {
  diff: diff,
  scale: scale,
  add: add,
  unit: unit,
  dis: dis,
  disOfPt: disOfPt
}

export const shuffle = (n)=>{
  var array = [...Array(n)].map((x,i)=> i)
  let currentIndex = n,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]]
  }

  return array;
}

export class Point{
  constructor(x,y,locked=false) {
    this.x = [x,y]
    this.x0 = [x,y]
    this.locked = locked
  }
}

export class Stick{
  constructor(p_a, p_b, ln) {
    this.a = p_a
    this.b = p_b
    this.ln = ln
    this.del = false
  }
}
