// testing axios by performing at GET request for my user info using the github API

const username = "christopherthomasdesign";

axios.get('https://api.github.com/users/' + username)
  .then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
  });


// test using the spotify web API implicit grant flow

axios.get('https://accounts.spotify.com/authorize?client_id=85763f2a993a4097965a04760cb3b33f&response_type=token&redirect_uri=file:%2F%2F%2FUsers%2Fchristopherthomas%2Fprojects%2Fsongdata%2Findex.html')
.then(function(response){
  console.log(response.data);
  console.log(response.status);
});
