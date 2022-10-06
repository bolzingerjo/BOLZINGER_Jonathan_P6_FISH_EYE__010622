function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    return { createIndexDOM }
};
let text = document.createElement('p');


function createLinkPagePhotographe(id) {
    const link = document.createElement('a');
    link.className = 'link';
    link.href = "photographer.html?id=" + id;
    link.appendChild(createIMG());
    link.appendChild(createTitleNom());
    return link
};

function createIMG(portrait, name, city, country, tagline, price) {
    const img = document.createElement('img');
    const picture = `assets/photographers/${portrait}`;
    img.setAttribute("src", picture)
    img.setAttribute("role", 'link')
    img.setAttribute("alt", name + ', from ' + city + ', ' + country + ', citation : ' + tagline + ', ' + price + '€ par jour')
    img.className = 'img_index';
    return img
};

function createTitleNom(name) {
    const h2 = document.createElement('h2');
    h2.textContent = name;
    h2.className = 'name';
    return h2
};

function createTextCity(city, country) {
    const where = document.createElement('p');
    where.textContent = city + ', ' + country;
    where.className = 'where';
    return where
};

function createTextTag(tagline) {
    const tag = document.createElement('p');
    tag.textContent = tagline;
    tag.className = 'tag';
    return tag
};

function createTextTarif(price) {
    const tarif = text;
    tarif.textContent = price + '€/jour';
    tarif.className = 'tarif';
    return tarif
};

function createIndexDOM() {
    const article = document.createElement('article');
    article.append(createLinkPagePhotographe());
    article.append(createTextCity());
    article.append(createTextTag());
    article.append(createTextTarif());
    return article
};


async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.photographers)

    // console.log(photographers);
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: photographers
    })

};

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographermodel = photographerFactory(photographer);
        const userCardDOM = photographermodel.createIndexDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

// //rajout d'attributs d'accessibilité
function accessibilitéIndex() {
    const indexNav = document.querySelector('.photographer_section');
    indexNav.setAttribute("aria-label", 'photographers navigation');
    const indexLogo = document.querySelector('.logo');
    indexLogo.setAttribute("alt", 'Fisheye home page');
    const linkIndex = document.createElement('a');
    const head = document.querySelector('header');
    head.appendChild(linkIndex);
    linkIndex.appendChild(indexLogo);
    linkIndex.href = "index.html";
};
accessibilitéIndex();