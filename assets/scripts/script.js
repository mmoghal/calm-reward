// Define the quiz questions and answers
var questions = [
    {
        question: "How do you declare a variable in JavaScript?",
        choices: ["var", "variable", "v", "let"],
        answer: "var",
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "number", "float"],
        answer: "float",
    },
    {
        question: "Which of the following is used to iterate through an array in JavaScript?",
        choices: ["while loop", "if statement", "for loop", "switch statement"],
        answer: "for loop",
    },
    {
        question: "Which of the following is a JavaScript framework?",
        choices: ["jQuery", "Ruby on Rails", "Django", "Flask"],
        answer: "jQuery",
    },
    {
        question: "How would I check which files are staged, unstaged, and untracked using git commands?",
        choices: ["git commit -m", "git fetch", "git add .", "git status"],
        answer: "git status",
    },
    {
        question: "When developing a user interface, all are important except...",
        choices: ["Focusing on building a strong backend", "Writing code that follows accessibility standards", "Making sure that you using a mobile-responsive layout", "Using readable font sizes"],
        answer: "Focusing on building a strong backend",
    },
  ];

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
  var quizOverScreenEl = document.getElementById("quiz-over-container");
  var finalScoreEl = document.getElementById("final-score");
  
  // Function to start the quiz
  function startQuiz() {
    // Hide the start button
    startButtonEl.style.display = "none";
  
    // Start the timer
    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
          timeLeft = 0;
          clearInterval(timerInterval);
            endQuiz();
        }
        timerEl.textContent = "Time: " + timeLeft;
    }, 1000);
  
    // Show the quiz screen and the first question
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
                if (timeLeft <= 0) {
                    endQuiz();
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
    clearInterval(timerInterval);
    feedbackEl.textContent = "";
    scoreEl.textContent = `Final score: ${score}`;
    initialsInputEl.style.display = "block";
    quizEl.style.display = "none";
  
    // Display the final score
    if (finalScoreEl) {
        finalScoreEl.textContent = ` ${score}`;
    }
  
    // Hide the quiz and show the quiz over screen
    quizEl.style.display = "none";
    quizOverScreenEl.style.display = "block";
  }
  
  // Initial submit button
  submitButtonEl.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = initialsInputEl.value.trim();
    if (initials !== "") {
        // Define finalScoreEl variable
        var finalScoreEl = document.getElementById("final-score");
  
        // Check if timeLeft is negative
        if (timeLeft < 0) {
            timeLeft = 0;
        }
  
        // Show confirmation message
        var confirmationEl = document.createElement("p");
        confirmationEl.textContent = "Your score has been submitted!";
        initialsInputEl.parentNode.insertBefore(confirmationEl, initialsInputEl.nextSibling);
    }
  });
  
  // Add event listener to restart button to restart quiz
  var restartButtonEl = document.getElementById("restart-button");
  restartButtonEl.addEventListener("click", function () {
    currentQuestionIndex = 0;
    timeLeft = 60;
    score = 0;
    startQuiz();
  });
  
  startButtonEl.addEventListener("click", startQuiz);