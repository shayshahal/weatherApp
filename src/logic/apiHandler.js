const keys = {
    'weatherApi' : '519901a9b0492b434e86015cdf5f4227',
    'abstractapi': '1b07984699ad4daba476457930a2222f',
    'X-RapidAPI-Key': 'b40340b672msh04e2a94b030e6fep10b861jsn9222dd58e2f3'
};
export async function getWeather(lat, lon)
{
    if(!lat && !lon)
    {
        const location = await getVisitorLocation();
        lat = location.latitude;
        lon = location.longitude;
    }
    console.log(lat, lon)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}&appid=${keys['weatherApi']}`);
    const data = await response.json();
    console.log(data)
    return data;
}
export async function getVisitorLocation()
{
    const response = await fetch(`https://ipgeolocation.abstractapi.com/v1/?api_key=${keys['abstractapi']}`);
    const data = await response.json();
    console.log(data)
    return data;
}
export async function getCities(input, country)
{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': keys['X-RapidAPI-Key'],
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };
    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=5&countryIds=${country}&namePrefix=${input}`, options);
    const data = await response.json();
    console.log(data)
    return data.data;
}
export async function getCountries(input)
{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': keys['X-RapidAPI-Key'],
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    };
    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=5&namePrefix=${input}`, options);
    const data = await response.json();
    console.log(data)
    return data.data;
}