let allWords = JSON.parse(getAllWords());

let table = document.getElementById('word-table');

for(let i = 0; i < allWords.length; i++) {
  let row = document.createElement('tr');

  let word = document.createElement('td');
  word.innerHTML = allWords[i].word;
  row.appendChild(word);

  let translation = document.createElement('td');
  translation.innerHTML = allWords[i].translation;
  row.appendChild(translation);

  table.appendChild(row);
}
