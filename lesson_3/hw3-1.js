import rls from 'readline-sync'; //npm install readline-sync
let n = parseInt(rls.question('Введите любое целое положительное число (в пределах разумного), для которого будут найдены все простые числа меньше его (например: 100)\n>'));
let ps = getPrimesUp2(n)
console.log(`Список простых чисел до ${n} включительно:\n${ps}`)

function getPrimesUp2(n){
    let sieve = new Array(n+1).fill(true);
    for (let x=2; x*x <= n; ++x)
        if (sieve[x])
            for (let y = x*x; y <= n; y += x) sieve[y] = false;
    let primes = [];
    sieve.forEach((elm, key) => { if (key > 1 && elm) primes.push(key) })
    return primes;
}