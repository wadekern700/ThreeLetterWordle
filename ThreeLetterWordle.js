class ThreeLetterWordle {
    constructor() {
        // Initialize properties
        this.cells = Array(5).fill(null).map(() => Array(3).fill(''));
        this.cellIndex = 0;
        this.cellRow = 0;
        this.gameOver = false;
        this.message = '';
        this.isDisabled = false;
        
        // Initialize game
        this.init();
    }

    async init() {
        try {
            this.targetWord = await this.getRandomWord();
            this.initializeBoard();
            this.initializeKeyboardListeners();
        } catch (error) {
            console.error('Error initializing game:', error);
        }
    }

    async getRandomWord() {
        try {
            const response = await fetch("https://random-word-api.herokuapp.com/word?length=3");
            const words = await response.json();
            return words[0];
        } catch (error) {
            console.error('Error fetching random word:', error);
            return 'CAT'; // Fallback word
        }
    }

    initializeBoard() {
        const gameBoard = document.getElementById('game-board');
        for (let i = 0; i < 5; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.setAttribute('row', i.toString());
                cell.setAttribute('cell', j.toString());
                row.appendChild(cell);
            }
            
            gameBoard.appendChild(row);
        }
    }

    initializeKeyboardListeners() {
        document.querySelectorAll('#keyboard button').forEach(button => {
            button.addEventListener('click', (e) => this.handleKeyClick(e));
        });

        // Add physical keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        if (this.gameOver || this.isDisabled) return;

        if (e.key === 'Enter') {
            this.enterClicked();
        } else if (e.key === 'Backspace') {
            this.backspaceClicked();
        } else if (/^[A-Za-z]$/.test(e.key)) {
            this.letterClicked(e.key.toUpperCase());
        }
    }

    handleKeyClick(e) {
        if (this.gameOver || this.isDisabled) return;

        const value = e.target.value;
        if (value === 'ENTER') {
            this.enterClicked();
        } else if (value === 'BACKSPACE') {
            this.backspaceClicked();
        } else {
            this.letterClicked(value);
        }
    }

    letterClicked(letter) {
        if (this.cellIndex < 3 && this.cellRow < 5) {
            this.cells[this.cellRow][this.cellIndex] = letter;
            const cell = document.querySelector(`[row="${this.cellRow}"][cell="${this.cellIndex}"]`);
            cell.textContent = letter;
            cell.classList.add('populated');
            this.cellIndex++;
        }
    }

    backspaceClicked() {
        if (this.cellIndex !== 0) {
            this.cellIndex--;
            this.cells[this.cellRow][this.cellIndex] = '';
            const cell = document.querySelector(`[row="${this.cellRow}"][cell="${this.cellIndex}"]`);
            cell.textContent = '';
            cell.classList.remove('populated');
        }
    }

    async enterClicked() {
        if (this.cellIndex !== 3) return;
        
        this.isDisabled = true;
        await this.checkWord();
        this.isDisabled = false;
    }

    async validateWord(word) {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    async checkWord() {
        const currentWord = this.cells[this.cellRow].join('');
        
        // Validate word exists
        const isValid = await this.validateWord(currentWord);
        if (!isValid) {
            this.showMessage('Not a valid word!');
            return;
        }

        // Check each letter
        for (let i = 0; i < currentWord.length; i++) {
            const guessedLetter = currentWord[i];
            const targetLetter = this.targetWord[i];
            
            const keyButton = document.querySelector(`button[value="${guessedLetter}"]`);
            const cell = document.querySelector(`[row="${this.cellRow}"][cell="${i}"]`);

            if (guessedLetter === targetLetter) {
                this.colorElement(keyButton, cell, '#6aaa64'); // Green
            } else if (this.targetWord.includes(guessedLetter)) {
                if (keyButton.style.backgroundColor !== '#6aaa64') {
                    this.colorElement(keyButton, cell, '#c9b458'); // Yellow
                }
            } else {
                this.colorElement(keyButton, cell, '#787c7e'); // Gray
            }
        }

        if (currentWord === this.targetWord) {
            this.showMessage('Congratulations! You won!');
            this.gameOver = true;
            return;
        }

        if (this.cellRow < 4) {
            this.cellRow++;
            this.cellIndex = 0;
        } else {
            this.showMessage(`Game Over! The word was ${this.targetWord}`);
            this.gameOver = true;
        }
    }

    colorElement(keyButton, cell, color) {
        keyButton.style.backgroundColor = color;
        keyButton.style.color = 'white';
        cell.style.backgroundColor = color;
        cell.style.color = 'white';
        
        // Add animation
        cell.style.animation = 'flip 0.5s ease forwards';
    }

    showMessage(msg) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = msg;
        messageElement.classList.add('show');
        
        setTimeout(() => {
            if (messageElement.textContent === msg) {
                messageElement.classList.remove('show');
                messageElement.textContent = '';
            }
        }, 3000);
    }
}

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new ThreeLetterWordle();
});
