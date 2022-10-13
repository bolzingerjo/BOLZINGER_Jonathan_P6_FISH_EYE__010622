const main = document.querySelector('main');

function createLikeCount(photographer) {
    const likesTarifs = document.createElement('div');
    likesTarifs.className = 'comptLikes';
    const nbr = document.createElement('p');
    nbr.innerText = '';
    likesTarifs.appendChild(nbr);
    nbr.appendChild(createHeart());
    likesTarifs.appendChild(PricePerDay(photographer));
    return likesTarifs
};

main.appendChild(createLikeCount());

function createHeart() {
    const imgHeart = document.createElement('i');
    imgHeart.className = 'fa-solid fa-heart';
    return imgHeart
};

function PricePerDay(photographer) {
    const prix = document.createElement('p');
    prix.innerText = photographer.price + '€/jour';
    return prix
};

function createTitleModal(photographer) {
    const h2 = document.querySelector('#title-modal');
    h2.innerText = 'Contactez-moi ' + photographer.name;
};

function createDiv() {
    const div1 = document.createElement('div');
    div1.appendChild(createNamePage(photographer));
    div1.appendChild(createWherePage(photographer));
    div1.appendChild(createTagPage(photographer));
    return div1
};

function createBtnModal() {
    const btnmodal = document.querySelector('.contact_button ');
    return btnmodal
};

function createImg(photographer) {
    const img = document.createElement('img');
    let picture = `assets/photographers/${photographer.portrait}`;
    img.setAttribute("src", picture);
    img.setAttribute("alt", photographer.name);
    img.className = 'img-Page';
    return img
};

function createNamePage(photographer) {
    const h1 = document.createElement('h1');
    h1.textContent = photographer.name;
    h1.className = 'name-Page';
    return h1
};

function createWherePage(photographer) {
    const where = document.createElement('p');
    where.textContent = photographer.city + ', ' + photographer.country;
    where.className = 'where-Page';
    return where
};

function createTagPage(photographer) {
    const tag = document.createElement('p');
    tag.textContent = photographer.tagline;
    tag.className = 'tag-Page';
    return tag
};

function createArticleHeader() {
    const article = document.createElement('article');
    article.className = 'article-header';
    article.appendChild(createDiv());
    article.appendChild(createBtnModal());
    article.appendChild(createImg());
    return article
};

let params = (new URL(document.location)).searchParams;
let pageId = params.get('id');

async function getDataHeader() {
    // remplacer par les données récupérées dans le json
    const photographers =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.photographers.filter((object) => object.id == pageId))
        // console.log(photographers);
        // retourner le tableau photographers seulement une fois
    return ({
        photographers
    })
};

async function createHeader(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");
    // console.log(photographer);
    photographer.forEach((photographer) => {
        // console.log(photographerModel);
        const articleHeader = createArticleHeader(photographer);
        photographersHeader.appendChild(articleHeader);
    });
};

async function initHeaderPhotographe() {
    // Récupère les datas des photographes
    let photographers = await getDataHeader();
    createHeader(photographers);
};
initHeaderPhotographe();

