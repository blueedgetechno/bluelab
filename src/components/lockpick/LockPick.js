import React, {useState, useEffect} from 'react';

import './lockPick.css';
import {
  Spring,
  EmptyHolder,
  SpButton,
  BluePin
} from './spring';

const LockPick = () => {
  const [picks, setPicks] = useState([]);
  const [pcount, setCount] = useState(5);
  const [pnum, setPnum] = useState(0);
  const [done, setDone] = useState(0);
  // const [password, setPass] = useState(11211);
  const [password, setPass] = useState(41324);

  const [seconds, setSeconds] = useState(0);

  if(!picks.length){
    var tmp = [];
    for (var i = 0; i < pcount; i++) {
      tmp.push(0);
    }

    setPicks(tmp);
  }

  const f = (v)=>{
    var d = Math.floor(v/3);
    if(d&1) return 3 - v%3;
    else return v%3;
  }

  const check = (tpicks)=>{
    var x = 0;
    for (var i = 0; i < pcount; i++) {
      x *= 10;
      x += f(tpicks[i]) + 1;
    }

    if(x==password){
      setDone(1);
    }
  }

  const incPick = (idx)=>{
    if(done) return;

    var tmp = [...picks];
    tmp[idx]+=1;

    setPicks(picks => tmp);
  }

  const fx = ()=>{
    var d = Math.floor(pnum/(pcount-1));
    if(d&1) return pcount - pnum%(pcount-1) - 1;
    else return pnum%(pcount-1);
  }

  const rotPick = (event)=>{
    if(done) return;

    var picker = event.target;
    picker.classList.add('tilt');
    picker.parentElement.children[1].classList.add('perTilt');
    setTimeout(()=>{
      incPick(fx());
      picker.classList.remove('tilt');
      picker.parentElement.children[1].classList.remove('perTilt');
      // setPnum(pnum+1);
    },200);
  }

  useEffect(() => {

    const interval = setInterval(() => {
      setPnum(pnum => pnum + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(()=>{
    check(picks);
  }, [picks]);

  return(
    <div className="boxapp">
      <div className="container aright">
        <div className="lockCont">
          <div className="picksCont">
            {picks.map((pick, idx)=>{
              return (
                <div className="pick" key={idx}>
                  <EmptyHolder/>
                  <EmptyHolder/>
                  <EmptyHolder/>
                  <EmptyHolder/>
                  <Spring h={pick}/>
                  <SpButton/>
                  <BluePin h={pick} done={done}/>
                </div>
              )
            })}
          </div>
        </div>
        <div className="toolsCont">
          <div className="pickerCont"
            onClick={rotPick}
            style={{
              left: (fx(pnum)*100*(1-done))+'px'
            }}>
            <div className="picker"></div>
            <div className="peck"></div>
          </div>
          <div className="wrench"></div>
        </div>
      </div>
    </div>
  );
}

export default LockPick;
