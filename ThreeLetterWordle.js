class ThreeLetterWordle {
    constructor() {
        // Initialize properties
        this.cells = Array(5).fill(null).map(() => Array(3).fill(''));
        this.cellIndex = 0;
        this.cellRow = 0;
        this.gameOver = false;
        this.message = '';
        this.isDisabled = false;

        this.words ={"2024-11-08": "set", "2024-11-09": "mod", "2024-11-10": "oxo", "2024-11-11": "hup", "2024-11-12": "yup", "2024-11-13": "ear", "2024-11-14": "tea", "2024-11-15": "kim", "2024-11-16": "kim", "2024-11-17": "eng", "2024-11-18": "old", "2024-11-19": "rum", "2024-11-20": "ass", "2024-11-21": "maw", "2024-11-22": "via", "2024-11-23": "jew", "2024-11-24": "bog", "2024-11-25": "cay", "2024-11-26": "man", "2024-11-27": "pop", "2024-11-28": "act", "2024-11-29": "dig", "2024-11-30": "hub", "2024-12-01": "ems", "2024-12-02": "coy", "2024-12-03": "yak", "2024-12-04": "yuk", "2024-12-05": "hid", "2024-12-06": "lap", "2024-12-07": "elf", "2024-12-08": "dit", "2024-12-09": "sac", "2024-12-10": "awl", "2024-12-11": "kef", "2024-12-12": "sec", "2024-12-13": "kip", "2024-12-14": "hap", "2024-12-15": "ted", "2024-12-16": "vav", "2024-12-17": "del", "2024-12-18": "dad", "2024-12-19": "sec", "2024-12-20": "axe", "2024-12-21": "sub", "2024-12-22": "psi", "2024-12-23": "met", "2024-12-24": "bed", "2024-12-25": "bay", "2024-12-26": "ink", "2024-12-27": "ars", "2024-12-28": "goy", "2024-12-29": "any", "2024-12-30": "pee", "2024-12-31": "fee", "2025-01-01": "tar", "2025-01-02": "mew", "2025-01-03": "pis", "2025-01-04": "big", "2025-01-05": "sis", "2025-01-06": "lux", "2025-01-07": "apo", "2025-01-08": "yon", "2025-01-09": "tam", "2025-01-10": "reg", "2025-01-11": "add", "2025-01-12": "yep", "2025-01-13": "wag", "2025-01-14": "gob", "2025-01-15": "lip", "2025-01-16": "dak", "2025-01-17": "hue", "2025-01-18": "wax", "2025-01-19": "wok", "2025-01-20": "him", "2025-01-21": "tam", "2025-01-22": "ago", "2025-01-23": "gas", "2025-01-24": "nay", "2025-01-25": "off", "2025-01-26": "mos", "2025-01-27": "leg", "2025-01-28": "lam", "2025-01-29": "yob", "2025-01-30": "ant", "2025-01-31": "ana", "2025-02-01": "mar", "2025-02-02": "lum", "2025-02-03": "got", "2025-02-04": "mom", "2025-02-05": "cos", "2025-02-06": "sub", "2025-02-07": "ore", "2025-02-08": "qat", "2025-02-09": "biz", "2025-02-10": "tug", "2025-02-11": "bap", "2025-02-12": "mol", "2025-02-13": "wit", "2025-02-14": "kay", "2025-02-15": "ait", "2025-02-16": "dew", "2025-02-17": "its", "2025-02-18": "had", "2025-02-19": "gar", "2025-02-20": "bag", "2025-02-21": "fan", "2025-02-22": "tam", "2025-02-23": "les", "2025-02-24": "low", "2025-02-25": "fon", "2025-02-26": "mug", "2025-02-27": "yea", "2025-02-28": "pas", "2025-03-01": "zas", "2025-03-02": "bog", "2025-03-03": "dog", "2025-03-04": "err", "2025-03-05": "eng", "2025-03-06": "ole", "2025-03-07": "wad", "2025-03-08": "age", "2025-03-09": "sun", "2025-03-10": "peg", "2025-03-11": "mew", "2025-03-12": "bun", "2025-03-13": "psi", "2025-03-14": "goo", "2025-03-15": "old", "2025-03-16": "gob", "2025-03-17": "gib", "2025-03-18": "ebb", "2025-03-19": "orb", "2025-03-20": "tui", "2025-03-21": "nod", "2025-03-22": "can", "2025-03-23": "rec", "2025-03-24": "pud", "2025-03-25": "rig", "2025-03-26": "now", "2025-03-27": "nee", "2025-03-28": "gam", "2025-03-29": "pya", "2025-03-30": "awl", "2025-03-31": "toy", "2025-04-01": "pee", "2025-04-02": "biz", "2025-04-03": "wed", "2025-04-04": "rat", "2025-04-05": "eng", "2025-04-06": "eel", "2025-04-07": "ref", "2025-04-08": "sop", "2025-04-09": "hey", "2025-04-10": "ego", "2025-04-11": "how", "2025-04-12": "mew", "2025-04-13": "kir", "2025-04-14": "arc", "2025-04-15": "wye", "2025-04-16": "vug", "2025-04-17": "teg", "2025-04-18": "dub", "2025-04-19": "yea", "2025-04-20": "ere", "2025-04-21": "box", "2025-04-22": "are", "2025-04-23": "var", "2025-04-24": "ifs", "2025-04-25": "fil", "2025-04-26": "pad", "2025-04-27": "ope", "2025-04-28": "fro", "2025-04-29": "fon", "2025-04-30": "orb", "2025-05-01": "haj", "2025-05-02": "emu", "2025-05-03": "hug", "2025-05-04": "mob", "2025-05-05": "urn", "2025-05-06": "tap", "2025-05-07": "aha", "2025-05-08": "die", "2025-05-09": "ode", "2025-05-10": "lar", "2025-05-11": "nag", "2025-05-12": "sow", "2025-05-13": "dew", "2025-05-14": "tun", "2025-05-15": "fig", "2025-05-16": "tat", "2025-05-17": "sir", "2025-05-18": "rip", "2025-05-19": "sou", "2025-05-20": "dog", "2025-05-21": "roc", "2025-05-22": "spy", "2025-05-23": "lab", "2025-05-24": "teg", "2025-05-25": "bas", "2025-05-26": "tux", "2025-05-27": "poo", "2025-05-28": "wax", "2025-05-29": "pow", "2025-05-30": "wag", "2025-05-31": "pec", "2025-06-01": "kin", "2025-06-02": "pig", "2025-06-03": "oat", "2025-06-04": "gas", "2025-06-05": "gut", "2025-06-06": "tui", "2025-06-07": "see", "2025-06-08": "eft", "2025-06-09": "fid", "2025-06-10": "meg", "2025-06-11": "den", "2025-06-12": "nun", "2025-06-13": "pud", "2025-06-14": "jaw", "2025-06-15": "cod", "2025-06-16": "tun", "2025-06-17": "tic", "2025-06-18": "did", "2025-06-19": "sew", "2025-06-20": "noh", "2025-06-21": "tis", "2025-06-22": "dif", "2025-06-23": "bed", "2025-06-24": "mix", "2025-06-25": "tax", "2025-06-26": "cig", "2025-06-27": "nth", "2025-06-28": "bit", "2025-06-29": "buy", "2025-06-30": "sox", "2025-07-01": "due", "2025-07-02": "may", "2025-07-03": "shy", "2025-07-04": "kid", "2025-07-05": "toe", "2025-07-06": "ego", "2025-07-07": "hun", "2025-07-08": "mot", "2025-07-09": "ora", "2025-07-10": "jet", "2025-07-11": "rah", "2025-07-12": "fon", "2025-07-13": "maw", "2025-07-14": "het", "2025-07-15": "law", "2025-07-16": "pah", "2025-07-17": "vis", "2025-07-18": "rat", "2025-07-19": "edh", "2025-07-20": "bow", "2025-07-21": "pet", "2025-07-22": "poi", "2025-07-23": "hie", "2025-07-24": "roe", "2025-07-25": "keg", "2025-07-26": "mos", "2025-07-27": "may", "2025-07-28": "hip", "2025-07-29": "sow", "2025-07-30": "lay", "2025-07-31": "pat", "2025-08-01": "has", "2025-08-02": "run", "2025-08-03": "gib", "2025-08-04": "haw", "2025-08-05": "vex", "2025-08-06": "deb", "2025-08-07": "bum", "2025-08-08": "cig", "2025-08-09": "eau", "2025-08-10": "qat", "2025-08-11": "gig", "2025-08-12": "cig", "2025-08-13": "lei", "2025-08-14": "hin", "2025-08-15": "rah", "2025-08-16": "lei", "2025-08-17": "pah", "2025-08-18": "pol", "2025-08-19": "ago", "2025-08-20": "fix", "2025-08-21": "pow", "2025-08-22": "rid", "2025-08-23": "reg", "2025-08-24": "yod", "2025-08-25": "yow", "2025-08-26": "fob", "2025-08-27": "pie", "2025-08-28": "one", "2025-08-29": "pal", "2025-08-30": "oes", "2025-08-31": "woo", "2025-09-01": "leg", "2025-09-02": "try", "2025-09-03": "hun", "2025-09-04": "rug", "2025-09-05": "art", "2025-09-06": "suq", "2025-09-07": "wag", "2025-09-08": "met", "2025-09-09": "ray", "2025-09-10": "lid", "2025-09-11": "bay", "2025-09-12": "hen", "2025-09-13": "hie", "2025-09-14": "ice", "2025-09-15": "wot", "2025-09-16": "dak", "2025-09-17": "run", "2025-09-18": "bow", "2025-09-19": "ais", "2025-09-20": "tel", "2025-09-21": "ore", "2025-09-22": "lea", "2025-09-23": "pul", "2025-09-24": "moa", "2025-09-25": "yeh", "2025-09-26": "tee", "2025-09-27": "tad", "2025-09-28": "qat", "2025-09-29": "fee", "2025-09-30": "cry", "2025-10-01": "ugh", "2025-10-02": "tug", "2025-10-03": "pup", "2025-10-04": "dud", "2025-10-05": "rev", "2025-10-06": "lox", "2025-10-07": "mag", "2025-10-08": "feu", "2025-10-09": "phi", "2025-10-10": "the", "2025-10-11": "chi", "2025-10-12": "phi", "2025-10-13": "tub", "2025-10-14": "pad", "2025-10-15": "bop", "2025-10-16": "ire", "2025-10-17": "fun", "2025-10-18": "mop", "2025-10-19": "aye", "2025-10-20": "vie", "2025-10-21": "nix", "2025-10-22": "ace", "2025-10-23": "dee", "2025-10-24": "vee", "2025-10-25": "ere", "2025-10-26": "woe", "2025-10-27": "air", "2025-10-28": "leg", "2025-10-29": "dal", "2025-10-30": "hey", "2025-10-31": "nab", "2025-11-01": "ens", "2025-11-02": "cop", "2025-11-03": "fin", "2025-11-04": "gas", "2025-11-05": "owl", "2025-11-06": "teg", "2025-11-07": "rom", "2025-11-08": "sir"};

        // Initialize game
        this.init();
    }

    async init() {
        try {
            const date = new Date();
// Format the date by extracting the date part of the ISO string
            const formattedDate = date.toISOString().split('T')[0];
            this.targetWord = this.words[formattedDate].toUpperCase();
      
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
        let isValid = false;
        // Validate word exists
if(currentWord != this.targetWord){
         isValid = await this.validateWord(currentWord);
        if (!isValid) {
            this.showMessage('Not a valid word!');
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
            }
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
