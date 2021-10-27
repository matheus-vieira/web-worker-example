const swapiWorker = new Worker('/web-worker-example/assets/js/swapi/swapi-worker.js');

function getList() {
    swapiWorker.postMessage("films");
}