import{_ as Z,c as L,g as G,n as H,S as J,R as O,d as V,e as W,f as X,r as d,P as w,h as K,u as B,j as R,a as T,s as U}from"./index-9c561096.js";var tt=function(t){Z(e,t);function e(i,a){var r;return r=t.call(this)||this,r.client=i,r.setOptions(a),r.bindMethods(),r.updateResult(),r}var s=e.prototype;return s.bindMethods=function(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)},s.setOptions=function(a){this.options=this.client.defaultMutationOptions(a)},s.onUnsubscribe=function(){if(!this.listeners.length){var a;(a=this.currentMutation)==null||a.removeObserver(this)}},s.onMutationUpdate=function(a){this.updateResult();var r={listeners:!0};a.type==="success"?r.onSuccess=!0:a.type==="error"&&(r.onError=!0),this.notify(r)},s.getCurrentResult=function(){return this.currentResult},s.reset=function(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})},s.mutate=function(a,r){return this.mutateOptions=r,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,L({},this.options,{variables:typeof a<"u"?a:this.options.variables})),this.currentMutation.addObserver(this),this.currentMutation.execute()},s.updateResult=function(){var a=this.currentMutation?this.currentMutation.state:G(),r=L({},a,{isLoading:a.status==="loading",isSuccess:a.status==="success",isError:a.status==="error",isIdle:a.status==="idle",mutate:this.mutate,reset:this.reset});this.currentResult=r},s.notify=function(a){var r=this;H.batch(function(){r.mutateOptions&&(a.onSuccess?(r.mutateOptions.onSuccess==null||r.mutateOptions.onSuccess(r.currentResult.data,r.currentResult.variables,r.currentResult.context),r.mutateOptions.onSettled==null||r.mutateOptions.onSettled(r.currentResult.data,null,r.currentResult.variables,r.currentResult.context)):a.onError&&(r.mutateOptions.onError==null||r.mutateOptions.onError(r.currentResult.error,r.currentResult.variables,r.currentResult.context),r.mutateOptions.onSettled==null||r.mutateOptions.onSettled(void 0,r.currentResult.error,r.currentResult.variables,r.currentResult.context))),a.listeners&&r.listeners.forEach(function(n){n(r.currentResult)})})},e}(J);function et(t,e,s){return typeof e=="function"?e.apply(void 0,s):typeof e=="boolean"?e:!!t}function rt(t,e,s){var i=O.useRef(!1),a=O.useState(0),r=a[1],n=V(t,e,s),o=W(),u=O.useRef();u.current?u.current.setOptions(n):u.current=new tt(o,n);var l=u.current.getCurrentResult();O.useEffect(function(){i.current=!0;var f=u.current.subscribe(H.batchCalls(function(){i.current&&r(function(p){return p+1})}));return function(){i.current=!1,f()}},[]);var c=O.useCallback(function(f,p){u.current.mutate(f,p).catch(X)},[]);if(l.error&&et(void 0,u.current.options.useErrorBoundary,[l.error]))throw l.error;return L({},l,{mutate:c,mutateAsync:l.mutate})}let st={data:""},at=t=>typeof window=="object"?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||st,it=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,ot=/\/\*[^]*?\*\/|  +/g,z=/\n+/g,v=(t,e)=>{let s="",i="",a="";for(let r in t){let n=t[r];r[0]=="@"?r[1]=="i"?s=r+" "+n+";":i+=r[1]=="f"?v(n,r):r+"{"+v(n,r[1]=="k"?"":e)+"}":typeof n=="object"?i+=v(n,e?e.replace(/([^,])+/g,o=>r.replace(/(^:.*)|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,o):o?o+" "+u:u)):r):n!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=v.p?v.p(r,n):r+":"+n+";")}return s+(e&&a?e+"{"+a+"}":a)+i},b={},q=t=>{if(typeof t=="object"){let e="";for(let s in t)e+=s+q(t[s]);return e}return t},nt=(t,e,s,i,a)=>{let r=q(t),n=b[r]||(b[r]=(u=>{let l=0,c=11;for(;l<u.length;)c=101*c+u.charCodeAt(l++)>>>0;return"go"+c})(r));if(!b[n]){let u=r!==t?t:(l=>{let c,f,p=[{}];for(;c=it.exec(l.replace(ot,""));)c[4]?p.shift():c[3]?(f=c[3].replace(z," ").trim(),p.unshift(p[0][f]=p[0][f]||{})):p[0][c[1]]=c[2].replace(z," ").trim();return p[0]})(t);b[n]=v(a?{["@keyframes "+n]:u}:u,s?"":"."+n)}let o=s&&b.g?b.g:null;return s&&(b.g=b[n]),((u,l,c,f)=>{f?l.data=l.data.replace(f,u):l.data.indexOf(u)===-1&&(l.data=c?u+l.data:l.data+u)})(b[n],e,i,o),n},ut=(t,e,s)=>t.reduce((i,a,r)=>{let n=e[r];if(n&&n.call){let o=n(s),u=o&&o.props&&o.props.className||/^go/.test(o)&&o;n=u?"."+u:o&&typeof o=="object"?o.props?"":v(o,""):o===!1?"":o}return i+a+(n??"")},"");function A(t){let e=this||{},s=t.call?t(e.p):t;return nt(s.unshift?s.raw?ut(s,[].slice.call(arguments,1),e.p):s.reduce((i,a)=>Object.assign(i,a&&a.call?a(e.p):a),{}):s,at(e.target),e.g,e.o,e.k)}let Q,I,N;A.bind({g:1});let y=A.bind({k:1});function lt(t,e,s,i){v.p=e,Q=t,I=s,N=i}function x(t,e){let s=this||{};return function(){let i=arguments;function a(r,n){let o=Object.assign({},r),u=o.className||a.className;s.p=Object.assign({theme:I&&I()},o),s.o=/ *go\d+/.test(u),o.className=A.apply(s,i)+(u?" "+u:""),e&&(o.ref=n);let l=t;return t[0]&&(l=o.as||t,delete o.as),N&&l[0]&&N(o),Q(l,o)}return e?e(a):a}}var ct=t=>typeof t=="function",S=(t,e)=>ct(t)?t(e):t,dt=(()=>{let t=0;return()=>(++t).toString()})(),Y=(()=>{let t;return()=>{if(t===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),pt=20,j=new Map,ft=1e3,F=t=>{if(j.has(t))return;let e=setTimeout(()=>{j.delete(t),E({type:4,toastId:t})},ft);j.set(t,e)},mt=t=>{let e=j.get(t);e&&clearTimeout(e)},P=(t,e)=>{switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,pt)};case 1:return e.toast.id&&mt(e.toast.id),{...t,toasts:t.toasts.map(r=>r.id===e.toast.id?{...r,...e.toast}:r)};case 2:let{toast:s}=e;return t.toasts.find(r=>r.id===s.id)?P(t,{type:1,toast:s}):P(t,{type:0,toast:s});case 3:let{toastId:i}=e;return i?F(i):t.toasts.forEach(r=>{F(r.id)}),{...t,toasts:t.toasts.map(r=>r.id===i||i===void 0?{...r,visible:!1}:r)};case 4:return e.toastId===void 0?{...t,toasts:[]}:{...t,toasts:t.toasts.filter(r=>r.id!==e.toastId)};case 5:return{...t,pausedAt:e.time};case 6:let a=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+a}))}}},k=[],C={toasts:[],pausedAt:void 0},E=t=>{C=P(C,t),k.forEach(e=>{e(C)})},ht={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},gt=(t={})=>{let[e,s]=d.useState(C);d.useEffect(()=>(k.push(s),()=>{let a=k.indexOf(s);a>-1&&k.splice(a,1)}),[e]);let i=e.toasts.map(a=>{var r,n;return{...t,...t[a.type],...a,duration:a.duration||((r=t[a.type])==null?void 0:r.duration)||(t==null?void 0:t.duration)||ht[a.type],style:{...t.style,...(n=t[a.type])==null?void 0:n.style,...a.style}}});return{...e,toasts:i}},bt=(t,e="blank",s)=>({createdAt:Date.now(),visible:!0,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...s,id:(s==null?void 0:s.id)||dt()}),$=t=>(e,s)=>{let i=bt(e,t,s);return E({type:2,toast:i}),i.id},g=(t,e)=>$("blank")(t,e);g.error=$("error");g.success=$("success");g.loading=$("loading");g.custom=$("custom");g.dismiss=t=>{E({type:3,toastId:t})};g.remove=t=>E({type:4,toastId:t});g.promise=(t,e,s)=>{let i=g.loading(e.loading,{...s,...s==null?void 0:s.loading});return t.then(a=>(g.success(S(e.success,a),{id:i,...s,...s==null?void 0:s.success}),a)).catch(a=>{g.error(S(e.error,a),{id:i,...s,...s==null?void 0:s.error})}),t};var yt=(t,e)=>{E({type:1,toast:{id:t,height:e}})},vt=()=>{E({type:5,time:Date.now()})},xt=t=>{let{toasts:e,pausedAt:s}=gt(t);d.useEffect(()=>{if(s)return;let r=Date.now(),n=e.map(o=>{if(o.duration===1/0)return;let u=(o.duration||0)+o.pauseDuration-(r-o.createdAt);if(u<0){o.visible&&g.dismiss(o.id);return}return setTimeout(()=>g.dismiss(o.id),u)});return()=>{n.forEach(o=>o&&clearTimeout(o))}},[e,s]);let i=d.useCallback(()=>{s&&E({type:6,time:Date.now()})},[s]),a=d.useCallback((r,n)=>{let{reverseOrder:o=!1,gutter:u=8,defaultPosition:l}=n||{},c=e.filter(m=>(m.position||l)===(r.position||l)&&m.height),f=c.findIndex(m=>m.id===r.id),p=c.filter((m,h)=>h<f&&m.visible).length;return c.filter(m=>m.visible).slice(...o?[p+1]:[0,p]).reduce((m,h)=>m+(h.height||0)+u,0)},[e]);return{toasts:e,handlers:{updateHeight:yt,startPause:vt,endPause:i,calculateOffset:a}}},wt=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Et=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ot=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Rt=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${wt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Et} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Ot} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,$t=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Mt=x("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${$t} 1s linear infinite;
`,jt=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,kt=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Ct=x("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${jt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${kt} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,St=x("div")`
  position: absolute;
`,At=x("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Dt=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Lt=x("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Dt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,It=({toast:t})=>{let{icon:e,type:s,iconTheme:i}=t;return e!==void 0?typeof e=="string"?d.createElement(Lt,null,e):e:s==="blank"?null:d.createElement(At,null,d.createElement(Mt,{...i}),s!=="loading"&&d.createElement(St,null,s==="error"?d.createElement(Rt,{...i}):d.createElement(Ct,{...i})))},Nt=t=>`
0% {transform: translate3d(0,${t*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Pt=t=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${t*-150}%,-1px) scale(.6); opacity:0;}
`,Tt="0%{opacity:0;} 100%{opacity:1;}",Ut="0%{opacity:1;} 100%{opacity:0;}",zt=x("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ft=x("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,_t=(t,e)=>{let s=t.includes("top")?1:-1,[i,a]=Y()?[Tt,Ut]:[Nt(s),Pt(s)];return{animation:e?`${y(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(a)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ht=d.memo(({toast:t,position:e,style:s,children:i})=>{let a=t.height?_t(t.position||e||"top-center",t.visible):{opacity:0},r=d.createElement(It,{toast:t}),n=d.createElement(Ft,{...t.ariaProps},S(t.message,t));return d.createElement(zt,{className:t.className,style:{...a,...s,...t.style}},typeof i=="function"?i({icon:r,message:n}):d.createElement(d.Fragment,null,r,n))});lt(d.createElement);var qt=({id:t,className:e,style:s,onHeightUpdate:i,children:a})=>{let r=d.useCallback(n=>{if(n){let o=()=>{let u=n.getBoundingClientRect().height;i(t,u)};o(),new MutationObserver(o).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[t,i]);return d.createElement("div",{ref:r,className:e,style:s},a)},Qt=(t,e)=>{let s=t.includes("top"),i=s?{top:0}:{bottom:0},a=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Y()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(s?1:-1)}px)`,...i,...a}},Yt=A`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,M=16,Zt=({reverseOrder:t,position:e="top-center",toastOptions:s,gutter:i,children:a,containerStyle:r,containerClassName:n})=>{let{toasts:o,handlers:u}=xt(s);return d.createElement("div",{style:{position:"fixed",zIndex:9999,top:M,left:M,right:M,bottom:M,pointerEvents:"none",...r},className:n,onMouseEnter:u.startPause,onMouseLeave:u.endPause},o.map(l=>{let c=l.position||e,f=u.calculateOffset(l,{reverseOrder:t,gutter:i,defaultPosition:e}),p=Qt(c,f);return d.createElement(qt,{id:l.id,key:l.id,onHeightUpdate:u.updateHeight,className:l.visible?Yt:"",style:p},l.type==="custom"?S(l.message,l):a?a(l):d.createElement(Ht,{toast:l,position:c}))}))},D=g;const _={true:"❤️",false:"🤍"},Gt=({routeLineId:t,stopPointId:e,routeLine:s,routeId:i,uid:a,nomArret:r,nomDestination:n})=>{const o=K(),u=B(m=>m.currentUser);var l=`${t}/${e}/${s}/${i}`;const c=m=>u.favoris.some(h=>h.route===m),f=rt({mutationFn:async()=>{try{var m={routeLineId:t,stopPointId:e,routeLine:s,routeId:i,uid:a,nomArret:r,nomDestination:n,route:l};c(l)?await T.delete(`/delete-favori?uid=${a}`,{data:{route:l}}).then(h=>{o(U(h.data)),D.success("Le bus a bien été supprimé des favoris")}).catch(h=>{console.error("Erreur lors de la mise à jour du document : ",h)}):await T.post("/add-favori",m).then(h=>{o(U(h.data)),D.success("Le bus a bien été ajouté aux favoris")}).catch(h=>{console.error("Erreur lors de la mise à jour du document : ",h)})}catch{D.error("Erreur lors du changement de favoris")}}}),p=c(l)?"red":"white";return R.jsxs(R.Fragment,{children:[R.jsx("p",{children:_[c]}),R.jsx("button",{onClick:f.mutate,style:{backgroundColor:"transparent",border:"none",color:p},children:_[c(l)]}),R.jsx(Zt,{position:"top-right",reverseOrder:!1})]})};Gt.propTypes={routeLineId:w.string,stopPointId:w.string,routeLine:w.string,routeId:w.string,uid:w.string,nomArret:w.string,nomDestination:w.string};export{Gt as L};
