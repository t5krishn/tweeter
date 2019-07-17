/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const getTime = function (date) {
  let time;
  const currentDate = new Date();

  // Convert difference in milliseconds to difference in days
  const diffDays = Math.ceil((currentDate - date) / (1000 * 60 * 60 * 24)) - 1;

  if (diffDays == 1) {
    time = '1 day ago';
  } else if (diffDays > 30 && diffDays < 365) {
    let months = Math.ceil(diffDays / 30);
    if (months > 1) {
      time = `${months} months ago`;
    } else {
      time = `1 month ago`;
    }
  } else if (diffDays > 365) {
    let years = Math.ceil(diffDays / 365);
    if (years > 1) {
      time = `${years} years ago`;
    } else {
      time = `1 year ago`;
    }
  } else {
    time = `${diffDays} days ago`;
  }

  return time;
}

const renderError = function(errString) {
  $('#new-tweet-error-container').append(`
  <div id="new-tweet-error">
    <img src="./images/icons/warning.png" alt="Warning Image" class="new-tweet-error-warning"/>
    <div id ="new-tweet-error-message">
      ${errString}
    </div>
    <img src="./images/icons/warning.png" alt="Warning Image" class="new-tweet-error-warning"/>
  </div>
  `);

}


const formValidator = function (data) {
  const tweet = data.slice(5);
  if (tweet) {
    if (tweet.length > 140) {
      renderError("Tweet is too long. It's called a Tweet for a reason...");
      $('#new-tweet-error-container').hide();
      $('#new-tweet-error-container').slideDown(100);

    }
    else {
      // Valid tweet
      return data;
    }
  } else {
    renderError('Tweet is empty. Can you write something? Jeez...');
    $('#new-tweet-error-container').hide();
    $('#new-tweet-error-container').slideDown(100);
  }
}

const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
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
      <h4 class="tweet-content">${escape(tweet.content.text)}</h4>
      <footer>
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


const renderTweets = function (tweets) {
  const $tweetList = $('#tweet-list');
  const listOfTweets = [];
  for (let oneTweet of tweets) {
    let $tweet = createTweetElement(oneTweet);
    listOfTweets.unshift($tweet);
  }
  $tweetList.append(listOfTweets.join(''));
}

const loadTweets = function () {
  $.ajax('/tweets', {
    method: 'GET',
    success: function () {
      console.log("GET was a success")
    },
  }).then(function (res) {
    $('#tweet-list').empty();
    renderTweets(res);
  })
}

const formSubmit = function (data) {

  $.ajax('/tweets/', {
    method: 'POST',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    success: function () {
      console.log("POST was a success")
    }
  })
    .then(function (res) {
      loadTweets();
    });
};


const addSubmitListener = function () {
  $('#new-tweet-form').on('submit', function (event) {
    event.preventDefault();
    $('#new-tweet-error-container').slideUp(100);
    const data = $(this).serialize();
    const isValid = formValidator(data);

    // formValidator fn takes care of rendering errors when tweet is invalid
    if (isValid) {
      formSubmit(isValid);
      $('#tweet-text-area').val('');
      $('.counter').text('140');
    }
  });
}


$(document).ready(function () {

  loadTweets();
  addSubmitListener();


});
