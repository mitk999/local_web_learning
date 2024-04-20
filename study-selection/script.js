const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const fileUpload = document.getElementById("file-upload");
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');
const levelupSound = document.getElementById('levelup-sound');

let filename = '';
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

fileUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    filename = file.name
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileContent = e.target.result;
            try {
                questions = shuffle_arr(JSON.parse(fileContent));
                currentQuestionIndex = 0;
                score = 0;
                showQuestion(questions[currentQuestionIndex]);
            } catch (error) {
                console.error("問題セットの読み込みエラー:", error);
            }
        };
        reader.readAsText(file);
    }
});

function showQuestion(question) {
    questionElement.textContent = question.word;
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
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    if (selectedOption === correctAnswer) {
        correctSound.pause();
        correctSound.currentTime = 0;
        correctSound.play();
        resultElement.textContent = "正解！";
        resultElement.style.color = "green";
        score++;
    } else {
        incorrectSound.pause();
        incorrectSound.currentTime = 0;
        incorrectSound.play();
        resultElement.textContent = "不正解！正解は「" + correctAnswer + "」です。";
        resultElement.style.color = "red";
    }

    scoreElement.textContent = `正解：${score}/${currentQuestionIndex + 1}`;

    resultElement.style.display = "block";

    setTimeout(() => {
        resultElement.style.display = "none";
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            if (questions.length === score){
                levelupSound.pause();
                levelupSound.currentTime = 0;
                levelupSound.play();
            }
            const logMessage = `${now_str()},${filename},${questions.length},${score},${Math.trunc((score / questions.length)) * 100}`;
            const blob = new Blob([logMessage], { type: "text/plain" });
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "quiz_log.txt";
            downloadLink.click();
            //alert("全ての問題が終了しました");
            currentQuestionIndex = 0;
            score = 0;
            showQuestion(questions[currentQuestionIndex]);
        }
    }, 500);
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