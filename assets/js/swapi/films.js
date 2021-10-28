importScripts('../helper/supplant.js')

const URL = "https://swapi.dev/api/films";

const sendMessage = (data) => SWAPI_WORKER.postMessage(data);
const log = (msg) => SWAPI_WORKER.postMessage({ message: "Star Wars Films API: " + msg + "." });
const errorLog = (msg) => SWAPI_WORKER.postMessage({ error: "[ERROR]Star Wars Films API: " + msg + "." });

const getFilmList = async function ({ name, rowTemplate }) {
    let url = URL;
    if (name) url += "?search=" + name;
    
    log(`Calling: ${url}`);

    const response = await fetch(url)
    if (!response.ok) {
        errorLog("HTTP-Error: " + response.status);
        return;
    }

    const json = await response.json();
    log(`Response returned with ${json.results.length} result(s)`);

    let timeInterval = 0;
    for (let i = 0; i < json.results.length; i++) {
        sendMessage({ beforeResult: true })
    }
    timeInterval = 200 * json.results.length;
    setInterval(() => log("Preparing results"), timeInterval);
    
    timeInterval = 0;
    for (let i = 0; i < json.results.length; i++) {
        var parsedTpl = rowTemplate.supplant(json.results[i]);
        timeInterval = 200 * i;
        setInterval(() => sendMessage({ result: parsedTpl }), timeInterval);
    }
    timeInterval = 200 * json.results.length;
    setInterval(() => log("Results fetched"), timeInterval);

    sendMessage({ end: true });
};

const getFilm = async function (id) {
    const response = await fetch(URL + "/" + id);
    if (!response.ok) {
        errorLog("HTTP-Error: " + response.status);
        return;
    }

    log(`Response returned with success`);
    const json = await response.json();
    sendMessage({ result: json });
};