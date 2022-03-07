const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const startingSeconds = 40;
const countdownEl = document.getElementById("countdown");

let time = startingSeconds

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which of the following is correct about features of JavaScript?",
    choice1: "JavaScript is a lightweight, interpreted programming language.",
    choice2:
      "JavaScript is designed for creating network-centric applications.",
    choice3: "JavaScript is complementary to and integrated with Java.",
    choice4: "All of the above.",
    answer: 4,
  },
  {
    question: "Which built-in method returns the length of the string?",
    choice1: "length()",
    choice2: "size()",
    choice3: "index()",
    choice4: "None of the above.",
    answer: 1,
  },
  {
    question:
      "Which built-in method returns the string representation of the number's value?",
    choice1: "toValue()",
    choice2: "toNumber()",
    choice3: "toString()",
    choice4: "None of the above.",
    answer: 3,
  },
  {
    question:
      "Which of the following function of Number object returns the number's value?",
    choice1: "toString()",
    choice2: "valueOf()",
    choice3: "toLocaleString()",
    choice4: "toPrecision()",
    answer: 2,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;

setInterval(updateCountdown, 1000)

function updateCountdown() {
  let seconds = time;

  countdownEl.innerHTML = ` ${seconds}`;
  time--;
}

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    } else if (time >= 0) {
      time -= 5;
    } else if (time <= 0) {
        return window.location.assign("/end.html");
    }
    // console.log(time);

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
