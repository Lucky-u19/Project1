
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
 
const ADJECTIVES_MAP = ["Красивых", "Заботливых", "Привлекательных", "Класных", "Романтичных", "Весёлых", "Креативных", "Злобных", "Любвиабильных", "Умных"];
 
const NOUNS_MAP = ["Врача", "Садовника", "Тракториста", "Футболиста", "Продавца", "Крота", "Кота", "Рыб", "Собак", "Палачей"];
 
const VERBS_MAP = ["Боксируют", "Учат", "Инвестируют", "Изучают", "Поучают", "Смотрят", "Рубят", "Крадут", "Кладут", "Пугают"];
 
const THINGS_MAP = ["Грушу", "Телевизор", "Деньги", "Цветы", "Деревья", "Камни", "Еду", "Попкорн", "Потолок", "Птиц"];
 
const SYMBOLS_MAP = ["!", "@", "#", "$", "%"];
 
// Object word
 
const rusEng = {
    "а": "f", "б": ",", "Б": "<", "в": "d", "д": "l", "г": "u", "е": "t", "Ж": ":", "ж": ";", "з": "p",
    "и": "b", "й": "q", "к": "r", "л": "k", "м": "v", "н": "y", "о": "j", "п": "g", "р": "h", "с": "c", "т": "n",
    "у": "e", "ф": "a", "Х": "{", "х": "[", "ц": "w", "ч": "x", "ш": "i", "щ": "o", "Ъ": "}", "ъ": "]", "ы": "s",
    "ь": "m", "э": '"', "Ю": ">", "ю": ".", "я": "z",
};
 
//Random functions
 
function getRandomNumber() {
    return Math.floor(Math.random() * (99 - 10 + 1)) + 10;
};
 
function getRandomIndexForMap(array) {
    return array[Math.floor(Math.random() * array.length)];
}
 
function getRandomAdjective() {
    return getRandomIndexForMap(ADJECTIVES_MAP);
};
function getRandomNoun() {
    return getRandomIndexForMap(NOUNS_MAP);
};
function getRandomVerb() {
    return getRandomIndexForMap(VERBS_MAP);
};
function getRandomThing() {
    return getRandomIndexForMap(THINGS_MAP);
};
function getRandomSymbol() {
    return getRandomIndexForMap(SYMBOLS_MAP);
};
 
//Loweccase
 
function getLowerCase() {
    return [...arguments].join(" ").toLowerCase();
};
 
//Uppercase
 
function getUpperCase() {
    return [...arguments].join(" ").toUpperCase();
};
 
//check on checkbox Upper or Lower
 
function disabledOnlyCheckbox() {
    let totalChecked = [uppercaseEl, lowercaseEl].filter(el => el.checked);
    totalChecked.forEach(el => el.disabled = totalChecked.length === 1);
};
 
[uppercaseEl, lowercaseEl].forEach(el => {
    el.addEventListener("click", () => {
        disabledOnlyCheckbox();
    });
});
 
//check Symbol
const checkSymbol = () => symbolEl.checked ? ` ${getRandomSymbol()}` : ' ';
 
//check Number
const checkNumber = () => numberEl.checked ? ` ${getRandomNumber()} ` : ' ';
 
const cutPhraseLength = phrase => phrase.split(' ').map(string => `${string.slice(0, 3)} `).join(' ');
// TODO: вывод для фразы без пробелов по 3 символа в подстроке
const checkSpace = resultPhrase => spaceEl.checked ? cutPhraseLength(resultPhrase) : cutPhraseLength(resultPhrase).replaceAll(' ', '');
// check Language
 
 
const checkLanguage = resultPass => resultPass.split('').reduce((acc, item, i) => {
    acc[i] = rusEng[resultPass[i]] || rusEng[resultPass[i].toLowerCase()]?.toUpperCase() || resultPass[i];
    return acc;
}, []).join('');
 
const appendAndConcatePassPhrase = (phrase) => {
    const number = checkNumber();
    const symbol = checkSymbol();
 
    const resultPhrase = `${number}${phrase}${symbol}`;
    const resultPass = checkSpace(resultPhrase);
    phraseText.innerText = resultPhrase;
    passwordText.innerText = engEl.checked ? checkLanguage(resultPass) : resultPass;
}
 
const generatePassword = () => {
    const resultAdjective = getRandomAdjective();
    const resultNoun = getRandomNoun();
    const resultVerb = getRandomVerb();
    const resultThing = getRandomThing();
 
    const lowerCaseCheckedAndUpperCaseNotChecked = lowercaseEl.checked && !uppercaseEl.checked;
    const upperCaseCheckedAndLowerCaseNotChecked = uppercaseEl.checked && !lowercaseEl.checked;
    const lowerCaseCheckedAndUpperCaseChecked = lowercaseEl.checked && uppercaseEl.checked;
 
    switch (true) {
        case lowerCaseCheckedAndUpperCaseNotChecked:
            appendAndConcatePassPhrase(getLowerCase(resultAdjective, resultNoun, resultVerb, resultThing))
            break;
        case upperCaseCheckedAndLowerCaseNotChecked:
            appendAndConcatePassPhrase(getUpperCase(resultAdjective, resultNoun, resultVerb, resultThing))
            break;
        case lowerCaseCheckedAndUpperCaseChecked:
            const phrase = getLowerCase(resultAdjective, resultNoun, resultVerb, resultThing)
                .split(" ")
                .map(item => {
                    return item[0].toUpperCase() + item.slice(1);
                })
                .join(" ") 
 
            appendAndConcatePassPhrase(phrase);
            break;
    }
}
 
const setToDefault = () => {
    lowercaseEl.checked = true;
    uppercaseEl.checked = true;
    numberEl.checked = true;
    spaceEl.checked = true;
    symbolEl.checked = true;
    engEl.checked = true;
    phraseText.innerText = '';
    passwordText.innerText = '';
}
 
// add Event on button
 
generateBtn.addEventListener("click", generatePassword);
restartBtn.addEventListener("click", setToDefault);




