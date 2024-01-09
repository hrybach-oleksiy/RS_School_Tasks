(()=>{"use strict";(e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})})({});const e=(e,t,s,n)=>{const a=document.createElement(e);if(t)for(const e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.setAttribute(e,t[e]);return s&&("string"==typeof s?a.textContent=s:s instanceof HTMLElement&&a.appendChild(s)),n&&(Array.isArray(n)?n.forEach((e=>{e instanceof HTMLElement&&a.appendChild(e)})):n instanceof HTMLElement&&a.appendChild(n)),a},t=e=>{const t=e.split(""),s=[];for(let e=0;e<t.length;e++)s.push("_");return s.join(" ")},s=["Capital of Turkey","Famous for Big Ben","The city of canals","Birth town of Salvador Dali","Birthplace of democracy","Known for the Great Wall","City of the Opera House","The land of the rising sun","City of seven hills","Famous for the Eiffel Tower"],n=["Ankara","London","Venice","Figueres","Athens","Beijing","Sydney","Tokyo","Rome","Paris"],a=e=>{const t=document.querySelector(".head"),s=document.querySelector(".body"),n=document.querySelector(".right-hand"),a=document.querySelector(".left-hand"),o=document.querySelector(".right-foot"),l=document.querySelector(".left-foot");switch(e){case 0:t.classList.add("hidden"),s.classList.add("hidden"),a.classList.add("hidden"),n.classList.add("hidden"),l.classList.add("hidden"),o.classList.add("hidden");break;case 1:t.classList.remove("hidden");break;case 2:s.classList.remove("hidden");break;case 3:a.classList.remove("hidden");break;case 4:n.classList.remove("hidden");break;case 5:l.classList.remove("hidden");break;case 6:o.classList.remove("hidden")}};let o="",l="",d=[],i=0;const c=e("div",{class:"container"}),r=e("div",{class:"wrapper"}),h=e("div",{class:"hangman__image"},null,[e("div",{class:"gallows-wrapper"},null,[e("img",{src:"assets/gallows.svg",alt:"Gallows",class:"gallows"})]),e("div",{class:"body-wrapper"},null,[e("img",{src:"assets/head.svg",alt:"Head",class:"head hidden"}),e("img",{src:"assets/body.svg",alt:"Body",class:"body hidden"}),e("img",{src:"assets/right-hand.svg",alt:"Right Hand",class:"right-hand hidden"}),e("img",{src:"assets/left-hand.svg",alt:"Left Hand",class:"left-hand hidden"}),e("img",{src:"assets/right-foot.svg",alt:"Right Foot",class:"right-foot hidden"}),e("img",{src:"assets/left-foot.svg",alt:"Left Foot",class:"left-foot hidden"})])]),u=e("div",{class:"hangman__content"}),m=e("div",{class:"hold"},""),g=e("div",{class:"hint"},null,[e("span",{class:"hint__heading"},"Hint: "),e("span",{class:"hint__text"},"Just a sample")]),p=e("div",{class:"guesses"},null,[e("span",{class:"guesses__heading"},"Incorrect guesses: "),e("span",{class:"guesses__text"},"0/6")]),f=e("div",{class:"keyboard"},null,[...(t=>{const s=[];for(let n=0;n<t.length;n++){const a=e("button",{class:"key","data-letter":t[n]},t[n]);s.push(a)}return s})(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"])]),v=e("h1",{class:"hangman__title"},"Hangman Game"),y=e("p",{class:"hangman__description"},"Use the keyboard below to guess the word"),_=(()=>{const e=document.createElement("div");return e.innerHTML='\n\t<div class="modal hidden">\n\t\t<div class="modal__content">\n\t\t\t<div class="modal__text">\n\t\t\t\t<h3 class="modal__title"></h3>\n\t\t\t\t<div class="modal__descr">\n\t\t\t\t\t<p>The secret word is:</p>\n\t\t\t\t\t<span class="modal__result"></span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<button class="btn play">Play Again</button>\n\t\t</div>\n\t</div>\n\t',e.children[0]})();c.append(v,y,r,_),u.append(m,g,p,f),r.append(h,u),document.body.append(c);const L=document.querySelector(".play"),b=document.querySelector(".modal__title"),k=document.querySelector(".modal__result"),C=document.querySelector(".guesses__text"),S=e=>{if(e.target.classList.contains("key")){const t=e.target.dataset.letter,s=e.target,n=o.split("");let c=0;if(o.toUpperCase()===l);else{if(i<6){for(let e=0;e<o.length;e++)t===n[e].toLowerCase()&&(d[e]=t.toUpperCase(),s.classList.add("disabled"),l=d.join(""),m.textContent=d.join(" "),c++);0===c?(i++,C.textContent=`${i}/6`,a(i),6===i&&(b.textContent="You loose. Game Over!",k.textContent=o,_.classList.remove("hidden"),document.querySelectorAll(".key").forEach((e=>{e.classList.remove("disabled")})),f.removeEventListener("click",S)),c=0):c=0}o.toUpperCase()===l&&(b.textContent="You win!",k.textContent=o,_.classList.remove("hidden"),document.querySelectorAll(".key").forEach((e=>{e.classList.remove("disabled")})),f.removeEventListener("click",S))}}};L.addEventListener("click",(()=>{w()}));const w=()=>{const e=document.querySelector(".hint__text");let l;o=(()=>{const e=Math.floor(Math.random()*n.length);return n[e]})(),console.log(o),l=n.indexOf(o),m.textContent=t(o),d=t(o).split(" "),e.textContent=s[l],i=0,C.textContent=`${i}/6`,_.classList.add("hidden"),a(0),f.addEventListener("click",S)};w()})();