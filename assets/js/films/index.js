(function (w, d) {
    "use strict";
    const swapiWorker = new Worker('/web-worker-example/assets/js/swapi/swapi-worker.js');

    function getList() {
        holder.innerHTML = loadingTemplate;
        swapiWorker.postMessage("films");
        console.log(response);
    }
    var filmList = [],
        loadingTemplate = null,
        rowTemplate = null,
        holder = null;

    function getDomElements() {
        loadingTemplate = d.getTemplate("loading-row");
        rowTemplate = d.getTemplate("table-row");
        holder = d.getElementById("films-table");
    }

    swapiWorker.onmessage(e => {
        const obj = {};
        render(obj);
    })
    swapiWorker.onmessage = function(e) {
        console.log(e);
        const obj = {};
        render(obj);
      }
      

    function render(obj) {
        // remove loading-table id from table
        var parsedTpl = rowTemplate.supplant(obj);
        holder.innerHTML += parsedTpl;
    }

    function init() {
    }

    w.onload = function onLoad() {
        getDomElements();
        getList();
    };
}(window, document));