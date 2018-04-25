document.addEventListener('DOMContentLoaded', function main() {
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
        var categories = document.querySelector('.categories');
        var paragTitulo = document.createElement('p');
        var paragDescricao = document.createElement('p');

        var div = document.createElement('div');
        div.setAttribute('class', 'divSec');

        //////////////////////////////////////
        console.log(categorias[i].id);
        /////////////////////////////////////
        
        paragTitulo.textContent = categorias[i].name + ': ';

        paragDescricao.textContent = categorias[i].description;


        var img = document.createElement('img');
        img.setAttribute('src', getImagemCat(categorias[i].id));
        img.setAttribute('class', 'imagem');
        img.setAttribute('categorias-id', categorias[i].id);

        //pendura os paragrafos e as imagens no div
        div.appendChild(paragTitulo);
        div.appendChild(img);
        div.appendChild(paragDescricao);
        categories.appendChild(div);

        //Evento 'onclick' para mostrar os pilotos de cada categoria
        img.addEventListener('click', function (evt) {
            trocaCatPil(evt.target.getAttribute('categorias-id'));
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
        img.setAttribute('pilotos-id', pilotos[i].id);
        div.appendChild(img);
        divPilotos.appendChild(div);

        //Evento 'onclick' para mostrar os detalhes de cada piloto
        img.addEventListener('click', function (evt) {
            trocaPilDeta(evt.target.getAttribute('pilotos-id'));
        });
    }
}

function mostraDetalhes(detalhes, metadata) {

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

    //Mostra a parte das imagens da multimedia
    for (var j = 0; j < detalhes.multimedia.images.length; j++) {
        var image = document.createElement('img');
        image.setAttribute('class', 'imagemMultimedia');
        var paragrafo = document.createElement('p');
        image.setAttribute('src', getImgMultimedia(detalhes.id, detalhes.multimedia.images[j].id));
        paragrafo.textContent = `${detalhes.multimedia.images[j].caption}`;
        divDetails.appendChild(image);
        divDetails.appendChild(paragrafo);

        //evento para quando se carregar numa imagem, ela ficar sobreposta
        image.addEventListener('click', function (evt) {
            var div = document.createElement('div');
            div.setAttribute('class', 'divImagensMultimedia');
            //div.setAttribute('style', 'opacity: 0.75');
            //div.setAttribute('style', 'background-color: black');
            div.appendChild(image);
            divDetails.appendChild(div);
            console.log(image);
        });
    }

    //Mostra a parte das imagens da multimedia
    for (var l = 0; l < detalhes.multimedia.videos.length; l++) {
        var iframe = document.createElement(iframe);
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + detalhes[l].multimedia.videos[l].youtube_id + '?autoplay=0&autohide=1&border=0&wmode=opaque&enablejsapi=1');
        var paragrafo = document.createElement('p');
        paragrafo.textContent = detalhes[l].multimedia.videos[l].caption;
        divDetails.appendChild(iframe);
        divDetails.appendChild(paragrafo);
        console.log("adafa");
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

    getPilotos(id)
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

    //Atribuição de visibilidade (apaga o conteúdo)
    divCategorias.innerHTML = "";
    divImages.innerHTML = "";
}

function trocaPilDeta(id) {

    ecraDetalhes(id);

    //Criacao das pegas para os elementos HTML
    var divCategorias = document.querySelector('.categories');
    var divDrivers = document.querySelector('.drivers');
    var divImages = document.querySelector('.images');
    var divDetails = document.querySelector('.driverDetails');

    //Atribuição de visibilidade (apaga o conteúdo)
    divImages.innerHTML = "";
    divDrivers.innerHTML= "" ;
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
        divCategorias.innerHTML="";
        divCategorias.setAttribute('style', 'display:flex');
        divDetails.innerHTML = "";
        divDrivers.innerHTML = "";
        divImages.innerHTML = "";

        ecraCategorias();
    });
}