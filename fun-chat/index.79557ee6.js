(()=>{"use strict";var t={385:t=>{t.exports=function(t,e){return e||(e={}),t?(t=String(t.__esModule?t.default:t),e.hash&&(t+=e.hash),e.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(t)?'"'.concat(t,'"'):t):t}},875:(t,e,s)=>{t.exports=s.p+"images/favicon-32x32.ed0873eb.png"}},e={};function s(o){var i=e[o];if(void 0!==i)return i.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,s),a.exports}s.m=t,s.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return s.d(e,{a:e}),e},s.d=(t,e)=>{for(var o in e)s.o(e,o)&&!s.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})},s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),s.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),s.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t;s.g.importScripts&&(t=s.g.location+"");var e=s.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var o=e.getElementsByTagName("script");if(o.length)for(var i=o.length-1;i>-1&&(!t||!/^http(s?):/.test(t));)t=o[i--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=t})(),s.b=document.baseURI||self.location.href;var o={};(()=>{s.r(o);var t,e,i,a,n=s(385),r=s.n(n),l=new URL(s(875),s.b);r()(l);class h{constructor({tag:t="div",classNames:e=[],text:s=""},...o){this.children=[];const i=document.createElement(t);i.classList.add(...e),i.textContent=s,this.node=i,o&&this.appendChildren(o)}append(t){this.children.push(t),this.node.append(t.getNode())}appendChildren(t){t.forEach((t=>{this.append(t)}))}getNode(){return this.node}getChildren(){return this.children}setTextContent(t){this.node.textContent=t}setAttribute(t,e){this.node.setAttribute(t,e)}setAttributes(t){Object.keys(t).forEach((e=>{this.node.setAttribute(e,t[e])}))}getAttribute(t){return this.node.getAttribute(t)}removeAttribute(t){this.node.removeAttribute(t)}addClass(t){this.node.classList.add(t)}removeClass(t){this.node.classList.remove(t)}toggleClass(t){this.node.classList.toggle(t)}addListener(t,e,s=!1){this.node.addEventListener(t,e,s)}removeListener(t,e,s=!1){this.node.removeEventListener(t,e,s)}destroyChildren(){this.children.forEach((t=>{t.destroy()})),this.children.length=0}destroy(){this.destroyChildren(),this.node.remove()}}!function(t){t.PLACEHOLDER="placeholder",t.TYPE="type",t.NAME="name",t.ID="id",t.FOR="for",t.REQUIRED="required",t.ACTION="action",t.DISABLED="disabled",t.CHECKED="checked",t.VALUE="value",t.SELECTED="selected"}(t||(t={})),function(t){t.SRC="src",t.ALT="alt"}(e||(e={})),function(t){t.HREF="href",t.TARGET="target"}(i||(i={})),function(t){t.LOGIN="USER_LOGIN",t.LOGOUT="USER_LOGOUT",t.ACTIVE="USER_ACTIVE",t.INACTIVE="USER_INACTIVE",t.ERROR="ERROR"}(a||(a={}));class d extends h{constructor({classNames:e,id:s,type:o="text",name:i,placeholder:a,required:n,checked:r,onChange:l}){super({tag:"input",classNames:e}),this.setAttribute(t.ID,s),this.setAttribute(t.TYPE,o),this.setAttribute(t.NAME,i),a&&this.setAttribute(t.PLACEHOLDER,a),r&&this.setAttribute(t.CHECKED,r),n&&this.setAttribute(t.REQUIRED,n),l&&(this.onChange=l,this.addListener("input",this.onChange))}destroy(){this.onChange&&(this.removeListener("input",this.onChange),super.destroy())}}class c extends h{constructor({classNames:t,text:e,onClick:s}){super({tag:"button",classNames:t,text:e}),s&&(this.onClick=s,this.addListener("click",this.onClick))}destroy(){this.onClick&&(this.removeListener("click",this.onClick),super.destroy())}}const u=(t,...e)=>new h({tag:"div",classNames:t},...e),g=(t,e,s,o,i,a,n)=>new d({classNames:t,id:e,name:s,type:o,placeholder:i,required:a,onChange:n}),p=(t,e)=>new h({tag:"label",classNames:t,text:e}),m=(t,e,s)=>new c({classNames:t,text:e,onClick:s}),w=t=>new h({tag:"img",classNames:t}),b=t=>new h({tag:"a",classNames:t});class y extends h{constructor(t){super({tag:"header",classNames:["Header-module_header_uNX8Ji"]},new h({tag:"p",classNames:["Header-module_header-title_Ryd7lg"],text:"Fun Chat"})),this.logoutButton=m(["btn","header-btn"],"Log Out"),this.handleLogoutButtonClick=()=>{this.logoutButton.addClass("hidden")},this.handleUserLogout=()=>{this.logoutCallback()},this.logoutCallback=t,this.logoutButton.removeClass("hidden"),this.setContent()}setContent(){const t=u(["Header-module_wrapper_xhbvNE"]);this.logoutButton.addListener("click",this.handleLogoutButtonClick),this.logoutButton.addListener("click",this.handleUserLogout),"#chat"!==window.location.hash&&this.logoutButton.addClass("hidden"),t.appendChildren([this.logoutButton]),this.append(t)}}class L extends h{constructor(){super({tag:"main",classNames:["Main-module_main_d2LaAM","container"]})}}const v=s.p+"images/school-logo.ad178c0d.svg",E=s.p+"images/github-logo.1bc6258a.svg",C="Footer-module_link_IhM0Td",A="Footer-module_img_BHwJLh";class f extends h{constructor(){super({tag:"footer",classNames:["Footer-module_footer_lJrnFv"]}),this.setBlock()}setBlock(){const t=u(["Footer-module_copyright_U8o4L2"]),s=b([C]),o=b([C]),a=new h({tag:"span",classNames:["copy"],text:"© 2024, by Hrybach Oleksiy"}),n=w([A]),r=w([A]);s.setAttribute(i.HREF,"https://github.com/hrybach-oleksiy"),s.setAttribute(i.TARGET,"_blank"),o.setAttribute(i.HREF,"https://rs.school/js/"),o.setAttribute(i.TARGET,"_blank"),n.setAttribute(e.SRC,E),n.setAttribute(e.ALT,"GitHub Logo"),r.setAttribute(e.SRC,v),r.setAttribute(e.ALT,"RS School Logo"),s.append(n),o.append(r),t.appendChildren([s,o,a]),this.append(t)}}class _{constructor(t){this.locationHandler=()=>{let t=window.location.hash.replace("#","");0===t.length&&(t="/");const e=this.routes.find((e=>e.path===t));console.log(e),void 0!==e?e.callback():console.log("There are now such page")},this.routes=t,window.addEventListener("DOMContentLoaded",this.locationHandler),window.addEventListener("hashchange",this.locationHandler),this.locationHandler()}navigate(t){window.history.pushState({},"",`/${t}`);const e=t.split("/"),s=this.routes.find((t=>t.path===e[e.length-1]));void 0!==s?s.callback():console.log("There are now such page")}}function N(t){if(null==t)throw new Error(`${t} is not defined`)}const S="Modal-module_hidden_O_l9Hl";class U extends h{constructor(t){super({tag:"div",classNames:["Modal-module_modal_FjwuUY",S]}),this.contentElement=new h({tag:"div",classNames:["Modal-module_modal__content_IVvoQZ"]}),this.isOpen=!1,this.open=()=>{this.isOpen||(this.removeClass(S),this.isOpen=!0)},this.close=()=>{this.isOpen&&(this.addClass(S),this.isOpen=!1,this.destroy())},this.content=t}render(){const t=document.querySelector("main");N(t),this.contentElement.append(this.content),this.append(this.contentElement),t.append(this.getNode())}addCloseBtn(t){const e=m(["btn","close"],t);e.addListener("click",this.close),this.contentElement.append(e)}}class V{constructor(t,e,s,o){this.handleResponse=t=>{let e;switch(t.type){case a.LOGIN:e=t.payload,this.userLoginResponse(e);break;case a.LOGOUT:e=t.payload,this.userLogoutResponse(e);break;case a.ACTIVE:e=t.payload,this.getActiveUsersResponse(e);break;case a.INACTIVE:e=t.payload,this.getInActiveUsersResponse(e);break;case a.ERROR:e=t.payload,V.handleError(e);break;default:console.error("Unknown payload type:",t.payload)}},this.userLoginResponse=t=>{const e=document.querySelector(".header-btn");console.log(`User ${t.user.login} logged in successfully`),window.location.hash="chat",this.model.getActiveUser(),this.model.getInActiveUser(),e?.classList.remove("hidden")},this.userLogoutResponse=t=>{console.log(`User ${t.user.login} logged out successfully`),window.location.hash="login",console.log(this)},this.getActiveUsersResponse=t=>{this.chatView.renderUsers(t.users)},this.getInActiveUsersResponse=t=>{this.chatView.renderUsers(t.users)},this.model=t,this.authView=e,this.chatView=s,this.router=o}}V.handleError=t=>{const e=new h({tag:"div",classNames:["modal-error"],text:t.error}),s=new U(e);s.render(),s.addCloseBtn("Close"),s.open()};const R=V;class I{constructor(t){this.loginUser=(t,e)=>{const s={id:null,type:a.LOGIN,payload:{user:{login:t,password:e}}};console.log("login user before send",this.ws.readyState),this.ws.send(JSON.stringify(s)),console.log("login user after send",this.ws.readyState)},this.logoutUser=(t,e)=>{const s={id:null,type:a.LOGOUT,payload:{user:{login:t,password:e}}};this.ws.send(JSON.stringify(s))},this.getActiveUser=()=>{const t={id:null,type:a.ACTIVE,payload:null};this.ws.send(JSON.stringify(t))},this.getInActiveUser=()=>{const t={id:null,type:a.INACTIVE,payload:null};this.ws.send(JSON.stringify(t))},this.ws=t,"#chat"===window.location.hash&&(this.getActiveUser(),console.log("model constructor ready state",this.ws.readyState)),console.log("model constructor ready state",this.ws.readyState)}}const O="LoginView-module_text-field_x742KT",k="LoginView-module_label_rjuLej",T="LoginView-module_input_vFuc2V",D="LoginView-module_valid_VS22J5",x="LoginView-module_invalid_vUwoZg",M="LoginView-module_hidden__AQi6V",B="LoginView-module_name-error_hU3Fht",F="LoginView-module_password-error_z_Ewun";class P extends h{constructor(e,s){super({tag:"form",classNames:["LoginView-module_form_UVico1","form"]}),this.loginButton=m(["button","btn","login-btn"],"Login"),this.isNameValid=!1,this.isPasswordValid=!1,this.handleKeyDown=t=>{"Enter"===t.key&&this.isNameValid&&this.isPasswordValid&&(t.preventDefault(),this.saveUserData())},this.loginCallback=e,this.setUserDataCallback=s,this.setAttribute(t.ACTION,""),this.addListener("submit",(t=>{t.preventDefault(),this.saveUserData()})),document.addEventListener("keydown",this.handleKeyDown)}setForm(){const e=new h({tag:"h1",classNames:["form__title","title"],text:"Login"}),s=p([k],"Name"),o=p([k],"Password"),i=u([B,M]),a=u([F,M]);this.nameInput=g([T,"name-input"],"name","name","text","Enter your Name","true",(t=>{this.validateName(t)})),this.passwordInput=g([T],"password","password","password","Enter your Password","true",(t=>{this.validatePassword(t)})),s.setAttribute(t.FOR,"name"),o.setAttribute(t.FOR,"password");const n=u([O],s,this.nameInput,i),r=u([O],o,this.passwordInput,a);this.loginButton.setAttribute(t.DISABLED,"true"),this.appendChildren([e,n,r,this.loginButton])}toggleLoginButtonState(){this.isNameValid&&this.isPasswordValid?this.loginButton.removeAttribute(t.DISABLED):this.loginButton.setAttribute(t.DISABLED,"true")}toggleInputState(t,e,s){e.classList.toggle(D,t),e.classList.toggle(x,!t),"name"===s&&(this.isNameValid=t),"password"===s&&(this.isPasswordValid=t),0===e.value.length&&(e.classList.remove(D),e.classList.remove(x),"name"===s&&(this.isNameValid=!1),"password"===s&&(this.isPasswordValid=!1)),this.toggleLoginButtonState()}validateName(t){const e=t.target,s=P.validateTextField(e);this.toggleInputState(s,e,e.name)}validatePassword(t){const e=t.target,s=P.validatePasswordField(e);this.toggleInputState(s,e,e.name)}static validateTextField(t){const e=t.value,s=document.querySelector(`.${B}`);if(N(s),""===e.trim())return P.hideErrorMessage(s),!1;if(!/^[A-Za-z-]+$/.test(e))return P.showErrorMessage(s,'Field only accept English alphabet letters and the hyphen (" - ") symbol'),!1;if(!/^[A-Z]/.test(e))return P.showErrorMessage(s,"First letter of the name must be in uppercase"),!1;if(e.length<3){const t="Minimum length of the name is 3 characters";return P.showErrorMessage(s,t),!1}return P.hideErrorMessage(s),!0}static validatePasswordField(t){const e=t.value,s=document.querySelector(`.${F}`);return N(s),""===e.trim()?(P.hideErrorMessage(s),!1):/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_+=])[A-Za-z\d!@#$%^&*()-_+=]{8,}$/.test(e)?(P.hideErrorMessage(s),!0):(P.showErrorMessage(s,"Password must be at least 8 characters long and contain at least one uppercase letter and one number"),!1)}static showErrorMessage(t,e){const s=t;t.classList.remove(M),s.textContent=e}static hideErrorMessage(t){const e=t;t.classList.add(M),e.textContent=""}saveUserData(){const t=this.nameInput?.getNode(),e=this.passwordInput?.getNode();N(t),N(e);const s={login:t.value,password:e.value},o=JSON.stringify(s);sessionStorage.setItem("userData",o),this.loginCallback(s.login,s.password),this.setUserDataCallback(s)}}class H extends h{constructor(){super({tag:"div",classNames:["ChatView-module_chat_xTGoTU"]}),this.userListWrapperElem=u(["ChatView-module_user-list-wrapper_MQSN06"]),this.userList=new h({tag:"ul",classNames:["user-list"]}),this.renderUsers=t=>{t.forEach((t=>{const e=(s=t.login,new h({tag:"li",classNames:["list-item"],text:s}));var s;this.userList.append(e)}))}}setPage(){const t=u(["ChatView-module_message-field-wrapper_MNUO3I"]);this.userListWrapperElem.append(this.userList),this.appendChildren([this.userListWrapperElem,t])}}class G{constructor(){this.root=u(["app"]),this.main=new L,this.userData=null,this.handleUserLogout=()=>{if(this.userData){const{login:t,password:e}=this.userData;this.userModel.logoutUser(t,e),sessionStorage.removeItem("userData")}},this.setUserData=t=>{this.userData=t},document.body.append(this.root.getNode()),document.body.setAttribute("data-theme","light"),this.ws=new WebSocket("ws://127.0.0.1:4000"),this.userModel=new I(this.ws),this.authView=new P(this.userModel.loginUser,this.setUserData),this.chatView=new H;const t=this.createRoutes();this.router=new _(t),this.authController=new R(this.userModel,this.authView,this.chatView,this.router),this.ws.onmessage=t=>{const e=JSON.parse(t.data);console.log(e),this.authController.handleResponse(e)},this.userData=G.getUserData(),console.log("constructor ready state",this.ws.readyState)}createLayout(){const t=new y(this.handleUserLogout),e=new f;this.root.appendChildren([t,this.main,e])}createRoutes(){return[{path:"/",callback:()=>{this.main.destroyChildren(),this.authView.setForm(),this.main.append(this.authView)}},{path:"chat",callback:()=>{this.main.destroyChildren(),this.chatView.setPage(),this.main.append(this.chatView),0===this.ws.readyState&&console.log(" create rotes ws connecting")}},{path:"login",callback:()=>{this.main.destroyChildren(),this.authView.setForm(),this.main.append(this.authView)}}]}}G.getUserData=()=>{const t=sessionStorage.getItem("userData");if(console.log(t),t){const e=JSON.parse(t);return console.log(e),e}return null},(new G).createLayout()})()})();