export const Vector = {
  diff: (pt1, pt2)=>{
    return pt1.map((x,i)=> pt1[i]-pt2[i])
  },
  scale: (pt, f)=>{
    return pt.map(x => x*f)
  },
  add: (pt1, pt2)=>{
    return pt1.map((x,i)=> pt1[i]+pt2[i])
  },
  unit: (pt)=>{
    var f = Math.pow(pt[0]*pt[0] + pt[1]*pt[1], 0.5)
    return pt.map(x => x/f)
  },
  dis: (pt1, pt2)=>{
    var d2 = Math.pow(pt1[0]-pt2[0],2) + Math.pow(pt1[1]-pt2[1],2)
    return Math.pow(d2,0.5)
  }
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
  }
}
