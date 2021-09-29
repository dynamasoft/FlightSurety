exports.id=0,exports.modules={"./src/server/server.js":function(e,o,s){"use strict";s.r(o);var t=s("./build/contracts/FlightSuretyApp.json"),n=s("./build/contracts/FlightSuretyData.json"),r=s("./src/server/config.json"),c=s("web3"),a=s.n(c),l=s("express"),u=s.n(l),i=r.localhost,d=new a.a(new a.a.providers.WebsocketProvider(i.url.replace("http","ws")));d.eth.defaultAccount=d.eth.accounts[0];var g=new d.eth.Contract(t.abi,i.appAddress),f=new d.eth.Contract(n.abi,i.dataAddress),h=[],p=[m,v,b,A,w,O],m=0,v=10,b=20,A=30,w=40,O=50;d.eth.getAccounts((function(e,o){console.log("Get account"),function(e){f.methods.authorizeCaller(i.appAddress).send({from:e},(function(e,o){e?console.log(e):console.log("found authorized callerss: ".concat(i.appAddress))}))}(o[0]),console.log("authorized");for(var s=10;s<20;s++){console.log("accounts :"+o[s]);g.methods.registerOracle().send({from:o[s],value:d.utils.toWei("1","ether"),gas:1e6},(function(e,t){e?console.log(e):(console.log("regiser success:"+t),g.methods.getMyIndexes().call({from:o[s],gas:1e5},(function(e,t){if(e)console.log(e);else{var n={address:o[s],index:t};console.log("Oracle registered are : ".concat(JSON.stringify(n))),h.push(n)}})))}))}})),g.events.OracleRequest({fromBlock:0},(function(e,o){console.log("Oracle services was requested"),e?console.log(e):function(){var e=o.returnValues.flightInfo,s=o.returnValues.timestamp,t=p[Math.floor(Math.random()*p.length)],n=o.returnValues.index,r=o.returnValues.airline;console.log("status code: "+t);for(var c=function(o){h[o].index.includes(n)&&g.methods.submitOracleResponse(n,r,e,s,t).send({from:h[o].address,gas:1e5},(function(e,s){console.log("Oracle response has been submitted"),e?console.log(e):console.log("".concat(JSON.stringify(h[o]),": Status code ").concat(t))}))},a=0;a<h.length;a++)c(a)}()}));var x=u()();x.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=x}};