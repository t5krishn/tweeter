const initScrollElements = function() {
  const $scrollDown = $("#scroll-down");
  const $newTweetBtn = $("#nav-new-tweet-container");

  $("#scroll-down").hide(); //hide your div initially

  const topOfOthDiv = $("#main-header").offset().top + 280;
  console.log(topOfOthDiv);
  $(window).scroll(function() {
    if ($(window).scrollTop() > topOfOthDiv) { //scrolled past the other div?
      $scrollDown.show(); //reached the desired point -- show div
      $newTweetBtn.hide();
    } else {
      $scrollDown.hide(); //else above the desired point -- hide div
      $newTweetBtn.show();
    }
  });
};

const handleScrollDown = function() {
  $("#scroll-down").on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 400);
    $('.new-tweet').show();
    $('#tweet-text-area').focus();
  });
};


$(document).ready(function() {
  initScrollElements();
  handleScrollDown();
});