importScripts('swapi-films.js');
const SWAPI_ROUTES = {
    films: "https://swapi.dev/api/films/",
    people: "https://swapi.dev/api/people/",
    planets: "https://swapi.dev/api/planets/",
    species: "https://swapi.dev/api/species/",
    starships: "https://swapi.dev/api/starships/",
    vehicles: "https://swapi.dev/api/vehicles/"
}

const API_METHODS = Object.create(null, {
    "films": { enumerable: true, value: getFilms },
    "people": { enumerable: true, value: getPeople },
    "planets": { enumerable: true, value: getPlanets },
    "species": { enumerable: true, value: getSpecies },
    "starships": { enumerable: true, value: getStarships },
    "vehicles": { enumerable: true, value: getVehicles },
});

onmessage = function (e) {
    console.log('SWAPI - Worker: Calling the api');
    console.log(e);
};