(this.webpackJsonpfaturakomkiosk=this.webpackJsonpfaturakomkiosk||[]).push([[18],{284:function(e,t,s){"use strict";s.r(t);var a=s(12),n=s.n(a),o=s(14),r=s(15),i=s(282),l=s(280),c=s(0),u=s(5),p=s(60),d=s(71),_=s(13),k=s(32),g=s(37),m=(s(82),s(17)),b=s(97),j=(s(81),s(283),s(285),s(105),s(107),s(3));t.default=function(){var e=this,t=Object(_.c)(k.a),s=t.selectedItemsStore,a=t.selectedBkmId,f=t.selectedInstallationNumber,O=t.posTransactionResponse,y=t.posTransactionStatusResponse,h=t.posTransactionLoading,T=Object(_.c)(g.c).posRates,v=Object(_.c)(m.c).profile,x=Object(_.b)(),F=Object(u.g)(),w=Object(c.useState)(!0),z=Object(r.a)(w,2),B=z[0],P=z[1],R=Object(c.useState)(""),S=Object(r.a)(R,2),A=S[0],I=S[1],N=Object(c.useState)(""),M=Object(r.a)(N,2),D=M[0],C=M[1],K=0,L=0,Q=0,Y=0,q=0;console.log({selectedBkmId:a});var G=T.hasOwnProperty("result")?T.result.banks.filter((function(e){return e.id===a})):{};if(console.log({selectedBkmDetail:G}),(0===Object.keys(T).length&&T.constructor===Object||0===Object.keys(v).length&&v.constructor===Object)&&F.push("/greeting"),v.hasOwnProperty("result")&&""==v.errors&&(q=v.result.reseller.pos_devices[0].id),s.length>0&&s.map((function(e){K+=e.invoice_amount,L+=e.transaction_cost})),G.length>0){var H=G[0].rates.filter((function(e){return e.installment===f}));Q=((parseFloat(H[0].sales_ratio*K/100)+parseFloat(K))/parseFloat(H[0].installment)).toFixed(3),Y=parseFloat(H[0].sales_ratio*K)/100+parseFloat(K)+parseFloat(L)}else console.log({invoiceAmount:K}),Q=((parseFloat(T.result.default_rate.sales_ratio*K/100)+parseFloat(K))/parseFloat(T.result.default_rate.installment)).toFixed(3),Y=parseFloat(T.result.default_rate.sales_ratio*K)/100+parseFloat(K)+parseFloat(L);var E=[{key:"Fatura Tutar\u0131",val:parseFloat(K).toFixed(3)+"\u20ba"},{key:"\u0130\u015flem Bedeli",val:L+"\u20ba"},{key:"Taksit & Tutar ",val:f+" Taksit  X "+parseFloat(Q).toFixed(3)+"\u20ba"},{key:"Kredi Kart\u0131 Komisyonu",val:(Y-(K+L)).toFixed(3)+"\u20ba"},{key:"Toplam \xd6denecek Tutar",val:parseFloat(Y).toFixed(3)+"\u20ba"}];function J(){return V.apply(this,arguments)}function V(){return(V=Object(o.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("goBack is working"),e.next=3,x(Object(k.k)({selectedBkmId:0,selectedInstallationNumber:1,posTransactionLoading:!1,posTransactionResponse:{},posTransactionError:{},posTransactionStatusResponse:{}}));case 3:F.push("/queryresult");case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(c.useEffect)((function(){if(console.log("Resp Geldi Status 'u sor ",O),O.hasOwnProperty("result")){var t={};if(t.id=O.result.id,y.hasOwnProperty("result"))if(console.log("Loop D\xf6ng\xfcs\xfc i\xe7in response istek "),"initial"===y.result.status)C(y.result.turkish_status_message),console.log("D\xf6ng\xfcye devamm..."),setTimeout(function(){x(Object(k.e)(t))}.bind(e),1e3);else if(console.log("istek bitti.....",y),console.log(y.result.turkish_status_message),"success"===y.result.status)if(Object.values(y.result.query_info[0].institution).includes("prepaid_card")){console.log("i\u015felm prepaid card");x(Object(k.f)())}else x(Object(k.i)({status:!1})),function(){var e=5,t=i.a.success({className:"kioksModal",icon:null,title:"Ba\u015far\u0131l\u0131 \u0130\u015flem ",content:"\u0130\u015fleminiz Ba\u015far\u0131yla Tamamlanm\u0131\u015ft\u0131r.Fatura \xd6zetiniz Yazd\u0131r\u0131l\u0131yor.L\xfctfen Bekleyiniz.!"}),s=setInterval((function(){e-=1}),1e3);setTimeout((function(){clearInterval(s),t.destroy(),console.log("Y\xf6nlendirme ....."),F.push({pathname:"/blankpage",title:"\u0130\u015flem Ba\u015far\u0131l\u0131",message:"Fatura \xd6zetiniz Yazd\u0131r\u0131l\u0131yor.L\xfctfen Bekleyiniz.!"})}),1e3*e)}();else x(Object(k.i)({status:!1})),i.a.error({className:"kioksModal",icon:null,title:"\xd6deme \u0130\u015flemi Ba\u015far\u0131s\u0131z.!",content:y.result.turkish_status_message,okText:"TAMAM",onOk:function(){J().then()}});else console.log("ilk pos Transactioon status response istek "),x(Object(k.e)(t))}Object.keys(O).length>0&&""!==O.errors&&!O.success&&(console.log("POS TRANSACTION :",O),x(Object(k.i)({status:!1})),i.a.error({className:"kioksModal",icon:null,title:"HATA !",content:"\u0130\u015fleminizi \u015euan Ger\xe7ekle\u015fle\u015ftiremiyoruz Daha Sonra Tekrar Deneyiniz",okText:"TAMAM"}))}),[O,y]),Object(j.jsxs)(p.j,{nobg:!0,children:[h?Object(j.jsxs)(j.Fragment,{children:[" ",Object(j.jsx)(b.a,{text1:A,text2:D})]}):"",Object(j.jsx)(p.s,{}),Object(j.jsxs)(p.k,{children:[Object(j.jsx)(p.A,{queryresult:!0}),Object(j.jsx)(l.a,{className:"payment",showHeader:!1,pagination:!1,dataSource:E,columns:[{title:"",dataIndex:"key",key:"key"},{title:"",dataIndex:"val",key:"val"}]})]}),Object(j.jsxs)(d.a,{children:[Object(j.jsx)(p.e,{position:"left",onClick:function(){return J()},children:"Geri"}),B?Object(j.jsx)(p.e,{position:"right",onClick:function(){return function(){P(!1);var e={};e.bank_id=a,e.installment=f,e.pos_device_id=q,e.tokens=[],s.map((function(t){e.tokens.push(t.token)})),x(Object(k.d)(e)),I("Kredi Kart\u0131 \u0130\u015flemi Ger\xe7ekle\u015ftiriliyor ....")}()},id:"paymentButton",children:"\xf6demeyi Tamamla"}):""]})]})}},81:function(e,t,s){e.exports={prepaidCardPage:"pages_prepaidCardPage__1-iNg",cardRead:"pages_cardRead__2eQ4D",partialPaymentPageQueryResult:"pages_partialPaymentPageQueryResult__1nqS2",selectedRow:"pages_selectedRow__1w2zQ",dashboardPage:"pages_dashboardPage__2sT3Y",card:"pages_card__z46uw",top:"pages_top__3h9jw",dots:"pages_dots__3vSBN",content:"pages_content__2wVaf",input_container:"pages_input_container__3eWrZ",bottom_content:"pages_bottom_content__3psHr",ripple:"pages_ripple__3YAQo",rippling:"pages_rippling__3Vnnd"}}}]);
//# sourceMappingURL=18.a4fad036.chunk.js.map