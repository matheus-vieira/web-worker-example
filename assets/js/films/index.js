(function (w, d) {
    "use strict";
    const swapiWorker = new Worker('/web-worker-example/assets/js/swapi/swapi-worker.js');
    var filmList = [],
        loadingTemplate = null,
        rowTemplate = null,
        holder = null;

    function getDomElements() {
        loadingTemplate = d.getElementById("loading-table");
        rowTemplate = d.getTemplate("table-row");
        holder = d.getElementById("films-table-body");
    }

    swapiWorker.onmessage = function (e) {
        if (e.data) {
            loadingTemplate.className = "visually-hidden";
            render(e.data)
        }
    }

    function getList() {
        loadingTemplate.className = "";
        swapiWorker.postMessage({ route: "film-list", params: {} });
    }

    function render(obj) {
        var parsedTpl = rowTemplate.supplant(obj);
        holder.innerHTML += parsedTpl;
    }

    w.onload = function onLoad() {
        getDomElements();
        getList();
    };
}(window, document));