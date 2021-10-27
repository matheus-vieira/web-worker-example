(function (w, d) {
    "use strict";
    const swapiWorker = new Worker('/web-worker-example/assets/js/swapi/swapi-worker.js');

    let loadingTemplate = null,
        rowTemplate = null,
        holder = null,
        filmTitle = null;

    function getDomElements() {
        loadingTemplate = d.getElementById("loading-table");
        rowTemplate = d.getTemplate("table-row");
        holder = d.getElementById("films-table-body");
        filmTitle = d.getElementById("filmTitle");

        filmTitle.addEventListener("input", function onInputHandler(e) {
            if (filmTitle.value && filmTitle.value.length < 3) return;

            getList(filmTitle.value);
        });
    }

    swapiWorker.onmessage = function (e) {
        if (e.data) {
            d.getElementById("loading-table").className = "visually-hidden";
            render(e.data)
        }
    }

    function getList(name) {
        d.getElementById("loading-table").className = "";

        while (holder.lastElementChild.id != loadingTemplate.id)
            holder.deleteRow(1);

        swapiWorker.postMessage({ route: "film-list", params: { name } });
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