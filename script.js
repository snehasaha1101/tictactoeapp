let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let player1ScoreEl = document.querySelector("#player1-score");
let player2ScoreEl = document.querySelector("#player2-score");
let player1SymbolEl = document.querySelector("#player1-symbol");
let player2SymbolEl = document.querySelector("#player2-symbol");
let scoreBoard = document.querySelector("#score-board");

let turnO;
let winnerFound = false;
let player1Symbol, player2Symbol;
let scores = { Player1: 0, Player2: 0 };
let isPlayer1Starting = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const assignSymbols = () => {
    if (isPlayer1Starting) {
        player1Symbol = "X";
        player2Symbol = "O";
        turnO = true;
    } else {
        player1Symbol = "O";
        player2Symbol = "X";
        turnO = false;
    }
    player1SymbolEl.innerText = player1Symbol;
    player2SymbolEl.innerText = player2Symbol;
    updateActivePlayer();
};

const updateActivePlayer = () => {
    if (turnO) {
        player1SymbolEl.parentElement.classList.add("active-player");
        player2SymbolEl.parentElement.classList.remove("active-player");
        player1SymbolEl.style.color = player1Symbol === "X" ? "#d9534f" : "#5bc0de";
        player2SymbolEl.style.color = "#6c757d";
        player1SymbolEl.parentElement.style.fontWeight = "bold";
        player1SymbolEl.parentElement.style.color = player1SymbolEl.style.color;
        player2SymbolEl.parentElement.style.fontWeight = "normal";
        player2SymbolEl.parentElement.style.color = "#6c757d";
    } else {
        player2SymbolEl.parentElement.classList.add("active-player");
        player1SymbolEl.parentElement.classList.remove("active-player");
        player2SymbolEl.style.color = player2Symbol === "X" ? "#d9534f" : "#5bc0de";
        player1SymbolEl.style.color = "#6c757d";
        player2SymbolEl.parentElement.style.fontWeight = "bold";
        player2SymbolEl.parentElement.style.color = player2SymbolEl.style.color;
        player1SymbolEl.parentElement.style.fontWeight = "normal";
        player1SymbolEl.parentElement.style.color = "#6c757d";
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turnO ? player1Symbol : player2Symbol;
            box.classList.add(turnO ? "player1" : "player2");
            box.disabled = true;
            checkWinner();
            turnO = !turnO;
            updateActivePlayer();
        }
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("player1", "player2", "winning-box");
    });
};

const highlightWinningBoxes = (pattern) => {
    pattern.forEach((index) => {
        boxes[index].classList.add("winning-box");
    });
};

const showWinner = (winner) => {
    if (winner === player1Symbol) {
        scores.Player1 += 1;
        msg.innerText = `Congratulations! Player 1 (${winner}) wins!`;
        player1ScoreEl.innerText = scores.Player1;
    } else {
        scores.Player2 += 1;
        msg.innerText = `Congratulations! Player 2 (${winner}) wins!`;
        player2ScoreEl.innerText = scores.Player2;
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw = () => {
    msg.innerText = `It's a Draw!`;
    msgContainer.classList.remove("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            highlightWinningBoxes(pattern);
            showWinner(pos1Val);
            winnerFound = true;
            return;
        }
    }

    const allBoxesFilled = Array.from(boxes).every((box) => box.innerText !== "");
    if (allBoxesFilled && !winnerFound) {
        showDraw();
    }
};

const resetGame = () => {
    winnerFound = false;
    enableBoxes();
    msgContainer.classList.add("hide");
    updateActivePlayer();
};

resetBtn.addEventListener("click", () => {
    scores = { Player1: 0, Player2: 0 };
    player1ScoreEl.innerText = scores.Player1;
    player2ScoreEl.innerText = scores.Player2;
    assignSymbols();
    resetGame();
});

newGameBtn.addEventListener("click", () => {
    isPlayer1Starting = !isPlayer1Starting;
    assignSymbols();
    resetGame();
});

assignSymbols();
