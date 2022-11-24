initHeaderPhotographe()

async function initHeaderPhotographe() {
    // Récupère les datas des photographes
    let photographer = await getDataHeader();
    // console.log(photographer[0]);
    createHeader(photographer[0]);
};

async function getDataHeader() {
    // remplacer par les données récupérées dans le json
    let params = (new URL(document.location)).searchParams;
    let pageId = params.get('id');
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
    const articleHeader = createArticleHeader(photographer);
    photographersHeader.appendChild(articleHeader);
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
    likesTarifs.appendChild(createSpanCount());
    likesTarifs.appendChild(PricePerDay(photographer));
    return likesTarifs
};

function createSpanCount() {
    const span = document.createElement('span');
    span.className = 'span__count'
    span.appendChild(createPCount());
    span.appendChild(createHeartCount());
    return span
};

function createPCount() {
    const nbr = document.createElement('p');
    nbr.className = 'cmptlikes';
    nbr.innerText = '0';
    return nbr
};

function createHeartCount() {
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

initArticlePhoto()

async function initArticlePhoto() {
    // Récupère les medi
    const { media } = await getDataMedia();
    // console.log(media);
    createArticlePhotoVideo(media);
    gestionVideo();
};
async function getDataMedia() {
    // remplacer par les données récupérées dans le json
    let params = (new URL(document.location)).searchParams;
    let pageId = params.get('id');
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
    let index = 0;
    media.forEach((media) => {
        if (object = media.image) {
            const photoCardDOM = createArticlePhoto(media, index);
            photographiesSection.appendChild(photoCardDOM);
        } else if (object = media.video) {
            const videoCardDOM = createArticleVideo(media, index);
            photographiesSection.appendChild(videoCardDOM);
        } else { console.log('erreur') };
        index++;
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

function createArticlePhoto(media, index) {
    const articlePhoto = document.createElement('article');
    articlePhoto.className = 'article-Photo';
    articlePhoto.appendChild(createLinkLightboxImages(media, index));
    articlePhoto.appendChild(createDivUnderPhoto(media));
    return articlePhoto
};

function createArticleVideo(media, index) {
    const articleVideo = document.createElement('article');
    articleVideo.className = 'article-video';
    articleVideo.appendChild(createLinkLightboxVideo(media, index));
    articleVideo.appendChild(createDivControls());
    articleVideo.appendChild(createDivTxtVideo(media));
    return articleVideo
};
// Photo
function createLinkLightboxImages(media, index) {
    const linkLightbox = document.createElement('a');
    const pictures = `assets/images/${media.image}`;
    linkLightbox.setAttribute("href", pictures);
    linkLightbox.setAttribute("aria-label", media.title);
    linkLightbox.className = 'lightboxable';
    linkLightbox.appendChild(createImgMedia(media));
    linkLightbox.dataset.index = index;
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
    const cptLikes = document.createElement('div');
    cptLikes.textContent = media.likes;
    cptLikes.className = 'likes';
    return cptLikes
};

function createLikeButton(media) {
    const likebtn = document.createElement('button')
    likebtn.className = 'like-btn'
    likebtn.appendChild(createHeart())
    return likebtn
};
// Photo
// Video
function createLinkLightboxVideo(media, index) {
    const linkLightbox = document.createElement('a');
    const videos = `assets/images/${media.video}`;
    linkLightbox.setAttribute("href", videos);
    linkLightbox.setAttribute("type", 'video/mp4');
    linkLightbox.className = 'lightboxable';
    linkLightbox.appendChild(createElmtVideo(media));
    linkLightbox.dataset.index = index;
    return linkLightbox
};

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
    divText.appendChild(createSpanUnderVideo(media));
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

function createSpanUnderVideo(media) {
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

function createHeart() {
    const imgHeart = document.createElement('img');
    imgHeart.className = 'regular__heart';
    imgHeart.setAttribute("src", "./assets/icons/heart-regular.svg");
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
const modal = document.getElementById("contact_modal");
const focusableSelector = 'img, input, button';
let focusables = [];
let previouslyFocusedElement = null;

function displayModal() {
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-modal', true);
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(':focus')
    focusables[0].focus()
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal').addEventListener('click', stopPropagation);
    focusInModal();
    windowEvent();
};

function closeModal() {
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

function focusInModal() {
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
};

function windowEvent() {
    window.addEventListener('keydown', function(e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(e)
        }
        if (e.key === 'Tab') {
            focusInModal(e)
        }
    });
};
// Modale de contact
//Events
changeForName();

function changeForName() {
    const forName = document.getElementById("prenom");
    forName.addEventListener('change', function() {
        validForName(this);
    });
};

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

changeBirthName();

function changeBirthName() {
    const birthName = document.getElementById("nom");
    birthName.addEventListener('change', function() {
        validBirthName(this);
    });
};

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

changeEmail();

function changeEmail() {
    const email = document.getElementById("email");
    email.addEventListener('change', function() {
        validEmail(this);
    });
};
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

changeMessage();

function changeMessage() {
    const message = document.getElementById("message");
    message.addEventListener('change', function() {
        validMessage(this);
    });
};

const validMessage = function(inputMessage) {
    console.log(inputMessage.value);
};
//Events
//Cpt Likes
compteurLikes();

async function compteurLikes() {
    const { media } = await getDataMedia();
    handleLikesButton();
    addLikescounter();
};

function handleLikesButton() {
    const btnLike = document.querySelectorAll('.like-btn');
    // console.log(btnLike);
    btnLike.forEach(button => button.addEventListener('click', function(event) {
        const totallikes = document.querySelector('.cmptlikes');
        console.log(totallikes.innerHTML);
        event.currentTarget.getAttribute("src");
        console.log(event.currentTarget.firstChild.getAttribute("src"));
        if (event.currentTarget.firstChild.getAttribute("src") == './assets/icons/heart-solid.svg') {
            // console.log(2);
            event.currentTarget.firstChild.setAttribute("src", './assets/icons/heart-regular.svg');
            event.currentTarget.previousSibling.innerHTML--
                totallikes.innerHTML--
        } else {
            // console.log(1);
            event.currentTarget.firstChild.setAttribute("src", './assets/icons/heart-solid.svg');
            event.currentTarget.previousSibling.innerHTML++
                totallikes.innerHTML++
        }
    }));
};

function addLikescounter() {
    const totallike = document.querySelectorAll('.likes');
    const arrayTotallike = Array.from(totallike);
    // console.log(arrayTotallike);
    let toto = 0;
    for (let i = 0; i < arrayTotallike.length; i++) {
        let like = arrayTotallike[i].innerText;
        // console.log(like);
        toto += parseInt(like);
    };
    document.querySelector('.cmptlikes').innerText = toto;
    // console.log(toto)
};
//Cpt Likes
//Lightbox
manageEventlistener();
async function manageEventlistener() {
    const { media } = await getDataMedia();
    let getLiens = document.querySelectorAll('.lightboxable');
    for (let i = 0; i < getLiens.length; i++) {
        let lien = getLiens[i];
        lien.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
        })
    };
};
launchLightbox();

async function launchLightbox() {
    const { media } = await getDataMedia();
    const src = document.querySelectorAll(".lightboxable[href]");

    src.forEach(link => link.addEventListener('click', function(event) {
        let photo = event.currentTarget.getAttribute("href");
        let indexPhoto = event.currentTarget.dataset.index;
        lightbox();
        show(photo, indexPhoto);
    }));
};

function lightbox() {
    lightboxAppear();
    manageLigthboxButtons();
}

function lightboxAppear() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = "block";
    lightbox.setAttribute('aria-hidden', false);
};

function manageLigthboxButtons() {
    manageNextButton();
    managePrevButton();
    manageCloseButton()
}

function manageNextButton() {
    const btnNext = document.querySelector(".lightbox__next");
    btnNext.addEventListener('click', function(event) {
        event.preventDefault();
        next();
    });
}

function next() {
    const photo = document.querySelector('.lightbox-image');
    const video = document.querySelector('.lightbox-video');
    let media
    if (photo.style.display == 'block') {
        media = photo;
    } else if (video.style.display == 'block') {
        media = video
    };
    let gallery = document.querySelectorAll('.lightboxable');
    let currentIndex = parseInt(media.dataset.index);
    let nextIndex = currentIndex + 1;
    if (nextIndex > gallery.length - 1) {
        nextIndex = 0;
    };
    console.log(currentIndex, nextIndex, gallery.length);
    let nextSrc = "";
    gallery.forEach(function(link) {
        if (parseInt(link.dataset.index) == nextIndex) {
            nextSrc = link.getAttribute('href');
        }
    });
    show(nextSrc, nextIndex);
};

function managePrevButton() {
    const btnPrev = document.querySelector(".lightbox__prev");
    btnPrev.addEventListener('click', function(event) {
        event.preventDefault();
        prev();
    });
};

function prev() {
    const photo = document.querySelector('.lightbox-image');
    const video = document.querySelector('.lightbox-video');
    let media
    if (photo.style.display == 'block') {
        media = photo;
    } else if (video.style.display == 'block') {
        media = video
    };
    let gallery = document.querySelectorAll('.lightboxable');
    let currentIndex = parseInt(media.dataset.index);
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) {
        prevIndex = gallery.length - 1;
    };
    let prevSrc = "";
    gallery.forEach(function(link) {
        if (parseInt(link.dataset.index) == prevIndex) {
            prevSrc = link.getAttribute('href');
        }
    });
    show(prevSrc, prevIndex);
};

function show(media, indexPhoto) {
    if (media.split(".").pop() == "jpg") {
        showPhoto(media, indexPhoto);
    } else if (media.split(".").pop() == "mp4") {
        showVideo(media, indexPhoto);
    }
};

function showPhoto(photo, indexPhoto) {
    const source = document.querySelector('.lightbox-video');
    source.style.display = "none";
    source.dataset.index = "";
    source.setAttribute('src', "");
    const img = document.querySelector('.lightbox-image');
    img.style.display = "block";
    img.setAttribute("src", photo);
    img.dataset.index = indexPhoto;
};

function showVideo(video, indexPhoto) {
    const img = document.querySelector('.lightbox-image');
    img.style.display = "none";
    img.setAttribute('src', "");
    img.dataset.index = "";
    const source = document.querySelector('.lightbox-video');
    source.style.display = "block";
    source.setAttribute("src", video);
    source.setAttribute("controls", 'controls');
    source.dataset.index = indexPhoto;
};

function manageCloseButton() {
    const btnclose = document.querySelector(".lightbox__close");
    btnclose.addEventListener('click', function(event) {
        event.preventDefault();
        closeLightbox();
    });
};

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const imgLightbox = document.querySelector('.lightbox-image');
    const source = document.querySelector('lightbox-video');
    lightbox.style.display = "none";
    lightbox.setAttribute('aria-hidden', true);
    imgLightbox.removeAttribute("src");
    imgLightbox.style.display = "none";
    source.removeAttribute("src");
    source.style.display = "none";
};

// navigation clavier
manageNavClavier();
async function manageNavClavier() {
    const { media } = await getDataMedia();
    navClavierPagePhotographe();
};

function navClavierPagePhotographe() {
    const main = document.querySelector("body");
    const selectors = 'a, button';
    console.log(selectors);
    let focusable = [];
    focusable = Array.from(main.querySelectorAll(selectors));
    console.log(focusable);
    let previousFocusedElement = null;

    previousFocusedElement = document.querySelector(':focus');
    focusable[0].focus();
    if (previousFocusedElement !== null) previousFocusedElement.focus();
    const focusInMain = (e) => {
        e.preventDefault();
        let index = focusable.findIndex(f => f === main.querySelector(':focus'));
        if (e.shiftKey === true) {
            index--;
        } else {
            index++;
        }
        if (index >= focusable.length) {
            index = 0;
        }
        if (index < 0) {
            index = focusable.length - 1;
        }
        focusable[index].focus();
    };

    main.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            focusInMain(e)
        }
    });
};