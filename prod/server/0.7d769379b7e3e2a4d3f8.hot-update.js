exports.id=0,exports.modules={"./src/server/server.js":function(e,o,s){"use strict";s.r(o);var n=s("./build/contracts/FlightSuretyApp.json"),t=s("./build/contracts/FlightSuretyData.json"),r=s("./src/server/config.json"),c=s("web3"),l=s.n(c),a=s("express"),u=s.n(a),i=r.localhost,d=new l.a(new l.a.providers.WebsocketProvider(i.url.replace("http","ws")));d.eth.defaultAccount=d.eth.accounts[0];var g=new d.eth.Contract(n.abi,i.appAddress),f=new d.eth.Contract(t.abi,i.dataAddress),h=[],p=[0,10,20,30,40,50];d.eth.getAccounts((function(e,o){console.log("Get account"),function(e){f.methods.authorizeCaller(i.appAddress).send({from:e},(function(e,o){e?console.log(e):console.log("found authorized callerss: ".concat(i.appAddress))}))}(o[0]),console.log("authorized");for(var s=10;s<20;s++){console.log("accounts :"+o[s]);g.methods.registerOracle().send({from:o[s],value:d.utils.toWei("1","ether"),gas:1e6},(function(e,n){e?console.log(e):(console.log("regiser success:"+n),g.methods.getMyIndexes().call({from:o[s],gas:1e5},(function(e,n){if(e)console.log(e);else{var t={address:o[s],index:n};console.log("Oracle registered are : ".concat(JSON.stringify(t))),h.push(t)}})))}))}})),g.events.OracleRequest({fromBlock:0},(function(e,o){console.log("Oracle services was requested"),e?console.log(e):function(){for(var e=o.returnValues.flightInfo,s=o.returnValues.timestamp,n=function(){console.log(STATUS_CODE);var e=Math.floor(Math.random()*p.length);return console.log("random:"+e),console.log("status code "+p[0]),p[e]}(),t=o.returnValues.index,r=o.returnValues.airline,c=function(o){h[o].index.includes(t)&&g.methods.submitOracleResponse(t,r,e,s,n).send({from:h[o].address,gas:1e5},(function(e,s){console.log("Oracle response has been submitted"),e?console.log(e):console.log("".concat(JSON.stringify(h[o]),": Status code ").concat(n))}))},l=0;l<h.length;l++)c(l)}()}));var m=u()();m.get("/api",(function(e,o){o.send({message:"An API for use with your Dapp!"})})),o.default=m}};