// const SWAPI_ROUTES = {
//     films: "https://swapi.dev/api/films/",
//     people: "https://swapi.dev/api/people/",
//     planets: "https://swapi.dev/api/planets/",
//     species: "https://swapi.dev/api/species/",
//     starships: "https://swapi.dev/api/starships/",
//     vehicles: "https://swapi.dev/api/vehicles/"
// }

onmessage = async function (e) {
    API_METHODS[e.data.route](this);
};

const URL = "https://swapi.dev/api/films/";

const getList = async function (worker) {
    const response = await fetch(URL)
    if (!response.ok) {
        worker.postMessage("HTTP-Error: " + response.status);
        return;
    }

    const json = await response.json();
    for (let i = 0; i < json.results.length; i++)
        worker.postMessage(json.results[i]);
};

const API_METHODS = Object.create(null, {
    "films": { enumerable: true, value: getList }
});