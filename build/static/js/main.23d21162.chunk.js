(this.webpackJsonpkoa_react_session_boiler=this.webpackJsonpkoa_react_session_boiler||[]).push([[0],{193:function(e,n,o){"use strict";o.r(n);var t=o(4),i=o.n(t),c=o(81),r=o.n(c),a=(o(91),o(30)),s=o.n(a),f=o(82),p=o(86),d=(o.p,o(93),o(84)),u=o.n(d),h=o(29),l=o(19),b=o.n(l),w=null,j=null;"undefined"!==typeof window&&(w=window.location.hostname);var g="https://"+w+"/api/",v=w&&w.includes("localhost")?"http://localhost:8080/api/":g;if(j=u.a.create({baseURL:v}),void 0!=typeof window){var O="82f35141fdff1eaeb59afdf6e75e5c74";console.log("inn",{apiKey:O,shopOrigin:window.shop}),j.interceptors.request.use((function(e){var n=b()({apiKey:O,shopOrigin:window.shop});return Object(h.getSessionToken)(n).then((function(n){return e.headers.Authorization="Bearer ".concat(n),e}))}))}var y=j;var x=o(8);var k=function(){var e=Object(t.useState)("Verifing..."),n=Object(p.a)(e,2),o=n[0],i=n[1],c=function(){var e=Object(f.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("innn"),(n="/app/verify",y.post(n,{})).then((function(e){i("Application is working fine")})).catch((function(e){i(e)}));case 2:case"end":return e.stop()}var n}),e)})));return function(){return e.apply(this,arguments)}}();return Object(x.jsxs)("div",{children:[Object(x.jsx)("button",{onClick:function(){c()},children:"Verify"}),Object(x.jsx)("br",{}),Object(x.jsx)("br",{}),Object(x.jsx)("p",{children:o})]})},_=function(e){e&&e instanceof Function&&o.e(3).then(o.bind(null,195)).then((function(n){var o=n.getCLS,t=n.getFID,i=n.getFCP,c=n.getLCP,r=n.getTTFB;o(e),t(e),i(e),c(e),r(e)}))},m=o(85),S=(o(169),new URLSearchParams(window.location.search));window.shop=S.get("shop"),console.log("shop"),console.log("asd",{apiKey:"82f35141fdff1eaeb59afdf6e75e5c74",shopOrigin:window.shop,forceRedirect:!0}),r.a.render(Object(x.jsx)(i.a.StrictMode,{children:Object(x.jsx)(m.Provider,{config:{apiKey:"82f35141fdff1eaeb59afdf6e75e5c74",shopOrigin:window.shop,forceRedirect:!0},children:Object(x.jsx)(k,{})})}),document.getElementById("root")),_()},91:function(e,n,o){},93:function(e,n,o){}},[[193,1,2]]]);
//# sourceMappingURL=main.23d21162.chunk.js.map