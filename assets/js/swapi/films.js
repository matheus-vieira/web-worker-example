importScripts('../helper/supplant.js')
const URL = "https://swapi.dev/api/films";

const getFilmList = async function ({ name, rowTemplate }) {
    let url = URL;
    if (name) url += "?search=" + name;

    const response = await fetch(url)
    if (!response.ok) {
        SWAPI_WORKER.postMessage("HTTP-Error: " + response.status);
        return;
    }

    const json = await response.json();
    for (let i = 0; i < json.results.length; i++) {
        var parsedTpl = rowTemplate.supplant(json.results[i]);
        SWAPI_WORKER.postMessage({ result: parsedTpl });
    }

    SWAPI_WORKER.postMessage({ end: true });
};

const getFilm = async function (id) {
    const response = await fetch(URL + "/" + id);
    if (!response.ok) {
        SWAPI_WORKER.postMessage("HTTP-Error: " + response.status);
        return;
    }

    const json = await response.json();
    SWAPI_WORKER.postMessage(json);
};