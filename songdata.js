const axios = require('axios')

const client_id = 85763f2a993a4097965a04760cb3b33f;
const client_secret = 7d9e720c0c2749ce91846138793033ea;

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
    })
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

getSpotifyData( 'browse/new-releases' );
