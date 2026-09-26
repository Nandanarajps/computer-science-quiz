const questions = [
  {
    q: "Which data structure follows LIFO?",
    a: ["Queue", "Stack", "Array", "Tree"],
    c: 1
  },
  {
    q: "What does CPU stand for?",
    a: [
      "Central Processing Unit",
      "Computer Processing Unit",
      "Central Program Unit",
      "Control Processing Unit"
    ],
    c: 0
  },
  {
    q: "Which language is used for web page styling?",
    a: ["HTML", "Python", "CSS", "Java"],
    c: 2
  },
  {
    q: "Which is a NoSQL database?",
    a: ["MySQL", "MongoDB", "Oracle", "SQL Server"],
    c: 1
  },
  {
    q: "What does RAM stand for?",
    a: [
      "Random Access Memory",
      "Read Access Memory",
      "Rapid Access Memory",
      "Run Access Memory"
    ],
    c: 0
  },
  {
    q: "Which is an operating system?",
    a: ["Linux", "HTML", "CSS", "HTTP"],
    c: 0
  },
  {
    q: "What does URL stand for?",
    a: [
      "Uniform Resource Locator",
      "Universal Resource Link",
      "Uniform Reference Link",
      "Universal Reference Locator"
    ],
    c: 0
  },
  {
    q: "Which language is mainly used for web scripting?",
    a: ["JavaScript", "HTML", "CSS", "SQL"],
    c: 0
  },
  {
    q: "Which protocol is used for web pages?",
    a: ["FTP", "HTTP", "SMTP", "SSH"],
    c: 1
  },
  {
    q: "Which symbol starts a JavaScript single-line comment?",
    a: ["##", "//", "<!--", "**"],
    c: 1
  }
];

let i = 0;
let score = 0;
let time;
let timer;
let results = [];

function startQuiz() {
  document.getElementById("start").classList.add("hide");
  document.getElementById("game").classList.remove("hide");
  showQuestion();
}

function showQuestion() {

  clearInterval(timer);

  let q = questions[i];

  document.getElementById("num").innerText = i + 1;
  document.getElementById("question").innerText = q.q;
  document.getElementById("feedback").innerText = "";
  document.getElementById("next").classList.add("hide");

  let box = document.getElementById("answers");
  box.innerHTML = "";

  q.a.forEach((answer, index) => {

    let btn = document.createElement("button");

    btn.innerText = answer;
    btn.className = "answer";

    btn.onclick = () => checkAnswer(index, btn);

    box.appendChild(btn);
  });

  time = 60;
  document.getElementById("time").innerText = time;

  timer = setInterval(() => {

    time--;
    document.getElementById("time").innerText = time;

    if (time === 0) {
      clearInterval(timer);
      timeout();
    }

  }, 1000);
}

function checkAnswer(selected, button) {

  clearInterval(timer);

  let q = questions[i];
  let buttons = document.querySelectorAll(".answer");

  buttons.forEach(b => b.disabled = true);

  buttons[q.c].classList.add("correct");

  if (selected === q.c) {

    score++;
    document.getElementById("score").innerText = score;

    document.getElementById("feedback").innerText =
      "✓ Correct!";

    results.push("✓ Correct");

  } else {

    button.classList.add("wrong");

    document.getElementById("feedback").innerText =
      "✗ Wrong! Correct answer: " + q.a[q.c];

    results.push("✗ Wrong");

  }

  document.getElementById("next").classList.remove("hide");
}

function timeout() {

  let q = questions[i];
  let buttons = document.querySelectorAll(".answer");

  buttons.forEach(b => b.disabled = true);

  buttons[q.c].classList.add("correct");

  score--;

  document.getElementById("score").innerText = score;

  document.getElementById("feedback").innerText =
    "⏰ Time up! Correct answer: " + q.a[q.c];

  results.push("⏰ Time expired");

  document.getElementById("next").classList.remove("hide");
}

function nextQuestion() {

  i++;

  if (i < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {

  clearInterval(timer);

  document.getElementById("game").classList.add("hide");
  document.getElementById("result").classList.remove("hide");

  document.getElementById("final").innerText = score;

  document.getElementById("results").innerHTML =
    results.map((r, i) =>
      `<p>Question ${i + 1}: ${r}</p>`
    ).join("");
}