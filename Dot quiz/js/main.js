'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

const quizSet = shuffle([
  {q:'1+1',c:['2','1','0']},
  {q:'3*4',c:['12','3','1']},
  {q:'3-3',c:['0','1','2']},
]);
let currentNum = 0;
let isAnswered;
let score = 0;


// let i = arr.length - 1;//randomする範囲

//shuffle
function shuffle(arr){
  for(let i = arr.length - 1;i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));//randomする
    [arr[j],arr[i]] = [arr[i],arr[j]];
  }
  return arr; 
}

//答え選択
function checkAnswer(li){
  if(isAnswered === true){
    return;
  }
  isAnswered = true
  if(li.textContent === quizSet[currentNum].c[0]){
    li.classList.add('correct');
    score++;
  }else{
    li.classList.add('wrong');
  }

  btn.classList.remove('disabled');
}

//問題を設置
function setQuiz(){
  isAnswered = false;
  question.textContent = quizSet[currentNum].q;

  while(choices.firstChild){
    choices.removeChild(choices.firstChild);
  }

  const shuffledChoices = shuffle([...quizSet[currentNum].c]);
  // console.log(quizSet[currentNum].c)

    shuffledChoices.forEach(choice =>{
    const li = document.createElement('li');
    li.textContent = choice;
    li.addEventListener('click', () => {
      checkAnswer(li);
    });
    choices.appendChild(li);
  });

  if(currentNum === quizSet.length - 1){
    btn.textContent = 'Show Score';
  }
}

setQuiz();

btn.addEventListener('click', () => {
  if (btn.classList.contains('disabled')){
    return;
  }
  btn.classList.add('disabled');

  if (currentNum === quizSet.length - 1){
    // console.log(`Score: ${score} / ${quizSet.length}`);
    scoreLabel.textContent =`Score: ${score} / ${quizSet.length}`;
    result.classList.remove('hidden');
  }else{
    currentNum++
    setQuiz();
  }
})

}