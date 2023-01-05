import { getWeather} from "../logic/apiHandler";
import './style.css'
import loader from './assets/spinner.svg'
<<<<<<< HEAD

=======
>>>>>>> eb3a6d08435b497603df55827aa9e1325230362d
const search = document.getElementById('search')
const location = document.getElementById('location');
const tempText = document.getElementById('tempText')
const img = document.querySelector('img');
const swtch = document.getElementById('switch');
let temp = {true: null, false: null, isCelsius: true};
<<<<<<< HEAD

=======
>>>>>>> eb3a6d08435b497603df55827aa9e1325230362d
async function presentWeather()
{
    try
    {
        const res = await getWeather(search.value);
        if(res.cod === '404')
            throw res.message;
        location.textContent = res.sys.country + ', ' + res.name;
        calcTemp(res.main.temp);
        tempText.textContent = temp[temp.isCelsius];
        img.src = `http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png`;
    }
    catch(error)
    {
        tempText.textContent = '';
        location.textContent = error;
        img.src = ''
    }
}
function debounce(fnc, delay = 1000)
{ 
    let timeout;
    return (...args)=> {
        clearTimeout(timeout);
        location.textContent = 'Looking...';
        tempText.textContent = '';
        if(img.src !== loader)
            img.src = loader;
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