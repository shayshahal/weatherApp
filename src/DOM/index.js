import { getWeather} from "../logic/apiHandler";
import './style.css'

const submit = document.querySelector('#submit');
const search = document.querySelector('input')
const suggest = document.querySelector('#suggest');
const form = document.querySelector('form')
let fahrenheit = false;

function addSuggestion(name, data)
{
    const btn = document.createElement('button');
    console.log(name)
    btn.textContent = name;
    btn.type = 'button';
    btn.classList.add('btnsgst');
    suggest.appendChild(btn);
    btn.addEventListener('mousedown', (e)=> {
        search.value = e.target.textContent;
        clearSuggest()
        submit.click();
    })
}

function clearSuggest()
{
    while (suggest.firstChild) {
        suggest.removeChild(suggest.firstChild);
    }
    suggest.textContent = '';
}
submit.addEventListener('click', presentWeather)
async function presentWeather()
{
    clearSuggest()
    const countryText = document.getElementById('countryText');
    const cityText = document.getElementById('cityText');
    const weather = document.getElementById('temp')
    try{
        const res = await getWeather(search.value);
        let temp = ~~(res.main.temp - 273.15) + '℃';
        if(fahrenheit)
            temp = ~~(temp*1.8)+32 + '℉';
        countryText.textContent = res.sys.country;
        cityText.textContent = res.name;
        weather.textContent = temp;
        const img = document.querySelector('img');
        img.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`
    }
    catch
    {
        weather.textContent='';
        cityText.textContent = ''
        countryText.textContent = 'Couldn\'t get weather';
    }
}

form.addEventListener('submit', (e)=>e.preventDefault());

form.addEventListener('focusin', ()=>
{
    form.classList.add('scale')
})
form.addEventListener('focusout', ()=>{
    clearSuggest();
    form.classList.remove('scale');
    });

const swtch = document.getElementById('switch');
swtch.addEventListener('change', ()=>
{
    fahrenheit = swtch.checked;
});

submit.click();