const express = require('express');
const router = express.Router();
require('dotenv').config()
const axios = require('axios');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.SECRET_ID;

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/spotify-data/:endpoint/:request', (req, res) => {
  const spotifyQuery = `${req.params.endpoint}/${req.params.request}`;
  
  getSpotifyData( spotifyQuery )
  .then( response =>  {
    return res.status(200).send(response.data)
  }).catch( error =>  {
    throw new Error(error);
  });
});




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
  return axios({
    url: `https://api.spotify.com/v1/${endpoint}`,
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
}

module.exports = router;
