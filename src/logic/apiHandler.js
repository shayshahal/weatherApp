const keys = {
    'weatherApi' : '519901a9b0492b434e86015cdf5f4227',
    'abstractApi': '1b07984699ad4daba476457930a2222f',
};
export async function getWeather(input)
{
    if(!input)
        input = await getVisitorLocation();
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${keys['weatherApi']}`);
    const data = await response.json();
    return data;
}
export async function getVisitorLocation()
{
    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${keys['abstractApi']}`);
    const data = await response.json();
    return data.country;
}
