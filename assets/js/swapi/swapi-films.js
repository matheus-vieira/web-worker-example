const URL = "https://swapi.dev/api/films/";

async function getList(worker) {
    const response = await fetch(URL)
    if (!response.ok) {
        alert("HTTP-Error: " + response.status);
        worker.postMessage("HTTP-Error: " + response.status);
        return;
    }
    const json = await response.json();
    for(let i = 0; i < json.Results.length; i++)
        worker.postMessage(json.Results[i]);
}