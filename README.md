# Song data

Song data is a project that allows users to search for a song in the Spotify library, then uses the Spotify API to get data about that song and visualise it.

## Getting started

Clone this repository

```
$ git clone https://github.com/christopherthomasdesign/songdata.git
```

Install node modules

```
$ npm install
```
Create a `.env` file which contains your Spotify Client ID and Client Secret. To do this you will need to have a Spotify account and create an application. The file should look a bit like this:

```
CLIENT_ID='client-id-here'
SECRET_ID='secret-id-here'
```

Run the app

```
$ npm start
```

## Built with

* [Spotify Web API](https://developer.spotify.com/web-api/)
* [Axios](https://github.com/axios/axios), a promise based HTML client for the browser and node.js
* [Randoma11y API](https://randoma11y.com) for generating accessible colour combinations

## Authors

Chris Thomas
* [Personal website](http://thomaschris.co.uk/)
* [Twitter](https://twitter.com/christhomas_90)

## License

Do what you want mate
