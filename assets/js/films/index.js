(function (w, d) {
    "use strict";
    const swapiWorker = new Worker('/web-worker-example/assets/js/swapi/swapi-worker.js');

    function getList() {
        loadingTemplate.className = "";
        swapiWorker.postMessage({ route: "films" });
    }
    var filmList = [],
        loadingTemplate = null,
        rowTemplate = null,
        holder = null;

    function getDomElements() {
        loadingTemplate = d.getElementById("loading-table");
        rowTemplate = d.getTemplate("table-row");
        holder = d.getElementById("films-table-body");
    }

    swapiWorker.onmessage = function(e) {
        console.log(e);
        if (e.data){
            loadingTemplate.className = "visually-hidden";
            setTimeout(() => render(e.data), 2000);
        }
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