(function() {
const host = 'http://127.0.0.1:3000/'

function request(url, data, method) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url, false);
  xhr.setRequestHeader('Content-Type', 'application/json');
  const data1 = JSON.stringify(data);
  xhr.send(data);
  if (xhr.status !== 200) return null;

  return xhr.responseText;
}

const loadWord = function() {
  const word = request(host + 'api/getword', '', 'get');
  return word;
}

const checkAnswer = function(answer) {
  const response = request(host + 'api/checkAnswer', `{"answer": "${answer}"}`, 'post');
  return response;
}

const getVersion = function() {
  const response = request(host + 'api/version', '', 'get');
  return response;
}

const getAllWords = function () {
  const response = request(host + 'api/allwords', '', 'get');
  return response;
}

window.requests = {
  loadWord,
  checkAnswer,
  getVersion,
  getAllWords
};
})();
