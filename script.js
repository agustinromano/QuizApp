let questionNum = 0;
let scoreNum = 0;

const questionList = [
  {
    question: 'When was the first car built?',
    answers: ['1880', '1886', '1900', '1945'],
    correctAnswer: '1886'
  },
  {
    question: 'Whats was the fastest car in the 1990’s?',
    answers: ['1991 Corvette ZR-1', '1993 Toyota Supra', '1995 Mustang SVT Cobra R', '1990 Lamborghini Diablo'],
    correctAnswer: '1995 Mustang SVT Cobra R'
  },
  {
    question: 'Who was the founder of Ferrari?',
    answers: ['Enzo Ferrari', 'Alfredo Ferrari', 'Piero Lardi Ferrari', 'Ettore Bugatti'],
    correctAnswer: 'Enzo Ferrari'
  },
  {
    question: 'How many car brands does Volkswagen own?',
    answers: ['1', '2', '6', '5'],
    correctAnswer: '5'
  },
  {
    question: 'What year was Ford founded?',
    answers: ['1900', '1919', '1903', '1905'],
    correctAnswer: '1903'
  },
  {
    question: 'Who created the first fully electric car?',
    answers: ['Karl Friedrich Rapp', 'Elon Musk', 'Robert Anderson', 'Kiichiro Toyoda'],
    correctAnswer: 'Robert Anderson'
  },
  {
    question: 'Who won Formula 1 in 2017?',
    answers: ['Valtteri Bottas', 'Carlo Abate', 'Jaime Alguersuari', 'Lewis Hamilton'],
    correctAnswer: 'Lewis Hamilton'
  },
  {
    question: 'Where did drifting originate?',
    answers: ['England', 'Spain', 'Japan', 'Germany'],
    correctAnswer: 'Japan'
  },
  {
    question: 'What year was the first Nascar race?',
    answers: ['1949', '1951', '1945', '1953'],
    correctAnswer: '1949'
  },
  {
    question: 'What car has the fastest 0-60 mph?',
    answers: ['Lamborghini Aventador SV', 'Telsa Model S', 'La Ferrari', 'Porsche 911 Turbo'],
    correctAnswer: 'Telsa Model S'
  }
];

function handleButton() {
  $('#button-go').click(function (event) {
    $('#startQuestions').html(questionTemplate());
    registerEventHandler();
    $('.quizStart').remove();
    $('#questionNum').text(1);
  });
}

function questionTemplate() {
  return `
  <main id="questionNames">
  <h2 class="question">${questionList[questionNum].question}</h2>
  </main>
  <form>
  <label class="answerOption">
  <input name="q" id='q0' type="radio" value="${questionList[questionNum].answers[0]}" >
  <span>${questionList[questionNum].answers[0]}</span>
  </label>
  <label class="answerOption">
  <input name="q" id='q1' type="radio" value="${questionList[questionNum].answers[1]}" >
  <span>${questionList[questionNum].answers[1]}</span>
  </label>
  <label class="answerOption">
  <input name="q" id='q2' type="radio" value="${questionList[questionNum].answers[2]}" >
  <span>${questionList[questionNum].answers[2]}</span>
  </label>
  <label class="answerOption">
  <input name="q" id='q3' type="radio" value="${questionList[questionNum].answers[3]}" >
  <span>${questionList[questionNum].answers[3]}</span>
  </label>
  

  <button id='submit'>Submit</button>
  </form>
  `;
}

function renderPage() {
  $('.quizAnswerResults').show();
  $('#startQuestions').html(questionTemplate());
  registerEventHandler();
  handleQuestionNum();
}

function registerEventHandler() {
  $('#submit').on('click', function (event) {
    let userAnswer = 0;
    let correctAnswer = `${questionList[questionNum].correctAnswer}`;
    for (let i = 0; i <= 3; i++) {
      if ($('#q' + i).is(':checked')) {
        userAnswer = i;
        break;
      }
    }
    if (questionList[questionNum].answers[userAnswer] == correctAnswer) {
      $('.mainScreen').append(questionResultCorrect());
      handleScore();
      continueBotton();
      questionNum++;
      lastQuestion();
    }
      else {
      questionResultWrong();
      continueBotton();
      questionNum++;
      lastQuestion();
    }
    if (userAnswer === -1) {
      alert("Please anwser the question");
      //$(".warning").show();
      return;
    }
    $('.mainScreen').hide();
    renderPage();
  });
  event.preventDefault();
}

function lastQuestion() {
  if (questionNum == 10) {
    event.stopPropagation();
    $('.quizEndResults').html(renderResults());
  };
}


function handleQuestionNum() {
  $('#questionNum').text(questionNum + 1);
}

function handleScore() {
  $('#scoreNum').text(scoreNum + 1);
  scoreNum++;
}

function renderResults() {
  if (scoreNum >= 7) {
    $('.quizEndResults').html(`<h2>You did great<!/h2><p>You really know your car facts!</p><p>You got ${scoreNum} /10</p>`);
  } else {
    $('.quizEndResults').html(`<h2>You didn't do so hot</h2><p>You got ${scoreNum} /10</p>`);
  }
}

function continueBotton(){
  $("#continue").on('click', function(){
    // renderPage();
    $('.quizAnswerResults').hide();
    $('.mainScreen').show();
  });
  // lastQuestion();
}

function questionResultCorrect() {
  $('.quizAnswerResults').html(`<h2>You got it</h2> <button id='continue'>Continue</button>`);
  event.preventDefault();
}

function questionResultWrong() {
  $('.quizAnswerResults').html(`<h2>Wrong!</h2><h2>The correct anwser is ${questionList[questionNum].correctAnswer}</h2> <button id='continue'>Continue</button>`);
  event.preventDefault();
}



handleButton();
