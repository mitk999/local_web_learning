const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const fileUpload = document.getElementById("file-upload");
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');

let currentQuestionIndex = 0;
let score = 0;
let questions = [];

fileUpload.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const fileContent = e.target.result;
            try {
                questions = JSON.parse(fileContent);
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
    
    let uttr = new SpeechSynthesisUtterance(question.word)
    uttr.lang = "en-US";
    speechSynthesis.speak(uttr)

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
        correctSound.play();
        resultElement.textContent = "正解！";
        resultElement.style.color = "green";
        score++;
    } else {
        incorrectSound.play();
        resultElement.textContent = "不正解！正解は「" + correctAnswer + "」です。";
        resultElement.style.color = "red";
    }

    scoreElement.textContent = `今${currentQuestionIndex + 1}問中${score}問正解`;

    resultElement.style.display = "block";

    setTimeout(() => {
        resultElement.style.display = "none";
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            const logMessage = `正解率: ${(score / questions.length) * 100}%`;
            // Blobを作成
            const blob = new Blob([logMessage], { type: "text/plain" });
            // ダウンロードリンクを作成
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = "quiz_log.txt";
            // ダウンロードリンクをクリック
            downloadLink.click();
            alert("全ての問題が終了しました。");
            currentQuestionIndex = 0;
            score = 0;
            showQuestion(questions[currentQuestionIndex]);
        }
    }, 500);
}

