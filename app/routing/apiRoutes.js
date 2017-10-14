console.log('apiroutes loaded');

var friends = require('../data/friends.js');
var uuidv1 = require('uuid/v1');
var getClosest = require("get-closest");
// var logic = require('../../test.js')


module.exports = function(app) {

    app.get('/api/friends', function(req, res) {

        res.json(friends);
        console.log(friends);

    });

    app.post('/api/friends', function(req, res) {

        var surveyResults = req.body;

        //logic to determine best match
        console.log(surveyResults);
        uid = uuidv1(); // generate uID
        surveyResults['uID'] = uid; // add uID to object
        console.log(surveyResults);

        //calculate winner
        compareScore = function(arr1, arr2) {

            var totalArr = []; // holds calculations

            for (var i = 0; i < arr1.length; i++) {

                var total = arr1[i] - arr2[i];
                totalArr[i] = Math.abs(total);

            }
            //add items in array
            var sum = totalArr.reduce((a, b) => a + b, 0);
            return sum;
        }

        // // finds best match for submitted
        findMatch = function(lonelyPerson) {

            myScores = lonelyPerson.scores;
            myUid = lonelyPerson.uID;
            compatArr = []

            for (var i = 0; i < friends.length; i++) {
                // com
                if (myUid != friends[i].uID) {

                    var compatScore = compareScore(myScores, friends[i].scores);
                    // add compatibility score to object dymanically
                    friends[i]['compatScore'] = compatScore;
                    compatArr.push(compatScore)


                } else {
                    // console.log("skipping self..");
                }

            }
            var bestMatches = getClosest.number(0, compatArr); // calculates best match(es) by gathering 
            console.log(compatArr[bestMatches] + " this is the winning score");
            //
            var uID = retrieveMatch(compatArr[bestMatches]);

            return uID;// returns uid of winning match


        }

        // //returns best match or picks random match if more than one match has the same compatibility
        retrieveMatch = function(lowestCompatScore) {

            matches = [];
            for (var i = 0; i < friends.length; i++) {

                if (friends[i].compatScore === lowestCompatScore) {
                    console.log("this is a potential match " + friends[i].name);
                    // matches.push(friends[i].uID); // adds UID of all matches with the lowest score to array
                    matches.push(friends[i]); 
                }

            }
            // if more than one match have the same score pick random
            // pick random winner and return uID
            var match = matches[Math.floor(Math.random() * matches.length)];
            console.log("This UID is the winner " + match.uID)
            return match; // return winning object
        }

        // res.json(logic.findMatch(surveyResults));
         // res.json(findMatch(surveyResults));

        var bestMatch = findMatch(surveyResults);
        // console.log("this is the best match " + JSON.stringify(bestMatch));

      
     
        res.json(bestMatch);


    });



}