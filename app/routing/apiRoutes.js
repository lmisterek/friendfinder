


// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendList = require("../data/friends.js");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // * A GET route with the url `/api/friends`. This will be used to display a JSON of 
  // all possible friends.
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
      res.json(friendList);
  });


  // API POST Requests
  // * A POST routes `/api/friends`. This will be used to handle incoming survey results. 
  // This route will also be used to handle the compatibility logic. 
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function(req, res) {

    // // Take in the new user from the request
    var newUser = req.body;

    // This is the index for the match
    var matchIndex = 0;

    // This is the value of the worst match 
    var matchScore = 40;

    for(var i = 0; i < (friendList.length - 1); i++) {

        var comparisonArray = absoluteDifference(newUser.scores, friendList[i].scores);
        var sum = addAll(comparisonArray);
        // console.log(friendList[i]);
        
        if(sum < matchScore) {
          matchScore = sum;
          matchIndex = i;
        }

    }

    
    friendList.push(req.body);

    res.json(friendList[matchIndex]);


  });

// This function calculates the absolute difference between the number is the array
function absoluteDifference(array1, array2) {

  var differences = [];

  for (var i = 0; i < array1.length; i++) {
      differences.push(Math.abs(array1[i] - array2[i]));
  }

  return differences;

}

// This function returns the sum of the elements in an array
function addAll(array) {
  var total = 0;
    for(var i = 0; i < array.length; i++) {
        total += array[i];
    }
    return total;
}
};