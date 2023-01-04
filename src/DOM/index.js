import { getWeather} from "../logic/apiHandler";
import './style.css'

const submit = document.getElementById('submit');
const search = document.querySelector('input')
const form = document.querySelector('form')
const location = document.getElementById('location');
const tempText = document.getElementById('tempText')
const img = document.querySelector('img');
const swtch = document.getElementById('switch');
let temp = {true: null, false: null};
let isCelsius = true;
async function presentWeather(e = null)
{
    if(e)
        e.preventDefault()
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
function calcTemp(num)
{
    temp.true = ~~(num - 273.15) + '℃';
    temp.false = ~~((num - 273.15)*1.8)+32 + '℉';
    console.log(temp)
}
form.addEventListener('submit', presentWeather);

form.addEventListener('focusin', ()=>form.classList.add('scale'))
form.addEventListener('focusout', ()=>form.classList.remove('scale'));
swtch.addEventListener('change', ()=>{
    isCelsius = !swtch.checked;
    tempText.textContent = temp[isCelsius];
});

presentWeather();
