const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const fileUpload = document.getElementById("file-upload");
const nextButton = document.getElementById("next-button");
nextButton.addEventListener("click", moveToNextQuestion);
nextButton.disabled=true;
const correctSound = document.getElementById('correct-sound');
correctSound.volume=0.6;
const incorrectSound = document.getElementById('incorrect-sound');
incorrectSound.volume=0.6;
const levelupSound = document.getElementById('levelup-sound');
levelupSound.volume=0.3;
const inputElement = document.getElementById('input');

var logMessageEachQuestion = ""
let filename = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

fileUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileContent = e.target.result;
            try {
                filename = file.name;
                questions = shuffle_arr(JSON.parse(fileContent));
                currentQuestionIndex = 0;
                score = 0;
                questionElement.textContent = "";
                update_display_scores();
                showQuestion(questions[currentQuestionIndex]);
            } catch (error) {
                console.error("問題セットの読み込みエラー:", error);
            }
        };
        reader.readAsText(file);
    }
});

function showQuestion(question) {

    if (!question.word_hidden){
        questionElement.innerHTML = question.word;
    }

    optionsContainer.innerHTML = "";

    if (question.word_voice){
        let uttr = new SpeechSynthesisUtterance(question.word)
        if (is_japanese(question.word)){
            uttr.lang = "ja-JP";
        }else{uttr.lang = "en-US";}
          speechSynthesis.speak(uttr)
    }
    if (question.options_shuffle){
        question.options = shuffle_arr(question.options)
    }
    if (question.options){
      question.options.forEach(option => {
          const button = document.createElement("button");
          button.textContent = option;
          button.classList.add("option");
          button.addEventListener("click", () => checkAnswer(option));
          optionsContainer.appendChild(button);
      });
      // nextButton.disabled = true;
    }else{
        inputElement.style.display = "block";
        inputElement.addEventListener("keydown", function(event) {
          if (event.key === "Enter") {
            checkAnswer(inputElement.value.trim().toLowerCase())
          }
        });
        // nextButton.addEventListener("click", () => );
        // nextButton.disabled = false;
    }
    nextButton.disabled = true;
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    if (selectedOption === correctAnswer) {
        correctSound.pause();
        correctSound.currentTime = 0;
        correctSound.play();
        resultElement.innerHTML = "正解！";
        resultElement.style.color = "green";
        score++;
        logMessageEachQuestion += `,${currentQuestionIndex+1}:t`
    } else {
        incorrectSound.pause();
        incorrectSound.currentTime = 0;
        incorrectSound.play();
        resultElement.innerHTML = "不正解！正解は「" + correctAnswer + "」です。";
        resultElement.style.color = "red";
        logMessageEachQuestion += `,${currentQuestionIndex+1}:f`
    }

    resultElement.innerHTML += "<br>" + currentQuestion.answer_description;
    resultElement.style.display = "block";

    //後処理
    var optionElements = document.querySelectorAll('.option');
    optionElements.forEach(option => {option.disabled = true;})
    nextButton.disabled = false;
    inputElement.disabled = true;
}

function moveToNextQuestion() {
    inputElement.value = "";
    inputElement.disabled = false;
    resultElement.style.display = "none";
    currentQuestionIndex++;
    update_display_scores();
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        if (questions.length === score) {
            levelupSound.pause();
            levelupSound.currentTime = 0;
            levelupSound.play();
        }
        const logMessage = `${now_str()},${filename},${questions.length},${score},${Math.trunc((score / questions.length) * 100)}${logMessageEachQuestion}`;
        const blob = new Blob([logMessage], { type: "text/plain" });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "quiz_log.txt";
        downloadLink.click();
        alert("全ての問題が終了しました");
        logMessageEachQuestion = ""
        currentQuestionIndex = 0;
        score = 0;
        update_display_scores();
        showQuestion(questions[currentQuestionIndex]);
    }
}

function shuffle_arr(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array
}

function is_japanese(txt){
    for(var i=0; i < txt.length; i++){
    if(txt.charCodeAt(i) >= 256) {
        return true;
    }
    return false;
  }
}

function now_str(){
    var date = new Date();
    date.setTime(date.getTime() + (9*60*60*1000));
    var str_date = date.toISOString().replace('T', ' ').substr(0, 19);
    return str_date
}

function update_display_scores(){
    scoreElement.innerHTML = `
    ${currentQuestionIndex + 1}問目 / ${questions.length}問中<br>
    正解：${score}問<br>`
    ;
}
