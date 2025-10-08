const fetchJson = async (url) => {
    const request = await fetch(url);
    return request.json()
}

const getDashboardData = async (query) => {
    const promise1 = fetchJson(`http://localhost:3333/destinations?search=${query}`);
    const promise2 = fetchJson(`http://localhost:3333/weathers?search=${query}`);
    const promise3 = fetchJson(`http://localhost:3333/airports?search=${query}`);

    const results = await Promise.all([promise1, promise2, promise3]);

    console.log(results)

    const city = results[0][0].name;
    const country = results[0][0].country;
    const temperature = results[1][0].temperature;
    const weather = results[1][0].weather_description;
    const airport = results[2][0].name;

    return {
        city,
        country,
        temperature,
        weather,
        airport
    }
}

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        if (data.city && data.country) {
            console.log(`${data.city} is in ${data.country}.`);
        }
        if (data.temperature && data.weather) {
            console.log(`Today there are ${data.temperature} degrees and the weather is ${data.weather}.`);
        }
        if (data.airport) {
            console.log(`The main airport is ${data.airport}.`)
        }
    })
    .catch(error => console.error(error));