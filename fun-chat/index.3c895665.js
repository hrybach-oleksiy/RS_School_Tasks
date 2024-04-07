(()=>{"use strict";var t={385:t=>{t.exports=function(t,e){return e||(e={}),t?(t=String(t.__esModule?t.default:t),e.hash&&(t+=e.hash),e.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(t)?'"'.concat(t,'"'):t):t}},875:(t,e,s)=>{t.exports=s.p+"images/favicon-32x32.ed0873eb.png"}},e={};function s(n){var r=e[n];if(void 0!==r)return r.exports;var o=e[n]={exports:{}};return t[n](o,o.exports,s),o.exports}s.m=t,s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var n in e)s.o(e,n)&&!s.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;s.g.importScripts&&(t=s.g.location+"");var e=s.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var n=e.getElementsByTagName("script");if(n.length)for(var r=n.length-1;r>-1&&(!t||!/^http(s?):/.test(t));)t=n[r--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=t})(),s.b=document.baseURI||self.location.href;var n={};(()=>{s.r(n);var t,e,r,o,i,a=s(385),l=s.n(a),u=new URL(s(875),s.b);l()(u);class c{constructor({tag:t="div",classNames:e=[],text:s=""},...n){this.children=[];const r=document.createElement(t);r.classList.add(...e),r.textContent=s,this.node=r,n&&this.appendChildren(n)}append(t){this.children.push(t),this.node.append(t.getNode())}appendChildren(t){t.forEach((t=>{this.append(t)}))}getNode(){return this.node}getChildren(){return this.children}setTextContent(t){this.node.textContent=t}setAttribute(t,e){this.node.setAttribute(t,e)}setAttributes(t){Object.keys(t).forEach((e=>{this.node.setAttribute(e,t[e])}))}getAttribute(t){return this.node.getAttribute(t)}removeAttribute(t){this.node.removeAttribute(t)}addClass(t){this.node.classList.add(t)}removeClass(t){this.node.classList.remove(t)}toggleClass(t){this.node.classList.toggle(t)}addListener(t,e,s=!1){this.node.addEventListener(t,e,s)}removeListener(t,e,s=!1){this.node.removeEventListener(t,e,s)}destroyChildren(){this.children.forEach((t=>{t.destroy()})),this.children.length=0}destroy(){this.destroyChildren(),this.node.remove()}}!function(t){t.GARAGE="garage",t.ENGINE="engine",t.WINNERS="winners"}(t||(t={})),function(t){t.GET="GET",t.DELETE="DELETE",t.PUT="PUT",t.POST="POST",t.PATCH="PATCH"}(e||(e={})),function(t){t.PLACEHOLDER="placeholder",t.TYPE="type",t.NAME="name",t.ID="id",t.FOR="for",t.REQUIRED="required",t.ACTION="action",t.DISABLED="disabled",t.CHECKED="checked",t.VALUE="value",t.SELECTED="selected"}(r||(r={})),function(t){t.SRC="src",t.ALT="alt"}(o||(o={})),function(t){t.HREF="href",t.TARGET="target"}(i||(i={}));class d extends c{constructor({classNames:t,id:e,type:s="text",name:n,placeholder:o,required:i,checked:a,onChange:l}){super({tag:"input",classNames:t}),this.setAttribute(r.ID,e),this.setAttribute(r.TYPE,s),this.setAttribute(r.NAME,n),o&&this.setAttribute(r.PLACEHOLDER,o),a&&this.setAttribute(r.CHECKED,a),i&&this.setAttribute(r.REQUIRED,i),l&&(this.onChange=l,this.addListener("input",this.onChange))}destroy(){this.onChange&&(this.removeListener("input",this.onChange),super.destroy())}}class h extends c{constructor({classNames:t,text:e,onClick:s}){super({tag:"button",classNames:t,text:e}),s&&(this.onClick=s,this.addListener("click",this.onClick))}destroy(){this.onClick&&(this.removeListener("click",this.onClick),super.destroy())}}const m=(t,...e)=>new c({tag:"div",classNames:t},...e),p=(t,e,s,n,r,o,i)=>new d({classNames:t,id:e,name:s,type:n,placeholder:r,required:o,onChange:i}),g=(t,e)=>new c({tag:"label",classNames:t,text:e}),b=(t,e,s)=>new h({classNames:t,text:e,onClick:s}),E=t=>new c({tag:"img",classNames:t}),v=t=>new c({tag:"a",classNames:t});class L extends c{constructor(t){super({tag:"header",classNames:["Header-module_header_uNX8Ji"]},new c({tag:"p",classNames:["Header-module_header-title_Ryd7lg"],text:"Fun Chat"})),this.handleLogoutButtonClick=()=>{this.router.navigate("login")},this.router=t,this.setContent()}setContent(){const t=m(["Header-module_wrapper_xhbvNE"]),e=b(["btn","header-btn"],"Log Out",this.handleLogoutButtonClick);t.appendChildren([e]),this.append(t)}}class f extends c{constructor(){super({tag:"main",classNames:["Main-module_main_d2LaAM","container"]})}}const C=s.p+"images/school-logo.ad178c0d.svg",y=s.p+"images/github-logo.1bc6258a.svg",A="Footer-module_link_IhM0Td",N="Footer-module_img_BHwJLh";class _ extends c{constructor(){super({tag:"footer",classNames:["Footer-module_footer_lJrnFv"]}),this.setBlock()}setBlock(){const t=m(["Footer-module_copyright_U8o4L2"]),e=v([A]),s=v([A]),n=new c({tag:"span",classNames:["copy"],text:"© 2024, by Hrybach Oleksiy"}),r=E([N]),a=E([N]);e.setAttribute(i.HREF,"https://github.com/hrybach-oleksiy"),e.setAttribute(i.TARGET,"_blank"),s.setAttribute(i.HREF,"https://rs.school/js/"),s.setAttribute(i.TARGET,"_blank"),r.setAttribute(o.SRC,y),r.setAttribute(o.ALT,"GitHub Logo"),a.setAttribute(o.SRC,C),a.setAttribute(o.ALT,"RS School Logo"),e.append(r),s.append(a),t.appendChildren([e,s,n]),this.append(t)}}class S{constructor(t,e){this.routes=t,this.pathSegmentsToKeep=e,document.addEventListener("DOMContentLoaded",(()=>{const t=window.location.pathname.split("/").slice(this.pathSegmentsToKeep-1).join("/");console.log("location after loading",t),this.navigate(t)}))}navigate(t){console.log(t);const e=t.split("/");console.log(e);const s=this.routes.find((t=>t.path===e[0]));console.log(s),void 0!==s?s.callback():console.log("There are now such page")}}function w(t){if(null==t)throw new Error(`${t} is not defined`)}const T="LoginForm-module_text-field_uUXidG",F="LoginForm-module_label_dptREz",x="LoginForm-module_input_MFVMkd",R="LoginForm-module_valid_eOALK9",k="LoginForm-module_invalid_k5Jre_",I="LoginForm-module_hidden_XXOG1v",D="LoginForm-module_name-error_qtqGwP",O="LoginForm-module_surname-error_L0D28R";class M extends c{constructor(t){super({tag:"form",classNames:["LoginForm-module_form_pEvhld","form"]}),this.loginButton=b(["button","btn"],"Login"),this.isNameValid=!1,this.isSurnameValid=!1,this.router=t,this.setAttribute(r.ACTION,""),this.setForm(),this.addListener("submit",(t=>{t.preventDefault(),this.router.navigate("chat")}))}setForm(){const t=new c({tag:"h1",classNames:["form__title","title"],text:"Login"}),e=g([F],"Name"),s=g([F],"Surname"),n=m([D,I]),o=m([O,I]);this.nameInput=p([x,"name-input"],"name","name","Enter your Name","true"),this.surnameInput=p([x],"surname","surname","Enter your Surname","true"),e.setAttribute(r.FOR,"name"),s.setAttribute(r.FOR,"surname");const i=m([T],e,this.nameInput,n),a=m([T],s,this.surnameInput,o);this.appendChildren([t,i,a,this.loginButton])}toggleButtonState(){this.isNameValid&&this.isSurnameValid?this.loginButton.removeAttribute(r.DISABLED):this.loginButton.setAttribute(r.DISABLED,"true")}toggleInputState(t,e,s){e.classList.toggle(R,t),e.classList.toggle(k,!t),"name"===s&&(this.isNameValid=t),"surname"===s&&(this.isSurnameValid=t),0===e.value.length&&(e.classList.remove(R),e.classList.remove(k),"name"===s&&(this.isNameValid=!1),"surname"===s&&(this.isSurnameValid=!1)),this.toggleButtonState()}validateName(t){const e=t.target,s=M.validateForm(e,`.${D}`,3);this.toggleInputState(s,e,e.name)}validateSurname(t){const e=t.target,s=M.validateForm(e,`.${O}`,4);this.toggleInputState(s,e,e.name)}static isFirstLetterUppercase(t){return/^[A-Z]/.test(t)}static validateForm(t,e,s){const n=t.value,r=document.querySelector(e);if(w(r),""===n.trim())return M.hideErrorMessage(r),!1;if(!/^[A-Za-z-]+$/.test(n))return M.showErrorMessage(r,'Field only accept English alphabet letters and the hyphen (" - ") symbol'),!1;if(!M.isFirstLetterUppercase(n))return M.showErrorMessage(r,"First letter of the field must be in uppercase"),!1;if(n.length<s){const t=`Minimum length of the ${3===s?"first name":"surname"} is ${s} characters`;return M.showErrorMessage(r,t),!1}return M.hideErrorMessage(r),!0}static showErrorMessage(t,e){const s=t;t.classList.remove(I),s.textContent=e}static hideErrorMessage(t){const e=t;t.classList.add(I),e.textContent=""}saveFormData(){const t=this.nameInput?.getNode(),e=this.surnameInput?.getNode();w(t),w(e);const s={name:t.value,surname:e.value},n=JSON.stringify(s);localStorage.setItem("userData",n)}clearForm(){this.getNode().reset(),this.nameInput?.removeClass(R),this.surnameInput?.removeClass(R)}}class P extends c{constructor(t){super({tag:"div",classNames:["chat"],text:"Chat"}),this.router=t}}(new class{constructor(){this.root=m(["app"]),this.pathSegmentsToKeep=2,this.main=new f,document.body.append(this.root.getNode()),document.body.setAttribute("data-theme","light");const t=this.createRoutes();this.router=new S(t,this.pathSegmentsToKeep)}createLayout(){const t=new L(this.router),e=new _;this.root.appendChildren([t,this.main,e])}createRoutes(){return[{path:"",callback:()=>{this.main.destroyChildren(),this.main.append(new M(this.router))}},{path:"chat",callback:()=>{this.main.destroyChildren(),this.main.append(new P(this.router))}},{path:"login",callback:()=>{this.main.destroyChildren(),this.main.append(new M(this.router))}}]}}).createLayout();const B=new WebSocket("ws://127.0.0.1:4000"),H=document.querySelector(".form");H&&H.addEventListener("submit",(function(t){t.preventDefault();const e=document.querySelector(".name-input");e.value&&(B.send(JSON.stringify({id:null,type:"USER_LOGIN",payload:{user:{login:"lalala",password:"bebebe"}}})),e.value=""),e.focus()})),B.addEventListener("message",(({data:t})=>{console.log(t)}))})()})();