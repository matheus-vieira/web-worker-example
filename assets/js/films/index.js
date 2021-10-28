(function (w, d) {
    "use strict";

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

            getListWebWorker(filmTitle.value);
            getListRegular(filmTitle.value);
        });
    }


    // Methods related with web worker
    const swapiWorker = new Worker('/web-worker-example/assets/js/swapi/swapi-worker.js');

    function getListWebWorker(name) {
        loadingTemplateWebWorker.className = "";
        swapiWorker.postMessage({ route: "film-list", params: { name, rowTemplate } });
    }

    swapiWorker.onmessage = function (e) {
        e.data.message && (loadingTemplateWebWorker.innerHTML = e.data.message);

        // e.data.beforeResult &&
        //     holderWebWorker.lastElementChild.id != loadingTemplateWebWorker.id &&
        //     holderWebWorker.deleteRow(1);

        e.data.result && (holderWebWorker.innerHTML += e.data.result);

        // e.data.end && (loadingTemplateWebWorker.className = "visually-hidden");
    }
    // Methods related with web worker

    // Methods related with regular call
    async function getListRegular(name) {
        loadingTemplateRegular.className = "";

        while (holderRegular.lastElementChild.id != loadingTemplateRegular.id)
            holderRegular.deleteRow(1);

        await loadFromApi(name);

        loadingTemplateRegular.className = "visually-hidden";
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
        for (let i = 0; i < json.results.length; i++) {
            var parsedTpl = rowTemplate.supplant(json.results[i]);
            holderRegular.innerHTML += parsedTpl;
        }
    }
    // Methods related with regular call

    w.onload = function onLoad() {
        getDomElements();
        getListRegular();
        getListWebWorker();
    };
}(window, document));