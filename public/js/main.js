const host = 'http://typing-quiz.herokuapp.com/'

function request(url, data, method) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url, false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  const data1 = JSON.stringify(data);
  xhr.send(data);
  if (xhr.status !== 200) return null;

  return xhr.responseText;
}

function loadWord() {
  const word = request(host + 'api/getword', '', 'get');
  return word;
}

function checkAnswer(answer) {
  const response = request(host + 'api/checkAnswer', `{"answer": "${answer}"}`, 'post');
  return response;
}

function getVersion() {
  const response = request(host + 'api/version', '', 'get');
  return response;
}

function getAllWords() {
  const response = request(host + 'api/allwords', '', 'get');
  return response;
}
