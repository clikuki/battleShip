(()=>{var e={698:(e,s,t)=>{"use strict";t.r(s)},259:e=>{e.exports=(e,{props:s,children:t}={})=>{const n=document.createElement(e);if(s)for(const[e,t]of Object.entries(s))if("style"===e)for(const[e,t]of Object.entries(s.style))n.style.setProperty(e,t);else"function"!=typeof t?n.setAttribute(e,t):n[e]=t;return t&&t.length>0&&n.append(...t),n}},742:(e,s,t)=>{const{getNewShip:n}=t(687);function i(e,s,t){const i=n(e,s,t);if(t&&i.indices.some((e=>e>=100))||!t&&s%10+i.length>10)return null;for(const e of i.indices){if(this.tiles[e]){for(const e of i.indices)this.tiles[e]===i&&(this.tiles[e]=null);return null}this.tiles[e]=i}return this.ships.push(i),i}function o(e){const s=this.ships.findIndex((s=>s===e));this.ships.splice(s,1);for(const s of e.indices)this.tiles[s]=null}function r(e){if(void 0===e)return"attack index required";if(this.missedHits.concat(this.shipHits).includes(e))return"tile has already been hit";const s=this.tiles[e];return s?.hit(e)?(this.shipHits.push(e),s.isSunk&&(this.sunkenShips.push(s),this.sunkenShips.length===this.ships.length&&(this.allShipsHaveSunk=!0))):this.missedHits.push(e),s}e.exports={getNewBoard:()=>({allShipsHaveSunk:!1,sunkenShips:[],tiles:Array.from({length:100},(()=>null)),ships:[],missedHits:[],shipHits:[],setShip:i,removeShip:o,recieveAttack:r})}},60:(e,s,t)=>{const n=t(259),i={show:(e,s,...t)=>{e?(c.append(o),l.onclick=i.hide):(o.remove(),l.onclick=null);const a=n("h2",{children:[s],props:{class:"header"}}),h=n("div",{props:{class:"body"},children:t});r.replaceChildren(a,h),document.body.append(l),l.classList.remove("hide")},hide:()=>{l.classList.add("hide")}},o=n("button",{props:{class:"modalCloseBtn",onclick:i.hide}}),r=n("div",{props:{class:"modalContent"}}),c=n("div",{props:{class:"modal",onclick:e=>e.stopPropagation()},children:[o,r]}),l=n("div",{props:{class:"modalBackdrop",onclick:i.hide},children:[c]});e.exports=i},4:(e,s,t)=>{const{getNewBoard:n}=t(742),{SHIPTYPES:i}=t(687);function o(e){if("number"==typeof e)return this.gameboard.recieveAttack(e)}function r(e){if(!this.isComputer)return null;const s=e.gameboard.missedHits.concat(e.gameboard.shipHits);for(;;){const e=Math.floor(100*Math.random());if(!s.includes(e))return e}}function c(){if(this.isComputer)for(const e in i){let s;for(;!s;){const t=Math.floor(101*Math.random());for(const n of[!1,!0])if(s=this.gameboard.setShip(e,t,n),s)break}}}function l(){const e=this.gameboard.ships,s=this.gameboard.sunkenShips;return e.length===s.length}e.exports={getNewPlayer:e=>({gameboard:n(),isComputer:e,makeMove:o,getMove:r,generateShips:c,checkWin:l})}},745:(e,s,t)=>{const n=t(259),i=e=>{const s=e.startIndex,t=e.isVertical?"vertical":"horizontal";return n("div",{props:{"data-type":e.type,class:`ship ${t}`,style:{"--left":s%10,"--top":Math.floor(s/10),"--cell-num":e.length}}})};e.exports={getGameboard:(e,s)=>{const t=(e=>{const s=n("div",{children:e.gameboard.ships.map(i),props:{class:"ships "+(e.isComputer?"hide":"")}});return{shipContainer:s,shipElems:s.children}})(e),o=(e=>{const s=e.gameboard.missedHits.concat(e.gameboard.shipHits),t=Array.from({length:100},((e,t)=>{const i=s.includes(t);return n("div",{props:{class:"cell "+(i?"shot":"")}})}));return{grid:n("div",{children:t,props:{class:"grid"}}),cells:t}})(e);return{mainElem:n("div",{children:[t.shipContainer,o.grid],props:{class:s||""}}),...t,...o}},getShipElem:i}},687:e=>{const s={CARRIER:"CARRIER",BATTLESHIP:"BATTLESHIP",DESTROYER:"DESTROYER",SUBMARINE:"SUBMARINE",PATROLBOAT:"PATROLBOAT"},t={CARRIER:5,BATTLESHIP:4,DESTROYER:3,SUBMARINE:3,PATROLBOAT:2};function n(e){return!!this.indices.includes(e)&&(this.hitIndices.push(e),i(this)&&(this.isSunk=!0),!0)}const i=e=>e.indices.length===e.hitIndices.length&&e.hitIndices.every((s=>e.indices.includes(s)));e.exports={getNewShip:(e,i,o)=>{if(!s[e])return null;const r=t[e],c=((e,s,n)=>{const i=[],o=t[e];for(let e=0;e<o;e++){const t=s+(n?10:1)*e;i.push(t)}return i})(e,i,o);return{type:e,length:r,isVertical:o,isSunk:!1,startIndex:i,indices:c,hitIndices:[],hit:n}},SHIPTYPES:s}}},s={};function t(n){var i=s[n];if(void 0!==i)return i.exports;var o=s[n]={exports:{}};return e[n](o,o.exports,t),o.exports}t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{const{getNewPlayer:e}=t(4),{SHIPTYPES:s}=t(687),{getGameboard:n,getShipElem:i}=t(745),o=t(259),r=t(60);t(698);const c=(e,s,t,n)=>{const o=e.gameboard.setShip(s,t,n);if(!o)return o;const r=i(o);return e.elems.shipContainer.append(r),{elem:r,...o}},l=(e,s)=>{e.gameboard.removeShip(s),s.elem.remove()},a=e=>{r.show(!0,e.isComputer?"Game Over!":"Congratulations!",o("p",{children:[`You ${e.isComputer?"lost, and you were taken over by the hacker.":"won against the hacker!"} Try again?`],props:{class:"gameFinish"}}),o("button",{props:{onclick:h},children:["Restart"]}))},h=async()=>{const t=document.querySelector("main"),i=e(!1),h=e(!0);i.elems=n(i,"side human"),h.elems=n(h,"side computer"),t.replaceChildren(i.elems.mainElem,h.elems.mainElem);const p=await(async()=>{const t=e(!1),i=n(t,"placeShipBoard");t.elems=i;const a=[];let h=!1;const p=o("span",{props:{class:"shipTypeDisplay"}});r.show(!1,"Place your ships!",p,o("button",{children:["Change orientation: False"],props:{class:"switchBtn",onclick:e=>{h=!h;const s=h.toString(),t=`Change orientation: ${s[0].toUpperCase()}${s.slice(1)}`;e.target.textContent=t}}}),i.mainElem);for(const e in s){p.textContent=`Current Ship: ${e}`;const s=await new Promise((s=>{let n;i.cells.forEach(((i,o)=>{i.onclick=()=>{n&&s([e,o,h])},i.onmouseenter=()=>{n&&(l(t,n),n=null),n=c(t,e,o,h)},i.onmouseleave=()=>{n&&(l(t,n),n=null)}}))}));a.push(s)}return(()=>{for(const e of i.cells)e.onclick=null,e.onmouseenter=null,e.onmouseleave=null})(),r.hide(),a})();for(const[e,s,t]of p)c(i,e,s,t);h.generateShips(),((e,s)=>{const t=(e,s,t)=>(s.classList.add("shot"),!(!e.makeMove(t)||(s.classList.add("hadShip"),!e.checkWin())||(n.forEach((([e,s])=>{e.removeEventListener("click",s)})),0))),n=s.elems.cells.map(((n,i)=>{const o=()=>{const r=s.getMove(e),c=e.elems.cells[r];t(s,n,i)?a(e):t(e,c,r)?a(s):n.removeEventListener("click",o)};return n.addEventListener("click",o),[n,o]}))})(i,h)};window.startGame=h})()})();
//# sourceMappingURL=main.bundle.js.map