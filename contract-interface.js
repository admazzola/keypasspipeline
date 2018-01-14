const  fs = require('fs');

let punkOwners={}
var punkOwnersCollected = false;


let number_of_punks_found = 0;


module.exports = {



  async init()
   {

     const readwrite = require("./readwrite.js")


     path = require('path');
     ethergoodsFilePath = path.join(__dirname, 'contracts/EtherGoods.json');
     var contract_abi_json = await readwrite.readFile(ethergoodsFilePath, 'utf8');
     var contract_abi = JSON.parse(contract_abi_json).abi;

     deploymentsFilePath = path.join(__dirname, 'contracts/DeployedContractInfo.json');
     var deployments_json = await readwrite.readFile(deploymentsFilePath, 'utf8');
     var contract_address = JSON.parse(deployments_json).contracts.ethergoods.blockchain_address;


     this.readGoodTypesFromContract(contract_abi,contract_address)
    // this.readPunkOwnersFromContract(contract_abi);

     /*
     var contract_abi = "";
     fs.readFile(filePath, 'utf8', function (err,data) {
       if (err) {
         return console.log('error reading abi' + err);
       }

       contract_abi = JSON.parse(data);


          this.readPunkOwnersFromContract(contract_abi);

     });
     */


   },

   readGoodTypesFromContract(contract_abi,contract_address)
   {
       console.log('loading contract');
       var contractInstance = web3.eth.contract(contract_abi).at(contract_address);


       let tempGoodTypes = {}


       this.pollAllGoodTypes(contractInstance,tempGoodTypes);



   },



   async pollAllGoodTypes(contractInstance, tempGoodTypes ) {

     console.log('have contract instance ')
    // console.log(contractInstance);



     var goodTypesCount = await contractInstance.getGoodTypesCount();
     console.log(goodTypesCount.toNumber())

     for(var i=0;i<goodTypesCount;i++)
     {
       var goodTypesIndex = await contractInstance.goodTypesIndex(i);
       console.log(goodTypesIndex.toNumber() )
     }


     /*

        if(number_of_punks_found < 10000) {


           this.pollNextPunk(contractInstance, tempPunkOwners, function(){
             this.pollAllPunks(contractInstance, tempPunkOwners)
           }.bind(this) );

           //  setTimeout(pollAllPunks(contractInstance), 10);

        } else {

            console.log('collected all punks ')

            console.log(punkOwners[43])

            punkOwnersCollected = true;

           punkOwners = this.clone(tempPunkOwners);

          //save to file
          fs.writeFile('./punkownerdata.json', JSON.stringify(punkOwners, null, 2) , 'utf-8', function(error,written,buffer){
            console.log('Completed collection of punk owners.')


            this.resetAndRestartPunkCollection(contractInstance);
            //wait and then poll all punks again !

          }.bind(this));


        }
        */
    },



     readPunkOwnersFromContract   (contract_abi) {


        console.log('loading contract')

        //block number 3914495

            var PunkContract = web3.eth.contract(contract_abi);
            var contractInstance = PunkContract.at('0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB');

            var punks = contractInstance.punkIndexToAddress(33, function(err, res){


                  console.log('temp_punk_id X');
                console.log(33);
                console.log(res);



            });


          let tempPunkOwners = {}


          this.pollAllPunks(contractInstance,tempPunkOwners);




       },



    pollAllPunks(contractInstance, tempPunkOwners ) {



         if(number_of_punks_found < 10000) {


            this.pollNextPunk(contractInstance, tempPunkOwners, function(){
              this.pollAllPunks(contractInstance, tempPunkOwners)
            }.bind(this) );

            //  setTimeout(pollAllPunks(contractInstance), 10);

         } else {

             console.log('collected all punks ')

             console.log(punkOwners[43])

             punkOwnersCollected = true;

            punkOwners = this.clone(tempPunkOwners);

           //save to file
           fs.writeFile('./punkownerdata.json', JSON.stringify(punkOwners, null, 2) , 'utf-8', function(error,written,buffer){
             console.log('Completed collection of punk owners.')


             this.resetAndRestartPunkCollection(contractInstance);
             //wait and then poll all punks again !

           }.bind(this));


         }
     },


              pollNextPunk(contractInstance, tempPunkOwners, callback)
            {


              let temp_punk_id = number_of_punks_found;

              var punks = contractInstance.punkIndexToAddress(temp_punk_id, function(err, res){


                  tempPunkOwners[temp_punk_id] = res;
                  number_of_punks_found++;

                  console.log('number_of_punks_found');
                  console.log(number_of_punks_found)



                 // console.log(punkOwners[33])


                  callback();


              });

            },


       resetAndRestartPunkCollection(contractInstance)
     {
       number_of_punks_found = 0;
       tempPunkOwners = {};
       this.pollAllPunks(contractInstance,tempPunkOwners);
     },




            clone(obj) {
             if (null == obj || "object" != typeof obj) return obj;
             var copy = obj.constructor();
             for (var attr in obj) {
                 if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
             }
             return copy;
         },




}
