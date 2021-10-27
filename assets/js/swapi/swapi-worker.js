// const SWAPI_ROUTES = {
//     films: "https://swapi.dev/api/films/",
//     people: "https://swapi.dev/api/people/",
//     planets: "https://swapi.dev/api/planets/",
//     species: "https://swapi.dev/api/species/",
//     starships: "https://swapi.dev/api/starships/",
//     vehicles: "https://swapi.dev/api/vehicles/"
// }
const SWAPI_WORKER = this;
importScripts('films.js');

const API_METHODS = Object.create(null, {
    "film-list": { enumerable: true, value: getFilmList },
    "film": { enumerable: true, value: getFilm }
});

onmessage = async function (e) {
    API_METHODS[e.data.route](e.data.params);
};