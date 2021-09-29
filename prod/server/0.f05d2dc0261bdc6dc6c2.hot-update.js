exports.id=0,exports.modules={"./src/server/server.js":function(e,o,s){"use strict";s.r(o);var t=s("./build/contracts/FlightSuretyApp.json"),n=s("./build/contracts/FlightSuretyData.json"),r=s("./src/server/config.json"),c=s("web3"),l=s.n(c),a=s("express"),i=s.n(a),u=r.localhost,d=new l.a(new l.a.providers.WebsocketProvider(u.url.replace("http","ws")));d.eth.defaultAccount=d.eth.accounts[0];var g=new d.eth.Contract(t.abi,u.appAddress),f=new d.eth.Contract(n.abi,u.dataAddress),h=[],p=[m,v,x,A,b,y],m=0,v=10,x=20,A=30,b=40,y=50;d.eth.getAccounts((function(e,o){console.log("Get account"),function(e){f.methods.authorizeCaller(u.appAddress).send({from:e},(function(e,o){e?console.log(e):console.log("found authorized callerss: ".concat(u.appAddress))}))}(o[0]),console.log("authorized");for(var s=10;s<30;s++)g.methods.registerOracle().send({from:o[s],value:d.utils.toWei("1","ether"),gas:1e6},(function(e,t){console.log("register oracle "),e?console.log(e):(console.log("before get my indexes"),g.methods.getMyIndexes().call({from:o[s],gas:1e6},(function(e,t){if(console.log("get my indexes"),e)console.log(e);else{var n={address:o[s],index:t};console.log("Oracle registered are : ".concat(JSON.stringify(n))),h.push(n)}})))}))})),g.events.OracleRequest({fromBlock:0},(function(e,o){e?console.log(e):function(){for(var e=o.returnValues.flightInfo,s=o.returnValues.timestamp,t=p[Math.floor(Math.random()*p.length)],n=o.returnValues.index,r=o.returnValues.airline,c=function(o){h[o].index.includes(n)&&g.methods.submitOracleResponse(n,r,e,s,t).send({from:h[o].address},(function(e,s){e?console.log(e):console.log("".concat(JSON.stringify(h[o]),": Status code ").concat(t))}))},l=0;l<h.length;l++)c(l)}()}));var w=i()();w.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=w}};