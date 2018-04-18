﻿document.addEventListener('DOMContentLoaded', function main() {
    init();
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

function init() {
    barraTopo();
    ecraCategorias();
    //ecraPilotos();
    //trocaPilDeta('tiff');
}
// Ficheiro da aplicação

// 2) 
function mostraCategorias(categorias) {
    for (var i = 0; i < categorias.length; i++) {
        // Criar elementos HTML, colocá-los no body ou noutro lado qualquer.
        //document.body.appendChild(document.createElement('p'));
        var categories = document.querySelector('.categories');
        var paragTitulo = document.createElement('p');
        //paragTitulo.setAttribute('data-id', categorias[i].id);
        var paragDescricao = document.createElement('p');

        var div = document.createElement('div');
        div.setAttribute('class', 'divSec');
        div.setAttribute('data-id', categorias[i].id);

        //////////////////////////////////////
        console.log(categorias[i].id);
        /////////////////////////////////////
        
        paragTitulo.textContent = categorias[i].name + ': ';

        paragDescricao.textContent = categorias[i].description;


        var img = document.createElement('img');
        img.setAttribute('src', getImagemCat(categorias[i].id));
        img.setAttribute('class', 'imagem');

        //pendura os paragrafos e as imagens no div
        div.appendChild(paragTitulo);
        div.appendChild(img);
        div.appendChild(paragDescricao);
        categories.appendChild(div);

        //Evento 'onclick' para mostrar os pilotos de cada categoria
        div.addEventListener('click', function (evt) {
            trocaCatPil(evt.target.getAttribute('data-id'));
        });
    }
}

function mostraPilotos(pilotos) {
    for (var i = 0; i < pilotos.length; i++) {
        //Fornecer uma pega para os elementos HTML
        var divPilotos = document.querySelector('.drivers');

        console.log(pilotos[i].id);

        //Criar elementos HTML
        var parag = document.createElement('p');
        var paragNome = document.createElement('p');
        paragNome.setAttribute('data-id', pilotos[i].id);
        var img = document.createElement('img');
        var div = document.createElement('div');
        div.setAttribute('class', 'piloto');

        img.setAttribute('class', 'imagemPilotos');

        //Colocar a informação dos pilotos nos paragrafos criados
        paragNome.textContent = pilotos[i].name;
        div.appendChild(paragNome);
        parag = document.createElement('p');
        parag.textContent = pilotos[i].nationality;
        div.appendChild(parag);


        //Colocar as imagens dos pilotos
        img.setAttribute('src', getImagemPil(pilotos[i].id));
        img.setAttribute('class', 'imagemPilotos');
        div.appendChild(img);
        divPilotos.appendChild(div);
    }

    //Evento 'onclick' para mostrar os detalhes de cada piloto
    paragNome.addEventListener('click', function (evt) {
        trocaPilDeta(evt.target.getAttribute('data-id'));
    });

}

function mostraDetalhes(detalhes) {

    //Fornecer uma pega para os elementos HTML
    var divDetails = document.querySelector('.driverDetails');

    //Criar elementos HTML
    var divInfBasic = document.createElement('div');
    var divFotoPerfil = document.createElement('div');
    var divInfComplex = document.createElement('div');
    divInfComplex.setAttribute('class', 'divInfComplex');
    var img = document.createElement('img');
    img.setAttribute('src', getImagemPil(detalhes.id));
    img.setAttribute('class', 'imgPerfil');

    divFotoPerfil.appendChild(img);
    divInfComplex.appendChild(divFotoPerfil);
    var parag = document.createElement('p');
    parag.textContent = `Name: ${detalhes.name}`;
    divInfBasic.appendChild(parag);
    parag = document.createElement('p');
    if ( detalhes.nickname !=  null) {
        parag.textContent = `Nickname: ${detalhes.nickname}`;
        divInfBasic.appendChild(parag);
    } else {
        parag.textContent = 'Nickname: Não tem';
        divInfBasic.appendChild(parag);
    }
    parag = document.createElement('p');
    parag.textContent = `Nationality: ${detalhes.nationality}`;
    divInfBasic.appendChild(parag);
    parag = document.createElement('p');
    parag.textContent = `Date of Birth: ${detalhes.birth_date}`;
    divInfBasic.appendChild(parag);
    parag = document.createElement('p');
    if (detalhes.death_date != null) {
        parag.textContent = `Date of Death: ${detalhes.death_date}`;
        divInfBasic.appendChild(parag);
        divInfComplex.appendChild(divInfBasic);
    } else {
        parag.textContent = 'Date of Death: Still alive';
        divInfBasic.appendChild(parag);
        divInfComplex.appendChild(divInfBasic);
    }
    divInfComplex.appendChild(divInfBasic);
    divDetails.appendChild(divInfComplex);

    parag = document.createElement('p');
    parag.textContent = `Introduction: ${detalhes.introduction}`;
    divDetails.appendChild(parag);
    parag = document.createElement('p');
    for (var l = 0; l < detalhes.career.length; l++) {
        var carreira = detalhes.career[l].text;
    }
    parag.textContent = `Career: ${carreira}`;
    divDetails.appendChild(parag);
    parag = document.createElement('p');
    parag.textContent = `Racing Victories: ${detalhes.records.race_victories}`;
    divDetails.appendChild(parag);
    parag = document.createElement('p');
    parag.textContent = `Championship Victories: ${detalhes.records.championship_victories}`;
    divDetails.appendChild(parag);
    parag = document.createElement('p');
    parag.textContent = `First Victory: ${detalhes.records.first_race_win}`;
    divDetails.appendChild(parag);
    parag = document.createElement('p');

    for (var j = 0; j < detalhes.multimedia.images.length; j++) {
        var image = document.createElement('img');
        var paragrafo = document.createElement('p');
        image.setAttribute('src', getImgMultimedia(detalhes.id, detalhes.multimedia.images[j].id));
        paragrafo.textContent = `${getMetaData(detalhes.id, detalhes.multimedia.images[j].id)}`;
        divDetails.appendChild(image);
        divDetails.appendChild(paragrafo);
    }
}
// 3)
function ecraCategorias() {

    getCategorias()
        .then(function (categorias) {
            //argumento "categorias" é o ficheiro json pronto
            mostraCategorias(categorias);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

function ecraPilotos(id) {

    getPilotos('rally')
        .then(function (pilotos) {
            return mostraPilotos(pilotos);
        })
        .catch(function (erro) {
            console.log("erro");
        })
}

function ecraDetalhes(id) {

    getDetails(id)
        .then(function (detalhes) {
            return mostraDetalhes(detalhes);
        })
        .catch(function (erro) {
            console.log("erro");
        })
}

function trocaCatPil(id) {

    ecraPilotos(id);

    //Criacao das pegas para os elementos HTML
    var divCategorias = document.querySelector('.categories');
    var divDrivers = document.querySelector('.drivers');
    var divImages = document.querySelector('.images');
    var divDetails = document.querySelector('.driverDetails');

    //Atribuição de visibilidade
    divCategorias.setAttribute('style', 'display: none;');
    divImages.setAttribute('style', 'display: none;');
}

function trocaPilDeta(id) {

    ecraDetalhes(id);

    //Criacao das pegas para os elementos HTML
    var divCategorias = document.querySelector('.categories');
    var divDrivers = document.querySelector('.drivers');
    var divImages = document.querySelector('.images');
    var divDetails = document.querySelector('.driverDetails');

    //Atribuição de visibilidade
    divCategorias.setAttribute('style', 'display: none;');
    divImages.setAttribute('style', 'display: none;');
    divDrivers.setAttribute('style', 'display: none;');
}

function barraTopo() {

    //adquirir o interface estático
    var divTopBar = document.querySelector('.topBar');

    //criação do botão 'home' para voltar para as categorias
    var btnHome = document.createElement('input');
    btnHome.setAttribute('type', 'button');
    btnHome.setAttribute('value', 'Home');
    divTopBar.appendChild(btnHome);

    //evento para quando se carregar no botão 'home', a aplicação voltar para as categorias
    btnHome.addEventListener('click', function (_) {

        //Criacao das pegas para os elementos HTML
        var divCategorias = document.querySelector('.categories');
        var divDrivers = document.querySelector('.drivers');
        var divImages = document.querySelector('.images');
        var divDetails = document.querySelector('.driverDetails');

        //Alteração de displays
        divCategorias.setAttribute('style', 'display:flex');
        divDetails.innerHTML = "";
        divDrivers.innerHTML = "";
        divImages.innerHTML = "";

        ecraCategorias();
    });
}