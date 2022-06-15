console.log(1234);

function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    // console.log(data)
    const picture = `assets/photographers/${portrait}`;
    const photographersSection = document.querySelector(".photograph-header");

    function getUserCardDOM() {
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("role", 'link')
        img.setAttribute("alt", name + ', from ' + city + ', ' + country + ', citation : ' + tagline + ', ' + price + '€ par jour')
        img.className = 'img_index';
        const h1 = document.createElement('h1');
        h1.textContent = name;
        h1.className = 'name';
        const where = document.createElement('p');
        where.textContent = city + ', ' + country;
        where.className = 'where';
        const tag = document.createElement('p');
        tag.textContent = tagline;
        tag.className = 'tag';

        photographersSection.appendChild(img);
        photographersSection.appendChild(h1);
        photographersSection.appendChild(where);
        photographersSection.appendChild(tag);
        return (photographersSection);
    }
    return { getUserCardDOM }
};