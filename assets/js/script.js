document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            const gameType = this.getAttribute("data-type");
            if (gameType === "submit") {
                checkAnswer();
            } else {
                runGame(gameType);
            }
        });
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    // Start with addition game
    runGame("addition");
});

/**
 * Main game loop, called after each answer is processed
 */
function runGame(gameType) {
    resetAnswerBox();

    const [num1, num2] = generateRandomNumbers(1, 25);

    switch (gameType) {
        case "addition":
            displayQuestion(num1, num2, "+");
            break;
        case "multiply":
            displayQuestion(num1, num2, "x");
            break;
        case "subtract":
            displayQuestion(Math.max(num1, num2), Math.min(num1, num2), "-");
            break;
        case "division":
            // Ensure no division by zero
            displayDivisionQuestion(num1, num2);
            break;
        default:
            alert(`Unknown game type: ${gameType}`);
            throw `Unknown game type: ${gameType}. Aborting!`;
    }
}

/**
 * Resets the answer box input field
 */
function resetAnswerBox() {
    const answerBox = document.getElementById("answer-box");
    answerBox.value = "";
    answerBox.focus();
}

/**
 * Generates two random numbers between given min and max
 */
function generateRandomNumbers(min, max) {
    return [
        Math.floor(Math.random() * (max - min + 1)) + min,
        Math.floor(Math.random() * (max - min + 1)) + min
    ];
}

/**
 * Checks the user's answer and updates the score
 */
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answer-box").value);
    const [correctAnswer, gameType] = calculateCorrectAnswer();
    
    if (userAnswer === correctAnswer) {
        alert("Hey! You got it right! :D");
        incrementScore();
    } else {
        alert(`Awwww... you answered ${userAnswer}. The correct answer was ${correctAnswer}!`);
        incrementWrongAnswer();
    }

    runGame(gameType);
}

/**
 * Calculates the correct answer based on the operands and operator
 */
function calculateCorrectAnswer() {
    const operand1 = parseInt(document.getElementById('operand1').innerText);
    const operand2 = parseInt(document.getElementById('operand2').innerText);
    const operator = document.getElementById("operator").innerText;

    switch (operator) {
        case "+":
            return [operand1 + operand2, "addition"];
        case "x":
            return [operand1 * operand2, "multiply"];
        case "-":
            return [operand1 - operand2, "subtract"];
        case "/":
            return [operand1 / operand2, "division"];
       
