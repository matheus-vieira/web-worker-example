const URL = "https://swapi.dev/api/films/";

function getList() {
    var url = URL;
}

function getItem(id) {
    var url = URL;
    if (id) url += id;
}

export function getFilms(id) {
    if (id)
        return getItem(id);
    
    return getList();
}