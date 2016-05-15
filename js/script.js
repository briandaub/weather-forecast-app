var lat, lon, temp, condition, str, ary, rnd;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    loadWeather(lat +','+ lon);
  });
} else {
    $("#weather").html("Your browser does not support Geolocations.");
}

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    units: 'f',
    success: function(weather) {
      temp = weather.temp;
      html = '<h2 id="tempUnits"><i class="wi wi-yahoo-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
      html += '<ul><li>' + weather.city + ', ' + weather.region + '</li><br />';
      html += '<li class="currently">' + weather.currently + '</li>';
      html += '<li>' + weather.alt.temp + ' C&deg;</li></ul>';
      
      $("#weather").html(html);

      condition = weather.currently;
      ary = condition.split(" ");
      
      if(ary.length == 1){
         str = ary[0];
      }else if(ary.length > 1){
         str = ary[1];
      }
      
      loadBackground(lat, lon, str);
    },
    error: function(error) {
      $("#weather").html('<p>' + error + '</p>');
    }
  });
};


function loadBackground(lat, lon, weatherTag) {
  var script_element = document.createElement('script');

  script_element.src = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=02b61c7bdacce3a57a5fa769a0ba815a&lat=" + lat + "&lon=" + lon + "&accuracy=1&tags=" + weatherTag + "&sort=relevance&extras=url_l&format=json";

  document.getElementsByTagName('head')[0].appendChild(script_element);
}

function jsonFlickrApi(data){
  rnd = Math.floor((Math.random() * 6));
  if (data.photos.pages > 0){
    var photo = data.photos.photo[rnd];
    document.querySelector("body").style.backgroundImage = "url('" + photo.url_l + "')";
   /* document.querySelector("#image-source").setAttribute("href", "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id); */
  }
  else{
    if(temp >= 70){
      document.body.style.backgroundColor = "#FFC107";
    }else if(temp < 70){
      document.body.style.backgroundColor = "#00BCD4";
    }
  }
}