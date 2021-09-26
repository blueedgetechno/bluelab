(this.webpackJsonpbluelab=this.webpackJsonpbluelab||[]).push([[0],{39:function(e,t,n){},40:function(e,t,n){},42:function(e,t,n){},51:function(e,t){},52:function(e,t,n){},61:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(30),i=n.n(c),s=(n(39),n(40),n(1));var o=function(){return Object(s.jsxs)("div",{className:"linkList",children:[Object(s.jsx)("a",{tabIndex:0,href:"https://github.com/blueedgetechno/bluelab",rel:"noopener noreferrer",target:"_blank",className:"github-corner","aria-label":"View source on GitHub",children:Object(s.jsxs)("svg",{width:80,height:80,className:"github-badge",viewBox:"0 0 250 250",style:{fill:"#a5a6d1",color:"#151513",position:"absolute",top:0,border:0,right:0},"aria-hidden":"true",children:[Object(s.jsx)("path",{d:"M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"}),Object(s.jsx)("path",{d:"M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2",fill:"currentColor",style:{transformOrigin:"130px 106px"},className:"octo-arm"}),Object(s.jsx)("path",{d:"M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z",fill:"currentColor",className:"octo-body"})]})}),Object(s.jsx)("div",{className:"labtitle",children:"BlueLab"}),Object(s.jsx)("div",{className:"expcont",children:[{url:"invKin",img:"invkin",name:"Inverse Kinematics"},{url:"bezCrv",img:"bezcrv",name:"B\xe9zier Curve"}].map((function(e){return Object(s.jsx)("div",{className:"card",children:Object(s.jsxs)("a",{href:"/".concat(e.url),children:[Object(s.jsx)("img",{src:"/img/".concat(e.img,".png"),alt:""}),Object(s.jsx)("span",{children:e.name})]})})}))})]})},l=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,64)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))},u=n(31),b=n(3),j=n(6),h=n(4),d=n(23),m=n.n(d),O=n(63),f=(n(42),function(){var e=Object(a.useState)([]),t=Object(h.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(O.d(0,0)),i=Object(h.a)(c,2),o=i[0],l=i[1],u=Object(a.useState)(!0),b=Object(h.a)(u,2),d=b[0],f=b[1],g=Object(a.useState)(!0),v=Object(h.a)(g,2),p=v[0],x=v[1],C=Object(a.useState)(4),k=Object(h.a)(C,2),w=k[0],N=k[1],S=Object(a.useState)(10),L=Object(h.a)(S,2),y=L[0],F=L[1],I=window.innerWidth,B=window.innerHeight,M=30;return Object(a.useEffect)((function(){d||function(){for(var e=Object(j.a)(n),t=y*I/100,a=20,c=w-1,i=-1;a;){for(c+1==w&&i+1==0?e[w-1]=O.c(o):0==c&&1==i&&(e[0]=O.d(I/2,B/2)),c+=i;c+1>0&&c<w;){var s=O.j(e[c-i],e[c]);s=O.f(s,-1*O.a(s)),e[c]=O.b(e[c-i],O.g(s,t)),c+=i}c+=i*=-1,a--}r(e),f(!0)}()}),[d]),Object(a.useEffect)((function(){for(var e=[],t=0;t<w;t++)e.push(O.d((50+t*y)*I/100,B/2));r(e),0==O.a(o)&&(console.log("Ok"),l(O.d(I/5,B/4))),f(!1)}),[w,y]),Object(s.jsxs)("div",{className:"boxapp",children:[Object(s.jsxs)("div",{className:"descrp",children:["An Implementation of",Object(s.jsx)("a",{href:"http://andreasaristidou.com/FABRIK",target:"_blank",children:" FABRIK"})," ","algorithm for the simulation of Inverse Kinemetics. Drag the green dot to interact",Object(s.jsx)("br",{}),"Inpiration: ",Object(s.jsx)("a",{href:"https://youtu.be/PGk0rnyTa1U?t=177",target:"_blank",children:"Sebastian Lague"})]}),Object(s.jsxs)("div",{className:"controls",onMouseOver:function(){return x(!1)},onMouseOut:function(){return x(!0)},children:[Object(s.jsxs)("div",{children:[Object(s.jsxs)("label",{htmlFor:"number",children:["N: ",w," "]}),Object(s.jsx)("input",{name:"number",type:"range",value:w,onChange:function(e){N(e.target.value)},min:"2",max:"16"})]}),Object(s.jsxs)("div",{children:[Object(s.jsxs)("label",{htmlFor:"number",children:["Length: ",y," "]}),Object(s.jsx)("input",{name:"number",type:"range",value:y,onChange:function(e){F(e.target.value)},min:"5",max:"25"})]})]}),Object(s.jsx)(m.a,{setup:function(e,t){e.createCanvas(I,B-5).parent(t)},draw:function(e){if(d||p){e.background("#0e0e16");for(var t=0;t<w;t++)e.fill("#53546c"),e.stroke("#53546c"),e.strokeWeight(0),e.ellipse(n[t].re,n[t].im,M,M),0!=t&&(e.strokeWeight(6),e.line(n[t-1].re,n[t-1].im,n[t].re,n[t].im));e.fill(51,215,120),e.strokeWeight(0),e.ellipse(o.re,o.im,18,18),e.fill(20,172,254),e.ellipse(I/2,B/2,18,18)}},mouseDragged:function(e){p&&(l(O.d(e.mouseX,e.mouseY)),f(!1))}})]})}),g=(n(52),function(){var e=Object(a.useState)([]),t=Object(h.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(-1),i=Object(h.a)(c,2),o=i[0],l=i[1],u=Object(a.useState)([]),b=Object(h.a)(u,2),d=b[0],f=b[1],g=Object(a.useState)(4),v=Object(h.a)(g,2),p=v[0],x=v[1],C=Object(a.useState)(!0),k=Object(h.a)(C,2),w=k[0],N=k[1],S=Object(a.useState)(!0),L=Object(h.a)(S,2),y=L[0],F=L[1],I=window.innerWidth,B=window.innerHeight,M=10,W=250,z=function(e){for(var t=[],n=0;n<W;n++){var a=A(e,n/W);t.push(a)}f(t)},A=function e(t){for(var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:.5,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:Object(j.a)(n),i=c.length,s=[],o=0;o<i-1;o++){var l=O.j(c[o+1],c[o]);l=O.b(c[o],O.g(l,a)),s.push(l),r&&y&&(t.stroke(83,84,108),t.strokeWeight(2),t.line(c[o].re,c[o].im,c[o+1].re,c[o+1].im),t.fill(83,84,108),t.strokeWeight(0),t.ellipse(l.re,l.im,6,6))}return 1==s.length?(r&&(t.fill("#33d778"),t.strokeWeight(0),t.ellipse(s[0].re,s[0].im,8,8)),s[0]):e(t,a,r,s)},D=function(e){var t=[73,240,143],n=[5,152,71];return[t[0]*(1-e)+e*n[0],t[1]*(1-e)+e*n[1],t[2]*(1-e)+e*n[2]]};return Object(a.useEffect)((function(){var e=[],t=1/p,n=O.d(I/2,.72*B),a=O.d(-t*I,0),c=2*O.h/p;n=O.b(n,O.g(a,.5)),e.push(n);for(var i=0;i<p-1;i++)a=O.g(a,O.d(O.e(c),O.i(c))),n=O.b(n,a),e.push(n);r(e)}),[p]),Object(s.jsxs)("div",{className:"boxapp",children:[Object(s.jsxs)("div",{className:"valbox",children:["t = ",Object(s.jsx)("span",{id:"val",children:"0"})]}),Object(s.jsxs)("div",{className:"descrp",children:["A Simple Visualization of",Object(s.jsxs)("a",{href:"https://en.wikipedia.org/wiki/B%C3%A9zier_curve",target:"_blank",children:[" ","B\xe9zier Curve"]})," ","using recursive approach. Drag the blue dots to change the shape of curve.",Object(s.jsx)("br",{}),"Inpiration: ",Object(s.jsx)("a",{href:"https://youtu.be/aVwxzDHniEw?t=116",target:"_blank",children:"Freya Holm\xe9r"})]}),Object(s.jsxs)("div",{className:"controls",onMouseOver:function(){return N(!1)},onMouseOut:function(){return N(!0)},children:[Object(s.jsxs)("div",{children:[Object(s.jsxs)("label",{htmlFor:"number",children:["N: ",p," "]}),Object(s.jsx)("input",{name:"number",type:"range",value:p,onChange:function(e){x(e.target.value)},min:"2",max:"16"})]}),Object(s.jsxs)("div",{children:[Object(s.jsxs)("label",{htmlFor:"showlines",children:["showLines: "," "]}),Object(s.jsx)("input",{name:"showlines",type:"checkbox",checked:y,onChange:function(e){F(e.target.checked)},min:"5",max:"25"})]})]}),Object(s.jsx)("div",{className:"bezbox",children:Object(s.jsx)(m.a,{setup:function(e,t){e.createCanvas(I,B).parent(t),z(e)},draw:function(e){e.background("#0e0e16");var t=function(e,t){var n=e%t;return 1&Math.floor(e/t)&&(n=t-n),n}(e.frameCount,W),a=A(e,0,1);document.getElementById("val").innerText=Math.round(100*t/W)/100;for(var r=1;r<=t;r++){var c,i=r==t?1:0;i?c=A(e,r/W,i):(c=d[r],e.stroke(D(r/W)),e.strokeWeight(4),e.line(a.re,a.im,c.re,c.im),a=c)}for(var s=0;s<n.length;s++)e.fill(20,172,254),e.strokeWeight(0),e.ellipse(n[s].re,n[s].im,M,M)},mouseDragged:function(e){if(w)if(o+1>0){var t=Object(j.a)(n);t[o]=O.d(e.mouseX,e.mouseY),r(t)}else o+1==0&&function(e){for(var t=I,a=0,r=0;r<n.length;r++){var c=O.a(O.j(n[r],O.d(e.mouseX,e.mouseY)));c<t&&(t=c,a=r)}l(t<30?a:-2)}(e)},mouseReleased:function(e){z(e),l(-1)}})})]})});i.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(u.a,{children:Object(s.jsxs)("div",{className:"App",children:["/"!=window.location.pathname?Object(s.jsxs)("a",{className:"home",href:"/",children:["<"," Home"]}):null,Object(s.jsxs)(b.c,{children:[Object(s.jsx)(b.a,{exact:!0,path:"/",component:o}),Object(s.jsx)(b.a,{exact:!0,path:"/invKin",component:f}),Object(s.jsx)(b.a,{exact:!0,path:"/bezCrv",component:g})]})]})})}),document.getElementById("root")),l()}},[[61,1,2]]]);
//# sourceMappingURL=main.33eb4cdf.chunk.js.map