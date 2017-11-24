// PAGE ELEMENTS

const $searchInput = $('#search-input');
const $searchSubmit = $('#search-submit');

// HELPER FUNCTIONS

function convertToMinutes (millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

// use map
function convertToKey (response) {
  if (response === 0) {
    return 'C'
  } if (response === 1) {
    return 'C#'
  } if (response === 2) {
    return 'D'
  } if (response === 3) {
    return 'D#'
  } if (response === 4) {
    return 'E'
  } if (response === 5) {
    return 'F'
  } if (response === 6) {
    return 'F#'
  } if (response === 7) {
    return 'G'
  } if (response === 8) {
    return 'G#'
  } if (response === 9) {
    return 'A'
  } if (response === 10) {
    return 'A#'
  } if (response === 11) {
    return 'B'
  } else {
    return '(pitch unknown)'
  }
}

function convertToMode (response) {
  if (response === 0) {
    return 'minor'
  } if (response === 1) {
    return 'major'
  } else {
    return '(mode unknown)'
  }
}

// EVENTS

// When user searches for a song, return the Spotify ID of that track

$searchSubmit.on('click', (e) => {
  $('.data-point').hide();
  $('.spinner').show();

  // store search value entered in correct format for the API
  var $searchTerm = $searchInput.val().split(" ").join("+");

  // GET track
  const getTrack = {
    "async": true,
    "crossDomain": true,
    "url": `http://localhost:3000/spotify-search/${$searchTerm}`,
    "method": "GET",
  }

  // once you've got a result from the search
  $.ajax(getTrack).done( (response) =>  {

    // hide the spinner, show the data point
    $('.data-point').show();
    $('.spinner').hide();

    // store IDs to get track and artists
    const idTrack = response.tracks.items[0].id;
    const idArtist = response.tracks.items[0].artists[0].id;

    // GET track details
    const trackDetails = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/spotify-data/tracks/" + idTrack,
      "method": "GET",
    }

    $.ajax(trackDetails).done( (response) =>  {
      console.log(response);

      var dataPopularity = Math.round(response.popularity) + '%';

      $('#data-track').text(response.name);
      $('#data-artist').text(response.artists[0].name);
      $('#data-album').text(response.album.name);
      $('#data-duration').text(convertToMinutes(response.duration_ms));
      $('#data-popularity').text(dataPopularity).closest('span.bar').css('width', dataPopularity);

    });

    // GET audio features
    const audioFeatures = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/spotify-data/audio-features/" + idTrack,
      "method": "GET",
    }

    $.ajax(audioFeatures).done( (response) =>  {
      console.log(response);

      var dataDanceability = Math.round(response.danceability*100) + '%';
      var dataEnergy = Math.round(response.energy*100) + '%';
      var dataValence = Math.round(response.valence*100) + '%';
      var dataTempo = Math.round(response.tempo) + ' bpm';
      var dataKey = convertToKey(response.key) + ' ' + convertToMode(response.mode);

      // print the human readable numbers into the page, change bar chart width
      $('#data-danceability').text(dataDanceability).closest('span.bar').css('width', dataDanceability);
      $('#data-energy').text(dataEnergy).closest('span.bar').css('width', dataEnergy);
      $('#data-valence').text(dataValence).closest('span.bar').css('width', dataValence);
      $('#data-tempo').text(dataTempo);
      $('#data-key').text(dataKey);

    });

    // GET artist
    const artist = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/spotify-data/artists/" + idArtist,
      "method": "GET",
    }

    $.ajax(artist).done( (response) =>  {
      console.log(response);

      var dataGenres = response.genres.map( genre => {
        return ' ' + genre;
      });
      $('#data-genres').text(dataGenres);

    });

  });

  return false;

});
