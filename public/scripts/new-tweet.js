
const newTweetClickHandler = function() {
  $('#nav-new-tweet-container').on('click', function(event) {
    $('.new-tweet').animate({
      height: "toggle",
    }, 300, function() {
      $('#tweet-text-area').focus();
    });
  });
}


$(document).ready(function() {
  newTweetClickHandler();
});