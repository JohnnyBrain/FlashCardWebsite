(this["webpackJsonpjapanese-website"]=this["webpackJsonpjapanese-website"]||[]).push([[0],{194:function(n,o,e){"use strict";e.r(o);var s=e(99),t=e(32),c=e.n(t),r=(e(100).response,e(100)),u=e(12),i=(e(175),e(437)),a=e(446),l=(e(14).resolve,r());l.listen(3e3,(function(){return console.log("working!")})),l.use(r.static("src")),l.use(r.json({limit:"1mb"}));var f=new i("database.db");function d(n){return p.apply(this,arguments)}function p(){return(p=Object(s.a)(c.a.mark((function n(o){var e;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,a.hash(o);case 3:return e=n.sent,n.abrupt("return",e);case 7:n.prev=7,n.t0=n.catch(0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))).apply(this,arguments)}function g(n,o){return b.apply(this,arguments)}function b(){return(b=Object(s.a)(c.a.mark((function n(o,e){var s;return c.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,a.verify(o,e);case 3:return s=n.sent,n.abrupt("return",s);case 7:n.prev=7,n.t0=n.catch(0),console.log(n.t0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))).apply(this,arguments)}f.loadDatabase(),l.post("/api",(function(n,o){console.log("request recieved"),console.log(n.body),u.appendFile("./Data.txt",JSON.stringify(n.body)+"\n",(function(n){n&&console.error(n)})),o.json({status:"success",DeckList:n.body})})),l.post("/editDeckList",(function(n,o){console.log("request recieved"),console.log(n.body);d(n.body.password).then((function(o){n.body.password=o,f.update({username:n.body.username},n.body)}));o.json({status:"success",DeckList:n.body})})),l.get("/getData",(function(n,o){console.log("good"),f.find({},(function(n,e){n&&console.log(n),o.json(e),console.log(e[0].sendDeckList[0].name)}))})),l.post("/login",(function(n,o){console.log("good"),f.find({username:n.body.username},(function(e,s){if(0==s.length)console.log("err"),console.log(s),o.json({});else{console.log(s[0].password),console.log(n.body.password);g(s[0].password,n.body.password).then((function(n){console.log(n),console.log(s[0])}));for(var t=function(e){g(s[e].password,n.body.password).then((function(n){n&&(o.json([s[e]]),console.log("login succesful"))}))},c=0;c<s.length;c++)t(c)}}))})),l.post("/createAccount",(function(n,o){n.body.username;var e=n.body.password;f.find({username:n.body.username},(function(s,t){if(console.log(t.length),0!=t.length)console.log("err"),console.log(t),o.json({success:"bad"});else d(e).then((function(e){console.log(e),n.body.password=e,f.insert(n.body),o.json({success:"good"})}))}))}))},206:function(n,o){},208:function(n,o){},244:function(n,o){},245:function(n,o){},262:function(n,o){},277:function(n,o){},280:function(n,o){function e(n){var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}e.keys=function(){return[]},e.resolve=e,n.exports=e,e.id=280},282:function(n,o){},284:function(n,o){},294:function(n,o){},296:function(n,o){},324:function(n,o){},326:function(n,o){},327:function(n,o){},332:function(n,o){},334:function(n,o){},353:function(n,o){},365:function(n,o){},368:function(n,o){},425:function(n,o){},427:function(n,o){}},[[194,1,2]]]);
//# sourceMappingURL=main.0fb19903.chunk.js.map