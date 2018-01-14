
//https://ethereum.stackexchange.com/questions/4452/how-do-i-retrieve-the-voted-events-from-thedao

var dataCacheManager = require("./data-cache-manager.js")
var rpcServer = require("./rpc-server.js");
var contractInterface = require("./contract-interface.js");





console.log('init');

fs = require('fs');

var Web3 = require('web3')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
}



 function init()
 {

   //read from file if exists


    dataCacheManager.readExistingData();
    rpcServer.init();


  //  initJSONRPCServer();

    contractInterface.init();  //readABIFile();

 }










    init();
