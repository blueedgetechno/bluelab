import React, {useState, useEffect} from 'react';
import './blockPuzzle.css';

import allShapes from './allShapes.js';

const BlockPuzzle = ()=>{
  const [arr, setArr] = useState([]);
  const [ovArr, setOverArr] = useState([]);
  const [rows, setRow] = useState(6);
  const [shapes, setShapes] = useState(allShapes);
  const [fshp, setFshp] = useState([]);
  const [shape, setShape] = useState("");
  const [shcell, setShcell] = useState(48);
  const [isPlay, setPlay] = useState(true);
  const [offSet, setOff] = useState([0,0]);
  const [dshape, setDShape] = useState(0);
  const [shArr, setShArr] = useState([]);

  const dragStart = (e)=>{
    var img = new Image();
    img.src = null;
    e.dataTransfer.setDragImage(img, 0, 0);

    if(!isPlay){
      var idx = e.target.dataset.idx;
      if(!idx) return;
      if(idx.length<2) idx = '0'+idx;
      setShape(idx);
    }else{
      var sh = e.target.dataset.sh,
          sp = e.target.dataset.sp,
          px = e.target.dataset.px,
          py = e.target.dataset.py;

      if(sh && sp && px && py){
        setDShape(sh);
        setOff([px,py]);
        var tmp = [],
            str = shapes[sh];

        for (var i = 0; i < rows; i++) tmp.push([]);

        var r1=-1,r2=-1,c1=-1,c2=-1;

        for (var i = 0; i < str.length; i+=2) {
          var j = (parseInt(sp)+i)%str.length,
              cp = str.substring(j,j+2);

          cp = parseInt(cp);
          var cx = Math.floor(cp/rows),
              cy = cp%rows;

          tmp[cx][cy] = 1;
        }


        for (var i = 0; i < tmp.length; i++) {
          var isFill = false;
          for (var j = 0; j < tmp[i].length; j++) isFill|=tmp[i][j]!=null;
          if(r1==-1 && isFill) r1 = i;
          if(isFill) r2 = i;
        }

        for (var j = 0; j < rows; j++) {
          var isFill = false;
          for (var i = 0; i < rows; i++) isFill|=tmp[i][j]!=null;
          if(c1==-1 && isFill) c1 = j;
          if(isFill) c2 = j;
        }

        var sharr = tmp.map((row, i)=>{
          if(i<r1 || i>r2) return null;
          var rmp = [];
          for (var j = c1; j < c2+1; j++) {
            rmp.push(row[j]!=null?parseInt(sh):-1);
          }

          return rmp;
        }).filter(x=> x!=null);

        setShArr(sharr);
      }
    }
  }

  const dragOver = (e)=>{
    e.preventDefault();
    var idx = e.target.dataset.idx;
    if(!idx) return;

    if(!isPlay){
      if(idx.length<2) idx = '0'+idx;
      var sh = shape;
      if(!sh.endsWith(idx)) setShape(sh+idx);
    }else{
      var tmpArr = [],
          isValid = true,
          cx = Math.floor(idx/rows),
          cy = idx%rows;

      for (var i = 0; i < rows; i++) tmpArr.push([]);

      for (var i = 0; i < shArr.length; i++) {
        for (var j = 0; j < shArr[i].length; j++) {
          var px = cx+i-offSet[0],
              py = cy+j-offSet[1];

          if(px<0 || px>rows-1 || py<0 || py>rows-1) return;

          if(arr[px][py]!=-1 && shArr[i][j]!=-1) return;

          if(arr[px][py]==-1){
            tmpArr[px][py] = shArr[i][j];
          }
        }
      }

      setOverArr(tmpArr);
    }
  }

  const dragDrop = (e)=>{
    setOverArr([]);

    e.preventDefault();
    var idx = e.target.dataset.idx;
    if(!idx){
      setOff([0,0]);
      setShArr([]);
      return;
    };

    if(!isPlay){
      var tmpshapes = [...shapes];
      tmpshapes.push(shape);
      setShapes(tmpshapes);
    }else{
      var tmpArr = [...arr],
          isValid = true,
          cx = Math.floor(idx/rows),
          cy = idx%rows;

      for (var i = 0; i < rows; i++) tmpArr.push([]);

      for (var i = 0; i < shArr.length; i++) {
        for (var j = 0; j < shArr[i].length; j++) {
          var px = cx+i-offSet[0],
              py = cy+j-offSet[1];

          if(px<0 || px>rows-1 || py<0 || py>rows-1){
            setOff([0,0]);
            setShArr([]);
            return;
          };

          if(shArr[i]==null || (tmpArr[px][py]!=-1 && shArr[i][j]!=-1)){
            setOff([0,0]);
            setShArr([]);
            return;
          };

          if(tmpArr[px][py]==-1){
            tmpArr[px][py] = shArr[i][j];
          }
        }
      }

      var tfshp = [...fshp];
      tfshp.push(shapes[dshape]);
      setFshp(tfshp);
      setArr(tmpArr);
    }

  }

  const rainBowColor = (idx)=>{
    if(idx==-1){
      return 'inherit';
    }

    var i = (idx * 255 / shapes.length);
    var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
    var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
    var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  const shapeDiv = ()=>{
    return shapes.map((shp,idx)=>{
      if(fshp.includes(shp) && isPlay) return null;

      var tmp = [];
      for (var i = 0; i < rows; i++) tmp.push([]);

      for (var j = 0; j < shp.length; j+=2) {
        var cp = shp.substring(j,j+2);
        cp = parseInt(cp);
        var cx = Math.floor(cp/rows),
            cy = cp%rows;

        tmp[cx][cy] = j;
      }

      var r1=-1,r2=-1,c1=-1,c2=-1;

      for (var i = 0; i < tmp.length; i++) {
        var isFill = false;
        for (var j = 0; j < tmp[i].length; j++) isFill|=tmp[i][j]!=null;
        if(r1==-1 && isFill) r1 = i;
        if(isFill) r2 = i;
      }

      for (var j = 0; j < rows; j++) {
        var isFill = false;
        for (var i = 0; i < rows; i++) isFill|=tmp[i][j]!=null;
        if(c1==-1 && isFill) c1 = j;
        if(isFill) c2 = j;
      }

      var sdiv = (
        <div className="shapeCont" style={{
          width: shcell*(c2-c1+1),
          height: shcell*(r2-r1+1),
          display: 'grid',
          gridTemplateColumns: `repeat(${c2-c1+1},minmax(0,1fr))`
        }}>
        {tmp.map((row, i)=>{
          if(i<r1 || i>r2) return null;
          var rmp = [];
          for (var j = c1; j < c2+1; j++) {
            rmp.push(
              <div className="shcell" data-sh={idx}
                data-px={i-r1} data-py={j-c1} data-sp={row[j]}
                draggable={isPlay && row[j]!=null} style={{
                width: shcell,
                height: shcell,
                background: rainBowColor(row[j]!=null?idx:-1)
              }}></div>
            )
          }

          return rmp;
        })}
        </div>
      );

      return sdiv;
    });
  }

  useEffect(() => {
    window.addEventListener('dragstart', dragStart);
    window.addEventListener('dragover', dragOver);
    window.addEventListener('drop', dragDrop);

    return ()=>{
      window.removeEventListener('dragstart', dragStart);
      window.removeEventListener('dragover', dragOver);
      window.removeEventListener('drop', dragDrop);
    };
  });

  useEffect(()=>{

    var tmp = [];
    for (var i = 0; i < rows; i++) {
      tmp.push([]);
      for (var j = 0; j < rows; j++) {
        tmp[i].push(-1);
      }
    }

    if(!isPlay){
      for (var i = 0; i < shapes.length; i++) {
        var str = shapes[i];
        for (var j = 0; j < str.length; j+=2) {
          var cp = str.substring(j,j+2);
          cp = parseInt(cp);
          var cx = Math.floor(cp/rows),
              cy = cp%rows;

          tmp[cx][cy] = i;
        }
      }
    }

    setArr(tmp);

  },[shapes]);

  useEffect(()=>{
    if(!isPlay){
      setShapes([]);
    }else{
      var tmp = [];
      for (var i = 0; i < rows; i++) {
        tmp.push([]);
        for (var j = 0; j < rows; j++) {
          tmp[i].push(-1);
        }
      }

      setArr(tmp);
      setFshp([]);
    }
  },[isPlay])

  return (
    <div className="boxapp">
      <div className="container">
        <div className="piecesCont">
          {shapeDiv()}
        </div>
        <div className="blockCont" style={{
          width: '700px',
          height: '700px',
          display: 'grid',
          gridTemplateColumns: `repeat(${rows},minmax(0,1fr))`
        }}>
          {arr.map((row,x)=>{
            var wrow = [];
            for (var y = 0; y < row.length; y++) {
              wrow.push(
                <div className="pcell" data-idx={x*rows + y}
                  data-isOver={ovArr[x] && ovArr[x][y]>=0}
                  draggable={!isPlay || row[y]>=0} style={{
                  width: 700/rows,
                  height: 700/rows,
                  background: rainBowColor(row[y])
                }}></div>
              );
            }

            return wrow;
          })}
        </div>
        <div className="btnCont">
          <div className="swbtn" onClick={()=>{
            setPlay(!isPlay);
          }}>{isPlay?'Play Mode':'Build Mode'}</div>
        </div>
      </div>
    </div>
  )
}

export default BlockPuzzle;
