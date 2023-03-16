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
    {
        question: "How do you declare a custom property or 'CSS variable'?",
        choices: ["var root-my-color = green;", ":root { var my-color = green; }", "var my-color = green;", ":root { --my-color: green; }"],
        answer: ":root { --my-color: green; }",
    },
    {
        question: "Which user-action pseudo-class would you need to add in order to change an element when the mouse is over it?",
        choices: [":visited", ":activate", ":checked", ":hover"],
        answer: ":hover",
    },
    {
        question: "How would you create a box with rounded corners using CSS?",
        choices: ["box-corner: round;", "corner-style: round;", "border-radius: 50px;", "transform: round(corner)"],
        answer: "border-radius: 50px;",
    },
    {
        question: "What is wireframing?",
        choices: ["A blueprint of our website's page layout.", "A 3D model of our websites structure made from wires.", "A CSS library that helps in the creation of borders around our boxed elements.", "Wireframing helps us quickly set up our HTML page."],
        answer: "A blueprint of our website's page layout.",
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
  var gameOverScreenEl = document.getElementById("game-over-container");
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
  
    // Hide the quiz and show the game over screen
    quizEl.style.display = "none";
    gameOverScreenEl.style.display = "block";
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