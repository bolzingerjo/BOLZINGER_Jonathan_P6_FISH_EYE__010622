function createLinkPagePhotographe(photographer) {
    const link = document.createElement('a');
    link.className = 'link';
    link.href = "photographer.html?id=" + photographer.id;
    link.appendChild(createIMG(photographer));
    link.appendChild(createTitleName(photographer));
    return link
};

function createIMG(photographer) {
    const img = document.createElement('img');
    let picture = `assets/photographers/${photographer.portrait}`;
    img.setAttribute("src", picture)
    img.setAttribute("role", 'link')
    img.setAttribute("alt", photographer.name + ', from ' + photographer.city + ', ' + photographer.country + ', citation : ' + photographer.tagline + ', ' + photographer.price + '€ par jour')
    img.className = 'img_index';
    return img
};

function createTitleName(photographer) {
    const h2 = document.createElement('h2');
    h2.textContent = photographer.name;
    h2.className = 'name';
    return h2
};

function createTextCity(photographer) {
    const where = document.createElement('p');
    where.textContent = photographer.city + ', ' + photographer.country;
    where.className = 'where';
    return where
};

function createTextTag(photographer) {
    const tag = document.createElement('p');
    tag.textContent = photographer.tagline;
    tag.className = 'tag';
    return tag
};

function createTextTarif(photographer) {
    const tarif = document.createElement('p');
    tarif.textContent = photographer.price + '€/jour';
    tarif.className = 'tarif';
    return tarif
};

function createIndexDOM(photographer) {
    const article = document.createElement('article');
    article.append(createLinkPagePhotographe(photographer));
    article.append(createTextCity(photographer));
    article.append(createTextTag(photographer));
    article.append(createTextTarif(photographer));
    return article
};

//rajout d'attributs d'accessibilité
function accessibilityIndex() {
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

async function getDataPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.photographers)
        // console.log(photographers);
        // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers
    })
};

async function applyDOMData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.photographers.forEach((photographer) => {
        const userCardDOM = createIndexDOM(photographer);
        photographersSection.appendChild(userCardDOM);
    });
};

async function initPageIndex() {
    // Récupère les datas des photographes
    let photographers = await getDataPhotographers();
    applyDOMData(photographers);
    accessibilityIndex();
};
initPageIndex();