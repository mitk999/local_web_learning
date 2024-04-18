const hiragana = [
    { char: 'あ', romaji: 'a' },
    { char: 'い', romaji: 'i' },
    { char: 'う', romaji: 'u' },
    { char: 'え', romaji: 'e' },
    { char: 'お', romaji: 'o' },
    { char: 'か', romaji: 'ka' },
    { char: 'き', romaji: 'ki' },
    { char: 'く', romaji: 'ku' },
    { char: 'け', romaji: 'ke' },
    { char: 'こ', romaji: 'ko' },
    { char: 'さ', romaji: 'sa' },
    { char: 'し', romaji: 'shi' },
    { char: 'す', romaji: 'su' },
    { char: 'せ', romaji: 'se' },
    { char: 'そ', romaji: 'so' },
    { char: 'た', romaji: 'ta' },
    { char: 'ち', romaji: 'chi' },
    { char: 'つ', romaji: 'tsu' },
    { char: 'て', romaji: 'te' },
    { char: 'と', romaji: 'to' },
    { char: 'な', romaji: 'na' },
    { char: 'に', romaji: 'ni' },
    { char: 'ぬ', romaji: 'nu' },
    { char: 'ね', romaji: 'ne' },
    { char: 'の', romaji: 'no' },
    { char: 'は', romaji: 'ha' },
    { char: 'ひ', romaji: 'hi' },
    { char: 'ふ', romaji: 'fu' },
    { char: 'へ', romaji: 'he' },
    { char: 'ほ', romaji: 'ho' },
    { char: 'ま', romaji: 'ma' },
    { char: 'み', romaji: 'mi' },
    { char: 'む', romaji: 'mu' },
    { char: 'め', romaji: 'me' },
    { char: 'も', romaji: 'mo' },
    { char: 'や', romaji: 'ya' },
    { char: 'ゆ', romaji: 'yu' },
    { char: 'よ', romaji: 'yo' },
    { char: 'ら', romaji: 'ra' },
    { char: 'り', romaji: 'ri' },
    { char: 'る', romaji: 'ru' },
    { char: 'れ', romaji: 're' },
    { char: 'ろ', romaji: 'ro' },
    { char: 'わ', romaji: 'wa' },
    { char: 'を', romaji: 'wo' },
    { char: 'ん', romaji: 'n' }
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
let startTime = Date.now();
// let endTime;

const questionElement = document.getElementById('question');
const inputElement = document.getElementById('input');
const hintElement = document.getElementById('hint');
const refreshButton = document.getElementById('refresh-btn');
const keyboardKeys = document.querySelectorAll('.key');
const questions = getRandomQuestions();

function getLevel(time_seconds){
    if (time_seconds < 10){return 100}
    else if (time_seconds < 20 ){return 90}
    else if (time_seconds < 30 ){return 80}
    else if (time_seconds < 40 ){return 70}
    else if (time_seconds < 50 ){return 60}
    else if (time_seconds < 60 ){return 50}
    else if (time_seconds < 70 ){return 40}
    else if (time_seconds < 80 ){return 30}
    else if (time_seconds < 90 ){return 20}
    else if (time_seconds < 100 ){return 10}
    else {return 1}
}
function getRandomQuestions() {
    const shuffled = hiragana.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
}

function displayQuestion() {
    questionElement.textContent = questions[currentQuestionIndex].char;

    if (hintElement.style.display !== 'none') {
            hintElement.textContent = `ヒント: ${hiraganaHints}`;
        }
}
function checkAnswer() {
    const userAnswer = inputElement.value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestionIndex].romaji;

    if (userAnswer === correctAnswer) {
        keyboardKeys.forEach(key => {key.classList.remove('highlight');});
        hintElement.style.display = 'none';
        correctAnswers++;
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion();
            inputElement.value = '';
        } else {
            const elapsedTime = (Date.now() - startTime) / 1000;            
            hintElement.textContent = `おめでとうございます！全問正解しました！\nレベル: ${getLevel(elapsedTime)}`;
            hintElement.style.fontSize = '30px';
            hintElement.style.color = 'green';
            hintElement.style.display = 'block';
            showRefreshButton();
        }
    } else {
        inputElement.value = '';
        hintElement.textContent = `正解は「${correctAnswer}」です。もう一度試してみてください。`;
        hintElement.style.display = 'block';

        keyboardKeys.forEach(key => {
            const keyLetter = key.innerText.toLowerCase();
            if (questions[currentQuestionIndex].romaji.includes(keyLetter)) {
                key.classList.add('highlight');
            } else {
                key.classList.remove('highlight');
            }
        });
    }
}

function showRefreshButton() {
    refreshButton.style.display = 'inline-block';
}

inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

refreshButton.addEventListener('click', function() {
    location.reload(); // ページを再読み込みする
});

document.addEventListener("click", function(event) {
        var inputField = document.getElementById("input");
        if (!inputField.contains(event.target)) {
            inputField.focus();
        }
    });

window.onload = function() {
    displayQuestion();
  };

//displayQuestion();
