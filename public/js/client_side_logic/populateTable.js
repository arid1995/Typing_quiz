(function() {
const getAllWords = window.requests.getAllWords;

let allWords = JSON.parse(getAllWords());

let yourLists=document.querySelector('.your-lists');

let listLabel=document.createElement('div');
listLabel.setAttribute('class', 'list-label');
  let listName=document.createElement('span');
  listName.setAttribute('class', 'list-name');
  listName.innerHTML="List1";
  listLabel.appendChild(listName);
yourLists.appendChild(listLabel);

let vocabList=document.createElement('ul');
vocabList.setAttribute('class', 'vocab-list');

for(let i = 0; i < allWords.length; i++) {
  let box = document.createElement('li');
  box.setAttribute('class', 'word-box');

  let word = document.createElement('span');
  word.setAttribute('class', 'word')
  word.innerHTML = allWords[i].word;

  let deffinition = document.createElement('ul');
  deffinition.setAttribute('class', 'deffinition')
    let translation = document.createElement('li');
    translation.innerHTML = allWords[i].translation;
  deffinition.appendChild(translation);

  box.appendChild(word);
  box.appendChild(deffinition);


  vocabList.appendChild(box);
}
yourLists.appendChild(vocabList);
})();
