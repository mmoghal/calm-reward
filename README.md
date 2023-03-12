# calm-reward
Web APIs: Code Quiz
Quiz App
This is a simple quiz app that asks multiple choice questions and keeps track of the user's score and time remaining.

Functionality
The quiz app displays a start button that, when clicked, starts the quiz and displays the first question. The user has a set amount of time to answer all the questions, and if they answer incorrectly, time is deducted from the remaining time. When all questions are answered or the time runs out, the quiz ends and the user is asked to input their initials to save their score.

The app uses a simple array of objects to store the questions, each object containing a question, an array of choices, and the correct answer. The app then dynamically creates buttons for each choice and attaches an event listener to each button to check if the answer is correct when clicked.

Files
index.html: The main HTML file for the quiz app.
script.js: The JavaScript file for the quiz app.
style.css: The CSS file for styling the quiz app.
highscores.html: The HTML file for displaying the high scores.
highscores.js: The JavaScript file for displaying the high scores.
Usage
To use the quiz app, simply open the index.html file in a web browser. Click the "Start" button to begin the quiz. Select an answer for each question and click the corresponding button. When the quiz is finished, enter your initials to save your score.

To view high scores, open the highscores.html file in a web browser.