if (object = image) {
    function createArticlePhoto(media) {
        const articlePhoto = document.createElement('article');
        articlePhoto.className = 'article-Photo';
        articlePhoto.appendChild(createLinkLightbox(media));
        articlePhoto.appendChild(createDivUnderPhoto(media));
        return articlePhoto
    };

    function createLinkLightbox(media) {
        const linkLightbox = document.createElement('a');
        const pictures = `assets/images/${image}`;
        linkLightbox.setAttribute("href", pictures);
        linkLightbox.setAttribute("aria-label", title);
        linkLightbox.setAttribute("onclick", "lightbox()");
        linkLightbox.className = 'lightboxable';
        linkLightbox.appendChild(createImg());
        return linkLightbox
    };

    function createImg(media) {
        const photos = document.createElement('img');
        const pictures = `assets/images/${image}`;
        photos.setAttribute("src", pictures);
        photos.setAttribute("role", 'link');
        photos.setAttribute("alt", title + ', ' + date + ', ' + likes + ', prix : ' + price + '€');
        photos.className = 'photobook';
        return photos
    };

    function createDivUnderPhoto(media) {
        const divText = document.createElement('div');
        divText.className = 'photo-text';
        divText.appendChild(createTitleUnderPhoto(media));
        divText.appendChild(createSpanUnderPhoto(media));
        return divText
    };

    function createTitleUnderPhoto(media) {
        const text = document.createElement('p');
        text.textContent = title;
        text.className = 'title-photo';
        return text
    };

    function createSpanUnderPhoto(media) {
        const spanLikes = document.createElement('span');
        spanLikes.setAttribute("aria-label", 'likes');
        spanLikes.appendChild(createCountLikes(media));
        spanLikes.appendChild(createLikeButton(media));
        return spanLikes
    };

    function createCountLikes(media) {
        const cptLikes = document.createElement('p');
        cptLikes.textContent = likes;
        cptLikes.className = 'likes';
        return cptLikes
    };

    function createLikeButton(media) {
        const likebtn = document.createElement('button');
        likebtn.className = '.like-btn';
        likebtn.appendChild(createHeart());
        return likebtn
    };

    function createHeart() {
        const imgHeart = document.createElement('i');
        imgHeart.className = 'fa-solid fa-heart';
        return imgHeart
    };
}
if (object = video) {
    function createArticleVideo(media) {
        const articleVideo = document.createElement('article');
        articleVideo.className = 'article-video';
        articleVideo.appendChild(createElmtVideo(media));
        articleVideo.appendChild(createDivTxtVideo(media));
        articleVideo.appendChild(createDivControls());
        return articleVideo
    };

    function createElmtVideo(media) {
        const videoPage = document.createElement('video');
        videoPage.setAttribute("controls", 'controls');
        videoPage.className = 'video';
        videoPage.setAttribute("aria-label", title + ', ' + date + ', ' + likes + ', prix : ' + price + '€');
        videoPage.appendChild(createElmtSource(media));
        return videoPage
    };

    function createElmtSource(media) {
        const source = document.createElement('source');
        const videos = `assets/images/${video}`;
        source.setAttribute("src", videos);
        source.setAttribute("type", 'video/mp4');
        source.setAttribute("preload", 'auto');
        source.className = 'source';
        return source
    };

    function createDivTxtVideo(media) {
        const divText = document.createElement('div');
        divText.className = 'photo-text';
        divText.appendChild(createTxtVideo(media));
        divText.appendChild(createSpanUnderPhoto(media));
        return divText
    };

    function createTxtVideo(media) {
        const text = document.createElement('p');
        text.textContent = title;
        text.className = 'title-photo';
        return text
    };

    function createSpanUnderPhoto(media) {
        const spanLikes = document.createElement('span');
        spanLikes.setAttribute("aria-label", 'likes');
        spanLikes.appendChild(createCountLikes(media));
        spanLikes.appendChild(createLikeButton());
        return spanLikes
    };

    function createCountLikes(media) {
        const cptLikes = document.createElement('p');
        cptLikes.textContent = likes;
        cptLikes.className = 'likes';
        return cptLikes
    };

    function createLikeButton() {
        const likebtn = document.createElement('button');
        likebtn.className = '.like-btn';
        likebtn.appendChild(createHeart());
        return likebtn
    };

    function createHeart() {
        const imgHeart = document.createElement('i');
        imgHeart.className = 'fa-solid fa-heart';
        return imgHeart
    };

    function createDivControls() {
        const ariaControls = document.createElement('div');
        ariaControls.className = 'controls';
        ariaControls.appendChild(createBtnPlay());
        ariaControls.appendChild(createBtnStop());
        ariaControls.appendChild(createDiv1Timer());
        ariaControls.appendChild(createBtnRewind());
        ariaControls.appendChild(createBtnForward());
        return ariaControls
    };

    function createBtnPlay() {
        const btnPlay = document.createElement('button');
        btnPlay.className = 'play';
        btnPlay.setAttribute("data-icon", 'P');
        btnPlay.setAttribute("aria-label", 'Play Pause Toggle');
        return btnPlay
    };

    function createBtnStop() {
        const btnStop = document.createElement('button');
        btnStop.className = 'stop';
        btnStop.setAttribute("data-icon", 'S');
        btnStop.setAttribute("aria-label", 'Stop');
        return btnStop
    };

    function createDiv1Timer() {
        const timer = document.createElement('div');
        timer.className = 'timer';
        timer.appendChild(createDiv2Timer());
        timer.appendChild(createSpantimer());
        return timer
    };

    function createDiv2Timer() {
        const div2 = document.createElement('div');
        return div2;
    };

    function createSpantimer() {
        const span = document.createElement('span');
        span.setAttribute("aria-label", 'timer');
        span.textContent = '00:00';
        return span
    };

    function createBtnRewind() {
        const rewind = document.createElement('button');
        rewind.className = 'rwd';
        rewind.setAttribute("data-icon", 'B');
        rewind.setAttribute("aria-label", 'Rewind');
        return rewind
    };

    function createBtnForward() {
        const forward = document.createElement('button');
        forward.className = 'fwd';
        forward.setAttribute("data-icon", 'F');
        forward.setAttribute("aria-label", 'Fast forward');
        return forward
    };

} else {
    return console.log('erreur')
};

