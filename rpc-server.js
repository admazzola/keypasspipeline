
module.exports = {

  init()
{

  var jayson = require('jayson');

  console.log('listening on JSONRPC server localhost:4040')
    // create a server
    var server = jayson.server({
      getPunkOwner: function(args, callback) {

        if(punkOwnersCollected == false )
        {
          callback(null, 'notSynced');
        }


        var punk_id = args[0];
        var punk_owner_address = punkOwners[punk_id];
        callback(null, punk_owner_address);


      }
    });

    server.http().listen(4040);

}


}
