// PAGE ELEMENTS

const $searchInput = $('#search-input');
const $searchSubmit = $('#search-submit');

// HELPER FUNCTIONS

function convertToMinutes (millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

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

  var $searchTerm = $searchInput.val().split(" ").join("+");

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

    // store the first result's ID
    const idTrack = response.tracks.items[0].id;

    // ajax call using the track ID to get track details
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

      // return album artwork
      var imageURL = response.album.images[0].url;
      console.log(imageURL);

    });

    // ajax call using the track ID to get audio features
    const audioFeatures = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/spotify-data/audio-features/" + idTrack,
      "method": "GET",
    }

    $.ajax(audioFeatures).done( (response) =>  {
      console.log(response);
      // $('#js-code').text( JSON.stringify(response) );

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
  });



  return false;

});
