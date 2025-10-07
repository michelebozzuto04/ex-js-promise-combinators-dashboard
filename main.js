const fetchJson = async (url) => {
    const request = await fetch(url);
    return request.json()
}

const getDashboardData = async (query) => {
    const promise1 = await fetchJson(`http://localhost:3333/destinations?search=${query}`)
        .then(data => ({
            city: data[0].name,
            country: data[0].country
        }));

    const promise2 = await fetchJson(`http://localhost:3333/weathers?search=${query}`)
        .then(data => ({
            temperature: data[0].temperature,
            weather: data[0].weather_description
        }));

    const promise3 = await fetchJson(`http://localhost:3333/airports?search=${query}`)
        .then(data => ({
            airport: data[0].name
        }));

    return Promise.all([promise1, promise2, promise3])
        .then((values) => {
            return {
                ...values[0],
                ...values[1],
                ...values[2],
            }
        })
        .catch(error => console.log(error.message))
}

getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));