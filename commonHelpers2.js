import"./assets/modulepreload-polyfill-3cfb730f.js";import{i as r}from"./assets/vendor-ad859c2f.js";document.querySelector(".form").addEventListener("submit",t=>{t.preventDefault();const s=t.currentTarget,i=Number(s.elements.delay.value),m=s.elements.state.value;((e,o)=>new Promise((c,l)=>{setTimeout(()=>{o==="fullfilled"?c(e):l(e)},e)}))(i,m).then(e=>{r.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`})}).catch(e=>{r.error({title:"Error",message:`❌ Rejected promise in ${e}ms`})})});
//# sourceMappingURL=commonHelpers2.js.map
