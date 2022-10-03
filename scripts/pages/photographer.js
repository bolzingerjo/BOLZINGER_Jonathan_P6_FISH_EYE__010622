// //Mettre le code JavaScript lié à la page photographer.html
// let params = (new URL(document.location)).searchParams;
// let pageId = params.get('id');
// // console.log(pageId);

// async function getDataHeader() {
//     // remplacer par les données récupérées dans le json
//     const photographers =
//         await fetch('./data/photographers.json')
//         .then((Response) => Response.json())
//         .then(data => data.photographers.filter((object) => object.id == pageId))
//         // console.log(photographers);
//         // retourner le tableau photographers seulement une fois
//     return ({
//         photographers: photographers
//     })
// };
// async function createHeader(photographer) {
//     const photographersSection = document.querySelector(".photograph-header");
//     // console.log(photographer);
//     photographer.forEach((photographer) => {
//         const photographerModel = headerFactory(photographer);
//         // console.log(photographerModel);
//         const userCardDOM = photographerModel.createUserDOM();
//         photographersSection.appendChild(userCardDOM);
//     });
// };
// async function initHeaderPhotographer() {
//     // Récupère les datas des photographes
//     const { photographers } = await getDataHeader();
//     createHeader(photographers);
// };
// initHeaderPhotographer();

async function getDataMedia() {
    // remplacer par les données récupérées dans le json
    const media =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.media.filter((object) => object.photographerId == pageId))
        // console.log(media)
        // retourner le tableau photos seulement une fois
    return ({
        media: media
    })
};
// changement de photographers en media
async function createArticlePhoto(medias) {
    const photographiesSection = document.querySelector(".photograph-article");
    // console.log(medias);
    medias.forEach((pho) => {
        const mediaModel = mediaFactory(pho);
        const mediaCardDOM = mediaModel.createMediaDOM();
        photographiesSection.appendChild(mediaCardDOM);
    });
};
async function initArticlePhoto() {
    // Récupère les medias des photographies
    const { media } = await getDataMedia();
    // console.log(media);
    createArticlePhoto(media);
    gestionVideo();
};
initArticlePhoto();

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

async function manageEventlistener() {
    const { media } = await getMedia();
    let getLiens = document.querySelectorAll('.lightboxable');
    // console.log(getLiens);
    for (let i = 0; i < getLiens.length; i++) {
        let lien = getLiens[i];
        lien.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
        })
    };
};
manageEventlistener();