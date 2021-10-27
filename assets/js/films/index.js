(function (w, d) {
    "use strict";
    const swapiWorker = new Worker('/web-worker-example/assets/js/swapi/swapi-worker.js');

    let rowTemplate = null,
        loadingTemplateRegular = null,
        loadingTemplateWebWorker = null,
        holderRegular = null,
        holderWebWorker = null;

    function getDomElements() {
        rowTemplate = d.getTemplate("table-row");

        loadingTemplateRegular = d.getElementById("loading-table");
        holderRegular = d.getElementById("films-table-body");

        loadingTemplateWebWorker = d.getElementById("loading-table-web-worker");
        holderWebWorker = d.getElementById("films-table-body-web-worker");

        d.getElementById("filmTitle").addEventListener("input", function onInputHandler(e) {
            if (filmTitle.value && filmTitle.value.length < 3) return;

            getListRegular(filmTitle.value);
            getListWebWorker(filmTitle.value);
        });
    }

    function getListWebWorker(name) {
        d.getElementById("loading-table-web-worker").className = "";

        while (holder.lastElementChild.id != loadingTemplate.id)
            holder.deleteRow(1);

        swapiWorker.postMessage({ route: "film-list", params: { name } });
    }

    swapiWorker.onmessage = function (e) {
        if (e.data.result) {
            render(holderWebWorker, e.data)
        }

        if (e.data.end) {
            d.getElementById("loading-table-web-worker").className = "visually-hidden";
        }
    }

    async function getListRegular(name) {
        d.getElementById("loading-table").className = "";

        while (holder.lastElementChild.id != loadingTemplate.id)
            holder.deleteRow(1);

        await loadFromApi(name);

        d.getElementById("loading-table").className = "visually-hidden";
    }

    async function loadFromApi(name) {
        let url = "https://swapi.dev/api/films";
        if (name) url += "?search=" + name;

        const response = await fetch(url)
        if (!response.ok) {
            console.log("HTTP-Error: " + response.status);
            return;
        }

        const json = await response.json();
        for (let i = 0; i < json.results.length; i++)
            render(holderRegular, json.results[i]);
    }

    function render(holder, obj) {
        var parsedTpl = rowTemplate.supplant(obj);
        holder.innerHTML += parsedTpl;
    }

    w.onload = function onLoad() {
        getDomElements();
        getListRegular();
        getListWebWorker();
    };
}(window, document));