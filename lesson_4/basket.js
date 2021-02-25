//https://webdevkin.ru/posts/frontend/korzina-dlya-internet-magazina-na-fronte-ili-pishem-modulnyij-javascript

//https://learn.javascript.ru/localstorage
import pkg_ls from 'node-localstorage';

const { LocalStorage } = pkg_ls;

let user = process.env.USER || "";
var localStorage = new LocalStorage(`/tmp/node-${user}-localStorage`);

//localStorage.setItem('test', 1);
//console.log(localStorage.getItem('test'));

for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key(i);
    console.log(`${key}: ${localStorage.getItem(key)}`);
}

const Lang = (function(){
    var obj = {};
    obj.RU = 0;
    obj.EN = 1;
    obj.FR = 2;
    obj.default = obj.RU;
    obj.ALL = [obj.RU, obj.EN, obj.FR];
    return obj;
})();

const Currency = (function(){
    var obj = {};
    obj.RUB = '₽';
    obj.USD = '$';
    obj.EUR = '€';
    obj.default = obj.RUB;
    return obj;
})();

function getExchangeRate(curr = Currency.default){
    if ( typeof getExchangeRate._exchange == 'undefined' )
        getExchangeRate._exchange = new Map([['₽', 1], ['$', 70], ['€', 80]]); //_exchange is static variable here 
    return getExchangeRate._exchange.get(curr);
};

const getItems = (lang = Lang.default, curr = Currency.default) => {

    const _units = new Map([[1, ['кг', 'kg', 'kg']], 
                            [2, ['шт', 'pcs', 'pcs']], 
                            [3, ['уп', 'pkg', 'pkg']], 
                            [4, ['л', 'L', 'L']]]);
    _units.getValue = key => _units.get(key)[lang];

    const _items = [['1001', ['Яблоко', 'Apple', 'La Pomme'], 95, 1], 
                    ['956', ['Тыква', 'Pumpkin', 'La Courge'], 88, 2 ], 
                    ['745', ['Морковь', 'Carrot', 'La Carotte'], 25, 3]]
    _items.fields = [{name:'id', type:'string'}, 
                    {name:'name', type:'lang'},
                    {name:'price', type:'curr', curr:Currency.default},
                    {name:'unit', type:'ref', ref:_units.getValue}]

    return Object.freeze(_items.reduce((arr, elm)=> {
                                arr.push(elm.map((value, index)=>{
                                    let field = _items.fields[index];
                                    switch (field.type) {
                                        case 'lang':
                                            return value[lang];
                                        case 'curr':
                                            return (field.curr == curr ? value : (value / getExchangeRate(curr))).toFixed(2);
                                        case 'ref':
                                            return field.ref(value);
                                        default:
                                            return value;
                                    }                                            
                                }
                            )); return arr;}, [])
                        )
}

function cachingDecorator(func) {
    let cache = new Map();


    
    return function() {
      let key = `${func.name}#${[].join.call(arguments)}`;
      if (cache.has(key)) {
        console.log('from cache')
        return cache.get(key);
      } 
      let result = func.call(this, ...arguments);  
      cache.set(key, result);
      return result;
    };
}

const getCachedItems = cachingDecorator(getItems);

console.log(getCachedItems(Lang.RU, Currency.RUB));
console.log(getCachedItems(Lang.RU, Currency.RUB));
console.log(getCachedItems(Lang.EN, Currency.USD));
console.log(getCachedItems(Lang.EN, Currency.USD));
console.log(getCachedItems(Lang.FR, Currency.EUR));
console.log(getCachedItems(Lang.FR, Currency.EUR));

// setItem: (key, value) ->
// newValue = JSON.stringify(value)
// super(key, newValue)

// getItem: (key) ->
// return JSON.parse(super(key))



// let worker = {
//     slow(min, max) {
//       alert(`Called with ${min},${max}`);
//       return min + max;
//     }
//   };
  
//   function cachingDecorator(func, hash) {
//     let cache = new Map();
//     return function() {
//       let key = hash(arguments); // (*)
//       if (cache.has(key)) {
//         return cache.get(key);
//       }
  
//       let result = func.call(this, ...arguments); // func.apply(this, arguments)
  
//       cache.set(key, result);
//       return result;
//     };
//   }
  
//   function hash(args) {
//     return args[0] + ',' + args[1];
//   }
  
//   worker.slow = cachingDecorator(worker.slow, hash);
  
//   alert( worker.slow(3, 5) ); // работает
//   alert( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)





//     const units = new Map([[1, ['кг', 'kg', 'kg']], [2, ['шт', 'pcs', 'pcs']], [3, ['уп', 'pkg', 'pkg']], [4, ['л', 'L', 'L']]])
//     const items = [['1001', ['Яблоко', 'Apple', 'La Pomme'], 95, 1], 
//                    ['956', ['Тыква', 'Pumpkin', 'La Courge'], 88, 2 ], 
//                    ['745', ['Морковь', 'Carrot', 'La Carotte'], 25, 3]]
//     items.field = {id:0, name:1, price:2, unit:3}
//     items.exchange_rates = new Map([['₽', 1], ['$', 70], ['€', 80]])
//     items.getItems = () => {} 


//     rus: 0
//     eng: 1
//     fra: 2

//     items.findItem = (item_id) => { 
//         return items.find(item => item[items.field.id] == item_id) }

//         items.getItemPrice = (item_id) => { 
//         return items.findItem(item_id)[items.field.price] }

//     const basket = [['1001', 2], ['956', 3, 10], ['745', 1, -5]]
//     basket.field = {id:0, amount:1, discount: 2} //percentage discount [-100, 100] (negative means extra charge)

//     basket.countBasketPrice = (items)=>{
//         return basket.reduce((sum, item_box) => {
//             let box_cost = items.getItemPrice(item_box[basket.field.id]) * item_box[basket.field.amount];
//             let discount = item_box[basket.field.discount]; 
//             if (discount) box_cost -= box_cost * ( discount / 100);
//             return sum += box_cost }
//             , 0)
//     }

//     console.log('Ассортимент:\n' + items.join("\n"));
//     console.log('\nКорзинка:\n' + basket.join("\n"));
//     console.log('\nИтого: ' + basket.countBasketPrice(items));


















//sessionStorage.user = JSON.stringify({name: "John"});
// немного позже
//let user = JSON.parse( sessionStorage.user );


// require("os").userInfo().username

// let os = require('os')
// console.log(os.userInfo());


// // 
// let basket = [
//     {id: "1001A1", name: "cart A", desc: "description of card A"}
// ]