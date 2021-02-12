//imports
import rls from 'readline-sync';

// const
const default_max_attemps = 10;
const default_dim = 4;
const splitter = '-';
const default_sequence = `0${splitter}9`;

// settings
let sequence = request(`Задайте интервал символов`, default_sequence, parseSeq,
    val=>typeof val.cbegin == 'string' && val.cbegin.length == 1 && typeof val.cend == 'string' && val.cend.length == 1 && val.cbegin < val.cend);
console.log(`Символы из интервала: ${getArray(sequence)}`)
sequence.from = sequence.cbegin.charCodeAt(0)
sequence.to = sequence.cend.charCodeAt(0)

let dim = request(`Задайте длину последовательности символов`, default_dim, parseInt, val=>val>0);
console.log(`Длина последовательности = ${dim}`);

let max_attemps = request(`Введите максимальное кол-во попыток:`, default_max_attemps, parseInt, val=>val>0);
console.log(`Максимальное кол-во попыток = ${max_attemps}`);

// main loops
let rounds = [];
do{
    let secret  = randomSequence(sequence, dim);
    let attempts = [], guess, score;
    do{
        guess = request(`Попытка ${attempts.length + 1}: `);
        score = getScore(secret, guess);   
        attempts.push([guess, score]);
        console.log(score);
    } while(attempts.length < max_attemps && score.b < secret.length)
    rounds.push([secret, attempts, score.b == secret.length];)
    console.log(`Было загаданно слово: ${secret}`);
    console.log(score.b == secret.length ? 'Победа!' : "Закончились попытки.");
} while (request(`Нажмите 1, чтобы продолжить, иначе выход.`) == "1")
console.log(JSON.stringify(rounds));


//functions
function getScore(secret, guess){
    let b = 0, k = 0;
    for (let i = 0; i < guess.length; ++i)
        if (secret[i] === guess[i]) ++b;
        else if (secret.includes(guess[i])) ++k;
    return {b, k}
}

function randomInteger(min, max) {
    return Math.floor( min + Math.random() * (max + 1 - min) )
}

function randomIntegerExluded(min, max, excluded) {
    do var rnd = randomInteger(min, max); while (excluded.includes(rnd))
    return rnd;
}

function randomSequence(sequence, dim){
    let secret = "";
    for (let i = 0; i < dim; ++i)
        secret += String.fromCharCode(randomIntegerExluded(sequence.from, sequence.to, secret.split("").map(val=>val.charCodeAt(0))));
    return secret;
}

function randomSequence2(sequence, dim){
    let secret = "";
    let from_array = getArray(sequence);
    for (let i = 0; i < dim; ++i){
        secret += from_array[randomInteger(0, from_array.length - 1)];
        from_array = from_array.filter(el => el !== secret[secret.length-1]);
//        from_array.splice(from_array.indexOf(secret[secret.length-1]),1);        
    }
    return secret;
}

function request(prompt_str, default_value, parser, validator){
    let response = rls.question(prompt_str + (default_value ? ` (по умолчанию [${default_value}])` : "") + "\n>");
    response = parser ? parser(response) : response;
    return validator ? (validator(response) ? response: parser(default_value)) : response;
}

function parseSeq(sval){
    let seq = sval.split(splitter);
    return {cbegin: seq[0], cend: seq[1]};
}

function getArray(sequence){
    let a = [];
    for(let i = sequence.from; i <= sequence.to; ++i)
        a.push(String.fromCharCode(i));
    return a;
}


