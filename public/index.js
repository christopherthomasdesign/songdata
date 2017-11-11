$(window).on("load",  (e) =>  {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/spotify-data/audio-features/4cGeMgLcykDLAazHFpbZbU",
    "method": "GET",
  }
  
  $.ajax(settings).done( (response) =>  {
    console.log(response);
    $('#js-code').text( JSON.stringify(response) )
  });
});
