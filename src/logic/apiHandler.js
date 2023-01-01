let keys = {
    'X-RapidAPI-Key': 'b40340b672msh04e2a94b030e6fep10b861jsn9222dd58e2f3',
    'weatherApi' : '519901a9b0492b434e86015cdf5f4227',
    'abstractapi': '1b07984699ad4daba476457930a2222f'
};
let options = {
	method: 'GET',
};
export async function getWeather(lat, lon)
{
    options.headers = keys['weatherApi'];
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${keys['weatherApi']}`);
    const data = await response.json();
    console.log(data)
    return data;
}
export async function getVisitorLocation()
{
    options.headers = keys['abstractapi'];
    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/}`, options);
    const data = await response.json();
    console.log(data)
    return data;
}
export async function getCitySuggestions(input)
{
    const response = await fetch(`https://restcountries.com/v3.1/name/${input}`, options);
    const list = await response.json();
    console.log(list)
    return list;
}