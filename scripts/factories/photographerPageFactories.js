function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    console.log(data)
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

function mediaFactory(media) {
    const { photgrapherId, image, title, likes, date, price, id } = data1;
    console.log(data1)
    const photos = `assets/images/${image}`;
    const photoSection = document.querySelector(".photograph-article");


    function getMediaCardDOM() {
        const photos = document.createElement('img');
        img.setAttribute("src", image)
        img.setAttribute("role", 'link')
        img.setAttribute("alt", title + ', ' + date + ', ' + likes + ', prix : ' + price + '€')
        img.className = 'photobook';
        const text = document.createElement('p');
        h1.textContent = title;
        h1.className = 'title-photo';
        const where = document.createElement('p');
        where.textContent = city + ', ' + country;
        where.className = 'where';
        const tag = document.createElement('p');
        tag.textContent = tagline;
        tag.className = 'tag';

        photoSection.appendChild(img);
        photoSection.appendChild(h1);
        photoSection.appendChild(where);
        photoSection.appendChild(tag);
        return (photoSection);
    }
    return { getMediaCardDOM }
};