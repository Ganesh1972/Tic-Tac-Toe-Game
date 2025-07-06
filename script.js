let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let newGameBtn = document.querySelector(".new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let starsContainer = document.querySelector(".stars-container");
// let main_container = document.querySelector(".container");

let turnO = true; // Player O starts first
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Generate stars
function generateStars(numStars) {
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 5 + 2}px`; // Increased size
        star.style.height = star.style.width;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 5 + 2}s`;
        starsContainer.appendChild(star);
    }
}

// Initialize stars
generateStars(250);

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        count++;
        if (turnO) {
            box.innerText = "O";
            box.style.color = "black"; // Color for 'O'
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "red"; // Color for 'X'
            turnO = true;
        }

        box.disabled = true;
        checkWinner();
    });
});

// Function to show the winner or draw message
const showWinner = (winner) => {
    if (winner === -1) {
        msg.innerText = "Oops!!! Match Draw...";
    } else {
        msg.innerText = `Congratulations, Winner is ${winner}`;
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
    // main_container.classList.add("hide2");
};

// Function to check for a winner or draw
const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                winnerFound = true;
                return;
            }
        }
    }

    if (count === 9 && !winnerFound) {
        showWinner(-1); // Draw
    }
};

// Function to reset the game
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    boxes.forEach((box) => box.innerText = ""); // Clear the text content of the boxes
    msgContainer.classList.add("hide");
    // main_container.classList.remove("hide2")
};

// Function to disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Function to enable all boxes
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
    });
};

// Event listeners for the reset and new game buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
