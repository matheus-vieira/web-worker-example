document.getTemplate = function getTemplate(id) {
    "use strict";
    var elem = document.getElementById(id);
    if (elem)
        return elem.innerHTML;
    return "";
};