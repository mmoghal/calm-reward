// Define the quiz questions and answers
var questions = [{
  question: "Why do bees like honey ?",
  choices: ["its sweets", "its tastly", "bad smell", "like it"],
  answer: "its sweets"
}, {
  question: "What do cat loves cat food ?",
  choices: ["it has fish", "Meat eater", "tasty", "bad smell"],
  answer: "it has fish"
}, {
  question: "Why does dog poop smell bad?",
  choices: ["they eat fish", "they eat dog food", "they play in the mud", "", ""],
  answer: "they eat fish"
}, {
  question: "how do fish breath under water?",
  choices: ["They can", "They are ocean animal", "like it", "Rhthey are funny"],
  answer: "They can"
}, {
  question: "what do wales eathow old is Safa?",
  choices: ["5", "6", "7", "8", "9"],
  answer: "7"
}, {
  question: "What is Safa favorite food?",
  choices: ["Sushi", "Pizza", "Icecream", "rice"],
  answer: "Pizza"
}];

// Define global variables
var currentQuestionIndex = 0;
var timeLeft = 60;
var timerInterval;
var score = 0;

// Get elements from the DOM
var startButtonEl = document.getElementById("start-button");
var timerEl = document.getElementById("timer");
var quizEl = document.getElementById("quiz");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var feedbackEl = document.getElementById("feedback");
var scoreEl = document.getElementById("score");
var initialsInputEl = document.getElementById("initials-input");
var submitButtonEl = document.getElementById("submit-button");
var highscoresListEl = document.getElementById("highscores-list");
var clearButtonEl = document.getElementById("clear-button");

// Function to start the quiz
function startQuiz() {
  // Hide the start button
  startButtonEl.style.display = "none";
  // Start the timer
  timerInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
  // Show the quiz and question
  quizEl.style.display = "block";
  showQuestion();
}

// Function to show a question
function showQuestion() {
  // Get the current question
  var currentQuestion = questions[currentQuestionIndex];
  // Set the question text
  questionEl.textContent = currentQuestion.question;
  // Clear the choices
  choicesEl.innerHTML = "";
  // Loop through the choices and add them to the page
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choiceButton = document.createElement("button");
    choiceButton.textContent = currentQuestion.choices[i];
    choicesEl.appendChild(choiceButton);
    // Add event listener to check answer when choice is clicked
    choiceButton.addEventListener("click", function () {
      // Check if the answer is correct
      if (this.textContent === currentQuestion.answer) {
        feedbackEl.textContent = "Correct!";
        score++;
        scoreEl.textContent = "Score: " + score;
      } else {
        feedbackEl.textContent = "Wrong!";
        timeLeft -= 10;
        if (timeLeft < 0) {
          timeLeft = 0;
        }
      }
      // Move to the next question or end the quiz
      currentQuestionIndex++;
      if (currentQuestionIndex === questions.length) {
        endQuiz();
      } else {
        showQuestion();
      }
    });
  }
}

// Function to end the quiz
function endQuiz() {
  // Stop the timer
  clearInterval(timerInterval);

  // Hide the quiz and show the game over screen
  quizScreenEl.classList.add("hidden");
  gameOverScreenEl.classList.remove("hidden");

  // Display the final score
  finalScoreEl.textContent = score;

  // Handle submit button click
  submitButtonEl.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = initialsInputEl.value.trim();
    if (initials !== "") {
      // Get existing high scores from local storage or create empty array
      var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

      // Add new high score to array
      highScores.push({
        initials: initials,
        score: score
      });

      // Sort high scores by score in descending order
      highScores.sort(function (a, b) {
        return b.score - a.score;
      });

      // Save high scores to local storage
      localStorage.setItem("highScores", JSON.stringify(highScores));

      // Redirect to high scores page
      window.location.href = "highscores.html";
    }
  });
}
startButtonEl.addEventListener("click", startQuiz);
