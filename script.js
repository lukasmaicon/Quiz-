const quizContainer = document.querySelector(".quiz-container");
const quizPages = document.querySelectorAll(".quiz-page");
const resultDiv = document.getElementById("result");
const userNameInput = document.getElementById("user-name");

let currentPage = 1;
let answers = {};
let userName = "";

userNameInput.addEventListener("input", (e) => {
  userName = e.target.value;
});

quizPages.forEach((page, conteudo) => {
  page.id = `page-${conteudo + 1}`;
  page.querySelector("button").addEventListener("click", () => {
    if (conteudo < quizPages.length - 1) {
      nextPage();
    } else {
      submitQuiz();
    }
  });
});

function nextPage() {
  quizPages[currentPage - 1].classList.remove("active");
  currentPage++;
  quizPages[currentPage - 1].classList.add("active");
}

function submitQuiz() {
  const additionAnswer = parseInt(
    document.getElementById("addition-answer").value
  );
  const subtractionAnswer = parseInt(
    document.getElementById("subtraction-answer").value
  );
  const multiplicationAnswer = parseInt(
    document.getElementById("multiplication-answer").value
  );
  const divisionAnswer = parseInt(
    document.getElementById("division-answer").value
  );

  answers = {
    addition: additionAnswer,
    subtraction: subtractionAnswer,
    multiplication: multiplicationAnswer,
    division: divisionAnswer,
  };

  let score = 0;
  let correctAnswers = [];
  let incorrectAnswers = [];

  if (answers.addition === 312) {
    score++;
    correctAnswers.push("Adição: 245 + 67 = 312");
  } else {
    incorrectAnswers.push("Adição: 245 + 67 = " + answers.addition);
  }

  if (answers.subtraction === 105) {
    score++;
    correctAnswers.push("Subtração: 538 - 433 = 105");
  } else {
    incorrectAnswers.push("Subtração: 538 - 433 = " + answers.subtraction);
  }

  if (answers.multiplication === 693) {
    score++;
    correctAnswers.push("Multiplicação: 231 × 3 = 693");
  } else {
    incorrectAnswers.push("Multiplicação: 231 × 3 = " + answers.multiplication);
  }

  if (answers.division === 432) {
    score++;
    correctAnswers.push("Divisão: 864 ÷ 2 = 432");
  } else {
    incorrectAnswers.push("Divisão: 864 ÷ 2 = " + answers.division);
  }

  let resultText = `${userName}, acertou ${score} de 4 exercícios!<br><br>`;

  if (score === 4) {
    resultText += `Uau! Você gabaritou o teste e ganhou um troféu! 🏆 <br><br>`;

    confetti();
  }

  if (correctAnswers.length > 0) {
    resultText += `Acertos 😀 <br>`;
    correctAnswers.forEach((answer) => {
      resultText += `- ${answer}<br>`;
    });
  }

  if (incorrectAnswers.length > 0) {
    resultText += `<br>Erros 😕<br>`;
    incorrectAnswers.forEach((answer) => {
      resultText += `- ${answer}<br>`;
    });
    resultText += `<br> " Não desista! Cada erro é uma oportunidade de aprender!😎 "`;
  }

  resultText += `<br><button id="retry-button">Jogar Novamente</button>`;
  resultDiv.innerHTML = resultText;

  document.getElementById("retry-button").addEventListener("click", resetQuiz);
}

document.getElementById("voltar").addEventListener("click", function () {
  if (document.referrer) {
    window.location.href = document.referrer;
  } else {
    window.history.go(-1);
  }
});

function confetti() {
  confetti.create(null, {
    resize: true,
    useWorker: true,
  })({
    particleCount: 2000,
    spread: 10,
    startVelocity: 1,
    ticks: 1500,
    origin: { y: 1 },
    gravity: 4,
    colors: ["#ff0000", "#00ff00", "#0000ff", "#ed01fb", "#ff5733"],
  });
}

function resetQuiz() {
  currentPage = 1;
  answers = {};
  userName = "";
  userNameInput.value = "";
  quizPages.forEach((page, conteudo) => {
    page.classList.remove("active");
    if (conteudo === 0) {
      page.classList.add("active");
    }
    page.querySelectorAll("input").forEach((input) => (input.value = ""));
  });
  resultDiv.innerHTML = "";
}

quizPages[0].classList.add("active");
