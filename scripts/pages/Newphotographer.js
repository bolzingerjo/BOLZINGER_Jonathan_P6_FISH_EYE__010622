let params = (new URL(document.location)).searchParams;
let pageId = params.get('id');

initHeaderPhotographe();

async function initHeaderPhotographe() {
    // Récupère les datas des photographes
    let photographer = await getDataHeader();
    // console.log(photographer[0]);
    createHeader(photographer[0]);
};

async function getDataHeader() {
    // remplacer par les données récupérées dans le json
    const photographer =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.photographers.filter((object) => object.id == pageId))
        // console.log(photographers);
        // retourner le tableau photographers seulement une fois
    return (
        photographer
    )
};

async function createHeader(photographer) {
    const photographersHeader = document.querySelector(".photograph-header");
    // photographer.forEach((photographer) => {
    const articleHeader = createArticleHeader(photographer);
    photographersHeader.appendChild(articleHeader);
    // });
};

function createArticleHeader(photographer) {
    const main = document.querySelector('main');
    const article = document.createElement('article');
    article.className = 'article-header';
    article.appendChild(createDiv(photographer));
    article.appendChild(createBtnModal());
    article.appendChild(createImgHeader(photographer));
    main.appendChild(createLikeCount(photographer));
    createTitleModal(photographer);
    return article
};

