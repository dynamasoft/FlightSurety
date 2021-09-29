exports.id=0,exports.modules={"./src/server/server.js":function(e,o,t){"use strict";t.r(o);var n=t("./build/contracts/FlightSuretyApp.json"),s=t("./build/contracts/FlightSuretyData.json"),r=t("./src/server/config.json"),c=t("web3"),a=t.n(c),l=t("express"),i=t.n(l),u=r.localhost,d=new a.a(new a.a.providers.WebsocketProvider(u.url.replace("http","ws")));d.eth.defaultAccount=d.eth.accounts[0];var f=new d.eth.Contract(n.abi,u.appAddress),g=new d.eth.Contract(s.abi,u.dataAddress),h=[],p=[m,v,A,x,b,w],m=0,v=10,A=20,x=30,b=40,w=50;d.eth.getAccounts((function(e,o){if(console.log("Get account"),function(e){g.methods.authorizeCaller(u.appAddress).send({from:e},(function(e,o){e?console.log(e):console.log("found authorized caller: ".concat(u.appAddress))}))}(o[0]))for(var t=10;t<30;t++)f.methods.registerOracle().send({from:o[t],value:d.utils.toWei("1","ether")},(function(e,n){console.log("register"),e?console.log(e):f.methods.getMyIndexes().call({from:o[t]},(function(e,n){if(console.log("get my indexes"),e)console.log(e);else{var s={address:o[t],index:n};console.log("Oracle registered are : ".concat(JSON.stringify(s))),h.push(s)}}))}))})),f.events.OracleRequest({fromBlock:0},(function(e,o){e?console.log(e):function(){for(var e=o.returnValues.flightInfo,t=o.returnValues.timestamp,n=p[Math.floor(Math.random()*p.length)],s=o.returnValues.index,r=o.returnValues.airline,c=function(o){h[o].index.includes(s)&&f.methods.submitOracleResponse(s,r,e,t,n).send({from:h[o].address},(function(e,t){e?console.log(e):console.log("".concat(JSON.stringify(h[o]),": Status code ").concat(n))}))},a=0;a<h.length;a++)c(a)}()}));var y=i()();y.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=y}};