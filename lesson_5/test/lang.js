const all_langs = ['ru', 'en'];
const lang_arrs = [];
let lang = all_langs[0];

const select_lang = document.querySelector('#lang');
if (select_lang){
    let hash = window.location.hash;
    console.log(hash);
    hash = hash.substr(1);

    if (!all_langs.includes(hash)) {
        location.href = window.location.pathname + '#en';
        location.reload();
    }
    select_lang.value = hash;

    let lang = hash;
    console.log('lang: ', lang);
    
    select_lang.addEventListener('change', changeURLLanguage);
    
    function changeURLLanguage(event) {
        console.log("change -> ", event);
        if (select_lang.value != lang){
            let lang = select_lang.value;
            location.href = window.location.pathname + '#' + lang;
            location.reload();   
        }
    }
    
    function changeLanguage() {
        for (let key in lang_arrs) {
            let elem = document.querySelector('.lang-' + key);
            if (elem) {
                elem.innerHTML = lang_arrs[key][lang];
            }
        }
        const style = document.createElement("style");
        style.innerHTML = `${lang},.${lang}{display:block;}`;
        document.head.appendChild(style);     
    }
    
    changeLanguage();
    
    
}