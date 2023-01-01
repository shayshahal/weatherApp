import './style.css'
import {getCitySuggestions, getVisitorLocation, getWeather} from '../logic/apiHandler.js'

const search = document.querySelector('input');
const suggest = document.getElementById('suggest');
const content = document.getElementById('content');
let fahrenheit = false;

search.addEventListener('change',()=>
{
    while (suggest.firstChild) {
        suggest.removeChild(suggest.firstChild);
    }
    suggest.textContent = '';

    try
    {
        getCitySuggestions(search.value).then((countries)=> 
        {
            if(countries.length === 0)
                throw new Error('Could not find country');
            for(const c of countries)
            {
                const span = document.createElement('span');
                span.textContent = c.name.common;
                span.addEventListener('click', (e)=> 
                {
                    search.value = e.target.textContent;
                })
                suggest.appendChild(span);
            }
        })
    }
    catch
    {
        suggest.textContent = error;
    }
} )

function presentUserWeather()
{
    try 
    {
        getVisitorLocation().catch((error) => {throw new Error(error)})
        .then((data)=>
        {
            getWeather(data.latitude, data.longitude).catch((error) => {throw new Error(error)})
                .then((weather)=> {
                    const temper = ~~weather.main.temp-273;
                    if(fahrenheit)
                        temper = ~~(temper*1.8)+32
                    content.textContent = `${data.country}, ${data.city}, ${temper}`
            })
        })
    }
    catch
    {
        content.textContent = error;
    }
}
//presentUserWeather()