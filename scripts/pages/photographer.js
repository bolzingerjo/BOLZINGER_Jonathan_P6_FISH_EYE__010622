//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let pageId = params.get('id');
console.log(pageId);

async function getMedia() {
    // Penser à remplacer par les données récupérées dans le json
    const media =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.media.filter((object) => object.photographerId == pageId))

    console.log(media)
        // et bien retourner le tableau photographers seulement une fois
    return ({
        media: media
    })

};

// // async function displayData(media) {
// //     const photographiesSection = document.querySelector(".photograph-article");

// //     media.forEach((photographer) => {
// //         const photographerModel = photographerFactory(photographer);
// //         const userCardDOM = photographerModel.getUserCardDOM();
// //         photographersSection.appendChild(userCardDOM);
// //     });
// // };

async function init2() {
    // Récupère les medias des photographies
    const { photographies } = await getMedia();
    console.log(photographies);
};

init2();

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.photographers.filter((object) => object.id == pageId))

    console.log(photographers);
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: photographers
    })

};

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
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