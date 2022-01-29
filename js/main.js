
// const phrase = document.getElementById("passphrase");
const phraseText = document.getElementById("passphrase-text");
const passwordText = document.getElementById("password-text");

// fix button

const generateBtn = document.getElementById("generate");
const restartBtn = document.getElementById("restart");

//fix parameters

const numberEl = document.getElementById("number");
const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const symbolEl = document.getElementById("symbol");
const spaceEl = document.getElementById("space");
const engEl = document.getElementById("eng");


// array words

const arrayAdjectives = ["Красивых", "Заботливых", "Привлекательных", "Класных","Романтичных", "Весёлых", "Креативных", "Злобных", "Любвиабильных", "Умных"];
const arrayNouns = ["Врача", "Садовника", "Тракториста", "Футболиста", "Продавца", "Крота", "Кота", "Рыб", "Собак", "Палачей"];
const arrayVerbs = ["Боксируют", "Учат", "Инвестируют", "Изучают", "Поучают", "Смотрят", "Рубят", "Крадут", "Кладут", "Пугают"];
const arrayThings = ["Грушу", "Телевизор", "Деньги", "Цветы", "Деревья", "Камни", "Еду", "Попкорн", "Потолок", "Птиц"];
const arraySymbols = ["!", "@", "#", "$", "%"];

// Object word

const rusEng = {
    "а": "f", "б": ",", "Б": "&#60", "в": "d", "д": "l", "г": "u", "е": "t", "Ж": ":", "ж": ";", "з": "p",
    "и": "b", "й": "q", "к": "r", "л": "k", "м": "v", "н": "y", "о": "j", "п": "g", "р": "h", "с": "c", "т": "n",
    "у": "e", "ф": "a", "Х": "{", "х": "[", "ц": "w", "ч": "x", "ш": "i", "щ": "o", "Ъ": "}", "ъ": "]", "ы": "s",
    "ь": "m", "э": '&#34', "Ю": "&#62", "ю": ".", "я": "z",
};

//Random functions

function getRandomNumber() {
    return Math.floor(Math.random() * (99 - 10 + 1)) + 10;
};
function getRandomAdjective() {
    return arrayAdjectives[Math.floor(Math.random() * arrayAdjectives.length)];
};
function getRandomNoun() {
    return arrayNouns[Math.floor(Math.random() * arrayNouns.length)];
};
function getRandomVerb() {
    return arrayVerbs[Math.floor(Math.random() * arrayVerbs.length)];
};
function getRandomThing() {
    return arrayThings[Math.floor(Math.random() * arrayThings.length)];
};
function getRandomSymbol() {
    return arraySymbols[Math.floor(Math.random() * arraySymbols.length)];
};

//Loweccase

function getLowerCase(resultAdjective, resultNoun, resultVerb, resultThing) {
    return [resultAdjective, resultNoun, resultVerb, resultThing].join(" ").toLowerCase();
};

//Uppercase

function getUpperCase(resultAdjective, resultNoun, resultVerb, resultThing) {
    return [resultAdjective, resultNoun, resultVerb, resultThing].join(" ").toUpperCase();
}

//check on checkbox Upper or Lower

function disabledOnlyCheckbox() {
    let totalChecked = [uppercaseEl, lowercaseEl].filter(el => el.checked)
    totalChecked.forEach(el => {
        if (totalChecked.length == 1) {
            el.disabled = true;
        }else{
            el.disabled = false;
        };
    });
};

[uppercaseEl, lowercaseEl].forEach(el => {
    el.addEventListener("click", () => {
        disabledOnlyCheckbox();
    });
});

//check Symbol

let checkSymbol = function() {
    let strSymbol = " ";
    if (symbolEl.checked) {
        return strSymbol + getRandomSymbol();
    } else {
        return strSymbol;
    }
};

//check Number

let checkNumber = function() {
    let strNumber = " ";
    if (numberEl.checked) {
        return getRandomNumber() + strNumber ;
    } else {
        return strNumber;
    }
};

// check Space

let checkSpace  = function(resultPhrase) {
    let resultCheckSpace = spaceEl.checked ? resultPhrase.split(" ").map(element => {
        return element.slice(0, 3);
    }).join(" ") : resultPhrase.split(" ").map(element => {
        return element.slice(0, 3);
    }).join("");
    return resultCheckSpace;
};

// check Language

let checkLanguage = function(resultPass) {
    let arrayEng = [];
    for (let i = 0; i < resultPass.length; ++i) {
        arrayEng.push(
            rusEng[ resultPass[i] ]
            || rusEng [ resultPass[i].toLowerCase() ] === undefined && resultPass[i]
            || rusEng [ resultPass[i].toLowerCase() ].toUpperCase()
        );
    };
    return arrayEng.join("");
};

// add Event on button

generateBtn.addEventListener("click", () => {
    let resultAdjective = getRandomAdjective();
    let resultNoun = getRandomNoun();
    let resultVerb = getRandomVerb();
    let resultThing = getRandomThing();
    let resultPhrase;
    let resultPass;
  
    if (lowercaseEl.checked && !uppercaseEl.checked) {
        resultPhrase = checkNumber() + getLowerCase(resultAdjective, resultNoun,resultVerb, resultThing) + checkSymbol(); 
        resultPass = checkSpace(resultPhrase);
        phraseText.innerText = resultPhrase;
        if (engEl.checked) {
            passwordText.innerHTML = checkLanguage(resultPass)
        } else {
            passwordText.innerText = resultPass;
        }
    } else if (uppercaseEl.checked && !lowercaseEl.checked) {
        resultPhrase =  checkNumber() + getUpperCase(resultAdjective, resultNoun,resultVerb, resultThing) + checkSymbol();
        resultPass = checkSpace(resultPhrase);
        phraseText.innerText = resultPhrase;
        if (engEl.checked) {
            passwordText.innerHTML = checkLanguage(resultPass)
        } else {
            passwordText.innerText = resultPass;
        }; 
    } else if (lowercaseEl.checked && uppercaseEl.checked) {
        resultPhrase = checkNumber() + getLowerCase(resultAdjective, resultNoun,resultVerb, resultThing).split(" ").map(item => {
            return item[0].toUpperCase() + item.slice(1);
        }).join(" ") + checkSymbol();
        resultPass = checkSpace(resultPhrase);
        phraseText.innerText = resultPhrase;
        if (engEl.checked) {
            passwordText.innerHTML = checkLanguage(resultPass);
        } else {
            passwordText.innerText = resultPass;
        }
    };
});

restartBtn.addEventListener("click", () => {
    resultPhrase = "";
    resultPass = "";
    lowercaseEl.checked = true;
    uppercaseEl.checked = true;
    numberEl.checked = true;
    spaceEl.checked = true;
    symbolEl.checked = true;
    engEl.checked = true;
    phraseText.innerText = resultPhrase;
    passwordText.innerText = resultPass;
});




