(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{137:function(e,t,a){},139:function(e,t,a){"use strict";a.r(t);var n=a(76),r=a(0),c=a.n(r),o=a(32),s=a.n(o),i=a(24),l=a(37),u=a(12),h=a(13),d=a(15),p=a(14),m=a(16),b=a(140),f=a(147),g=a(141),v=a(73),y=a(142),j=a(143),E=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return c.a.createElement("p",null,this.props.fact)}}]),t}(r.Component),O=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(p.a)(t).call(this))).state={result:null},e}return Object(m.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/dailyFacts.json").then(function(e){return e.json()}).then(function(t){e.setState({result:t})},function(e){console.log(e)})}},{key:"render",value:function(){var e=null;if(this.state.result){var t=this.state.result.map(function(e){return c.a.createElement(E,{key:e.id,fact:e.fact})});e=t[Math.floor(Math.random()*t.length)]}return c.a.createElement("div",{className:"daily panel panel-default"},c.a.createElement("div",{className:"panel-body"},c.a.createElement("h2",null,"Random Fact"),e))}}]),t}(r.Component),w=a(66),C=a.n(w),k=a(22),M=a(8),x=a(38),T=a.n(x),D=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(p.a)(t).call(this))).updateChart=e.updateChart.bind(Object(M.a)(Object(M.a)(e))),e.daysInMonth=e.daysInMonth.bind(Object(M.a)(Object(M.a)(e))),e}return Object(m.a)(t,e),Object(h.a)(t,[{key:"daysInMonth",value:function(e,t){return new Date(t,e,0).getDate()}},{key:"componentDidUpdate",value:function(){if(this.props.datepub.length>0){for(var e=["x"],t=new Date,a=this.daysInMonth(t.getMonth(),t.getFullYear()),n="0"+(t.getMonth()+1),r=["data1"],c=1;c<a;c++)c="0"+c,e.push(t.getFullYear()+"-"+n.substr(-2)+"-"+c.substr(-2));for(var o={},s=1;s<e.length;s++)for(var i=0;i<this.props.datepub.length;i++)this.props.datepub[i].date===e[s]?o=Object.assign({},o,Object(k.a)({},e[s],this.props.datepub[i].minutes)):void 0===o[e[s]]&&(o=Object.assign({},o,Object(k.a)({},e[s],0)));for(var l in o)o.hasOwnProperty(l)&&r.push(o[l]);this.chart=T.a.generate({bindto:"#"+this.props.ident,data:{x:"x",columns:[e,r],names:{data1:"Device"},types:{data1:this.props.chartType},axis:{data1:"y"},colors:{data1:"#ccc"}},axis:{x:{inner:!1,type:"timeseries",label:{text:"Date of charge",position:"outer-middle"},tick:{format:"%a, %B %d"}},y:{min:0,padding:{top:10,bottom:0},label:{text:"Charge time (minutes)",position:"outer-middle"}}},interaction:{enabled:!0}}),this.updateChart()}}},{key:"updateChart",value:function(){this.chart.load({type:this.props.chartType})}},{key:"render",value:function(){return c.a.createElement("div",{id:this.props.ident})}}]),t}(r.Component);D.defaultProps={chartType:"spline"};var S=D,I=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(p.a)(t).call(this))).updateChart=e.updateChart.bind(Object(M.a)(Object(M.a)(e))),e.daysInMonth=e.daysInMonth.bind(Object(M.a)(Object(M.a)(e))),e}return Object(m.a)(t,e),Object(h.a)(t,[{key:"daysInMonth",value:function(e,t){return new Date(t,e,0).getDate()}},{key:"componentDidUpdate",value:function(){if(this.props.datepub.length>0){for(var e=["x"],t=new Date,a=this.daysInMonth(t.getMonth(),t.getFullYear()),n="0"+(t.getMonth()+1),r=["data1"],c=1;c<a;c++)c="0"+c,e.push(t.getFullYear()+"-"+n.substr(-2)+"-"+c.substr(-2));for(var o={},s=1;s<e.length;s++)for(var i=0;i<this.props.datepub.length;i++)this.props.datepub[i].date===e[s]?o=Object.assign({},o,Object(k.a)({},e[s],this.props.datepub[i].minutes)):void 0===o[e[s]]&&(o=Object.assign({},o,Object(k.a)({},e[s],0)));for(var l in o)o.hasOwnProperty(l)&&r.push(Math.floor(.7*o[l]));this.chart=T.a.generate({bindto:"#"+this.props.ident,data:{x:"x",columns:[e,r],names:{data1:"Device"},types:{data1:this.props.chartType},axis:{data1:"y"},colors:{data1:"#ccc"}},axis:{x:{inner:!1,type:"timeseries",label:{text:"Date of charge",position:"outer-middle"},tick:{format:"%a, %B %d"}},y:{min:0,max:100,padding:{top:10,bottom:0},label:{text:"Charge amout (%)",position:"outer-middle"}}},interaction:{enabled:!0}}),this.updateChart()}}},{key:"updateChart",value:function(){this.chart.load({type:this.props.chartType})}},{key:"render",value:function(){return c.a.createElement("div",{id:this.props.ident})}}]),t}(r.Component);I.defaultProps={chartType:"bar"};var F=I,Y=a(27),N=a.n(Y),P=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(p.a)(t).call(this))).state={chartType:"spline",datepub:[],pubnub:null,channel:"ChannelMate"},e}return Object(m.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=new C.a({publishKey:"pub-c-76d1d259-d00d-41ab-8bbe-78ba591eaf21",subscribeKey:"sub-c-8a024ae2-3909-11e9-b682-2a55d2175413"});this.setState(function(e){return{chartType:e.chartType,datepub:e.datepub,pubnub:t,channel:e.channel}}),t.history({channel:"ChannelMate",count:360},function(t,a){for(var n=[[]],r=0;r<a.messages.length;r++){n[0][r]=Math.ceil(+a.messages[r].timetoken/1e4);var c=new Date(n[0][r]),o="0"+c.getHours(),s="0"+c.getMinutes(),i="0"+c.getSeconds(),l="0"+c.getDate(),u="0"+(c.getMonth()+1);n[0][r]=c.getFullYear()+"-"+u.substr(-2)+"-"+l.substr(-2)+" "+o.substr(-2)+":"+s.substr(-2)+":"+i.substr(-2)}for(var h=N()(n[0][0]),d=N()(n[0][0]).hours(0).minutes(0).seconds(0),p=0,m=0,b=[],f=1;f<n[0].length;f++){var g=N()(n[0][f]);0===g.diff(d,"days")?p=g.diff(h,"seconds"):(d=N()(n[0][f]).hours(0).minutes(0).seconds(0),m++,h=N()(n[0][f]),p=0);var v={date:h.format("YYYY-MM-DD"),minutes:Math.ceil(p/60)};b[m]=v}e.setState(function(e){return{chartType:e.chartType,datepub:b,pubnub:e.pubnub,channel:e.channel}})})}},{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"graph panel panel-default"},c.a.createElement("div",{className:"panel-body"},c.a.createElement("h3",null,"How long the device charged for"),c.a.createElement("div",{id:"myChart"},c.a.createElement(S,{ident:"chart1",datepub:this.state.datepub,pubnub:this.state.pubnub,channel:this.state.channel,chartType:"scatter"})))),c.a.createElement("div",{className:"graph panel panel-default"},c.a.createElement("div",{className:"panel-body"},c.a.createElement("h3",null,"Estimated amout of charge gained in time"),c.a.createElement("div",{id:"myChart2"},c.a.createElement(F,{ident:"chart2",datepub:this.state.datepub,pubnub:this.state.pubnub,channel:this.state.channel,chartType:"bar"})))))}}]),t}(r.Component),A={authenticate:function(e){var t=new FormData;return t.set("username",e.username),t.set("password",e.password),new Promise(function(e,a){fetch("https://victoria.venasoft.com/api.php",{method:"POST",headers:{Accept:"application/json"},mode:"cors",body:t}).then(function(e){return e.json()}).then(function(t){e(t)}).catch(function(e){a(e)})})},setSession:function(e){localStorage.setItem("session",e.session),localStorage.setItem("authenticated",!0)},signout:function(e){localStorage.removeItem("authenticated"),localStorage.removeItem("session"),e()},session:function(){return localStorage.getItem("session")},isAuthenticated:function(){return!!localStorage.getItem("authenticated")}},B=Object(i.e)(function(e){var t=e.history;return A.isAuthenticated?c.a.createElement(b.a,{onClick:function(){A.signout(function(){return t.push("/")})}},"Logout"):c.a.createElement("div",null)}),R=function(e){function t(){return Object(u.a)(this,t),Object(d.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(h.a)(t,[{key:"componentWillUnmount",value:function(){window.clearTimeout(this.timeout)}},{key:"render",value:function(){return this.timeout=window.setTimeout(function(){window.location.reload()},6e4),c.a.createElement("div",null,c.a.createElement(f.a,{inverse:!0},c.a.createElement(f.a.Header,null,c.a.createElement(f.a.Brand,null,"Phone App"),c.a.createElement(f.a.Toggle,null)),c.a.createElement(f.a.Collapse,null,c.a.createElement(g.a,{pullRight:!0},c.a.createElement(B,null)))),c.a.createElement(v.a,null,c.a.createElement(y.a,null,c.a.createElement(j.a,{md:12},c.a.createElement("h1",null,"Energy Efficiency Application"))),c.a.createElement(y.a,null,c.a.createElement(j.a,{md:12},c.a.createElement(P,null))),c.a.createElement(y.a,null,c.a.createElement(j.a,{md:12,className:"sep"})),c.a.createElement(y.a,null,c.a.createElement(j.a,{md:12},c.a.createElement(O,null)))))}}]),t}(r.Component),U=a(144),H=a(145),W=a(148),J=a(146),K=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(p.a)(t).call(this))).onClick=function(){var t=Object(M.a)(Object(M.a)(e));A.authenticate({username:e.state.username,password:e.state.password}).then(function(e){A.setSession(e),t.setState({redirectToReferrer:!0})}).catch(function(e){})},e.onChange=function(t){e.setState(Object(k.a)({},t.target.name,t.target.value))},e.onChange=e.onChange.bind(Object(M.a)(Object(M.a)(e))),e.onClick=e.onClick.bind(Object(M.a)(Object(M.a)(e))),e.state={redirectToReferrer:!1,username:null,password:null},e}return Object(m.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return this.state.redirectToReferrer?c.a.createElement(i.a,{to:"/dashboard"}):c.a.createElement(v.a,null,c.a.createElement(y.a,null,c.a.createElement(j.a,{md:12},c.a.createElement("h1",null,"Login"))),c.a.createElement(y.a,null,c.a.createElement(j.a,{md:12},c.a.createElement(U.a,null,c.a.createElement(H.a,{htmlFor:"username"},"Username"),c.a.createElement(W.a,{id:"username",name:"username",type:"text",onChange:this.onChange})),c.a.createElement(U.a,null,c.a.createElement(H.a,{htmlFor:"password"},"Password"),c.a.createElement(W.a,{id:"password",name:"password",type:"password",onChange:this.onChange})),c.a.createElement(U.a,null,c.a.createElement(J.a,{type:"button",className:"btn btn-primary",onClick:this.onClick},"Sign in!")))))}}]),t}(r.Component);a(137),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(c.a.createElement(l.a,null,c.a.createElement(i.b,{exact:!0,path:"/",component:K}),c.a.createElement(function(e){var t=e.component,a=Object(n.a)(e,["component"]);return c.a.createElement(i.b,Object.assign({},a,{render:function(e){return A.isAuthenticated()?c.a.createElement(t,e):c.a.createElement(i.a,{to:{pathname:"/",state:{from:e.location}}})}}))},{path:"/dashboard",component:R})),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},78:function(e,t,a){e.exports=a(139)}},[[78,1,2]]]);
//# sourceMappingURL=main.e4b7b7cc.chunk.js.map