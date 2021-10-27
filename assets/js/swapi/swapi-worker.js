// const SWAPI_ROUTES = {
//     films: "https://swapi.dev/api/films/",
//     people: "https://swapi.dev/api/people/",
//     planets: "https://swapi.dev/api/planets/",
//     species: "https://swapi.dev/api/species/",
//     starships: "https://swapi.dev/api/starships/",
//     vehicles: "https://swapi.dev/api/vehicles/"
// }

importScripts('swapi-films.js');

const API_METHODS = Object.create(null, {
    "films": { enumerable: true, value: getList }
});

onmessage = async function (e) {
    API_METHODS[e.data.route](this);
};