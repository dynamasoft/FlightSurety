exports.id=0,exports.modules={"./src/server/server.js":function(e,o,t){"use strict";t.r(o);var s=t("./build/contracts/FlightSuretyApp.json"),n=t("./build/contracts/FlightSuretyData.json"),r=t("./src/server/config.json"),a=t("web3"),c=t.n(a),l=t("express"),i=t.n(l),u=r.localhost,d=new c.a(new c.a.providers.WebsocketProvider(u.url.replace("http","ws")));d.eth.defaultAccount=d.eth.accounts[0];var f=new d.eth.Contract(s.abi,u.appAddress),g=new d.eth.Contract(n.abi,u.dataAddress),h=[],p=[m,v,A,b,w,x],m=0,v=10,A=20,b=30,w=40,x=50;d.eth.getAccounts((function(e,o){console.log("Get account"),function(e){g.methods.authorizeCaller(u.appAddress).send({from:e},(function(e,o){e?console.log(e):console.log("found authorized callerss: ".concat(u.appAddress))}))}(o[0]),console.log("authorized");for(var t=10;t<21;t++)f.methods.registerOracle().send({from:o[t],value:d.utils.toWei("1","ether"),gas:1e6},(function(e,s){e?console.log(e):f.methods.getMyIndexes().call({from:o[t],gas:1e5},(function(e,s){if(e)console.log(e);else{var n={address:o[t],index:s};console.log("Oracle registered are : ".concat(JSON.stringify(n))),h.push(n)}}))}))})),f.events.OracleRequest({fromBlock:0},(function(e,o){e?console.log(e):function(){for(var e=o.returnValues.flightInfo,t=o.returnValues.timestamp,s=p[Math.floor(Math.random()*p.length)],n=o.returnValues.index,r=o.returnValues.airline,a=function(o){h[o].index.includes(n)&&f.methods.submitOracleResponse(n,r,e,t,s).send({from:h[o].address,gas:1e5},(function(e,t){e?console.log(e):console.log("".concat(JSON.stringify(h[o]),": Status code ").concat(s))}))},c=0;c<h.length;c++)a(c)}()}));var y=i()();y.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=y}};