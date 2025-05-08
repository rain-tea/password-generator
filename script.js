
const generateBtn = document.getElementById("generate-password");
const passwordDisplay = document.getElementById("password-display");
const hasUppercaseInput = document.getElementById("has-uppercase");
const hasNumbersInput = document.getElementById("has-numbers");
const hasSpecialCharsInput = document.getElementById("has-special-chars");
const passLengthInput = document.getElementById("password-length");
const complexityInput = document.getElementById("complexity");

const isValidLen = input => {
    const cleanInput = parseInt(input);
    if (!cleanInput || cleanInput < 8) {
        return false
    } else {
        return true
    }
}

const getInput = () => {
    const inputData = {
        hasUppercase: hasUppercaseInput.checked,
        hasNumbers: hasNumbersInput.checked,
        hasSpecialChars: hasSpecialCharsInput.checked,
        passwordLength: passLengthInput.value,
        complexity: complexityInput.value.toLowerCase()
    };
    return inputData
}

const getCharWeights = inputData => {
    /* How complexity is determined:
        - different weighting is given to lowercase, uppercase, numbers & special characters
        - weight affects probability of a given character being chosen
        - increasing complexity = more weight given to uppercase/numbers/special chars
    */
    const charsIncluded = [];
    let res = {}
    

    inputData.hasUppercase ? charsIncluded.push("uppercase") : res.uppercase = 0;
    inputData.hasNumbers ? charsIncluded.push("number") : res.number = 0;
    inputData.hasSpecialChars ? charsIncluded.push("special") : res.special = 0;

    if (charsIncluded.length < 1) {
        res.lowercase = 1;
    } else if (inputData.complexity === "simple") {
        res.lowercase = 0.7;
    } else if (inputData.complexity === "complex") {
        res.lowercase = 0.3;
    } else { // balanced
        res.lowercase = 0.5;
    }
    
    for (charset of charsIncluded) {
        res[charset] = Math.floor(((1 - res.lowercase) / charsIncluded.length) * 100) / 100
    }
    return res
}

const generatePassword = (charWeights, inputData) => {
    // assign upper boundaries for probability checks
    const uppercaseProbCheck = charWeights.lowercase;
    const numberProbCheck = uppercaseProbCheck + charWeights.uppercase;
    const specialCharProbCheck = numberProbCheck + charWeights.number;

    const letterSet = "abcdefghijklmnopqrstuvwxyz"
    const numberSet = "0123456789";
    const specialCharSet = "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

    res = ""
    for (let i = 0; i < inputData.passwordLength; i++) {
        if (Math.random() >= specialCharProbCheck && charWeights.special) {
            res += specialCharSet[Math.floor((Math.random() * specialCharSet.length))];
        } else if (Math.random() >= numberProbCheck && charWeights.number) {
            res += numberSet[Math.floor((Math.random() * numberSet.length))];
        } else if (Math.random() >= uppercaseProbCheck && charWeights.uppercase) {
            res += letterSet[Math.floor((Math.random() * letterSet.length))].toUpperCase();
        } else {
            res += letterSet[Math.floor((Math.random() * letterSet.length))];
        }
    }

    return res
}

const handleGeneration = () => {
    if (passLengthInput.value < 4) {
        alert("Please enter a valid password length")
        return
    }
    passwordDisplay.innerHTML = ""
    const inputData = getInput();
    const charWeights = getCharWeights(inputData);
    let generatedPassword = generatePassword(charWeights, inputData);
    passwordDisplay.style.fontSize = `${1.65 - generatedPassword.length * 0.02}rem`;
    passwordDisplay.innerHTML = `<p id="generated-password">${generatedPassword}</p>`;
    passwordDisplay.removeAttribute("hidden");
    return
}

generateBtn.addEventListener("click", handleGeneration);
passwordDisplay.addEventListener("click", () => {
    const copyText = passwordDisplay.innerText;
    navigator.clipboard.writeText(copyText);
    alert(`${copyText} has been copied to clipboard`);
});
