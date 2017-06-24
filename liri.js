// Load the NPM Package inquirer
var inquirer = require("inquirer");

function displayTweets() {
  var Twitter = require('twitter');
  var keys = require("./keys.js");
  var tKeys = keys.twitterKeys;

  var client = new Twitter({
    consumer_key: tKeys.consumer_key,
    consumer_secret: tKeys.consumer_secret,
    access_token_key: tKeys.access_token_key,
    access_token_secret: tKeys.access_token_secret
  });

  var params = {screen_name: 'tweeter8991'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      //console.log(tweets);
      for (var i=0; i < Math.min(20, tweets.length); i++) {
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
      }
    }
  });
}

function spotifySong() {
  var Spotify = require('node-spotify-api');
  if (commandArr[1]) {
    var song = commandArr[1];
  } else {
    var song = "The Sign";
  }
 
  var spotify = new Spotify({
    id: 'e90c42d31b9545d3a74f591331ea2c9c',
    secret: '134b03748d394b43aa5462bba0edeed1'
  });
   
  spotify.search({ type: 'track', query: song, limit: 1}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    } else {
      console.log("Artists:");
      for (var i=0; i<data.tracks.items[0].artists.length; i++) {
        console.log(data.tracks.items[0].artists[i].name);
      }
      console.log(" ");

      console.log("Name:");
      console.log(data.tracks.items[0].name);
      console.log(" ");

      console.log("Preview URL:");
      console.log(data.tracks.items[0].preview_url);
      console.log(" ");

      console.log("Album:");
      console.log(data.tracks.items[0].album.name);

      
    }
   
  });

}

function movieThis() {
  if (commandArr[1]) {
    var movie = commandArr[1];
  } else {
    var movie = "Mr. Nobody";
  }

  // Include the request npm package (Don't forget to run "npm install request" in this folder first!)
  var request = require("request");

  // Then run a request to the OMDB API with the movie specified
  request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log("Title: " + JSON.parse(body).Title);
      console.log("Year made: " + JSON.parse(body).Year);
      console.log("Rating: " + JSON.parse(body).imdbRating);
      console.log("Country: " + JSON.parse(body).Country);
      console.log("Language: " + JSON.parse(body).Language);
      console.log("Plot: " + JSON.parse(body).Plot);
      console.log("Actors: " + JSON.parse(body).Actors);
      console.log("Website: " + JSON.parse(body).Website);
      
    }
});



}

function doThis() {
  var fs = require("fs");

  // Running the readFile module that's inside of fs.
  // Stores the read information into the variable "data"
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    // Break the string down by comma separation and store the contents into the output array.
    commandArr = data.split(",");

    switch (commandArr[0]) {
      case "my-tweets":         displayTweets();
                                break;
      case "spotify-this-song": spotifySong();
                                break;
      case "movie-this":        movieThis();
                                break;
      case "do-what-it-says":   doThis();
                                break;
      default:    
    }                   
  });

}


// Create a "Prompt" with a series of questions.
var commandArr = process.argv.slice(2);

  switch (commandArr[0]) {
    case "my-tweets":         displayTweets();
                              break;
    case "spotify-this-song": spotifySong();
                              break;
    case "movie-this":        movieThis();
                              break;
    case "do-what-it-says":   doThis();
                              break;
    default:                                                           
  }





