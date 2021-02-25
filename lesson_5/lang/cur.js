const CUR_STORAGE_ID = 'CURRENCY_EXCHANGE_RATE';
const CUR_STORAGE_EXPIRED_IN = 60; //minutes

let cur_info = lscache.get(CUR_STORAGE_ID);
if (!cur_info) {
    getCurrencyDailyJSON()
        .then(json => {
            lscache.set(lscache.set(CUR_STORAGE_ID, json, CUR_STORAGE_EXPIRED_IN));
            cur_info = json;
            outputCurrencyDaily(json);
        })
} else {
    outputCurrencyDaily(cur_info);
}

function getCurrencyDailyInfo(cur_daily) {
    return cur_daily && cur_daily.Valute ? { text: Object.entries(cur_daily.Valute).reduce((acc, cur) => acc + JSON.stringify(cur[1]), "").replaceAll("\"", " "), dt: cur_daily.Date } : {};
}

function outputCurrencyDaily(cur_daily) {
    const cdi = getCurrencyDailyInfo(cur_daily);
    if (cdi) {
        const ilc = document.querySelector("#info-line-currency");
        if (ilc) {
            ilc.innerHTML = cdi.text;
            ilc.parentElement.classList.remove("disp-none");
            const curr_dt = document.querySelector('#cbr-dt');
            if (curr_dt)
                curr_dt.innerHTML = (new Date(cdi.dt)).toLocaleString(lang, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short' });
        }
        if (DEFAULT_CUR != cur) {
            const cr = document.querySelector("#cur-rate");
            if (cr) {
                cr.innerHTML = cur_daily.Valute[cur].Value;
                cr.parentElement.classList.remove("disp-none");
            }
        }
    }
}

function getCurrencyDailyJSON() {
    return fetch("https://www.cbr-xml-daily.ru/daily_json.js", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        .then(response => response.json())
        .catch(console.error);
};

/* async function getCurrencyDaily() {
    const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js", { //http://www.cbr.ru/scripts/XML_daily.asp", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    if (response.ok) {
        let json = await response.json();
        return json;
    } else throw new Error(`${response.status}: ${response.statusText}`);
};

let res = getCurrencyDaily();
console.log(res); */


/*

let response = await fetch("http://cors-anywhere.herokuapp.com/" + url);
            if (response.ok) {
                let json = await response.json();
                return json;
            }
            else throw new Error(`${response.status}: ${response.statusText}`);

async function getCurrencyDaily() {
    const response = await fetch("http://www.cbr.ru/scripts/XML_daily.asp")
    const str = await response.text()
    const data = (new window.DOMParser()).parseFromString(str, "text/xml")
    return console.log(data)
}

return fetch(urlToUser, parameters)
.then(response => {
  return response.text()
})
.then((data) => {
  resolve(data ? JSON.parse(data) : {})
})
.catch((error) => {
  reject(error)
})
*/