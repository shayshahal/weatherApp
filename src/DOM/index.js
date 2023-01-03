import { getCities, getCountries, getWeather, getGiphy} from "../logic/apiHandler";
import './style.css'

const submits = document.querySelectorAll('.submit');
const searches = document.querySelectorAll('input')
const suggests = document.querySelectorAll('.suggest');
const forms = document.querySelectorAll('form')
let loc = {country: '', city:'', cCode:'', lat:null, lon:null};
let fahrenheit = false;
searches[0].addEventListener('input', debounce(fetchCountryList,1000));

async function fetchCountryList()
{
    const list = await getCountries(searches[0].value)
    console.log(list)
    clearSuggest(0);
    list.forEach(x=>addSuggestion(0,x.name, x.code));
    if(list.length === 1) loc['country'] = list[0].code;
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
    btn.addEventListener('mousedown', (e)=> {
        searches[i].value = e.target.textContent;
        clearSuggest(i)
        if(i === 0)
        {
            loc['country'] = name;
            loc['cCode'] = data;
        }
        else
        {
            loc['city'] = name;
            loc['lat'] = data[0];
            loc['lon'] = data[1];
        }
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
    forms[1].style.display = 'flex';
    searches[1].focus();
    submits[1].addEventListener('click', presentWeather)
}
async function presentWeather()
{
    clearSuggest(1)
    const location = document.getElementById('location');
    const weather = document.getElementById('temp')
    const res = await getWeather(loc['lat'], loc['lon']);
    let temp = ~~(res.main.temp - 273.15) + '℃';
    if(fahrenheit)
        temp = ~~(temp*1.8)+32 + '℉';
    location.textContent = (loc['country']||'Your') + ',' + (loc['city']||' Place');
    weather.textContent = temp;
    const img = document.querySelector('img');
    img.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
    const container = document.getElementById('container');
    const gif = await getGiphy(res.weather[0].main);
    container.style.backgroundImage = `url(${gif})`;
}

searches[1].addEventListener('input', debounce(async()=>{
    const list = await getCities(searches[1].value, loc['cCode']); 
    console.log(list)
    clearSuggest(1);
    list.forEach(x=>addSuggestion(1,x.name, [x.latitude, x.longitude]));
    if(list.length === 1) loc = [list[0].latitude,list[0].longitude];
}, 1000));

forms.forEach(f=> f.addEventListener('submit', (e)=>e.preventDefault()));

searches.forEach((f,i)=> f.addEventListener('focusout', ()=>{
    clearSuggest(i);
    }));

try{
    presentWeather();
}
catch(error)
{
    console.error(error);
}