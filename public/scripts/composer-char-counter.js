//    composer-char-counter.js
//    - This file attaches a keyup listener to the new-tweet
//    textarea and it counts the characters in the textarea 
//    which will update the counter and turn the counter red
//    by adding a red-text class if the textarea exceeds the
//    character count




$(document).ready(function() {
  
  $('#tweet-text-area').on('keyup', function() {
    let textAreaLength = $(this).val().length;
    let counterEle = $(this).next().children().last();

    let currentLen = 140 - textAreaLength;

    if (currentLen < 0) {
      counterEle.addClass('red-text');
    } else {
      counterEle.removeClass('red-text');
    }

    counterEle.text((140 - textAreaLength).toString());
  });
  
});