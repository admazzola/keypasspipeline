module.exports = {




  readExistingData()
  {
    fs.readFile('./punkownerdata.json', 'utf8', function (err,data) {
      if (err) {
        return console.log('error reading existing punk file' + err);
      }

      try {
        punkOwners = JSON.parse(data);

      } catch (e) {
         console.error('could not load existing punk data')
      } finally {

      }

      punkOwnersCollected = true;
      console.log('loaded cached punk data')

    });

  }











}
