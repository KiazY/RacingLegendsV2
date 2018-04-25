// Ficheiro de funções de acesso a dados

// 1) 
function getCategorias() {
    var url = "http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories";

    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status === 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro ao obter categorias"));
            }
        });
}

function getImagemCat(id) {
    return 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories/' + id + '/image';
}

function getImagemPil(id) {
    return 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/drivers/' + id + '/image'
}

function getPilotos(id) {
    var url = "http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories/" + id + "/drivers ";

    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status == 200) {
                return  resposta.json();
            } else {
                return Promise.reject(new Error("Erro a obter a imagem das categorias"));
            }
        });
}

function getDetails(id) {

    url = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/drivers/'+id;

    return fetch(url, { headers: { Accept: 'application/json' } })
        .then(function (resposta) {
            if (resposta.status == 200) {
                return resposta.json();
            } else {
                return Promise.reject(new Error("Erro a obter os detalhes dos pilotos"));
            }
        });

}function getImgMultimedia(idDriver, idImage) {

    return ' http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/drivers/' + idDriver + '/multimedia/images/' + idImage + '/image ';
}