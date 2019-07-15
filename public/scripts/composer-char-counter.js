$(document).ready(function() {
  

  $('#tweet-text-area').on('keyup', function (event) {
    let textAreaLength = $(this).val().length;
    let counterEle = $(this).next().next();

    let currentLen = 140 - textAreaLength;

    if (currentLen < 0) {
      counterEle.css({
        'color': 'red'
      })
    } else {
      counterEle.css({
        'color': '#545149'
      })
    }

    counterEle.text((140 - textAreaLength).toString());
  });
  
})