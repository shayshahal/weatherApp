/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/logic/apiHandler.js
const keys = {
    'weatherApi' : '519901a9b0492b434e86015cdf5f4227',
    'abstractApi': '1b07984699ad4daba476457930a2222f',
};
async function getWeather(input)
{
    if(!input)
        input = await getVisitorLocation();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${keys['weatherApi']}`);
    const data = await response.json();
    return data;
}
async function getVisitorLocation()
{
    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${keys['abstractApi']}`);
    const data = await response.json();
    return data.country;
}

;// CONCATENATED MODULE: ./src/DOM/assets/spinner.svg
const spinner_namespaceObject = __webpack_require__.p + "2e7c6ddb7668ded09c2b.svg";
;// CONCATENATED MODULE: ./src/DOM/index.js




const search = document.getElementById('search')
const DOM_location = document.getElementById('location');
const tempText = document.getElementById('tempText')
const img = document.querySelector('img');
const swtch = document.getElementById('switch');
let temp = {true: null, false: null, isCelsius: true};


async function presentWeather()
{
    try
    {
        const res = await getWeather(search.value);
        if(res.cod === '404')
            throw res.message;
        DOM_location.textContent = res.sys.country + ', ' + res.name;
        calcTemp(res.main.temp);
        tempText.textContent = temp[temp.isCelsius];
        img.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
    }
    catch(error)
    {
        tempText.textContent = '';
        DOM_location.textContent = error;
        img.src = ''
    }
}
function debounce(fnc, delay = 1000)
{ 
    let timeout;
    return (...args)=> {
        clearTimeout(timeout);
        DOM_location.textContent = 'Looking...';
        tempText.textContent = '';
        if(img.src !== spinner_namespaceObject)
            img.src = spinner_namespaceObject;
        timeout = setTimeout(()=> {fnc(...args)}, delay)
    };
}
function calcTemp(num)
{
    temp.true = ~~(num - 273.15) + '℃';
    temp.false = ~~((num - 273.15)*1.8)+32 + '℉';
}

search.addEventListener('input',debounce(presentWeather));

swtch.addEventListener('change', ()=>tempText.textContent = temp[temp.isCelsius = !swtch.checked]);
document.addEventListener('keydown',(e) =>
{
    if(e.key ==='Escape' || e.key === 'Enter')
        search.blur();
})
presentWeather();
/******/ })()
;
//# sourceMappingURL=main.134cd8b91c0cfbebdc53.js.map