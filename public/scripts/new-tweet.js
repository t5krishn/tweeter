//  new-tweet.js
//    - This function handles the onClick handler that shows or hides the
//    new tweet area, with textarea and submit button. This toggle is at the top 
//    right of the nav bar

// Handles the click and slides the new-tweet area down or up
const newTweetClickHandler = function() {
  $('#nav-new-tweet-container').on('click', function() {
    $('.new-tweet').animate({
      height: "toggle",
    }, 300, function() {
      $('#tweet-text-area').focus();
    });
  });
};


$(document).ready(function() {
  newTweetClickHandler();
});