(function() {
  const checkAnswer = window.requests.checkAnswer;
  const loadWord = window.requests.loadWord;

  //Doesn't belong here!!! Makes user reload in order to get a new word!!!
  document.querySelector('.question').innerHTML = loadWord();

  document.querySelector('.answer').addEventListener('keyup', (e) => {
      if(e.keyCode === 13) {
        if (JSON.parse(checkAnswer(e.target.value)).correct == 1) {
          e.target.setAttribute('class', 'answer green');
        } else {
          e.target.setAttribute('class', 'answer red');
        }
    }
  });

  document.getElementById('checkForm').addEventListener('submit', (e) => {
    e.preventDefault();
  });
})();
