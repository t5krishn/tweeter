/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


var getTime = function(date) {
  var days;
  var currentDate = new Date();

  var diffDays = Math.ceil((currentDate - date) / (1000 * 60 * 60 *24)) - 1;

  if (diffDays == 1) {
    days = '1 day ago';
  } else {
    days = `${diffDays} days ago`;
  }

  return days;
}


var createTweetElement = function (tweet) {

  // $article.append($header).append($footer);
  return `
    <article class="tweet">
      <header>
        <div>
          <img class="tweet-avatar" src=${tweet.user.avatars} height="50px" width=auto />
          <h3 class="tweet-username">${tweet.user.name}</h3>
          <h3 class="tweet-userhandle">${tweet.user.handle}</h3>
        </div>
      </header>
      <h4 class="tweet-content">${tweet.content.text}</h4>
      <footer class = "">
        <div class="tweet-footer">
          <time class= "footer-elapsed-time">${getTime(tweet.created_at)}</time>
          <div class="tweet-btn-container">
            <img class="tweet-btn tweet-flag" src="./images/icons/flag.png" height="20px" width=auto/>
            <img class="tweet-btn tweet-retweet" src="./images/icons/retweet.png" height="20px" width=auto/>
            <img class="tweet-btn tweet-like" src="./images/icons/like.png" height="20px" width=auto/>
          </div>
        </div>
      </footer>
    </article>
      `;
}


var renderTweets = function(tweets) {
  for(oneTweet of tweets) {
    var $tweet = createTweetElement(oneTweet);
    $('#tweet-list').append($tweet); 
  }
}

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]







$(document).ready(function() {

  renderTweets(data);

});
