console.log('apiroutes loaded');

var friends = require('../data/friends.js');
var uuidv1 = require('uuid/v1');
var logic = require('../../logic.js');
var validate = require('express-validation');
var validation = require('../../validation.js'); // validation rules


module.exports = function(app) {

    app.get('/api/friends', function(req, res) {

        res.json(friends);
        console.log(friends);

    });


      app.post('/api/friends', validate(validation), function(req, res) {

        var surveyResults = req.body;

        //logic to determine best match
        console.log(surveyResults);
        uid = uuidv1(); // generate uID
        surveyResults['uID'] = uid; // add uID to object
        console.log(surveyResults);

        var bestMatch = logic.mostCompatible(surveyResults);

        res.json(bestMatch);

    });

}