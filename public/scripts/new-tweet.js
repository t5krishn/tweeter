
const newTweetClickHandler = function(callback) {
  $('#nav-new-tweet-container').on('click', function(event) {
    $('.new-tweet').animate({
      bottom: "+120",
      height: "toggle"
    }, 300, function() {
    });
  });
}

const moveNewTweetSection = function() {
  
}

$(document).ready(function() {
  newTweetClickHandler(moveNewTweetSection);


});