exports.id=0,exports.modules={"./src/server/server.js":function(e,o,s){"use strict";s.r(o);var t=s("./build/contracts/FlightSuretyApp.json"),n=s("./build/contracts/FlightSuretyData.json"),r=s("./src/server/config.json"),c=s("web3"),a=s.n(c),l=s("express"),u=s.n(l),i=r.localhost,d=new a.a(new a.a.providers.WebsocketProvider(i.url.replace("http","ws")));d.eth.defaultAccount=d.eth.accounts[0];var f=new d.eth.Contract(t.abi,i.appAddress),g=new d.eth.Contract(n.abi,i.dataAddress),h=[],p=[0,10,20,30,40,50];d.eth.getAccounts((function(e,o){console.log("Get account"),function(e){g.methods.authorizeCaller(i.appAddress).send({from:e},(function(e,o){e?console.log(e):console.log("found authorized callerss: ".concat(i.appAddress))}))}(o[0]);for(var s=10;s<40;s++)f.methods.registerOracle().send({from:o[s],value:d.utils.toWei("1","ether"),gas:1e6},(function(e,t){e?console.log(e):f.methods.getMyIndexes().call({from:o[s],gas:1e5},(function(e,t){if(e)console.log(e);else{var n={address:o[s],index:t};h.push(n)}}))}))})),f.events.OracleRequest({fromBlock:0},(function(e,o){console.log("Oracle services was requested"),e?console.log(e):function(){var e,s=o.returnValues.flightInfo,t=o.returnValues.timestamp,n=(e=Math.floor(Math.random()*p.length),console.log("status code:"+p[e]),p[e]);console.log(n);for(var r=o.returnValues.index,c=o.returnValues.airline,a=function(e){h[e].index.includes(r)&&(console.log("found include"),f.methods.submitOracleResponse(r,c,s,t,n).send({from:h[e].address,gas:1e5},(function(o,s){console.log("Oracle response has been submitted"),o?console.log(o):console.log("".concat(JSON.stringify(h[e]),": Status code ").concat(n))})))},l=0;l<h.length;l++)a(l)}()}));var m=u()();m.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=m}};