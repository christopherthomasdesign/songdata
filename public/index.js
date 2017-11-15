// When window loads, get a track and print it on the page

$(window).on("load",  (e) =>  {

  // Get track details and audio features

  const trackDetails = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/spotify-data/tracks/4Yx9Tw9dTgQ8eGCq3PRDyn",
    "method": "GET",
  }

  const audioFeatures = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/spotify-data/audio-features/4Yx9Tw9dTgQ8eGCq3PRDyn",
    "method": "GET",
  }

  $.ajax(trackDetails).done( (response) =>  {
    console.log(response);
    $('#data-track').text(response.name);
    $('#data-artist').text(response.artists[0].name);
    $('#data-album').text(response.album.name);
    $('#data-duration').text(convertToMinutes(response.duration_ms));
    $('#data-popularity').text(Math.round(response.popularity) + '%');
  });

  $.ajax(audioFeatures).done( (response) =>  {
    console.log(response);
    // $('#js-code').text( JSON.stringify(response) );
    $('#data-danceability').text(Math.round(response.danceability*100) + '%');
    $('#data-energy').text(Math.round(response.energy*100) + '%');
    $('#data-tempo').text(Math.round(response.tempo) + ' bpm');
    $('#data-valence').text(Math.round(response.valence*100) + '%');
    $('#data-key').text(convertToKey(response.key) + ' ' + convertToMode(response.mode));
  });

  // Get accessible colour combination

  const randoma11y = {
    "async": true,
    "crossDomain": true,
    "url": "http://randoma11y.com/combos/?page=1&per_page=10",
    "method": "GET",
  }

  $.ajax(randoma11y).done( (response) =>  {
    console.log(response);
    var $randomPalette = response[Math.floor(Math.random()*response.length)]
    var $foreground = $randomPalette.color_one;
    var $background = $randomPalette.color_two;
    $('body').css("color", $foreground);
    $('body').css("background-color", $background);
  });

});


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
  } if (reponse === 1) {
    return 'major'
  } else {
    return '(mode unknown)'
  }
}

// EVENTS

// Get value from search input

$searchSubmit.on('click', (e) => {
  e.preventDefault( );
  var $searchTerm = $searchInput.val().split(" ").join("+");
  console.log($searchTerm);

  const getTrack = {
    "async": true,
    "crossDomain": true,
    "url": `http://localhost:3000/spotify-search/${$searchTerm}`,
    "method": "GET",
  }

  console.log( 'config ==> ', getTrack);

  $.ajax(getTrack).done( (response) =>  {
    console.log(response);
  });

  return false;

});

// EXAMPLE SONG KEYS
//
// Raining blood - Slayer
// 4Yx9Tw9dTgQ8eGCq3PRDyn
//
// Happy - Pharrell Williams
// 5b88tNINg4Q4nrRbrCXUmg
//
// Mozart — Piano Sonata #16 in C major
// 6LKsT6X9BxMK8ePCDNRLal


// trying out accessible colour combos
