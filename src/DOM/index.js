import { getCities, getCountries, getWeather } from "../logic/apiHandler";
import './style.css'

const submits = document.querySelectorAll('.submit');
const searches = document.querySelectorAll('input')
const suggests = document.querySelectorAll('.suggest');
const forms = document.querySelectorAll('form')
let country;
let loc = [null,null];
let fahrenheit = false;
searches[0].addEventListener('input', debounce(fetchCountryList,1000));

async function fetchCountryList()
{
    const list = await getCountries(searches[0].value)
    console.log(list)
    clearSuggest(0);
    list.forEach(x=>addSuggestion(0,x.name, x.code));
    if(list.length === 1) country = list[0].code;
}
function debounce(func, waitFor) {
    let timeout;
    return (...args) => new Promise(resolve => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
}
function addSuggestion(i, name, data)
{
    const btn = document.createElement('button');
    console.log(name)
    btn.textContent = name;
    btn.type = 'button';
    suggests[i].appendChild(btn);
    btn.addEventListener('click', (e)=> {
        searches[i].value = e.target.textContent;
        clearSuggest(i)
        if(i === 0)
            country = data;
        else
            loc = data;
    })
}

function clearSuggest(i)
{
    while (suggests[i].firstChild) {
        suggests[i].removeChild(suggests[i].firstChild);
    }
    suggests[i].textContent = '';
}

submits[0].addEventListener('click', initCitySearch)

function initCitySearch()
{
    clearSuggest(0);
    submits[0].disabled = true;
    searches[0].disabled = true;
    forms[1].style.visibility = 'visible';
    searches[1].focus();
    submits[1].addEventListener('click', presentWeather)
}
async function presentWeather()
{
    clearSuggest(1)
    const weather = document.getElementById('weather');
    const res = await getWeather(loc[0], loc[1]);
    let temp = ~~(res.main.temp - 273.15)
    if(fahrenheit)
        temp = ~~(temp*1.8)+32;
    weather.textContent = res.sys.country + "," + res.name +  ","+temp;
}

searches[1].addEventListener('input', debounce(async()=>{
    const list = await getCities(searches[1].value, country); 
    console.log(list)
    clearSuggest(1);
    list.forEach(x=>addSuggestion(1,x.name, [x.latitude, x.longitude]));
    if(list.length === 1) loc = [list[0].latitude,list[0].longitude];
}, 1000));

forms.forEach(f=> f.addEventListener('submit', (e)=>e.preventDefault()));

try{
    presentWeather();
}
catch(error)
{
    console.error(error);
}