const ALL_LANGS = ['ru', 'en'];
const DEFAULT_LANG = ALL_LANGS[0];
const lang_arrs = [];

const ALL_CURS = ['RUB', 'USD', 'EUR'];
const DEFAULT_CUR = ALL_CURS[0];

let hash = window.location.hash;
let [lang, cur] = hash ? hash.substr(1).split('#') : [navigator.language, DEFAULT_CUR];

if (!ALL_LANGS.includes(lang)) {
    location.href = window.location.pathname + '#' + DEFAULT_LANG + '#' + DEFAULT_CUR;
    location.reload();
}

const select_lang = document.querySelector('#sel-lang');
select_lang.value = lang;
select_lang.addEventListener('change', changeURLLanguage);

const select_cur = document.querySelector('#sel-cur');
select_cur.value = cur;
select_cur.addEventListener('change', changeURLCurrency);


function changeURLLanguage(event) {
    let lang = select_lang.value;
    location.href = window.location.pathname + '#' + lang + '#' + cur;
    location.reload();
}

function changeURLCurrency(event) {
    let cur = select_cur.value;
    location.href = window.location.pathname + '#' + lang + '#' + cur;
    location.reload();
}


function changeLanguage() {
    //    document.querySelector('title').innerHTML = langArr['unit'][hash];
    for (let key in lang_arrs) {
        let elem = document.querySelector('.lng-' + key);
        if (elem) {
            elem.innerHTML = lang_arrs[key][lang];
        }
    }
    let style_lang = document.createElement('style');
    style_lang.innerHTML = `${lang},.${lang}{display:inline;}`;
    document.querySelector('head').appendChild(style_lang);
    let curr_dt = document.querySelector('#curr-dt');
    if (curr_dt)
        curr_dt.innerHTML = (new Date()).toLocaleString(lang, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'long' });
}

function changeCurrency() {
    let cur_sm = document.querySelector('#cur-sm');
    if (cur_sm)
        cur_sm.innerHTML = cur;
}

changeLanguage();
changeCurrency();