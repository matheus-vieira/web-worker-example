const swapiWorker = new Worker('/web-worker-example/assets/js/swapi/swapiWorker.js');

function getList() {
    swapiWorker.postMessage("films");
}