function createDiv(photographer) {
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

function createImgHeader(photographer) {
    const img = document.createElement('img');
    let picture = `assets/photographers/${photographer.portrait}`;
    img.setAttribute("src", picture);
    img.setAttribute("alt", photographer.name);
    img.className = 'img-Page';
    return img
};

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

function createTitleModal(photographer) {
    const h2 = document.querySelector('#title-modal');
    h2.innerText = 'Contactez-moi ' + photographer.name;
    return h2
};

initArticlePhoto();

async function initArticlePhoto() {
    // Récupère les medias des photographies
    const { media } = await getDataMedia();
    // console.log(media);
    createArticlePhotoVideo(media);
    gestionVideo();
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
async function createArticlePhotoVideo(media) {
    const photographiesSection = document.querySelector(".photograph-article");
    media.forEach((media) => {
        const photoCardDOM = createArticlePhoto(media);
        const videoCardDOM = createArticleVideo(media);
        if (object = media.image) {
            photographiesSection.appendChild(photoCardDOM);
        };
        if (object = media.video) {
            photographiesSection.appendChild(videoCardDOM);
        };
    });
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

function createArticlePhoto(media) {
    const articlePhoto = document.createElement('article');
    articlePhoto.className = 'article-Photo';
    articlePhoto.appendChild(createLinkLightbox(media));
    articlePhoto.appendChild(createDivUnderPhoto(media));
    return articlePhoto
};

function createArticleVideo(media) {
    const articleVideo = document.createElement('article');
    articleVideo.className = 'article-video';
    articleVideo.appendChild(createElmtVideo(media));
    articleVideo.appendChild(createDivTxtVideo(media));
    articleVideo.appendChild(createDivControls());
    return articleVideo
};
//Photo
function createLinkLightbox(media) {
    const linkLightbox = document.createElement('a');
    const pictures = `assets/images/${media.image}`;
    linkLightbox.setAttribute("href", pictures);
    linkLightbox.setAttribute("aria-label", media.title);
    linkLightbox.setAttribute("onclick", "lightbox()");
    linkLightbox.className = 'lightboxable';
    linkLightbox.appendChild(createImgMedia(media));
    return linkLightbox
};

function createImgMedia(media) {
    const photos = document.createElement('img');
    const pictures = `assets/images/${media.image}`;
    photos.setAttribute("src", pictures);
    photos.setAttribute("role", 'link');
    photos.setAttribute("alt", media.title + ', ' + media.date + ', ' + media.likes + ', prix : ' + media.price + '€');
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
    text.textContent = media.title;
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
    cptLikes.textContent = media.likes;
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
// Photo
//Video
function createElmtVideo(media) {
    const videoPage = document.createElement('video');
    videoPage.setAttribute("controls", 'controls');
    videoPage.className = 'video';
    videoPage.setAttribute("aria-label", media.title + ', ' + media.date + ', ' + media.likes + ', prix : ' + media.price + '€');
    videoPage.appendChild(createElmtSource(media));
    return videoPage
};

function createDivTxtVideo(media) {
    const divText = document.createElement('div');
    divText.className = 'photo-text';
    divText.appendChild(createTxtVideo(media));
    divText.appendChild(createSpanUnderPhoto(media));
    return divText
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

function createElmtSource(media) {
    const source = document.createElement('source');
    const videos = `assets/images/${media.video}`;
    source.setAttribute("src", videos);
    source.setAttribute("type", 'video/mp4');
    source.setAttribute("preload", 'auto');
    source.className = 'source';
    return source
};

function createTxtVideo(media) {
    const text = document.createElement('p');
    text.textContent = media.title;
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

function createCountLikes(media) {
    const cptLikes = document.createElement('p');
    cptLikes.textContent = media.likes;
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
//Video
//Trier
trierPop();

async function trierPop() {
    //trier par popularité
    const boutonTrier = document.querySelector(".btn-pop");
    const { media } = await getDataMedia();
    boutonTrier.addEventListener("click", function() {
        const mediasTrierPop = Array.from(media);
        mediasTrierPop.sort(function(a, b) {
            return b.likes - a.likes;
        });
        // console.log(mediasTrierPop);
        document.querySelector(".photograph-article").innerHTML = "";
        createArticlePhotoVideo(mediasTrierPop);
    });
};

trierDate();

async function trierDate() {
    //trier par date
    const boutonDate = document.querySelector(".btn-date");
    const { media } = await getDataMedia();
    boutonDate.addEventListener("click", function() {
        const mediasTrierDate = Array.from(media);
        mediasTrierDate.sort(function(a, b) {
            return b.date.localeCompare(a.date);
        });
        // console.log(mediasTrierDate);
        document.querySelector(".photograph-article").innerHTML = "";
        createArticlePhotoVideo(mediasTrierDate);
    });
};

trierTitre();

async function trierTitre() {
    //trier par titre
    const boutonTitre = document.querySelector(".btn-titre");
    const { media } = await getDataMedia();
    boutonTitre.addEventListener("click", function() {
        const mediasTrierTitre = Array.from(media);
        mediasTrierTitre.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
        // console.log(mediasTrierTitre);
        document.querySelector(".photograph-article").innerHTML = "";
        createArticlePhotoVideo(mediasTrierTitre);
    });
};

//Trier
// Modale de contact
const focusableSelector = 'img, input, button';
let focusables = [];
let previouslyFocusedElement = null;
const modal = document.getElementById("contact_modal");

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-modal', true);
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(':focus')
    focusables[0].focus()
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal').addEventListener('click', stopPropagation);
};

function closeModal() {
    const modal = document.getElementById("contact_modal");
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-modal', false);
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.modal').removeEventListener('click', stopPropagation);
};
const stopPropagation = function(e) {
    e.stopPropagation()
};

const focusInModal = function(e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
};

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab') {
        focusInModal(e)
    }
});

// DOM Elements
const forName = document.getElementById("prenom");
const birthName = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");
const ferm = document.querySelector(".contact_button");

forName.addEventListener('change', function() {
    validForName(this);
});
const validForName = function(inputForName) {
    let smallForName = document.querySelector("#prenom-small");
    // console.log(inputForName);
    console.log(inputForName.value);
    if (inputForName.value.length >= 2) {
        // smallForName.innerHTML = 'Prénom valide'
        // smallForName.style.color = "green"
        smallForName.innerHTML = ''
        return true
    } else {
        smallForName.innerHTML = 'le prénom doit contenir au moins 2 lettres'
        smallForName.style.color = "red"
        return false
    }
};

birthName.addEventListener('change', function() {
    validBirthName(this);
});
const validBirthName = function(inputBirthName) {
    let smallBirthName = document.querySelector("#nom-small");
    // console.log(inputBirthName);
    console.log(inputBirthName.value);
    if (inputBirthName.value.length >= 2) {
        // smallBirthName.innerHTML = 'Nom valide'
        // smallBirthName.style.color = "green"
        smallBirthName.innerHTML = ''
        return true
    } else {
        smallBirthName.innerHTML = 'Le nom doit contenir au moins 2 lettres'
        smallBirthName.style.color = "red"
        return false
    }
};

email.addEventListener('change', function() {
    validEmail(this);
});
// création regex pour validation email
const validEmail = function(inputEmail) {
    let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let testEmail = emailRegex.test(inputEmail.value);
    let small = document.querySelector("#email-small");
    // console.log(testEmail);
    console.log(inputEmail.value);
    if (emailRegex.test(inputEmail.value)) {
        // small.innerHTML = 'Adresse valide'
        // small.style.color = "green"
        small.innerHTML = ''
        return true
    } else {
        small.innerHTML = 'Adresse non valide'
        small.style.color = "red"
        return false
    };
};

message.addEventListener('change', function() {
    validMessage(this);
});
const validMessage = function(inputMessage) {
    console.log(inputMessage.value);
};