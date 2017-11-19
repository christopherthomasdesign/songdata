// When window loads, get a track and print it on the page

$(window).on("load",  (e) =>  {

  // Get accessible colour combination and apply to the interface

  const randoma11y = {
    "async": true,
    "crossDomain": true,
    "url": "http://randoma11y.com/combos/top",
    "method": "GET",
  }

  $.ajax(randoma11y).done( (response) =>  {
    // console.log(response);

    // Take random palette from the array, pick out the 2 colours
    var $randomPalette = response[Math.floor(Math.random()*response.length)]
    var $colourOne = $randomPalette.color_one;
    var $colourTwo = $randomPalette.color_two;

    // Elements to change colour
    $('.container').css({
      "color": $colourOne,
      "background-color": $colourTwo
    });
    $('.container:nth-of-type(2n)').css({
      "color": $colourTwo,
      "background-color": $colourOne
    });
    $('input').css({
      "color": $colourOne,
      "background-color": $colourTwo,
      "border": '2px solid' + $colourOne
    });
    $('button').css({
      "color": $colourTwo,
      "background-color": $colourOne,
    })

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
  } if (response === 1) {
    return 'major'
  } else {
    return '(mode unknown)'
  }
}

// EVENTS

// When user searches for a song, return the Spotify ID of that track

$searchSubmit.on('click', (e) => {

  var $searchTerm = $searchInput.val().split(" ").join("+");
  console.log($searchTerm);

  const getTrack = {
    "async": true,
    "crossDomain": true,
    "url": `http://localhost:3000/spotify-search/${$searchTerm}`,
    "method": "GET",
  }

  // once you've got a result from the search
  $.ajax(getTrack).done( (response) =>  {
    // store the first result's ID
    const idTrack = response.tracks.items[0].id;
    // run function using the track ID to get song data
    const trackDetails = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/spotify-data/tracks/" + idTrack,
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

    const audioFeatures = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:3000/spotify-data/audio-features/" + idTrack,
      "method": "GET",
    }

    $.ajax(audioFeatures).done( (response) =>  {
      console.log(response);
      // $('#js-code').text( JSON.stringify(response) );
      $('#data-danceability').text(Math.round(response.danceability*100) + '%');
      $('#data-energy').text(Math.round(response.energy*100) + '%');
      $('#data-tempo').text(Math.round(response.tempo) + ' bpm');
      $('#data-valence').text(Math.round(response.valence*100) + '%');
      $('#data-key').text(convertToKey(response.key) + ' ' + convertToMode(response.mode));
    });
  });

  return false;

});

// using the ID returned in the search, get information about that track

function getTrackInfo() {

  // const trackDetails = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "http://localhost:3000/spotify-data/tracks/" + idTrack,
  //   "method": "GET",
  // }
  //
  // $.ajax(trackDetails).done( (response) =>  {
  //   console.log(response);
  //   $('#data-track').text(response.name);
  //   $('#data-artist').text(response.artists[0].name);
  //   $('#data-album').text(response.album.name);
  //   $('#data-duration').text(convertToMinutes(response.duration_ms));
  //   $('#data-popularity').text(Math.round(response.popularity) + '%');
  // });
  //
  // const audioFeatures = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "http://localhost:3000/spotify-data/audio-features/" + idTrack,
  //   "method": "GET",
  // }
  //
  // $.ajax(audioFeatures).done( (response) =>  {
  //   console.log(response);
  //   // $('#js-code').text( JSON.stringify(response) );
  //   $('#data-danceability').text(Math.round(response.danceability*100) + '%');
  //   $('#data-energy').text(Math.round(response.energy*100) + '%');
  //   $('#data-tempo').text(Math.round(response.tempo) + ' bpm');
  //   $('#data-valence').text(Math.round(response.valence*100) + '%');
  //   $('#data-key').text(convertToKey(response.key) + ' ' + convertToMode(response.mode));
  // });

}











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
