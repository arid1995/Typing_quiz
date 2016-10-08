(function() {
  const checkAnswer = window.requests.checkAnswer;
  const loadWord = window.requests.loadWord;

  //Doesn't belong here!!! Makes user reload in order to get a new word!!!
  document.getElementById('word').innerHTML = loadWord();

  document.getElementById('checkForm').addEventListener('submit', (e) => {
    e.preventDefault();
    let answer = checkAnswer(document.getElementById('translation').value);
  document.getElementById('answer').innerHTML = answer;});
})();
