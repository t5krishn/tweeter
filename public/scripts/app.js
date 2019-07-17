/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const getTime = function(date) {
  let time;
  const currentDate = new Date();

  // Convert difference in milliseconds to difference in days
  const diffDays = Math.ceil((currentDate - date) / (1000 * 60 * 60 *24)) - 1;

  if (diffDays == 1) {
    time = '1 day ago';
  } else if (diffDays > 30 && diffDays < 365) {
    let months = Math.ceil(diffDays / 30);
    if (months > 1){
      time = `${months} months ago`;
    } else {
      time = `1 month ago`;
    }
  } else if (diffDays >  365){
    let years = Math.ceil(diffDays / 365);
    if (years > 1){
      time = `${years} years ago`;
    } else {
      time = `1 year ago`;
    }
  } else {
    time = `${diffDays} days ago`;
  }

  return time;
}

const formValidator = function(data) {
  const tweet = data.slice(5);
  if (tweet){
    if(tweet.length > 140) {
      return alert("Tweet is too long. It's called a tweet for a reason...");
    }
    else {
      // Valid tweet
      return true;
    }
  } else {
    return alert('Tweet is empty. Try again');
  }  
}

const createTweetElement = function (tweet) {
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


const renderTweets = function(tweets) {
  const $tweetList = $('#tweet-list');
  const listOfTweets = [];
  for(oneTweet of tweets) {
    let $tweet = createTweetElement(oneTweet);
    listOfTweets.unshift($tweet); 
  }
  $tweetList.append(listOfTweets.join(''));
}

const loadTweets = function () {
  $.ajax('/tweets', {
    method: 'GET',
    success : function() {
      console.log("GET was a success")
    }
  }).then(function (res) {
    $('#tweet-list').empty();
    renderTweets(res);
  })
}

const formSubmit = function(data) {
  $.ajax('/tweets/', { 
    method: 'POST',
    data,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    success : function() {
      console.log("POST was a success")
    }
  })
  .then(function (res) {
    loadTweets();
  });
};


const addSubmitListener = function() {
  $('#new-tweet-form').on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    if(formValidator(data)) {
      formSubmit(data);
      $('#tweet-text-area').val('');
      $('.counter').text('140');
    } else {
      console.log('Invalid Tweet, alert will be called')
    }
  });
}


$(document).ready(function() {

  loadTweets();
  addSubmitListener();
  

});
