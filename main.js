var client_id = "a0012c23818d4a618d56bbf8ab2fc9a6";
var redirect_uri = 'http://localhost:4000/';
var authURL = 'https://instagram.com/oauth/authorize/?client_id=' + client_id + '&redirect_uri=' + redirect_uri + '&response_type=token&scope=public_content';
var access_token = null;

// https://api.instagram.com/oauth/authorize/?client_id=CLIENTID&redirect_uri=REDIRECT-URI&response_type=code&scope=SCOPE

// (function(){
if (window.location.hash) {
  access_token = window.location.hash.split('=')[1];
}

if (!access_token) {
  $('.auth-container').addClass('show');
} else {
  $('.search-container').addClass('show');
}
// })(); 

var appendPics = function (data) {
  for (i = 0; i < data.data.length; i += 1) {
    var source = $('#image').html();
    var template = Handlebars.compile(source);
    var image = template({ image: data.data[i].images.low_resolution.url, tag: tag });
    $('.all-pics').append(image);
  }
};

var appendTag = function () {
  var source = $('#tag').html();
  var template = Handlebars.compile(source);
  $('.tags').append(template({ displayedTag: '#' + tag, tag: tag }));
  bindEvent();
};

var fetch = function () {
  $.ajax({
    method: "GET",
    url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + access_token,
    dataType: "jsonp",
    jsonp: "callback",
    success: function(data) {
      $('.searching').hide();
      appendPics(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      $('.searching').hide();
      console.log(textStatus);
    }
  }); 
}

$('.auth').on('click', function () {
  window.location = authURL;
});

$('.search').on('click', function (e) {
  e.preventDefault();
  tag = $('.search-input').val();
  $('.search-input').val('');
  fetch();
  $('.searching').show();
  appendTag();
});

var bindEvent = function () {
  $('.close-tag').on('click', function (e) {
    e.preventDefault();
    var clickedTag = $(this).closest('button').data('tag');
    $("div[data-tag='" + clickedTag +"']").remove();
    $(this).closest('button').remove();
  });
}
