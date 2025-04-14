fetch("list.txt")
    .then(response => response.text())
    .then(data => {
        var wordlist = data.trim().split("\n");
        var randomIndex = Math.floor(Math.random() * wordlist.length);
        const wordToGuess = wordlist[randomIndex].trim();

        // alert(wordToGuess)

        var wordLength = wordToGuess.length;
        var hiddenWordArray = Array(wordLength).fill("_");
        var hiddenWord = hiddenWordArray.join(" ");
        var mistakes = 0;

        document.getElementById("word").innerText = hiddenWord;

        var guesInput = document.getElementById("guesse");
        var submitButton = document.getElementById("submit");
        var result = document.getElementById("result");
        var link = document.getElementById("link");

        var hangmanParts = [
            document.getElementById("head"),
            document.getElementById("body"),
            document.getElementById("left-arm"),
            document.getElementById("right-arm"),
            document.getElementById("left-leg"),
            document.getElementById("right-leg")
        ];

        submitButton.onclick = function () {
            var guess = guesInput.value.toLowerCase();

            if (guess.length !== 1 || !guess.match(/[a-z]/)) {
                result.innerHTML = "Entrez une seule lettre valide";
                return;
            }

            if (wordToGuess.includes(guess)) {
                for (var i = 0; i < wordLength; i++) {
                    if (wordToGuess[i] === guess) {
                        hiddenWordArray[i] = guess;
                    }
                }
                hiddenWord = hiddenWordArray.join(" ");
                document.getElementById("word").innerText = hiddenWord;

                if (!hiddenWord.includes("_")) { //S’il n’y a pas de _ signifie que l’utilisateur a découvert le mot entier
                    result.innerHTML = "Bravo, tu as trouvé le mot !";
                    guesInput.style.display = "none";
                    submitButton.style.display = "none";
                    link.style.display = "block";
                }
            } else {
                result.innerHTML = "Mauvaise lettre";
                if (mistakes < hangmanParts.length) {
                    hangmanParts[mistakes].classList.remove("hidden");
                    mistakes++;
                }

                if (mistakes >= hangmanParts.length) {
                    result.innerHTML = "Tu as perdu ! Le mot était : " + wordToGuess;
                    guesInput.style.display = "none";
                    submitButton.style.display = "none";
                    link.style.display = "block";
                }
            }

            guesInput.value = "";
        };

        guesInput.onclick = function () {
            result.innerHTML = "";
        };

        link.onclick = function () {
            location.reload();
        };
    })
    
