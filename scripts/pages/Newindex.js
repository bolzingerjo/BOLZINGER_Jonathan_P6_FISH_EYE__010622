function getDataJSOn(data) {
    const data = { name, portrait, city, country, tagline, price, id };
    const picture = `assets/photographers/${portrait}`;
};

function createArticlePhotographe() {
    const article = document.createElement('article');
};

function createLienVersPagePhotographe(data) {
    const link = document.createElement('a');
    link.className = 'link';
    link.href = "photographer.html?id=" + id;
};

function createImageProfilPhotographe(data) {
    const img = document.createElement('img');
    img.setAttribute("src", picture)
    img.setAttribute("role", 'link')
    img.setAttribute("alt", name + ', from ' + city + ', ' + country + ', citation : ' + tagline + ', ' + price + '€ par jour')
    img.className = 'img_index';
};

function createNamePhotographe(data) {
    const h2 = document.createElement('h2');
    h2.textContent = name;
    h2.className = 'name';
};

function createText() {
    document.createElement('p');
};

function createPaysPhotographe(data) {
    createText(where)
    where.textContent = city + ', ' + country;
    where.className = 'where';
};

function createTagPhotographe(data) {
    createText(tag)
    tag.textContent = tagline;
    tag.className = 'tag';
};

function createTarifPhotographe(data) {
    createText(tarif)
    tarif.textContent = price + '€/jour';
    tarif.className = 'tarif';
};
createArticlePhotographe();
createLienVersPagePhotographe(data);
createImageProfilPhotographe(data);
createNamePhotographe(data);
createPaysPhotographe(data);
createTagPhotographe(data);
createTarifPhotographe(data);

function createDomIndex(data) {
    article.appendChild(link);
    link.appendChild(img);
    link.appendChild(h2);
    article.appendChild(where);
    article.appendChild(tag);
    article.appendChild(tarif);
};
createDomIndex(data);

function getJSONDataPhotographers() {
    const photographers =
        fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.photographers)
        // console.log(photographers);
    return ({
        photographers: photographers
    })
};

function createEachBlockPhotographe(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const userCardDOM = photographerModel.createDomIndex(photographer);
        photographersSection.appendChild(userCardDOM);
    });
};
getJSONDataPhotographers();
createEachBlockPhotographe(photographers);