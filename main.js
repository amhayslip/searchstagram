var tag = "thebubbub";
var access_token = "7010263.de35384.024d0b727a354fb2b0ebed23fc1c7d49";

var fetch = function () {
  $.ajax({
    method: "GET",
    url: 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?access_token=' + access_token,
    dataType: "jsonp",
    jsonp: "callback",
    success: function(response) {
      debugger;
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  }); 
}

fetch();