const swapiWorker = new Worker('../swwapi/swapiWorker.js');

function getList() {
    swapiWorker.postMessage("films");
}