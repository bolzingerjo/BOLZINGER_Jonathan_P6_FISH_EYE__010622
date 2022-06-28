// factory header //
function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    console.log(data);
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.className = 'article-header';
        const div1 = document.createElement('div');
        const btnmodal = document.querySelector(".contact_button");
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

        article.appendChild(div1);
        div1.appendChild(h1);
        div1.appendChild(where);
        div1.appendChild(tag);
        article.appendChild(btnmodal);
        article.appendChild(img);

        return (article);
    }
    return { getUserCardDOM }
};
// factory header //
// factory media //
function mediaFactory(data1) {
    const { photgrapherId, image, video, title, likes, date, price, id } = data1;
    console.log(data1);
    const pictures = `assets/images/${image}`;
    const videos = `assets/images/${video}`;

    function getMediaCardDOM() {
        if (object = image) {
            const articlePhoto = document.createElement('article');
            articlePhoto.className = 'article-Photo';
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
        if (object = video) {
            const articleVideo = document.createElement('article');
            articleVideo.className = 'article-video';
            const videoPage = document.createElement('video');
            videoPage.setAttribute("controls", 'controls');
            videoPage.className = 'video';
            const source = document.createElement('source');
            source.setAttribute("src", videos);
            source.setAttribute("type", 'video/mp4');
            source.setAttribute("preload", 'auto');
            source.className = 'source';
            const ariaControls = document.createElement('div');
            ariaControls.className = 'controls';
            const btnPlay = document.createElement('button');
            btnPlay.className = 'play';
            btnPlay.setAttribute("data-icon", 'P');
            btnPlay.setAttribute("aria-label", 'Play Pause Toggle');
            const btnStop = document.createElement('button');
            btnStop.className = 'stop';
            btnStop.setAttribute("data-icon", 'S');
            btnStop.setAttribute("aria-label", 'Stop');
            const timer = document.createElement('div');
            timer.className = 'timer';
            const div2 = document.createElement('div');
            const span = document.createElement('span');
            span.setAttribute("aria-label", 'timer');
            span.textContent = '00:00';
            const rewind = document.createElement('button');
            rewind.className = 'rwd';
            rewind.setAttribute("data-icon", 'B');
            rewind.setAttribute("aria-label", 'Rewind');
            const forward = document.createElement('button');
            forward.className = 'fwd';
            forward.setAttribute("data-icon", 'F');
            forward.setAttribute("aria-label", 'Fast forward');

            articleVideo.appendChild(videoPage);
            videoPage.appendChild(source);
            articleVideo.appendChild(ariaControls);
            ariaControls.appendChild(btnPlay);
            ariaControls.appendChild(btnStop);
            ariaControls.appendChild(timer);
            timer.appendChild(div2);
            timer.appendChild(span);
            ariaControls.appendChild(rewind);
            ariaControls.appendChild(forward);


            return (articleVideo);


        } else {
            return console.log('erreur')
        }
    }

    return { getMediaCardDOM }
};
// factory media //