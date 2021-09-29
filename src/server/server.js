// Functioning Oracle: Oracle functionality is implemented in the server app.
import FlightSuretyApp from '../../build/contracts/FlightSuretyApp.json';
import FlightSuretyData from '../../build/contracts/FlightSuretyData.json';
import Config from './config.json';
import Web3 from 'web3';
import express from 'express';

// Configuration
debugger;
let config = Config['localhost'];

let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));
web3.eth.defaultAccount = web3.eth.accounts[0];
let flightSuretyApp = new web3.eth.Contract(FlightSuretyApp.abi, config.appAddress);
let flightSuretyData = new web3.eth.Contract(FlightSuretyData.abi, config.dataAddress);
const ORACLES_MAX_ACCOUNT = 25;
const ORACLES_ACCOUNT_START = 10; // Accounts 0 to 8 are reserved for owner, airlines and passengers
let oracles = [];



// Status codes
const STATUS_UNKNOWN = 0;
const STATUS_ON_TIME = 10;
const STATUS_LATE_AIRLINE = 20;
const STATUS_LATE_WEATHER = 30;
const STATUS_LATE_TECHNICAL = 40;
const STATUS_LATE_OTHER = 50;

const STATUS_CODES  = [
  STATUS_UNKNOWN,
  STATUS_ON_TIME,
  STATUS_LATE_AIRLINE,
  STATUS_LATE_WEATHER,
  STATUS_LATE_TECHNICAL,
  STATUS_LATE_OTHER
];


// Get random status code
function randomizeStatusCode() 
{  
  var i = Math.floor(Math.random() * STATUS_CODES.length);     
  return STATUS_CODES[i];
}

function isAuthorized(owner)
{
  debugger;

  // Authorize FlightSurety app to call FlightSurety data contract
  flightSuretyData.methods.authorizeContract(config.appAddress).send({from: owner}, (error, result) => {
    
    if(error) 
    {
      console.log(error);
    } 
    else 
    {
      console.log(`found authorized contract: ${config.appAddress}`);      
    }
  });
}


// Setup application
web3.eth.getAccounts((error, accounts) => 
{  
  debugger;

  let owner = accounts[0];

  isAuthorized(owner);

  debugger;

  //console.log("authorized");
  //console.log(accounts);
  
  for(var i=ORACLES_ACCOUNT_START; i<ORACLES_MAX_ACCOUNT + ORACLES_ACCOUNT_START; i++) 
  {   
      //  console.log("accounts :" + accounts[i]);
      //console.log("before before accounts-->: + i:" + i + " "  + accounts[i]);

     var result = flightSuretyApp.methods.registerOracle().send({from: accounts[i], value: web3.utils.toWei("1",'ether'), gas: 1000000}, (error, result) => 
     {            
      if(error) 
      {
        debugger;
        console.log(error);
      }     
    });
  }

    for(var i=ORACLES_ACCOUNT_START; i<ORACLES_MAX_ACCOUNT + ORACLES_ACCOUNT_START; i++) 
    {  
      
        flightSuretyApp.methods.getMyIndexes().call({from: accounts[i], gas: 100000 }, (error, result) => 
        {
          if (error) {
            debugger;
            console.log(error);
          }
          else {           
            var oracle = {address: accounts[i], index: result};
            oracles.push(oracle);
          }
        });
      }     
  });


flightSuretyApp.events.OracleRequest({fromBlock: 0}, function (error, event) {
  debugger;
  console.log("Oracle services was requested");
  if (error) {
    console.log(error);
  }
  else {

    let flightInfo = event.returnValues.flightInfo;
    let timestamp = event.returnValues.timestamp;
    let statusCode = randomizeStatusCode();    
    let index = event.returnValues.index;
    let airline = event.returnValues.airline;    

    for(let a=0; a<oracles.length; a++) 
    {
      console.log(index);
      console.log(oracles[a].index);

      if(oracles[a].index.includes(index)) 
      {
        console.log("found include");
        
        flightSuretyApp.methods.submitOracleResponse(index, airline, flightInfo, timestamp, statusCode).send({from: oracles[a].address, gas: 100000}, (error, result) => {
        
          console.log("Oracle response has been submitted");

          if(error) 
          {
            console.log(error);
          } 
          else 
          {
            console.log(`${JSON.stringify(oracles[a])}: Status code ${statusCode}`);
          }
        });
      }
    }
  }
});

const app = express();
app.get('/api', (req, res) => {
    res.send({
      message: 'An API for use with your Dapp!'
    })
})

export default app;