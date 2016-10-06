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
  const word = request('http://127.0.0.1:3000/api/getword', '', 'get');
  return word;
}

function checkAnswer(answer) {
  const response = request('http://127.0.0.1:3000/api/checkAnswer', `{"answer": "${answer}"}`, 'post');
  return response;
}
