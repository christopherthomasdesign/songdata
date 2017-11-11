require('dotenv').config()
const axios = require('axios');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.SECRET_ID;

function getToken( ) {
  return axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    auth: {
      username: client_id,
      password: client_secret
    }
  });
}

async function getSpotifyData( endpoint ){
  const tokenData = await getToken( );
  const token = tokenData.data.access_token;
  axios({
    url: `https://api.spotify.com/v1/${endpoint}`,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }).then( response =>  {
    console.log( response.data );
    return response.data;
  }).catch( error =>  {
    throw new Error(error);
  });
}

module.expors = getSpotifyData;

// run function to get spotify data, with the endpoint as the argument
// so this should happen in response to a user action such as a search

// getSpotifyData( 'audio-features/4cGeMgLcykDLAazHFpbZbU' );
// getSpotifyData( 'tracks/4cGeMgLcykDLAazHFpbZbU' );
