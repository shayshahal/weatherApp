import { getWeather} from "../logic/apiHandler";
import './style.css'

const search = document.getElementById('search')
const form = document.querySelector('form')
const location = document.getElementById('location');
const tempText = document.getElementById('tempText')
const img = document.querySelector('img');
const swtch = document.getElementById('switch');
let temp = {true: null, false: null};
let isCelsius = true;
async function presentWeather(e = null)
{
    try
    {
        const res = await getWeather(search.value);
        if(res.cod === '404')
            throw res.message;
        location.textContent = res.sys.country + ', ' + res.name;
        calcTemp(res.main.temp);
        tempText.textContent = temp[isCelsius];
        img.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
    }
    catch(error)
    {
        tempText.textContent = '';
        location.textContent = error;
        img.src = ''
    }
}
function debounce(fnc, delay = 1500)
{
    return (...args)=> setTimeout(()=> fnc(...args), delay);
}
function calcTemp(num)
{
    temp.true = ~~(num - 273.15) + '℃';
    temp.false = ~~((num - 273.15)*1.8)+32 + '℉';
}
search.oninput = debounce(presentWeather);

swtch.addEventListener('change', ()=>{
    isCelsius = !swtch.checked;
    tempText.textContent = temp[isCelsius];
});
document.addEventListener('keydown',(e) =>
{
    if(e.key === 'Tab')
        search.focus();
    else if(e.key ==='Escape')
        search.blur();
})
presentWeather();