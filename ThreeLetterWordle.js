



class ThreeLetterWordle {
    constructor() {
        // Initialize properties
        // this.cells = 'Array(5).fill(null).map(() => Array(3).fill(''))
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
       
            const date = new Date();
            const cacheName = 'wordle-cache'; // Name of the cache

            // Format the date by extracting the date part of the ISO string
const easternFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

// Format the current date
const [month, day, year] = easternFormatter.formatToParts(new Date()).map(({ type, value }) =>
  type === 'month' || type === 'day' || type === 'year' ? value : undefined
).filter(Boolean);

this.formattedDate = `${year}-${month}-${day}`;
             this.cache = await caches.open(cacheName);

             const cacheToday = await caches.match(`/wordle/${this.formattedDate}`);


            if (cacheToday ) {
                this.puzzleData = await cacheToday.json();
                console.log(`Puzzle for ${date} retrieved from cache:`, this.puzzleData);
                if(this.puzzleData.guesses.length>0){
                    
                }
            }
            //   } else {
            //     const puzzleData = {
            //         date: formattedDate,
            //         word: words              };
            //     await cache.put(`/wordle/${formattedDate}`, new Response(JSON.stringify(puzzleData), {
            //         headers: { 'Content-Type': 'application/json' },
            //       }));
            //   }
            // this.targetWord = this.words[formattedDate].toUpperCase();
            console.log(document.getElementById('hiddenField').value);
            this.targetWord =document.getElementById('hiddenField').value.toUpperCase();
            this.columns = this.targetWord.length;
            this.rows = 5;
            this.cells = Array(this.rows).fill(null).map(() => Array(this.columns).fill(''));
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
            return words[0].toUpperCase();
        } catch (error) {
            console.error('Error fetching random word:', error);
            return 'CAT'; // Fallback word
        }
    }

    initializeBoard() {
        const gameBoard = document.getElementById('game-board');
        let targetLetterCounts ={};
        for (let i = 0; i < this.rows; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (const letter of this.targetWord) {
                targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1;
        }
            for (let j = 0; j < this.columns; j++) {

                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.setAttribute('row', i.toString());
                cell.setAttribute('cell', j.toString());
      

                if(this.puzzleData.guesses[i]){   
                    const keyButton = document.querySelector(`button[value="${this.puzzleData.guesses[i][j]}"]`);
                    this.cellRow = i +1;
                
                                          this.colorElement(keyButton, cell, '#787c7e'); // Green

                    cell.innerHTML = this.puzzleData.guesses[i][j];
                    if (this.puzzleData.guesses[i][j] === this.targetWord[j]) {
                                     this.colorElement(keyButton, cell, '#6aaa64'); // Green

                        targetLetterCounts[this.puzzleData.guesses[i][j]]--; // Reduce count for matched letters

                        // Reduce count for matched letters
                     }else   if (
                        this.targetWord.includes(this.puzzleData.guesses[i][j]) &&
                        targetLetterCounts[this.puzzleData.guesses[i][j]] > 0
                    ) {
                                          this.colorElement(keyButton, cell, '#c9b458'); // Green

                         
                        targetLetterCounts[this.puzzleData.guesses[i][j]]--; // Reduce count for matched letters
                    }else{
        
                                     }
                }
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
        if (this.cellIndex < this.columns && this.cellRow < this.rows) {
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
        if (this.cellIndex !== this.columns) return;
        
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
        let isValid = true;
        // Validate word exists
if(currentWord != this.targetWord){
         isValid = await this.validateWord(currentWord);
        if (!isValid) {
            this.showMessage('Not a valid word!');
            return;
        }
}
                const targetLetterCounts = {};
      if(isValid){
               for (const letter of this.targetWord) {
            targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1;
    }
    const feedback = Array(currentWord.length).fill("grey"); // Default feedback


            for (let i = 0; i < currentWord.length; i++) {
                      const guessedLetter = currentWord[i];
            const targetLetter = this.targetWord[i];
                   const keyButton = document.querySelector(`button[value="${guessedLetter}"]`);
            const cell = document.querySelector(`[row="${this.cellRow}"][cell="${i}"]`);
        if (currentWord[i] === this.targetWord[i]) {
                  feedback[i] = "green";
                  this.colorElement(keyButton, cell, '#6aaa64'); // Green
                targetLetterCounts[currentWord[i]]--; // Reduce count for matched letters
        }
    }
        this.puzzleData.guesses.push(currentWord);
        await this.cache.put(`/wordle/${this.formattedDate}`, new Response(JSON.stringify(this.puzzleData), {
                    headers: { 'Content-Type': 'application/json' },
                  }));
        // Check each letter
        for (let i = 0; i < currentWord.length; i++) {
            const guessedLetter = currentWord[i];
            const targetLetter = this.targetWord[i];
            
            const keyButton = document.querySelector(`button[value="${guessedLetter}"]`);
            const cell = document.querySelector(`[row="${this.cellRow}"][cell="${i}"]`);

                 if (feedback[i] === "grey") { // Only process if not already green
                             if (
                this.targetWord.includes(currentWord[i]) &&
                targetLetterCounts[currentWord[i]] > 0
            ) {
                    this.colorElement(keyButton, cell, '#c9b458'); // Yellow
                targetLetterCounts[currentWord[i]]--; // Reduce count for matched letters
            }else{
                                                 this.colorElement(keyButton, cell, '#787c7e'); // Gray

                             }
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
// document.addEventListener('DOMContentLoaded', () => {
//     window.game = new ThreeLetterWordle();
// });
