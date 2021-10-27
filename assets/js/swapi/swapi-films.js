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