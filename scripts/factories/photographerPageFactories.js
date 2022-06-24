function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    console.log(data);
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        const btnmodal = document.querySelector(".contact_button")
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("role", 'link');
        img.setAttribute("alt", name + ', from ' + city + ', ' + country + ', citation : ' + tagline + ', ' + price + '€ par jour');
        img.className = 'img-Page';
        const h1 = document.createElement('h1');
        h1.textContent = name;
        h1.className = 'name-Page';
        const where = document.createElement('p');
        where.textContent = city + ', ' + country;
        where.className = 'where-Page';
        const tag = document.createElement('p');
        tag.textContent = tagline;
        tag.className = 'tag-Page';

        article.appendChild(h1);
        article.appendChild(where);
        article.appendChild(tag);
        article.appendChild(btnmodal);
        article.appendChild(img);

        return (article);
    }
    return { getUserCardDOM }
};

function mediaFactory(data1) {
    const { photgrapherId, image, video, title, likes, date, price, id } = data1;
    console.log(data1);
    const pictures = `assets/images/${image}`;
    const videos = `assets/images/${video}`;

    function getMediaCardDOM() {
        if (object = image) {
            const articlePhoto = document.createElement('article');
            const photos = document.createElement('img');
            photos.setAttribute("src", pictures);
            photos.setAttribute("role", 'link');
            photos.setAttribute("alt", title + ', ' + date + ', ' + likes + ', prix : ' + price + '€');
            photos.className = 'photobook';
            const text = document.createElement('p');
            text.textContent = title;
            text.className = 'title-photo';
            const cptLikes = document.createElement('p');
            cptLikes.textContent = likes;
            cptLikes.className = 'likes';

            articlePhoto.appendChild(photos);
            articlePhoto.appendChild(text);
            articlePhoto.appendChild(cptLikes);
            return (articlePhoto);
        }
        if (Object = video) {
            const articleVideo = document.createElement('article');
            const videoPage = document.createElement('video');
            videoPage.setAttribute("controls", 'controls');
            const source = document.createElement('source');
            source.setAttribute("src", videos);
            // source.setAttribute("type", 'video/mp4');

            articleVideo.appendChild(videoPage);
            videoPage.appendChild(source);
            return (articleVideo);
        } else {
            return console.log('erreur')
        }




        // article.appendChild(videoPage);

        // article.appendChild(cptLikes);


    }
    return { getMediaCardDOM }
};