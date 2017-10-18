var triviaContent = [
    {
        question: "What is the longest running musical on broadway?",
        choices: ["The Phantom of the Opera", "Cats", "Chicago", "Disneys Aladdin"],
        answer: "The Phantom of the Opera"
    },
    {
        question: "What is the top grossing broadwayshow of all time?",
        choices: ["The Book of Mormon", "Wicked", "Cats", "The Lion King"],
        answer: "The Lion King"
    },
    {
        question: "What was the name of the failed sequeal to The Phantom of the Opera?",
        choices: ["Christine & Phantom", "Return to the Opera", "The Phantoms Vengence", "Love Never Dies"],
        answer: "Love Never Dies"
    },
    {
        question: "Which Broadway musical has won the most awards?",
        choices: ["Beauty and the Beast", "South Pacific", "The Producers", "Hamiliton"],
        answer: "South Pacific"
    },
    {
        question: "What Musical set the record of $1.45 Billion in just one season?",
        choices: ["Cats", "Kinky Boots", "Hamilton", "Miss Saigon"],
        answer: "Hamilton"
    }
]
var startBtn;
// var to track what index of the array we are at.
//var to start the countdown
var timer;
var questionDOM = $("#question");
var buttonsDOM = $(".buttons");
var progressDOM = $("#progress")
var wrongRightDOM = $("#wrongRight")

var tracker = {
  currentQuestion: 0,
  countdown: 20,
  correct: 0,
  incorrect: 0
}

//set settimeout and show the countdown
function countdown() {
  //deincrement tracker.countdown by 1
  tracker.countdown--;
  //show this update on the screen
  $("#countdownTimer").text(tracker.countdown);
  //if the cowndown is 0 the log times up
  if (tracker.countdown === 0) {
    //use function to show next question
    outOfTime()
  }
}
//fill the buttons with some questions/
function loadQuestions() {
  progress()
  wrongRightDOM.empty()
  buttonsDOM.empty()
  timer = setInterval(countdown, 1000);
  //grab the next question or current question and show it on the page
  questionDOM.html(triviaContent[tracker.currentQuestion].question)
  //make buttons and show them on the scrren with the text inside of them being
  //the array of answers
  //loop over TriviaContent
  for (var i = 0; i < triviaContent[tracker.currentQuestion].choices.length; i++) {
    buttonsDOM.append("<button class='button' id='btn" + i + "' data-name='" + triviaContent[tracker.currentQuestion].choices[i] + "'>" + triviaContent[tracker.currentQuestion].choices[i] + "</button>");
  }
}

loadQuestions()

function progress() {
  progressDOM.html("<p> Question " + (tracker.currentQuestion + 1) + " of " + triviaContent.length )
}

function nextQuestion() {
  //this will give us the next triviaContent index
  tracker.currentQuestion++;
  //reset the timer to 30
  tracker.countdown = 20;
  //
  $("#countdownTimer").text(tracker.countdown);
  loadQuestions();
}

function wrongAnswer() {
  //stop that countdown
  clearInterval(timer)
  //if it is correct increment the right answers propery
  tracker.incorrect++
  wrongRightDOM.html("<p>NOPE!</p>");
  wrongRightDOM.append("<p>The Correct Answer was: " + triviaContent[tracker.currentQuestion].answer + "</p>")
  if (tracker.currentQuestion === triviaContent.length - 1) {
      setTimeout(results, 3 * 1000);
  }
  else {
    //correct answer. Wait a few seconds, then show the next question.
    setTimeout(nextQuestion, 3000);
  }

}
function rightAnswer() {
  //stop that countdown
  clearInterval(timer)
  //if it is correct increment the right answers propery
  tracker.correct++
  wrongRightDOM.html("<h2>Correct!</h2>");
  if (tracker.currentQuestion === triviaContent.length - 1) {
      setTimeout(results, 3 * 1000);
  }
  else {
    //correct answer. Wait a few seconds, then show the next question.
    setTimeout(nextQuestion, 3000);
  }
}

function outOfTime() {
  clearInterval(timer);
  $("#countdownTimer").text(tracker.countdown);
  wrongRightDOM.html("<p> Out of time!</p>");
  wrongRightDOM.append("<p>The Correct Answer was: " + triviaContent[tracker.currentQuestion].answer + "</p>")
  if (tracker.currentQuestion === triviaContent.length - 1) {
      setTimeout(results, 3 * 1000);
  }
  else {
    //correct answer. Wait a few seconds, then show the next question.
    setTimeout(nextQuestion, 3000);
  }
}

function reset() {
  tracker.currentQuestion = 0;
  tracker.countdown = 20;
  tracker.correct = 0;
  tracker.incorrect = 0;
  loadQuestions();
  buttonsDOM.show();
}

function results() {

    clearInterval(timer);

    questionDOM.html("<p>All done, heres how you did!</p>");

    buttonsDOM.hide();

    $("#countdownTimer").text(tracker.counter);

    wrongRightDOM.append("<p>Correct Answers: " + tracker.correct + "</p>");
    wrongRightDOM.append("<p>Incorrect Answers: " + tracker.incorrect + "</p>");
    wrongRightDOM.append("<p>Unanswered: " + (triviaContent.length - (tracker.incorrect + tracker.correct)) + "</p>");
    wrongRightDOM.append("<br><button id='start-over'>Start Over?</button>");
}

//when a user clicks a question
$(".buttons").on('click', ".button", function(event) {
  console.log($(this).attr("data-name"));
  //see if its the right answer
  if ( $(this).attr("data-name") === triviaContent[tracker.currentQuestion].answer) {
    console.log('you go the correct answer');
    rightAnswer()
  }else {
    //if not display that they got it wrong ans show right answer
    console.log("you didnt get it right");
    //show then the correct answer

    //load the next question
    wrongAnswer()
  }
  //Wait a few seconds, then show the next question.
})

$("#wrongRight").on('click', "#start-over", function(event) {
  reset()
})
//If the player runs out of time, tell the player that time's up and display the





//
