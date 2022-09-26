//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let pageId = params.get('id');
// console.log(pageId);

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.photographers.filter((object) => object.id == pageId))

    // console.log(photographers);
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: photographers
    })

};

async function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph-header");
    // console.log(photographer);
    photographer.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        // console.log(photographerModel);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

async function getMedia() {
    // Penser à remplacer par les données récupérées dans le json
    const media =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.media.filter((object) => object.photographerId == pageId))

    // console.log(media)
    // et bien retourner le tableau photos seulement une fois
    return ({
        media: media
    })

};
// changement de photographers en media
async function displayData2(medias) {
    const photographiesSection = document.querySelector(".photograph-article");
    // console.log(medias);
    medias.forEach((pho) => {
        const mediaModel = mediaFactory(pho);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        photographiesSection.appendChild(mediaCardDOM);
    });
};

async function init2() {
    // Récupère les medias des photographies
    const { media } = await getMedia();
    // console.log(media);
    displayData2(media);
    gestionVideo();
};

init2();

//Trier
async function trierPop() {
    //trier par popularité
    const boutonTrier = document.querySelector(".btn-pop");
    const { media } = await getMedia();
    boutonTrier.addEventListener("click", function() {
        const mediasTrierPop = Array.from(media);
        mediasTrierPop.sort(function(a, b) {
            return b.likes - a.likes;
        });
        // console.log(mediasTrierPop);
        document.querySelector(".photograph-article").innerHTML = "";
        displayData2(mediasTrierPop);
    });
};
trierPop();
async function trierDate() {
    //trier par date
    const boutonDate = document.querySelector(".btn-date");
    const { media } = await getMedia();
    boutonDate.addEventListener("click", function() {
        const mediasTrierDate = Array.from(media);
        mediasTrierDate.sort(function(a, b) {
            return b.date.localeCompare(a.date);
        });
        // console.log(mediasTrierDate);
        document.querySelector(".photograph-article").innerHTML = "";
        displayData2(mediasTrierDate);
    });
};
trierDate();
async function trierTitre() {
    //trier par titre
    const boutonTitre = document.querySelector(".btn-titre");
    const { media } = await getMedia();
    boutonTitre.addEventListener("click", function() {
        const mediasTrierTitre = Array.from(media);
        mediasTrierTitre.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
        // console.log(mediasTrierTitre);
        document.querySelector(".photograph-article").innerHTML = "";
        displayData2(mediasTrierTitre);
    });
};
trierTitre();