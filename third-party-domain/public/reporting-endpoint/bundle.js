/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=window,e$5=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$6=new WeakMap;class o$6{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$5&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$6.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$6.set(s,t));}return t}toString(){return this.cssText}}const r$2=t=>new o$6("string"==typeof t?t:t+"",void 0,s$3),i$5=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$6(n,t,s$3)},S$1=(s,n)=>{e$5?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$5?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$2;const e$4=window,r$1=e$4.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$5=e$4.reactiveElementPolyfillSupport,n$5={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$3={attribute:!0,type:String,converter:n$5,reflect:!1,hasChanged:a$1},d$1="finalized";class u$1 extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$3){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$3}static finalize(){if(this.hasOwnProperty(d$1))return !1;this[d$1]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$3){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$5).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$5;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}}u$1[d$1]=!0,u$1.elementProperties=new Map,u$1.elementStyles=[],u$1.shadowRootOptions={mode:"open"},null==o$5||o$5({ReactiveElement:u$1}),(null!==(s$2=e$4.reactiveElementVersions)&&void 0!==s$2?s$2:e$4.reactiveElementVersions=[]).push("1.6.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$4=window,s$1=i$4.trustedTypes,e$3=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$4="$lit$",n$4=`lit$${(Math.random()+"").slice(9)}$`,l$2="?"+n$4,h=`<${l$2}>`,r=document,u=()=>r.createComment(""),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,c=Array.isArray,v=t=>c(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),a="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${a}(?:([^\\s"'>=/]+)(${a}*=${a}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,w=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),x=w(1),T=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),E=new WeakMap,C=r.createTreeWalker(r,129,null,!1);function P(t,i){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$3?e$3.createHTML(i):i}const V=(t,i)=>{const s=t.length-1,e=[];let l,r=2===i?"<svg>":"",u=f;for(let i=0;i<s;i++){const s=t[i];let d,c,v=-1,a=0;for(;a<s.length&&(u.lastIndex=a,c=u.exec(s),null!==c);)a=u.lastIndex,u===f?"!--"===c[1]?u=_:void 0!==c[1]?u=m:void 0!==c[2]?(y.test(c[2])&&(l=RegExp("</"+c[2],"g")),u=p):void 0!==c[3]&&(u=p):u===p?">"===c[0]?(u=null!=l?l:f,v=-1):void 0===c[1]?v=-2:(v=u.lastIndex-c[2].length,d=c[1],u=void 0===c[3]?p:'"'===c[3]?$:g):u===$||u===g?u=p:u===_||u===m?u=f:(u=p,l=void 0);const w=u===p&&t[i+1].startsWith("/>")?" ":"";r+=u===f?s+h:v>=0?(e.push(d),s.slice(0,v)+o$4+s.slice(v)+n$4+w):s+n$4+(-2===v?(e.push(void 0),i):w);}return [P(t,r+(t[s]||"<?>")+(2===i?"</svg>":"")),e]};class N{constructor({strings:t,_$litType$:i},e){let h;this.parts=[];let r=0,d=0;const c=t.length-1,v=this.parts,[a,f]=V(t,i);if(this.el=N.createElement(a,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(h=C.nextNode())&&v.length<c;){if(1===h.nodeType){if(h.hasAttributes()){const t=[];for(const i of h.getAttributeNames())if(i.endsWith(o$4)||i.startsWith(n$4)){const s=f[d++];if(t.push(i),void 0!==s){const t=h.getAttribute(s.toLowerCase()+o$4).split(n$4),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:r,name:i[2],strings:t,ctor:"."===i[1]?H:"?"===i[1]?L:"@"===i[1]?z:k});}else v.push({type:6,index:r});}for(const i of t)h.removeAttribute(i);}if(y.test(h.tagName)){const t=h.textContent.split(n$4),i=t.length-1;if(i>0){h.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)h.append(t[s],u()),C.nextNode(),v.push({type:2,index:++r});h.append(t[i],u());}}}else if(8===h.nodeType)if(h.data===l$2)v.push({type:2,index:r});else {let t=-1;for(;-1!==(t=h.data.indexOf(n$4,t+1));)v.push({type:7,index:r}),t+=n$4.length-1;}r++;}}static createElement(t,i){const s=r.createElement("template");return s.innerHTML=t,s}}function S(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=S(t,r._$AS(t,i.values),r,e)),i}class M{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:r).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,h=0,u=e[0];for(;void 0!==u;){if(l===u.index){let i;2===u.type?i=new R(n,n.nextSibling,this,t):1===u.type?i=new u.ctor(n,u.name,u.strings,this,t):6===u.type&&(i=new Z(n,this,t)),this._$AV.push(i),u=e[++h];}l!==(null==u?void 0:u.index)&&(n=C.nextNode(),l++);}return C.currentNode=r,o}v(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class R{constructor(t,i,s,e){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cp=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null==t?void 0:t.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=S(this,t,i),d(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==T&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):v(t)?this.T(t):this._(t);}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t));}_(t){this._$AH!==A&&d(this._$AH)?this._$AA.nextSibling.data=t:this.$(r.createTextNode(t)),this._$AH=t;}g(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=N.createElement(P(e.h,e.h[0]),this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.v(s);else {const t=new M(o,this),i=t.u(this.options);t.v(s),this.$(i),this._$AH=t;}}_$AC(t){let i=E.get(t.strings);return void 0===i&&E.set(t.strings,i=new N(t)),i}T(t){c(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new R(this.k(u()),this.k(u()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cp=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class k{constructor(t,i,s,e,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=S(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=S(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===A?t=A:t!==A&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class H extends k{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}const I=s$1?s$1.emptyScript:"";class L extends k{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==A?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name);}}class z extends k{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=S(this,t,i,0))&&void 0!==s?s:A)===T)return;const e=this._$AH,o=t===A&&e!==A||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==A&&(e===A||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t);}}const B=i$4.litHtmlPolyfillSupport;null==B||B(N,R),(null!==(t$2=i$4.litHtmlVersions)&&void 0!==t$2?t$2:i$4.litHtmlVersions=[]).push("2.8.0");const D=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new R(i.insertBefore(u(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$1,o$3;class s extends u$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return T}}s.finalized=!0,s._$litElement$=!0,null===(l$1=globalThis.litElementHydrateSupport)||void 0===l$1||l$1.call(globalThis,{LitElement:s});const n$3=globalThis.litElementPolyfillSupport;null==n$3||n$3({LitElement:s});(null!==(o$3=globalThis.litElementVersions)&&void 0!==o$3?o$3:globalThis.litElementVersions=[]).push("3.3.3");

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  };
  return __assign.apply(this, arguments);
};

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$2=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$3=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}},e$1=(i,e,n)=>{e.constructor.createProperty(n,i);};function n$2(n){return (t,o)=>void 0!==o?e$1(n,t,o):i$3(n,t)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$1(t){return n$2({...t,state:!0})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$2=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function i$2(i,n){return o$2({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(n){const n="symbol"==typeof o?Symbol():"__"+o;t.get=function(){var o,t;return void 0===this[n]&&(this[n]=null!==(t=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==t?t:null),this[n]};}return t}})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n$1;null!=(null===(n$1=window.HTMLSlotElement)||void 0===n$1?void 0:n$1.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles$1 = i$5 `.mdc-top-app-bar{background-color:#6200ee;background-color:var(--mdc-theme-primary, #6200ee);color:white;display:flex;position:fixed;flex-direction:column;justify-content:space-between;box-sizing:border-box;width:100%;z-index:4}.mdc-top-app-bar .mdc-top-app-bar__action-item,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon{color:#fff;color:var(--mdc-theme-on-primary, #fff)}.mdc-top-app-bar .mdc-top-app-bar__action-item::before,.mdc-top-app-bar .mdc-top-app-bar__action-item::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon::after{background-color:#fff;background-color:var(--mdc-ripple-color, var(--mdc-theme-on-primary, #fff))}.mdc-top-app-bar .mdc-top-app-bar__action-item:hover::before,.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-surface--hover::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:hover::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-surface--hover::before{opacity:0.08;opacity:var(--mdc-ripple-hover-opacity, 0.08)}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded--background-focused::before,.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):focus::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded--background-focused::before,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):focus::before{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-focus-opacity, 0.24)}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded)::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}.mdc-top-app-bar .mdc-top-app-bar__action-item:not(.mdc-ripple-upgraded):active::after,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:0.24;opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-top-app-bar .mdc-top-app-bar__action-item.mdc-ripple-upgraded,.mdc-top-app-bar .mdc-top-app-bar__navigation-icon.mdc-ripple-upgraded{--mdc-ripple-fg-opacity:var(--mdc-ripple-press-opacity, 0.24)}.mdc-top-app-bar__row{display:flex;position:relative;box-sizing:border-box;width:100%;height:64px}.mdc-top-app-bar__section{display:inline-flex;flex:1 1 auto;align-items:center;min-width:0;padding:8px 12px;z-index:1}.mdc-top-app-bar__section--align-start{justify-content:flex-start;order:-1}.mdc-top-app-bar__section--align-end{justify-content:flex-end;order:1}.mdc-top-app-bar__title{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-family:Roboto, sans-serif;font-family:var(--mdc-typography-headline6-font-family, var(--mdc-typography-font-family, Roboto, sans-serif));font-size:1.25rem;font-size:var(--mdc-typography-headline6-font-size, 1.25rem);line-height:2rem;line-height:var(--mdc-typography-headline6-line-height, 2rem);font-weight:500;font-weight:var(--mdc-typography-headline6-font-weight, 500);letter-spacing:0.0125em;letter-spacing:var(--mdc-typography-headline6-letter-spacing, 0.0125em);text-decoration:inherit;text-decoration:var(--mdc-typography-headline6-text-decoration, inherit);text-transform:inherit;text-transform:var(--mdc-typography-headline6-text-transform, inherit);padding-left:20px;padding-right:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;z-index:1}[dir=rtl] .mdc-top-app-bar__title,.mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:20px}.mdc-top-app-bar--short-collapsed{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:24px;border-bottom-left-radius:0}[dir=rtl] .mdc-top-app-bar--short-collapsed,.mdc-top-app-bar--short-collapsed[dir=rtl]{border-top-left-radius:0;border-top-right-radius:0;border-bottom-right-radius:0;border-bottom-left-radius:24px}.mdc-top-app-bar--short{top:0;right:auto;left:0;width:100%;transition:width 250ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-top-app-bar--short,.mdc-top-app-bar--short[dir=rtl]{right:0;left:auto}.mdc-top-app-bar--short .mdc-top-app-bar__row{height:56px}.mdc-top-app-bar--short .mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short .mdc-top-app-bar__title{transition:opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);opacity:1}.mdc-top-app-bar--short-collapsed{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);width:56px;transition:width 300ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__title{display:none}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__action-item{transition:padding 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item{width:112px}.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}[dir=rtl] .mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end,.mdc-top-app-bar--short-collapsed.mdc-top-app-bar--short-has-action-item .mdc-top-app-bar__section--align-end[dir=rtl]{padding-left:12px;padding-right:0}.mdc-top-app-bar--dense .mdc-top-app-bar__row{height:48px}.mdc-top-app-bar--dense .mdc-top-app-bar__section{padding:0 4px}.mdc-top-app-bar--dense .mdc-top-app-bar__title{padding-left:12px;padding-right:0}[dir=rtl] .mdc-top-app-bar--dense .mdc-top-app-bar__title,.mdc-top-app-bar--dense .mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:12px}.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:128px}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{align-self:flex-end;padding-bottom:2px}.mdc-top-app-bar--prominent .mdc-top-app-bar__action-item,.mdc-top-app-bar--prominent .mdc-top-app-bar__navigation-icon{align-self:flex-start}.mdc-top-app-bar--fixed{transition:box-shadow 200ms linear}.mdc-top-app-bar--fixed-scrolled{box-shadow:0px 2px 4px -1px rgba(0, 0, 0, 0.2),0px 4px 5px 0px rgba(0, 0, 0, 0.14),0px 1px 10px 0px rgba(0,0,0,.12);transition:box-shadow 200ms linear}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__row{height:96px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section{padding:0 12px}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-left:20px;padding-right:0;padding-bottom:9px}[dir=rtl] .mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title,.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__title[dir=rtl]{padding-left:0;padding-right:20px}.mdc-top-app-bar--fixed-adjust{padding-top:64px}.mdc-top-app-bar--dense-fixed-adjust{padding-top:48px}.mdc-top-app-bar--short-fixed-adjust{padding-top:56px}.mdc-top-app-bar--prominent-fixed-adjust{padding-top:128px}.mdc-top-app-bar--dense-prominent-fixed-adjust{padding-top:96px}@media(max-width: 599px){.mdc-top-app-bar__row{height:56px}.mdc-top-app-bar__section{padding:4px}.mdc-top-app-bar--short{transition:width 200ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed{transition:width 250ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end{padding-left:0;padding-right:12px}[dir=rtl] .mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end,.mdc-top-app-bar--short-collapsed .mdc-top-app-bar__section--align-end[dir=rtl]{padding-left:12px;padding-right:0}.mdc-top-app-bar--prominent .mdc-top-app-bar__title{padding-bottom:6px}.mdc-top-app-bar--fixed-adjust{padding-top:56px}}:host{display:block}.mdc-top-app-bar{color:#fff;color:var(--mdc-theme-on-primary, #fff);width:100%;width:var(--mdc-top-app-bar-width, 100%)}.mdc-top-app-bar--prominent #navigation ::slotted(*),.mdc-top-app-bar--prominent #actions ::slotted(*){align-self:flex-start}#navigation ::slotted(*),#actions ::slotted(*){--mdc-icon-button-ripple-opacity: 0.24}.mdc-top-app-bar--short-collapsed #actions ::slotted(*){transition:padding 150ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-top-app-bar__section--align-center{justify-content:center}.mdc-top-app-bar__section--align-center .mdc-top-app-bar__title{padding-left:0;padding-right:0}.center-title .mdc-top-app-bar__section--align-start,.center-title .mdc-top-app-bar__section--align-end{flex-basis:0}.mdc-top-app-bar--dense.mdc-top-app-bar--prominent .mdc-top-app-bar__section--align-center .mdc-top-app-bar__title{padding-left:0;padding-right:0}.mdc-top-app-bar--fixed-scrolled{box-shadow:var(--mdc-top-app-bar-fixed-box-shadow, 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12))}`;

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var cssClasses = {
    FIXED_CLASS: 'mdc-top-app-bar--fixed',
    FIXED_SCROLLED_CLASS: 'mdc-top-app-bar--fixed-scrolled',
    SHORT_CLASS: 'mdc-top-app-bar--short',
    SHORT_COLLAPSED_CLASS: 'mdc-top-app-bar--short-collapsed',
    SHORT_HAS_ACTION_ITEM_CLASS: 'mdc-top-app-bar--short-has-action-item',
};
var numbers = {
    DEBOUNCE_THROTTLE_RESIZE_TIME_MS: 100,
    MAX_TOP_APP_BAR_HEIGHT: 128,
};
var strings = {
    ACTION_ITEM_SELECTOR: '.mdc-top-app-bar__action-item',
    NAVIGATION_EVENT: 'MDCTopAppBar:nav',
    NAVIGATION_ICON_SELECTOR: '.mdc-top-app-bar__navigation-icon',
    ROOT_SELECTOR: '.mdc-top-app-bar',
    TITLE_SELECTOR: '.mdc-top-app-bar__title',
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFoundation = /** @class */ (function () {
    function MDCFoundation(adapter) {
        if (adapter === void 0) { adapter = {}; }
        this.adapter = adapter;
    }
    Object.defineProperty(MDCFoundation, "cssClasses", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports every
            // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "strings", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "numbers", {
        get: function () {
            // Classes extending MDCFoundation should implement this method to return an object which exports all
            // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCFoundation, "defaultAdapter", {
        get: function () {
            // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
            // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
            // validation.
            return {};
        },
        enumerable: false,
        configurable: true
    });
    MDCFoundation.prototype.init = function () {
        // Subclasses should override this method to perform initialization routines (registering events, etc.)
    };
    MDCFoundation.prototype.destroy = function () {
        // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    };
    return MDCFoundation;
}());

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCTopAppBarBaseFoundation = /** @class */ (function (_super) {
    __extends(MDCTopAppBarBaseFoundation, _super);
    /* istanbul ignore next: optional argument is not a branch statement */
    function MDCTopAppBarBaseFoundation(adapter) {
        return _super.call(this, __assign(__assign({}, MDCTopAppBarBaseFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCTopAppBarBaseFoundation, "strings", {
        get: function () {
            return strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "cssClasses", {
        get: function () {
            return cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "numbers", {
        get: function () {
            return numbers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCTopAppBarBaseFoundation, "defaultAdapter", {
        /**
         * See {@link MDCTopAppBarAdapter} for typing information on parameters and return types.
         */
        get: function () {
            // tslint:disable:object-literal-sort-keys Methods should be in the same order as the adapter interface.
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                hasClass: function () { return false; },
                setStyle: function () { return undefined; },
                getTopAppBarHeight: function () { return 0; },
                notifyNavigationIconClicked: function () { return undefined; },
                getViewportScrollY: function () { return 0; },
                getTotalActionItems: function () { return 0; },
            };
            // tslint:enable:object-literal-sort-keys
        },
        enumerable: false,
        configurable: true
    });
    /** Other variants of TopAppBar foundation overrides this method */
    MDCTopAppBarBaseFoundation.prototype.handleTargetScroll = function () { }; // tslint:disable-line:no-empty
    /** Other variants of TopAppBar foundation overrides this method */
    MDCTopAppBarBaseFoundation.prototype.handleWindowResize = function () { }; // tslint:disable-line:no-empty
    MDCTopAppBarBaseFoundation.prototype.handleNavigationClick = function () {
        this.adapter.notifyNavigationIconClicked();
    };
    return MDCTopAppBarBaseFoundation;
}(MDCFoundation));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var INITIAL_VALUE = 0;
var MDCTopAppBarFoundation = /** @class */ (function (_super) {
    __extends(MDCTopAppBarFoundation, _super);
    /* istanbul ignore next: optional argument is not a branch statement */
    function MDCTopAppBarFoundation(adapter) {
        var _this = _super.call(this, adapter) || this;
        /**
         * Indicates if the top app bar was docked in the previous scroll handler iteration.
         */
        _this.wasDocked = true;
        /**
         * Indicates if the top app bar is docked in the fully shown position.
         */
        _this.isDockedShowing = true;
        /**
         * Variable for current scroll position of the top app bar
         */
        _this.currentAppBarOffsetTop = 0;
        /**
         * Used to prevent the top app bar from being scrolled out of view during resize events
         */
        _this.isCurrentlyBeingResized = false;
        /**
         * The timeout that's used to throttle the resize events
         */
        _this.resizeThrottleId = INITIAL_VALUE;
        /**
         * The timeout that's used to debounce toggling the isCurrentlyBeingResized
         * variable after a resize
         */
        _this.resizeDebounceId = INITIAL_VALUE;
        _this.lastScrollPosition = _this.adapter.getViewportScrollY();
        _this.topAppBarHeight = _this.adapter.getTopAppBarHeight();
        return _this;
    }
    MDCTopAppBarFoundation.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.adapter.setStyle('top', '');
    };
    /**
     * Scroll handler for the default scroll behavior of the top app bar.
     */
    MDCTopAppBarFoundation.prototype.handleTargetScroll = function () {
        var currentScrollPosition = Math.max(this.adapter.getViewportScrollY(), 0);
        var diff = currentScrollPosition - this.lastScrollPosition;
        this.lastScrollPosition = currentScrollPosition;
        // If the window is being resized the lastScrollPosition needs to be updated
        // but the current scroll of the top app bar should stay in the same
        // position.
        if (!this.isCurrentlyBeingResized) {
            this.currentAppBarOffsetTop -= diff;
            if (this.currentAppBarOffsetTop > 0) {
                this.currentAppBarOffsetTop = 0;
            }
            else if (Math.abs(this.currentAppBarOffsetTop) > this.topAppBarHeight) {
                this.currentAppBarOffsetTop = -this.topAppBarHeight;
            }
            this.moveTopAppBar();
        }
    };
    /**
     * Top app bar resize handler that throttle/debounce functions that execute updates.
     */
    MDCTopAppBarFoundation.prototype.handleWindowResize = function () {
        var _this = this;
        // Throttle resize events 10 p/s
        if (!this.resizeThrottleId) {
            this.resizeThrottleId = setTimeout(function () {
                _this.resizeThrottleId = INITIAL_VALUE;
                _this.throttledResizeHandler();
            }, numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
        }
        this.isCurrentlyBeingResized = true;
        if (this.resizeDebounceId) {
            clearTimeout(this.resizeDebounceId);
        }
        this.resizeDebounceId = setTimeout(function () {
            _this.handleTargetScroll();
            _this.isCurrentlyBeingResized = false;
            _this.resizeDebounceId = INITIAL_VALUE;
        }, numbers.DEBOUNCE_THROTTLE_RESIZE_TIME_MS);
    };
    /**
     * Function to determine if the DOM needs to update.
     */
    MDCTopAppBarFoundation.prototype.checkForUpdate = function () {
        var offscreenBoundaryTop = -this.topAppBarHeight;
        var hasAnyPixelsOffscreen = this.currentAppBarOffsetTop < 0;
        var hasAnyPixelsOnscreen = this.currentAppBarOffsetTop > offscreenBoundaryTop;
        var partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen;
        // If it's partially showing, it can't be docked.
        if (partiallyShowing) {
            this.wasDocked = false;
        }
        else {
            // Not previously docked and not partially showing, it's now docked.
            if (!this.wasDocked) {
                this.wasDocked = true;
                return true;
            }
            else if (this.isDockedShowing !== hasAnyPixelsOnscreen) {
                this.isDockedShowing = hasAnyPixelsOnscreen;
                return true;
            }
        }
        return partiallyShowing;
    };
    /**
     * Function to move the top app bar if needed.
     */
    MDCTopAppBarFoundation.prototype.moveTopAppBar = function () {
        if (this.checkForUpdate()) {
            // Once the top app bar is fully hidden we use the max potential top app bar height as our offset
            // so the top app bar doesn't show if the window resizes and the new height > the old height.
            var offset = this.currentAppBarOffsetTop;
            if (Math.abs(offset) >= this.topAppBarHeight) {
                offset = -numbers.MAX_TOP_APP_BAR_HEIGHT;
            }
            this.adapter.setStyle('top', offset + 'px');
        }
    };
    /**
     * Throttled function that updates the top app bar scrolled values if the
     * top app bar height changes.
     */
    MDCTopAppBarFoundation.prototype.throttledResizeHandler = function () {
        var currentHeight = this.adapter.getTopAppBarHeight();
        if (this.topAppBarHeight !== currentHeight) {
            this.wasDocked = false;
            // Since the top app bar has a different height depending on the screen width, this
            // will ensure that the top app bar remains in the correct location if
            // completely hidden and a resize makes the top app bar a different height.
            this.currentAppBarOffsetTop -= this.topAppBarHeight - currentHeight;
            this.topAppBarHeight = currentHeight;
        }
        this.handleTargetScroll();
    };
    return MDCTopAppBarFoundation;
}(MDCTopAppBarBaseFoundation));
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var MDCTopAppBarFoundation$1 = MDCTopAppBarFoundation;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
function addHasRemoveClass(element) {
    return {
        addClass: (className) => {
            element.classList.add(className);
        },
        removeClass: (className) => {
            element.classList.remove(className);
        },
        hasClass: (className) => element.classList.contains(className),
    };
}
let supportsPassive = false;
const fn = () => { };
const optionsBlock = {
    get passive() {
        supportsPassive = true;
        return false;
    }
};
document.addEventListener('x', fn, optionsBlock);
document.removeEventListener('x', fn);
/**
 * Do event listeners suport the `passive` option?
 */
const supportsPassiveEventListener = supportsPassive;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class BaseElement extends s {
    click() {
        if (this.mdcRoot) {
            this.mdcRoot.focus();
            this.mdcRoot.click();
            return;
        }
        super.click();
    }
    /**
     * Create and attach the MDC Foundation to the instance
     */
    createFoundation() {
        if (this.mdcFoundation !== undefined) {
            this.mdcFoundation.destroy();
        }
        if (this.mdcFoundationClass) {
            this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter());
            this.mdcFoundation.init();
        }
    }
    firstUpdated() {
        this.createFoundation();
    }
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});class i$1{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o$1=e(class extends i$1{constructor(t$1){var i;if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||(null===(i=t$1.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.it){this.it=new Set,void 0!==i.strings&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.nt)||void 0===r?void 0:r.has(t))&&this.it.add(t);return this.render(s)}const e=i.element.classList;this.it.forEach((t=>{t in s||(e.remove(t),this.it.delete(t));}));for(const t in s){const i=!!s[t];i===this.it.has(t)||(null===(o=this.nt)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.it.add(t)):(e.remove(t),this.it.delete(t)));}return T}});

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const passiveEventOptionsIfSupported = supportsPassiveEventListener ? { passive: true } : undefined;
class TopAppBarBaseBase extends BaseElement {
    constructor() {
        super(...arguments);
        this.centerTitle = false;
        this.handleTargetScroll = () => {
            this.mdcFoundation.handleTargetScroll();
        };
        this.handleNavigationClick = () => {
            this.mdcFoundation.handleNavigationClick();
        };
    }
    get scrollTarget() {
        return this._scrollTarget || window;
    }
    set scrollTarget(value) {
        this.unregisterScrollListener();
        const old = this.scrollTarget;
        this._scrollTarget = value;
        this.updateRootPosition();
        this.requestUpdate('scrollTarget', old);
        this.registerScrollListener();
    }
    updateRootPosition() {
        if (this.mdcRoot) {
            const windowScroller = this.scrollTarget === window;
            // we add support for top-app-bar's tied to an element scroller.
            this.mdcRoot.style.position = windowScroller ? '' : 'absolute';
        }
    }
    render() {
        // clang-format off
        let title = x `<span class="mdc-top-app-bar__title"><slot name="title"></slot></span>`;
        if (this.centerTitle) {
            title = x `<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-center">${title}</section>`;
        }
        // clang-format on
        return x `
      <header class="mdc-top-app-bar ${o$1(this.barClasses())}">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start" id="navigation">
          <slot name="navigationIcon"
            @click=${this.handleNavigationClick}></slot>
          ${this.centerTitle ? null : title}
        </section>
        ${this.centerTitle ? title : null}
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" id="actions" role="toolbar">
          <slot name="actionItems"></slot>
        </section>
      </div>
    </header>
    <div class="${o$1(this.contentClasses())}">
      <slot></slot>
    </div>
    `;
    }
    createAdapter() {
        return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { setStyle: (property, value) => this.mdcRoot.style.setProperty(property, value), getTopAppBarHeight: () => this.mdcRoot.clientHeight, notifyNavigationIconClicked: () => {
                this.dispatchEvent(new Event(strings.NAVIGATION_EVENT, { bubbles: true, cancelable: true }));
            }, getViewportScrollY: () => this.scrollTarget instanceof Window ?
                this.scrollTarget.pageYOffset :
                this.scrollTarget.scrollTop, getTotalActionItems: () => this._actionItemsSlot
                .assignedNodes({ flatten: true })
                .length });
    }
    registerListeners() {
        this.registerScrollListener();
    }
    unregisterListeners() {
        this.unregisterScrollListener();
    }
    registerScrollListener() {
        this.scrollTarget.addEventListener('scroll', this.handleTargetScroll, passiveEventOptionsIfSupported);
    }
    unregisterScrollListener() {
        this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);
    }
    firstUpdated() {
        super.firstUpdated();
        this.updateRootPosition();
        this.registerListeners();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.unregisterListeners();
    }
}
__decorate([
    i$2('.mdc-top-app-bar')
], TopAppBarBaseBase.prototype, "mdcRoot", void 0);
__decorate([
    i$2('slot[name="actionItems"]')
], TopAppBarBaseBase.prototype, "_actionItemsSlot", void 0);
__decorate([
    n$2({ type: Boolean })
], TopAppBarBaseBase.prototype, "centerTitle", void 0);
__decorate([
    n$2({ type: Object })
], TopAppBarBaseBase.prototype, "scrollTarget", null);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class TopAppBarBase extends TopAppBarBaseBase {
    constructor() {
        super(...arguments);
        this.mdcFoundationClass = MDCTopAppBarFoundation$1;
        this.prominent = false;
        this.dense = false;
        this.handleResize = () => {
            this.mdcFoundation.handleWindowResize();
        };
    }
    barClasses() {
        return {
            'mdc-top-app-bar--dense': this.dense,
            'mdc-top-app-bar--prominent': this.prominent,
            'center-title': this.centerTitle,
        };
    }
    contentClasses() {
        return {
            'mdc-top-app-bar--fixed-adjust': !this.dense && !this.prominent,
            'mdc-top-app-bar--dense-fixed-adjust': this.dense && !this.prominent,
            'mdc-top-app-bar--prominent-fixed-adjust': !this.dense && this.prominent,
            'mdc-top-app-bar--dense-prominent-fixed-adjust': this.dense && this.prominent,
        };
    }
    registerListeners() {
        super.registerListeners();
        window.addEventListener('resize', this.handleResize, passiveEventOptionsIfSupported);
    }
    unregisterListeners() {
        super.unregisterListeners();
        window.removeEventListener('resize', this.handleResize);
    }
}
__decorate([
    n$2({ type: Boolean, reflect: true })
], TopAppBarBase.prototype, "prominent", void 0);
__decorate([
    n$2({ type: Boolean, reflect: true })
], TopAppBarBase.prototype, "dense", void 0);

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCFixedTopAppBarFoundation = /** @class */ (function (_super) {
    __extends(MDCFixedTopAppBarFoundation, _super);
    function MDCFixedTopAppBarFoundation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * State variable for the previous scroll iteration top app bar state
         */
        _this.wasScrolled = false;
        return _this;
    }
    /**
     * Scroll handler for applying/removing the modifier class on the fixed top app bar.
     */
    MDCFixedTopAppBarFoundation.prototype.handleTargetScroll = function () {
        var currentScroll = this.adapter.getViewportScrollY();
        if (currentScroll <= 0) {
            if (this.wasScrolled) {
                this.adapter.removeClass(cssClasses.FIXED_SCROLLED_CLASS);
                this.wasScrolled = false;
            }
        }
        else {
            if (!this.wasScrolled) {
                this.adapter.addClass(cssClasses.FIXED_SCROLLED_CLASS);
                this.wasScrolled = true;
            }
        }
    };
    return MDCFixedTopAppBarFoundation;
}(MDCTopAppBarFoundation));
// tslint:disable-next-line:no-default-export Needed for backward compatibility with MDC Web v0.44.0 and earlier.
var MDCFixedTopAppBarFoundation$1 = MDCFixedTopAppBarFoundation;

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class TopAppBarFixedBase extends TopAppBarBase {
    constructor() {
        super(...arguments);
        this.mdcFoundationClass = MDCFixedTopAppBarFoundation$1;
    }
    barClasses() {
        return Object.assign(Object.assign({}, super.barClasses()), { 'mdc-top-app-bar--fixed': true });
    }
    registerListeners() {
        this.scrollTarget.addEventListener('scroll', this.handleTargetScroll, passiveEventOptionsIfSupported);
    }
    unregisterListeners() {
        this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);
    }
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let TopAppBarFixed = class TopAppBarFixed extends TopAppBarFixedBase {
};
TopAppBarFixed.styles = [styles$1];
TopAppBarFixed = __decorate([
    e$2('mwc-top-app-bar-fixed')
], TopAppBarFixed);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * TypeScript version of the decorator
 * @see https://www.typescriptlang.org/docs/handbook/decorators.html#property-decorators
 */
function tsDecorator(prototype, name, descriptor) {
    const constructor = prototype.constructor;
    if (!descriptor) {
        /**
         * lit uses internal properties with two leading underscores to
         * provide storage for accessors
         */
        const litInternalPropertyKey = `__${name}`;
        descriptor =
            constructor.getPropertyDescriptor(name, litInternalPropertyKey);
        if (!descriptor) {
            throw new Error('@ariaProperty must be used after a @property decorator');
        }
    }
    // descriptor must exist at this point, reassign so typescript understands
    const propDescriptor = descriptor;
    let attribute = '';
    if (!propDescriptor.set) {
        throw new Error(`@ariaProperty requires a setter for ${name}`);
    }
    // TODO(b/202853219): Remove this check when internal tooling is
    // compatible
    // tslint:disable-next-line:no-any bail if applied to internal generated class
    if (prototype.dispatchWizEvent) {
        return descriptor;
    }
    const wrappedDescriptor = {
        configurable: true,
        enumerable: true,
        set(value) {
            if (attribute === '') {
                const options = constructor.getPropertyOptions(name);
                // if attribute is not a string, use `name` instead
                attribute =
                    typeof options.attribute === 'string' ? options.attribute : name;
            }
            if (this.hasAttribute(attribute)) {
                this.removeAttribute(attribute);
            }
            propDescriptor.set.call(this, value);
        }
    };
    if (propDescriptor.get) {
        wrappedDescriptor.get = function () {
            return propDescriptor.get.call(this);
        };
    }
    return wrappedDescriptor;
}
/**
 * A property decorator proxies an aria attribute to an internal node
 *
 * This decorator is only intended for use with ARIA attributes, such as `role`
 * and `aria-label` due to screenreader needs.
 *
 * Upon first render, `@ariaProperty` will remove the attribute from the host
 * element to prevent screenreaders from reading the host instead of the
 * internal node.
 *
 * This decorator should only be used for non-Symbol public fields decorated
 * with `@property`, or on a setter with an optional getter.
 *
 * @example
 * ```ts
 * class MyElement {
 *   @ariaProperty
 *   @property({ type: String, attribute: 'aria-label' })
 *   ariaLabel!: string;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */
function ariaProperty(protoOrDescriptor, name, 
// tslint:disable-next-line:no-any any is required as a return type from decorators
descriptor) {
    if (name !== undefined) {
        return tsDecorator(protoOrDescriptor, name, descriptor);
    }
    else {
        throw new Error('@ariaProperty only supports TypeScript Decorators');
    }
}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=l=>null!=l?l:A;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const i="important",n=" !"+i,o=e(class extends i$1{constructor(t$1){var e;if(super(t$1),t$1.type!==t.ATTRIBUTE||"style"!==t$1.name||(null===(e=t$1.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const s=t[r];return null==s?e:e+`${r=r.includes("-")?r:r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(e,[r]){const{style:s}=e.element;if(void 0===this.ht){this.ht=new Set;for(const t in r)this.ht.add(t);return this.render(r)}this.ht.forEach((t=>{null==r[t]&&(this.ht.delete(t),t.includes("-")?s.removeProperty(t):s[t]="");}));for(const t in r){const e=r[t];if(null!=e){this.ht.add(t);const r="string"==typeof e&&e.endsWith(n);t.includes("-")||r?s.setProperty(t,r?e.slice(0,-11):e,r?i:""):s[t]=e;}}return T}});

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class LinearProgressBase extends s {
    constructor() {
        super(...arguments);
        this.indeterminate = false;
        this.progress = 0;
        this.buffer = 1;
        this.reverse = false;
        this.closed = false;
        this.stylePrimaryHalf = '';
        this.stylePrimaryFull = '';
        this.styleSecondaryQuarter = '';
        this.styleSecondaryHalf = '';
        this.styleSecondaryFull = '';
        this.animationReady = true;
        this.closedAnimationOff = false;
        this.resizeObserver = null;
    }
    connectedCallback() {
        super.connectedCallback();
        // if detached and reattached
        if (this.rootEl) {
            this.attachResizeObserver();
        }
    }
    /**
     * @soyTemplate
     */
    render() {
        /** @classMap */
        const classes = {
            'mdc-linear-progress--closed': this.closed,
            'mdc-linear-progress--closed-animation-off': this.closedAnimationOff,
            'mdc-linear-progress--indeterminate': this.indeterminate,
            // needed for controller-less render
            'mdc-linear-progress--animation-ready': this.animationReady
        };
        /** @styleMap */
        const rootStyles = {
            '--mdc-linear-progress-primary-half': this.stylePrimaryHalf,
            '--mdc-linear-progress-primary-half-neg': this.stylePrimaryHalf !== '' ? `-${this.stylePrimaryHalf}` : '',
            '--mdc-linear-progress-primary-full': this.stylePrimaryFull,
            '--mdc-linear-progress-primary-full-neg': this.stylePrimaryFull !== '' ? `-${this.stylePrimaryFull}` : '',
            '--mdc-linear-progress-secondary-quarter': this.styleSecondaryQuarter,
            '--mdc-linear-progress-secondary-quarter-neg': this.styleSecondaryQuarter !== '' ? `-${this.styleSecondaryQuarter}` :
                '',
            '--mdc-linear-progress-secondary-half': this.styleSecondaryHalf,
            '--mdc-linear-progress-secondary-half-neg': this.styleSecondaryHalf !== '' ? `-${this.styleSecondaryHalf}` : '',
            '--mdc-linear-progress-secondary-full': this.styleSecondaryFull,
            '--mdc-linear-progress-secondary-full-neg': this.styleSecondaryFull !== '' ? `-${this.styleSecondaryFull}` : '',
        };
        /** @styleMap */
        const bufferBarStyles = {
            'flex-basis': this.indeterminate ? '100%' : `${this.buffer * 100}%`,
        };
        /** @styleMap */
        const primaryBarStyles = {
            transform: this.indeterminate ? 'scaleX(1)' : `scaleX(${this.progress})`,
        };
        return x `
      <div
          role="progressbar"
          class="mdc-linear-progress ${o$1(classes)}"
          style="${o(rootStyles)}"
          dir="${l(this.reverse ? 'rtl' : undefined)}"
          aria-label="${l(this.ariaLabel)}"
          aria-valuemin="0"
          aria-valuemax="1"
          aria-valuenow="${l(this.indeterminate ? undefined : this.progress)}"
        @transitionend="${this.syncClosedState}">
        <div class="mdc-linear-progress__buffer">
          <div
            class="mdc-linear-progress__buffer-bar"
            style=${o(bufferBarStyles)}>
          </div>
          <div class="mdc-linear-progress__buffer-dots"></div>
        </div>
        <div
            class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
            style=${o(primaryBarStyles)}>
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
          <span class="mdc-linear-progress__bar-inner"></span>
        </div>
      </div>`;
    }
    update(changedProperties) {
        // - When showing the indicator, enable animations immediately.
        // - On first render, disable the animation immediately.
        // - For normal calls to hide the component, let transitionend event trigger
        //   disabling of animations instead (see render method), so that animation
        //   does not jump in the middle of fade out.
        if (changedProperties.has('closed') &&
            (!this.closed || changedProperties.get('closed') === undefined)) {
            this.syncClosedState();
        }
        super.update(changedProperties);
    }
    async firstUpdated(changed) {
        super.firstUpdated(changed);
        this.attachResizeObserver();
    }
    syncClosedState() {
        this.closedAnimationOff = this.closed;
    }
    updated(changed) {
        // restart animation for timing if reverse changed and is indeterminate.
        // don't restart here if indeterminate has changed as well because we don't
        // want to incur an extra style recalculation
        if (!changed.has('indeterminate') && changed.has('reverse') &&
            this.indeterminate) {
            this.restartAnimation();
        }
        // Recaclulate the animation css custom props and restart the calculation
        // if this is not the first render cycle, otherwise, resize observer init
        // will already handle this and prevent unnecessary rerender + style recalc
        // but resize observer will not update animation vals while determinate
        if (changed.has('indeterminate') &&
            changed.get('indeterminate') !== undefined && this.indeterminate &&
            window.ResizeObserver) {
            this.calculateAndSetAnimationDimensions(this.rootEl.offsetWidth);
        }
        super.updated(changed);
    }
    disconnectedCallback() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }
        super.disconnectedCallback();
    }
    attachResizeObserver() {
        if (window.ResizeObserver) {
            this.resizeObserver =
                new window
                    .ResizeObserver((entries) => {
                    if (!this.indeterminate) {
                        return;
                    }
                    for (const entry of entries) {
                        if (entry.contentRect) {
                            const width = entry.contentRect.width;
                            this.calculateAndSetAnimationDimensions(width);
                        }
                    }
                });
            this.resizeObserver.observe(this.rootEl);
            return;
        }
        this.resizeObserver = null;
    }
    calculateAndSetAnimationDimensions(width) {
        const primaryHalf = width * 0.8367142;
        const primaryFull = width * 2.00611057;
        const secondaryQuarter = width * 0.37651913;
        const secondaryHalf = width * 0.84386165;
        const secondaryFull = width * 1.60277782;
        this.stylePrimaryHalf = `${primaryHalf}px`;
        this.stylePrimaryFull = `${primaryFull}px`;
        this.styleSecondaryQuarter = `${secondaryQuarter}px`;
        this.styleSecondaryHalf = `${secondaryHalf}px`;
        this.styleSecondaryFull = `${secondaryFull}px`;
        // need to restart animation for custom props to apply to keyframes
        this.restartAnimation();
    }
    async restartAnimation() {
        this.animationReady = false;
        await this.updateComplete;
        await new Promise(requestAnimationFrame);
        this.animationReady = true;
        await this.updateComplete;
    }
    open() {
        this.closed = false;
    }
    close() {
        this.closed = true;
    }
}
__decorate([
    i$2('.mdc-linear-progress')
], LinearProgressBase.prototype, "rootEl", void 0);
__decorate([
    n$2({ type: Boolean, reflect: true })
], LinearProgressBase.prototype, "indeterminate", void 0);
__decorate([
    n$2({ type: Number })
], LinearProgressBase.prototype, "progress", void 0);
__decorate([
    n$2({ type: Number })
], LinearProgressBase.prototype, "buffer", void 0);
__decorate([
    n$2({ type: Boolean, reflect: true })
], LinearProgressBase.prototype, "reverse", void 0);
__decorate([
    n$2({ type: Boolean, reflect: true })
], LinearProgressBase.prototype, "closed", void 0);
__decorate([
    ariaProperty,
    n$2({ attribute: 'aria-label' })
], LinearProgressBase.prototype, "ariaLabel", void 0);
__decorate([
    t$1()
], LinearProgressBase.prototype, "stylePrimaryHalf", void 0);
__decorate([
    t$1()
], LinearProgressBase.prototype, "stylePrimaryFull", void 0);
__decorate([
    t$1()
], LinearProgressBase.prototype, "styleSecondaryQuarter", void 0);
__decorate([
    t$1()
], LinearProgressBase.prototype, "styleSecondaryHalf", void 0);
__decorate([
    t$1()
], LinearProgressBase.prototype, "styleSecondaryFull", void 0);
__decorate([
    t$1()
], LinearProgressBase.prototype, "animationReady", void 0);
__decorate([
    t$1()
], LinearProgressBase.prototype, "closedAnimationOff", void 0);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles = i$5 `@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half, 83.67142%))}100%{transform:translateX(200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full, 200.611057%))}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter, 37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half, 84.386165%))}100%{transform:translateX(160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full, 160.277782%))}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(-10px)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%);transform:translateX(var(--mdc-linear-progress-primary-half-neg, -83.67142%))}100%{transform:translateX(-200.611057%);transform:translateX(var(--mdc-linear-progress-primary-full-neg, -200.611057%))}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%);transform:translateX(var(--mdc-linear-progress-secondary-quarter-neg, -37.651913%))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%);transform:translateX(var(--mdc-linear-progress-secondary-half-neg, -84.386165%))}100%{transform:translateX(-160.277782%);transform:translateX(var(--mdc-linear-progress-secondary-full-neg, -160.277782%))}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid transparent;overflow:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}@media screen and (forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;width:100%;height:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid}.mdc-linear-progress__buffer{display:flex;position:absolute;width:100%;height:100%}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering 250ms infinite linear}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__bar{right:0;-webkit-transform-origin:center right;transform-origin:center right}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__buffer-dots,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}.mdc-linear-progress--closed{opacity:0}.mdc-linear-progress--closed-animation-off .mdc-linear-progress__buffer-dots{animation:none}.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar,.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar .mdc-linear-progress__bar-inner{animation:none}.mdc-linear-progress__bar-inner{border-color:#6200ee;border-color:var(--mdc-theme-primary, #6200ee)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E")}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6}.mdc-linear-progress{height:4px}.mdc-linear-progress__bar-inner{border-top-width:4px}.mdc-linear-progress__buffer-dots{background-size:10px 4px}:host{display:block}.mdc-linear-progress__buffer-bar{background-color:#e6e6e6;background-color:var(--mdc-linear-progress-buffer-color, #e6e6e6)}.mdc-linear-progress__buffer-dots{background-image:url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E");background-image:var(--mdc-linear-progress-buffering-dots-image, url("data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='%23e6e6e6'/%3E%3C/svg%3E"))}`;

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
let LinearProgress = class LinearProgress extends LinearProgressBase {
};
LinearProgress.styles = [styles];
LinearProgress = __decorate([
    e$2('mwc-linear-progress')
], LinearProgress);

let results = [];
const supportedReportTypes = ["coep", "coop", "csp", "deprecation"];
const keyLabelMapping = {
  // Common to COOP, COEP and CSP
  type: "Type",
  disposition: "Disposition",
  // COOP
  effectivePolicy: "Effective Policy",
  nextResponseURL: "Next Reponse URL",
  previousResponseURL: "Previous Reponse URL",
  previousPropertyResponseURL: "Property",
  openerURL: "Opener URL",
  referrer: "Referrer",
  sourceFile: "Source File",
  lineNumber: "Line Number",
  columnNumber: "Column Number",
  openedWindowURL: "Opened Window URL",
  openedWindowInitialURL: "Opened Window Initial URL",
  otherURL: "Other URL",
  // COEP
  destination: "Destination",
  blockedURL: "Blocked URL",
  // CSP
  "document-uri": "Document URI",
  "blocked-uri": "Blocked URI",
  "effective-directive": "Effective directive",
  "original-policy": "Original Policy",
  "referrer": "Referrer",
  "status-code": "Status Code",
  "violated-directive": "Violated directive",
  // Deprecation
  age: "Age",
  anticipatedRemoval: "Anticipated Removal",
  id: "ID",
  message: "Message"
};

const container = document.querySelector("#container");

const generateTableHeader = reportKeys =>
  reportKeys.map(
    reportKey =>
      x`
        <th class="mdc-data-table__header-cell" role="columnheader" scope="col">
          ${keyLabelMapping[reportKey]}
        </th>
      `
  );

const generateTableBody = reportValues =>
  reportValues.map(
    reportValue =>
      x`
        <td class="mdc-data-table__cell">${reportValue}</td>
      `
  );

const renderReport = (report, type) => {
  if (supportedReportTypes.includes(type)) {
    // !mutates! Remove deprecated keys
    if (report['blocked-url']) {
      delete report['blocked-url'];
    }
    const thead = generateTableHeader(Object.keys(report));
    const tbody = generateTableBody(Object.values(report));
    return x`
      <div class="mdc-data-table">
        <div class="mdc-data-table__table-container">
          <table class="mdc-data-table__table" aria-label="COOP Report">
            <thead>
              <tr class="mdc-data-table__header-row">
                ${thead}
              </tr>
            </thead>
            <tbody class="mdc-data-table__content">
              <tr class="mdc-data-table__row">
                ${tbody}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }
  // If report type isn't COOP/COEP it's not supported => render as JSON
  return x`
    ${JSON.stringify(result.body)}
  `;
};

const renderHTML = msg =>
  D(
    x`
      ${results.map(result => x`
        <div class="report">
          <span class="badge ${result.type}">${result.type}</span>
          <div class="report-from-url">
            <span class="from">from</span> ${result.url}
          </div>
          ${renderReport(result.body, result.type)}
        </div>`)}`,
    container
  );

renderHTML();

const progress = document.querySelector("#progress");

let room = '/';
const paths = location.pathname.split('/');
if (paths[1] != 'post') {
  room = paths[1];
}

const socket = io.connect('/', {
  query: `room=${encodeURIComponent(room)}`
});
progress.indeterminate = false;

socket.on("update", msg => {
  const _msg = JSON.parse(msg);
  results = [..._msg.reverse(), ...results];
  console.log(results);
  renderHTML();
});

// const post = async () => {
//   await fetch('/post', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/reports+json'
//     },
//     body: JSON.stringify([{type:'coop', body:{
//       "disposition":"enforce","effectivePolicy":"same-origin-plus-coep","nextResponseURL":"https://third-party-test.glitch.me/popup?coop=same-origin&","type":"navigation-from-response"
//     }}, {type:'coep', body:{
//       "blocked-url":"https://third-party-test.glitch.me/check.svg?","blockedURL":"https://third-party-test.glitch.me/check.svg?","destination":"image","disposition":"enforce","type":"corp"
//     }}])
//   });
// };

// setInterval(post, 3000);