function gestionVideo() {
    const gstVideo = document.querySelector('.video');
    const controls = document.querySelector('.controls');
    const play = document.querySelector('.play');
    const stop = document.querySelector('.stop');
    const rwd = document.querySelector('.rwd');
    const fwd = document.querySelector('.fwd');
    const timerWrapper = document.querySelector('.timer');
    const timer = document.querySelector('.timer span');
    const timerBar = document.querySelector('.timer div');
    let intervalFwd;
    let intervalRwd;

    gstVideo.removeAttribute("controls");
    controls.style.visibility = 'visible';
    play.addEventListener('click', playPauseMedia);
    stop.addEventListener('click', stopMedia);
    gstVideo.addEventListener('ended', stopMedia);
    rwd.addEventListener('click', mediaBackward);
    fwd.addEventListener('click', mediaForward);
    gstVideo.addEventListener('timeupdate', setTime);

    function playPauseMedia() {
        rwd.classList.remove('active');
        fwd.classList.remove('active');
        clearInterval(intervalRwd);
        clearInterval(intervalFwd);
        if (gstVideo.paused) {
            play.setAttribute('data-icon', 'u');
            gstVideo.play();
        } else {
            play.setAttribute('data-icon', 'P');
            gstVideo.pause();
        }
    };

    function stopMedia() {
        gstVideo.pause();
        gstVideo.currentTime = 0;
        rwd.classList.remove('active');
        fwd.classList.remove('active');
        clearInterval(intervalRwd);
        clearInterval(intervalFwd);
        play.setAttribute('data-icon', 'P');
    };

    function mediaBackward() {
        clearInterval(intervalFwd);
        fwd.classList.remove('active');

        if (rwd.classList.contains('active')) {
            rwd.classList.remove('active');
            clearInterval(intervalRwd);
            gstVideo.play();
        } else {
            rwd.classList.add('active');
            gstVideo.pause();
            intervalRwd = setInterval(windBackward, 200);
        }
    };

    function mediaForward() {
        clearInterval(intervalRwd);
        rwd.classList.remove('active');

        if (fwd.classList.contains('active')) {
            fwd.classList.remove('active');
            clearInterval(intervalFwd);
            gstVideo.play();
        } else {
            fwd.classList.add('active');
            gstVideo.pause();
            intervalFwd = setInterval(windForward, 200);
        }
    };

    function windBackward() {
        if (gstVideo.currentTime <= 3) {
            stopMedia();
        } else {
            gstVideo.currentTime -= 3;
        }
    };

    function windForward() {
        if (gstVideo.currentTime >= gstVideo.duration - 3) {
            stopMedia();
        } else {
            gstVideo.currentTime += 3;
        }
    };

    function setTime() {
        const minutes = Math.floor(gstVideo.currentTime / 60);
        const seconds = Math.floor(gstVideo.currentTime - minutes * 60);

        const minuteValue = minutes.toString().padStart(2, '0');
        const secondValue = seconds.toString().padStart(2, '0');

        const mediaTime = `${minuteValue}:${secondValue}`;
        timer.textContent = mediaTime;

        const barLength = timerWrapper.clientWidth * (gstVideo.currentTime / gstVideo.duration);
        timerBar.style.width = `${barLength}px`;
    };
};

async function getDataMedia() {
    // remplacer par les données récupérées dans le json
    const media =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.media.filter((object) => object.photographerId == pageId))
        // console.log(media)
        // retourner le tableau photos seulement une fois
    return ({
        media
    })
};
// changement de photographers en media
async function createArticlePhotoVideo(media) {
    const photographiesSection = document.querySelector(".photograph-article");
    // console.log(medias);
    media.forEach((pho) => {
        const photoCardDOM = createArticlePhoto(media);
        const videoCardDOM = createArticleVideo(media);
        photographiesSection.appendChild(photoCardDOM);
        photographiesSection.appendChild(videoCardDOM);
    });
};

async function initArticlePhoto() {
    // Récupère les medias des photographies
    const { media } = await getDataMedia();
    // console.log(media);
    createArticlePhotoVideo(media);
    gestionVideo();
};
initArticlePhoto();