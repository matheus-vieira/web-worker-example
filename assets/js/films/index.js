(function (w, d) {
    "use strict";
    const swapiWorker = new Worker('/web-worker-example/assets/js/swapi/swapi-worker.js');

    function getList() {
        holder.innerHTML = loadingTemplate;
        swapiWorker.postMessage({ route: "films" });
    }
    var filmList = [],
        loadingTemplate = null,
        rowTemplate = null,
        holder = null;

    function getDomElements() {
        loadingTemplate = d.getTemplate("loading-row");
        rowTemplate = d.getTemplate("table-row");
        holder = d.getElementById("films-table-body");
    }

    swapiWorker.onmessage = function(e) {
        console.log(e);
        if (e.data)
            render(e.data);
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