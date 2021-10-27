const URL = "https://swapi.dev/api/films/";

const getFilmList = async function ({ name }) {
    const url = URL;
    if (name) url += "search=" + name;

    const response = await fetch(url)
    if (!response.ok) {
        SWAPI_WORKER.postMessage("HTTP-Error: " + response.status);
        return;
    }

    const json = await response.json();
    for (let i = 0; i < json.results.length; i++)
        SWAPI_WORKER.postMessage(json.results[i]);
};

const getFilm = async function (id) {
    const response = await fetch(URL + id);
    if (!response.ok) {
        SWAPI_WORKER.postMessage("HTTP-Error: " + response.status);
        return;
    }

    const json = await response.json();
    SWAPI_WORKER.postMessage(json);
};