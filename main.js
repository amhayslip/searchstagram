var tag = "coffee";
var access_token = "";

var fetch = function () {
  $.ajax({
    method: "GET",
    url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + access_token,
    dataType: "jsonp",
    jsonp: "callback",
    success: function(response) {
      appendPics(response);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  }); 
}

var appendPics = function (response) {
  for (var i = 0; i < response.data.length; i += 1) {
    var url = response.data[i].images.low_resolution.url;
    var image = '<img class="image" src="' + url + '"></img';
    $('.images').append(image);
  }
}

$('.search').on('click', function (e) {
  e.preventDefault();
  tag = $('.search-input').val();

  fetch();
});