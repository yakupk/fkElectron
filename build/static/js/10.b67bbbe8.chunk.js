(this.webpackJsonpfaturakomkiosk=this.webpackJsonpfaturakomkiosk||[]).push([[10,17],{117:function(e,t,n){"use strict";n.r(t),n.d(t,"useEventListener",(function(){return T}));var r=n(4),a=n(24),i=n(15),c=n(0),s=n(13),u=n(5),o=n(16),l=n(33),d=n(282),j=n(283),b=n(285),p=n(60),f=n(71),O=n(105),m=n(107),h=n(25);var g=n(36);function v(e){return function(e){if(Array.isArray(e))return Object(h.a)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||Object(g.a)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var _=n(31),y=n.n(_),x=(n(96),n(3)),k=function(e,t){return e.reduce((function(e,n,r){return r%t?e[e.length-1].push(n):e.push([n]),e}),[])};var A=function(e){var t=e.setFunc,n=e.left,r=void 0===n||n,a=e.right,i=void 0===a||a,c=k(v("ABCDEFGHIJKLMNOPRSTUVYZ"),8),s=k(Array(9).fill().map((function(e,t){return t+1})).concat(0,"C"),3);return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)("div",{className:y()("keyboard",!r&&"disabled"),children:c.map((function(e,n){return Object(x.jsx)("div",{className:"keyboard-row",children:e.map((function(e){return Object(x.jsx)("button",{id:"character"+e,type:"button",className:y()("keyboard-button",e),onClick:function(){return t(e)},children:e},e)}))},n)}))}),Object(x.jsx)("div",{className:y()("keyboard","nums",!i&&"disabled"),children:s.map((function(e,n){return Object(x.jsx)("div",{className:"keyboard-row",children:e.map((function(e){return Object(x.jsx)("button",{id:"num"+e,type:"button",className:y()("keyboard-button",e),onClick:function(n){return t("numC"===n.target.id?"reset":e)},children:e},e)}))},n)}))})]})},w=n(34),E=n(17),N=n(82),S=n(97);function T(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:window,r=Object(c.useRef)();Object(c.useEffect)((function(){r.current=t}),[t]),Object(c.useEffect)((function(){if(n&&n.addEventListener){var t=function(e){return r.current(e)};return n.addEventListener(e,t),function(){n.removeEventListener(e,t)}}}),[e,n])}t.default=function(e){var t,n,h=e.card,g=e.match,v=Object(s.c)(o.a).categories;console.log("data: ",{card:h});var _=Object(s.c)(l.a),y=_.loading,k=_.queryResult,P=_.hasErrors,I=_.redirect,M=_.reRequest,R=Object(s.c)(E.c).profile,z=Object(c.useState)(""),C=Object(i.a)(z,2),L=C[0],q=C[1],F=Object(c.useState)(""),Q=Object(i.a)(F,2),H=Q[0],Y=Q[1],B=0;R.hasOwnProperty("result")&&""==R.errors&&null!==R.result.reseller.card_devices&&(B=R.result.reseller.card_devices[0].id);var D=v.result.institution_categories.map((function(e){return e.institutions})).flat().find((function(e){return e.id==g.params.id}));D=null!==(t=D)&&void 0!==t?t:v.result.shortcuts.find((function(e){return e.id==g.params.id}));var J=Object(u.g)(),V=Object(s.b)();if(Object(c.useLayoutEffect)((function(){return V(Object(l.e)()),function(){V(Object(l.e)())}}),[]),Object(c.useLayoutEffect)((function(){P&&d.a.warning({className:"kioksModal",icon:null,title:"HATA !",content:"L\xfctfen doldurulmas\u0131 gereken alanlar\u0131 kontrol ediniz",okText:"TAMAM"})}),[P]),Object(c.useEffect)((function(){if(k.hasOwnProperty("result")){var e;if(""!==k.result[0].error&&null===k.result[0].items)return ce("reset"),d.a.warning({className:"kioksModal",icon:null,title:"HATA !",content:null!==(e=k.result[0].error)&&void 0!==e?e:"Fatura Bulunumad\u0131 !",okText:"TAMAM"});var t={};t.field1=B.toString(),t.institution_id=parseInt(g.params.id),""!==k.result[0].additional_field&&k.result[0].is_continue&&(t.field2=k.result[0].additional_field,q(k.result[0].additional_field),V(Object(l.d)(t))),M&&""===k.result[0].error&&k.result[0].is_continue&&(t.field2=L,""!==H&&(t.field3=H,setTimeout(function(){V(Object(l.d)(t))}.bind(undefined),1e3)))}}),[M,k]),I&&k.hasOwnProperty("result")){var G=k.result[0].institution.category_type;"invoice"===G&&J.push("/queryresult"),"prepaid_card"===G&&J.push("/queryresultpartialpayment")}var K=Object(c.useMemo)((function(){var e;return Array.isArray(null===(e=D)||void 0===e?void 0:e.inputs)?D.inputs:[]}),[D]),Z=(Object(c.useMemo)((function(){return"prepaid_card"===D.category_type&&("card_on"===h?"on":"off")}),[D,h]),Object(c.useState)(1)),U=Object(i.a)(Z,2),W=U[0],X=U[1],$=Object(c.useState)({}),ee=Object(i.a)($,2),te=ee[0],ne=ee[1],re=K.some((function(e){return e.alphanumeric})),ae=[{label:"Y\xfcklemek \u0130stedi\u011finiz Tutar",max:4,min:1,name:"field3"}],ie=null!==(n=K[W-1])&&void 0!==n?n:ae[W-1];Object(c.useEffect)((function(){return ne(Array(Array.isArray(K)?K.length:0).fill().map((function(e,t){return t+1})).reduce((function(e,t){return Object(a.a)(Object(a.a)({},e),{},Object(r.a)({},t,""))}),{}))}),[K]),T("click",(function(){var e,t=document.getElementsByTagName("input");t.length&&(null===(e=t[W-1])||void 0===e||e.focus())}));var ce=Object(c.useCallback)((function(e){var t;if(void 0!==te&&0===Object.keys(te).length&&(te[1]=""),"reset"===e)return ne(Object(a.a)(Object(a.a)({},te),{},Object(r.a)({},W,"")));if("del"===e){var n=te[W];return n.length>0?ne(Object(a.a)(Object(a.a)({},te),{},Object(r.a)({},W,n.slice(0,-1)))):n}if(te[W]&&(null===(t=te[W])||void 0===t?void 0:t.length)>=(null===ie||void 0===ie?void 0:ie.max))return d.a.warning({className:"kioksModal",icon:null,title:"HATA !",content:"Yeterince uzun, daha fazla karakter ekleyemezsiniz ",okText:"TAMAM"});ne(Object(a.a)(Object(a.a)({},te),{},Object(r.a)({},W,te[W]+e)))}),[te,ie,W]);return D?!Object.values(D).length||y&&"prepaid_card"!==D.category_type?Object(x.jsx)(w.a,{}):y&&"prepaid_card"===D.category_type&&M?Object(x.jsx)(S.a,{text1:"Sorgulan\u0131yor..."}):R.result.reseller.pos_device_status?Object(x.jsxs)(p.j,{children:[Object(x.jsx)(p.s,{}),Object(x.jsxs)(p.m,{children:[Object(x.jsx)(p.A,{institution:!0,children:D.name}),Object(x.jsx)(x.Fragment,{children:re?Object(x.jsxs)(j.a,{children:[Object(x.jsx)(b.a,{span:24,children:Object(x.jsxs)(p.a,{children:[Object(x.jsx)(p.q,{src:D.logo}),Object(x.jsx)(p.b,{institution:!0,children:D.description}),Object(x.jsx)(O.a,{type:"big",num:te,inputs:K,activeInputIndex:W,setActiveInput:X}),Object(x.jsx)(p.e,{section:"query",children:"Sorgula"})]})}),Object(x.jsx)(b.a,{span:24,className:"alphanumeric",children:Object(x.jsx)(A,{setFunc:ce,left:!!K[W-1].alphanumeric})})]}):Object(x.jsxs)(j.a,{children:[Object(x.jsxs)(b.a,{span:17,children:[Object(x.jsx)(p.b,{institution:!0,children:D.description}),Object(x.jsx)(O.a,{num:te,inputs:null!==K&&(null===K||void 0===K?void 0:K.length)>0?K:ae,activeInputIndex:W,setActiveInput:X}),Object(x.jsx)(p.e,{section:"query",form:"QueryForm",onClick:function(e){return function(e){e.preventDefault();for(var t={},n=document.getElementById("QueryForm").elements,r=0;r<n.length;r++){var a=n.item(r);"text"===n.item(r).type&&(t[a.name]=a.value.toString())}t.institution_id=parseInt(g.params.id),"prepaid_card"===D.category_type&&(t.hasOwnProperty("field3")&&Y(t.field3),t.field1=B.toString()),V(Object(l.d)(t))}(e)},children:"Sorgula"})]}),Object(x.jsxs)(b.a,{span:7,className:"numpad",children:[Object(x.jsx)(p.q,{src:D.logo}),Object(x.jsx)(m.a,{setFunc:ce})]})]})})]}),Object(x.jsx)(f.a,{children:Object(x.jsx)(p.e,{position:"left",onClick:function(){return J.push("/greeting")},children:"Geri"})})]}):Object(x.jsx)(N.default,{title:"Sistem Hatasi",message:"Pos cihazi \u015fuan i\xe7in devre d\u0131\u015f\u0131.L\xfctfen daha sonra tekrar deneyiniz."}):Object(x.jsx)(N.default,{})}},279:function(e,t,n){"use strict";n.r(t);var r=n(22),a=(n(0),n(81)),i=n.n(a),c=n(117),s=n(3),u=["history"];t.default=function(e){var t=e.history,n=Object(r.a)(e,u);return Object(c.useEventListener)("click",(function(){console.log({props:n}),n.networkStatus?t.push("/greeting"):t.push("/unavailable")})),Object(s.jsx)("section",{id:"reklamEkrani",className:i.a.dashboardPage,children:Object(s.jsx)("span",{children:"\u0130NTERNET YOK"})})}},81:function(e,t,n){e.exports={prepaidCardPage:"pages_prepaidCardPage__1-iNg",cardRead:"pages_cardRead__2eQ4D",partialPaymentPageQueryResult:"pages_partialPaymentPageQueryResult__1nqS2",selectedRow:"pages_selectedRow__1w2zQ",dashboardPage:"pages_dashboardPage__2sT3Y",card:"pages_card__z46uw",top:"pages_top__3h9jw",dots:"pages_dots__3vSBN",content:"pages_content__2wVaf",input_container:"pages_input_container__3eWrZ",bottom_content:"pages_bottom_content__3psHr",ripple:"pages_ripple__3YAQo",rippling:"pages_rippling__3Vnnd"}},96:function(e,t,n){}}]);
//# sourceMappingURL=10.b67bbbe8.chunk.js.map