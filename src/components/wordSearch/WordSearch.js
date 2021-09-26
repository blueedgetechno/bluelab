import React, {useState, useEffect} from 'react';
import './wordSearch.css';

export default class WordSearch extends React.PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      rows: 16,
      wcell: 42,
      words: [
        ["UNESCAPE",2,2,1,1],
        ["GAME",4,1,0,1],
        ["CIRCUMSTANCES",1,14,1,0],
        ["SURVIVE",4,15,1,-1],
        ["LEVEL",9,8,0,1],
        ["CHALLENGING",11,1,-1,0],
        ["DIFFICULTY",14,2,0,1],
        ["EFFORTFUL",8,12,-1,-1],
        ["FAILURE",1,9,0,-1],
        ["RIDDLE",15,6,-1,0],
        ["PROBLEM",11,10,0,-1],
        ["BLUEEDGE",10,3,-1,1],
        ["MAZE",7,3,1,1],
        ["SEARCH",12,15,0,-1],
        ["HELPME",10,1,-1,1],
        ["BREAKAWAY",7,13,1,0]
      ],
      found: [],
      fstart: [0,0],
      fend: [0,0],
      dragging: false,
      vdrag: false,
      arr: []
    }
  }

  giveColor(idx){
    var idx = (idx * 729)%360;
    var r = Math.round(Math.sin(0.024 * idx + 0) * 256),
        g = Math.round(Math.sin(0.024 * idx + 2) * 256),
        b = Math.round(Math.sin(0.024 * idx + 4) * 90 + 240);

    return `rgba(${r},${g},${b},0.4)`;
  }

  DragStart(e){
    var img = new Image();
    img.src = null;
    e.dataTransfer.setDragImage(img, 0, 0);

    var ele = e.target;
    var x = ele.dataset.x,
        y = ele.dataset.y;

    if(x!=null && y!=null){
      this.setState({dragging: true, fstart: [x,y]});
    }
  }

  DragOver(e){
    if(!this.state.dragging) return;
    e.preventDefault();

    var ele = e.target;
    var x = ele.dataset.x,
        y = ele.dataset.y;

    if(x!=null && y!=null){
      var dx = this.state.fstart[0]-x,
          dy = this.state.fstart[1]-y;

      if(Math.abs(dx)==Math.abs(dy) || dx*dy==0){
        this.setState({fend: [x,y], vdrag: true});
      }else{
        this.setState({fend: [x,y], vdrag: false});
      }
    }
  }

  DragDrop(e){
    if(!this.state.dragging) return;

    var tstart = [...this.state.fstart];
    tstart[0] = parseInt(tstart[0]);
    tstart[1] = parseInt(tstart[1]);

    var tend = [...this.state.fend];

    var dx = tend[0] - tstart[0],
        dy = tend[1] - tstart[1];

    if((dx*dy==0 || Math.abs(dx)==Math.abs(dy)) && (Math.abs(dx) + Math.abs(dy))>2){
      var tmpWord = "";

      dx = Math.sign(dx);
      dy = Math.sign(dy);

      while ((tstart[0]-dx)!=tend[0] || (tstart[1]-dy)!=tend[1]) {
        tmpWord += this.state.arr[tstart[0]][tstart[1]];
        tstart[0] += dx;
        tstart[1] += dy;
      }

      var tmpFound = [...this.state.found], isWord = false;

      for (var i = 0; i < this.state.words.length; i++) {
        if(this.state.words[i][0]==tmpWord){
          isWord = true;
        };
      }

      if(!isWord){
        this.setState({dragging: false});
        return;
      };

      for (var i = 0; i < tmpFound.length; i++) {
        if(tmpFound[i][5]==tmpWord){
          this.setState({dragging: false});
          return;
        };
      }

      var tmp = [...this.state.fstart];
      tmp.push(this.lineSize());
      tmp.push(this.orientation());
      tmp.push(this.giveColor(tmpFound.length));
      tmp.push(tmpWord);

      tmpFound.push(tmp);
      this.setState({dragging: false, found: tmpFound},()=>{
        console.log(this.state.found);
      });
    }else{
      this.setState({dragging: false});
    }


    e.preventDefault();
  }

  componentWillMount(){
    var tmp = [];
    for (var i = 0; i < this.state.rows; i++) {
      tmp.push([]);
      for (var j = 0; j < this.state.rows; j++) {
        tmp[i].push(String.fromCharCode(65+Math.floor(Math.random()*26)));
        // tmp[i].push('');
        // tmp[i].push(i+''+j);
      }
    }

    for (var i = 0; i < this.state.words.length; i++) {
      var word = this.state.words[i];

      for (var j = 0; j < word[0].length; j++) {
        tmp[word[1] + word[3]*j][word[2] + word[4]*j] = word[0][j];
      }
    }

    this.setState({arr: tmp});
    window.addEventListener('dragstart', this.DragStart.bind(this));
    window.addEventListener('dragover', this.DragOver.bind(this));
    window.addEventListener('drop', this.DragDrop.bind(this));
  }

  orientation(){
    // 45*(this.state.dr[0]*this.state.dr[1]==0 ? 0: 1)

    var dx = this.state.fstart[0]-this.state.fend[0],
        dy = this.state.fstart[1]-this.state.fend[1]

    if(dx*dy==0){
      if(dx==0) return 180*(dy>0)
      else return 90 + 180*(dx>0)
    }else{
      if(dx<0 && dy<0) return 45;
      else if(dx<0 && dy>0) return 135;
      else if(dx>0 && dy>0) return -135;
      else if(dx>0 && dy<0) return -45;
    }
  }

  lineSize(){
    var dx = this.state.fstart[0]-this.state.fend[0],
        dy = this.state.fstart[1]-this.state.fend[1]

    var mx = Math.max(Math.abs(dx), Math.abs(dy));
    return this.state.wcell*(1+mx)*(1 + 0.38*(dx*dy!=0));
  }

  render(){
    return(
      <div className="boxapp">
        <div className="container">
          <div className="progCont" style={{
            width: (this.state.wcell*this.state.rows)+'px'
          }}>
            <div className="progressBar" style={{
              width: (this.state.wcell*this.state.rows*(this.state.found.length/this.state.words.length))+'px'
            }}></div>
          </div>

          <div className="searchCont" style={{
            width: (this.state.wcell*this.state.rows)+'px',
            display: 'grid',
            gridTemplateColumns: `repeat(${this.state.rows},minmax(0,1fr))`
          }}>
            {this.state.arr.map((row, x)=>{
              var wrow = [];
              for (var y = 0; y < row.length; y++) {
                wrow.push(
                  <div
                    className="wcell"
                    data-x={x} data-y={y}
                    draggable={true} style={{
                    width: this.state.wcell+'px',
                    height: this.state.wcell+'px'
                  }}>
                    <span>{row[y]}</span>
                    {
                      this.state.dragging && this.state.vdrag &&
                      (this.state.fstart[0]==x && this.state.fstart[1]==y)?(
                        <div className="lineCont" style={{
                          width: this.state.wcell+'px',
                          height: this.state.wcell+'px',
                          transform: `rotateZ(${this.orientation()}deg)`
                        }}>
                          <div className="wline" style={{
                            width: this.lineSize()+'px',
                            height: this.state.wcell+'px',
                            borderRadius: this.state.wcell/2
                          }}></div>
                        </div>
                      ):null
                    }
                    {
                      this.state.found.map((fnd, k)=>{
                        if(fnd[0]==x && fnd[1]==y){
                          return (
                            <div className="lineCont" style={{
                              width: this.state.wcell+'px',
                              height: this.state.wcell+'px',
                              transform: `rotateZ(${fnd[3]}deg)`
                            }}>
                              <div className="wline pline" style={{
                                width: fnd[2]+'px',
                                height: this.state.wcell+'px',
                                borderRadius: this.state.wcell/2,
                                background: fnd[4]
                              }}></div>
                            </div>
                          )
                        }else{
                          return null;
                        }
                      })
                    }
                  </div>
                )
              }

              return wrow;
            })}
          </div>
        </div>
      </div>
    );
  }
}
