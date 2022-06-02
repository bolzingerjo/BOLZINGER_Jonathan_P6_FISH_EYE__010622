function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    console.log(data)
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const where = document.createElement('p');
        where.textContent = city + ', ' + country;
        const tag = document.createElement('p');
        tag.textContent = tagline;
        const tarif = document.createElement('p');
        tarif.textContent = price + '€/jour';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(where);
        article.appendChild(tag);
        article.appendChild(tarif);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}