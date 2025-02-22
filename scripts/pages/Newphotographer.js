initHeaderPhotographe()
    // Récupère les datas du photographe
async function initHeaderPhotographe() {
    const photographer = await getDataHeader()
    createHeader(photographer[0])
};
// remplacer par les données récupérées dans le json
async function getDataHeader() {
    const params = (new URL(document.location)).searchParams
    const pageId = params.get('id')
    const photographer =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.photographers.filter((object) => object.id == pageId))
        // retourner le tableau photographer seulement une fois
    return (
        photographer
    )
};
// creation du header
async function createHeader(photographer) {
    const photographersHeader = document.querySelector('.photograph-header')
    const articleHeader = createArticleHeaderFactory(photographer)
    photographersHeader.appendChild(articleHeader)
};
// Factory header
function createArticleHeaderFactory(photographer) {
    const main = document.querySelector('main')
    const article = document.createElement('article')
    article.className = 'article-header'
    article.appendChild(createDiv(photographer))
    article.appendChild(createBtnModal())
    article.appendChild(createImgHeader(photographer))
    main.appendChild(createLikeCount(photographer))
    createTitleModal(photographer)
        // div englobante
    function createDiv(photographer) {
        const div1 = document.createElement('div')
        div1.appendChild(createNamePage(photographer))
        div1.appendChild(createWherePage(photographer))
        div1.appendChild(createTagPage(photographer))
        return div1
    };
    // bouton de la modale
    function createBtnModal() {
        const btnmodal = document.querySelector('.contact_button ')
        return btnmodal
    };
    // Récup de la photo de profil
    function createImgHeader(photographer) {
        const img = document.createElement('img')
        const picture = `assets/photographers/${photographer.portrait}`
        img.setAttribute('src', picture)
        img.setAttribute('alt', photographer.name)
        img.className = 'img-Page'
        return img
    };
    // Compteur de likes
    function createLikeCount(photographer) {
        const likesTarifs = document.createElement('div')
        likesTarifs.className = 'comptLikes'
        likesTarifs.appendChild(createSpanCount())
        likesTarifs.appendChild(PricePerDay(photographer))
        return likesTarifs
    };
    // Span compteur de likes
    function createSpanCount() {
        const span = document.createElement('span')
        span.className = 'span__count'
        span.appendChild(createPCount())
        span.appendChild(createHeartCount())
        return span
    };
    // P compteur de likes
    function createPCount() {
        const nbr = document.createElement('p')
        nbr.className = 'cmptlikes'
        nbr.innerText = '0'
        return nbr
    };
    // Icon compteur de likes
    function createHeartCount() {
        const imgHeart = document.createElement('i')
        imgHeart.className = 'fa-solid fa-heart'
        return imgHeart
    };
    // tarif journalier en bas
    function PricePerDay(photographer) {
        const prix = document.createElement('p');
        prix.innerText = photographer.price + '€/jour';
        return prix
    };
    // nom du photographe
    function createNamePage(photographer) {
        const h1 = document.createElement('h1')
        h1.textContent = photographer.name
        h1.className = 'name-Page'
        return h1
    };
    // lieux du photographe
    function createWherePage(photographer) {
        const where = document.createElement('p')
        where.textContent = photographer.city + ', ' + photographer.country
        where.className = 'where-Page'
        return where
    };
    // Tagline
    function createTagPage(photographer) {
        const tag = document.createElement('p')
        tag.textContent = photographer.tagline
        tag.className = 'tag-Page'
        return tag
    };
    // Titre de la modale
    function createTitleModal(photographer) {
        const h2 = document.querySelector('#title-modal');
        h2.innerText = 'Contactez-moi ' + photographer.name;
        return h2
    };
    return article
};

openUlSecondaire()
    // bouton de tri cachés
function openUlSecondaire() {
    const btnUlSecondaire = document.querySelector('.btn-fermer')
    btnUlSecondaire.addEventListener('click', function(event) {
        event.preventDefault()
        const getClassBtn = event.currentTarget.getAttribute('class')
        if (getClassBtn === 'btn-fermer') {
            const button = document.querySelector('.chevron')
            button.setAttribute('src', './assets/icons/chevron-down-solid.svg')
            btnUlSecondaire.setAttribute('class', 'btn-ouvert')
            const ulSecondaire = document.querySelector('.ulSecondaire')
            ulSecondaire.style.visibility = 'visible'
            ulSecondaire.style.opacity = '1'
            const ulPrincipale = document.querySelector('.ulPrincipale')
            ulPrincipale.style.borderRadius = '5px 5px 0px 0px'
        } else if (getClassBtn === 'btn-ouvert') {
            const button = document.querySelector('.chevron')
            button.setAttribute('src', './assets/icons/chevron-up-solid.svg')
            btnUlSecondaire.setAttribute('class', 'btn-fermer')
            const ulSecondaire = document.querySelector('.ulSecondaire')
            ulSecondaire.style.visibility = 'hidden'
            ulSecondaire.style.opacity = '0'
            const ulPrincipale = document.querySelector('.ulPrincipale')
            ulPrincipale.style.borderRadius = '5px'
        };
    })
};

initArticlePhoto()
    // Récupère les medias
async function initArticlePhoto() {
    const { media } = await getDataMedia()
    createArticlePhotoVideo(media)
    gestionVideo()
};
// remplacer les données récupérées dans le json
async function getDataMedia() {
    const params = (new URL(document.location)).searchParams
    const pageId = params.get('id')
    const media =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.media.filter((object) => object.photographerId == pageId))
        // retourner le tableau photos seulement une fois
    return ({
        media
    })
};
// factory page photographe
async function createArticlePhotoVideo(media) {
    const photographiesSection = document.querySelector('.photograph-article')
    let index = 0
    media.forEach((media) => {
        if (object = media.image) {
            const photoCardDOM = createArticlePhotoFactory(media, index)
            photographiesSection.appendChild(photoCardDOM)
        } else if (object = media.video) {
            const videoCardDOM = createArticleVideoFactory(media, index)
            photographiesSection.appendChild(videoCardDOM)
        } else { console.log('erreur') }
        index++
    })
};
// gestion accessibilité des videos
function gestionVideo() {
    const gstVideo = document.querySelector('.video')
    const controls = document.querySelector('.controls')
    const play = document.querySelector('.play')
    const stop = document.querySelector('.stop')
    const rwd = document.querySelector('.rwd')
    const fwd = document.querySelector('.fwd')
    const timerWrapper = document.querySelector('.timer')
    const timer = document.querySelector('.timer span')
    const timerBar = document.querySelector('.timer div')
    let intervalFwd
    let intervalRwd

    gstVideo.removeAttribute('controls')
    controls.style.visibility = 'visible'
    play.addEventListener('click', playPauseMedia)
    stop.addEventListener('click', stopMedia)
    gstVideo.addEventListener('ended', stopMedia)
    rwd.addEventListener('click', mediaBackward)
    fwd.addEventListener('click', mediaForward)
    gstVideo.addEventListener('timeupdate', setTime)

    function playPauseMedia() {
        rwd.classList.remove('active')
        fwd.classList.remove('active')
        clearInterval(intervalRwd)
        clearInterval(intervalFwd)
        if (gstVideo.paused) {
            play.setAttribute('data-icon', 'u')
            gstVideo.play();
        } else {
            play.setAttribute('data-icon', 'P')
            gstVideo.pause()
        }
    };

    function stopMedia() {
        gstVideo.pause()
        gstVideo.currentTime = 0
        rwd.classList.remove('active')
        fwd.classList.remove('active')
        clearInterval(intervalRwd)
        clearInterval(intervalFwd)
        play.setAttribute('data-icon', 'P')
    };

    function mediaBackward() {
        clearInterval(intervalFwd)
        fwd.classList.remove('active')

        if (rwd.classList.contains('active')) {
            rwd.classList.remove('active')
            clearInterval(intervalRwd)
            gstVideo.play()
        } else {
            rwd.classList.add('active')
            gstVideo.pause()
            intervalRwd = setInterval(windBackward, 200)
        }
    };

    function mediaForward() {
        clearInterval(intervalRwd)
        rwd.classList.remove('active')

        if (fwd.classList.contains('active')) {
            fwd.classList.remove('active')
            clearInterval(intervalFwd)
            gstVideo.play()
        } else {
            fwd.classList.add('active')
            gstVideo.pause()
            intervalFwd = setInterval(windForward, 200)
        }
    };

    function windBackward() {
        if (gstVideo.currentTime <= 3) {
            stopMedia()
        } else {
            gstVideo.currentTime -= 3
        }
    };

    function windForward() {
        if (gstVideo.currentTime >= gstVideo.duration - 3) {
            stopMedia()
        } else {
            gstVideo.currentTime += 3
        }
    };

    function setTime() {
        const minutes = Math.floor(gstVideo.currentTime / 60)
        const seconds = Math.floor(gstVideo.currentTime - minutes * 60)

        const minuteValue = minutes.toString().padStart(2, '0')
        const secondValue = seconds.toString().padStart(2, '0')

        const mediaTime = `${minuteValue}:${secondValue}`
        timer.textContent = mediaTime

        const barLength = timerWrapper.clientWidth * (gstVideo.currentTime / gstVideo.duration);
        timerBar.style.width = `${barLength}px`
    };
};
// Photo
function createArticlePhotoFactory(media, index) {
    const articlePhoto = document.createElement('article')
    articlePhoto.className = 'article-Photo'
    articlePhoto.appendChild(createLinkLightboxImages(media, index))
    articlePhoto.appendChild(createDivUnderPhoto(media))

    function createLinkLightboxImages(media, index) {
        const linkLightbox = document.createElement('a')
        const pictures = `assets/images/${media.image}`
        linkLightbox.setAttribute('href', pictures)
        linkLightbox.setAttribute('aria-label', media.title)
        linkLightbox.setAttribute('tabindex', '0')
        linkLightbox.className = 'lightboxable'
        linkLightbox.appendChild(createImgMedia(media))
        linkLightbox.dataset.index = index
        return linkLightbox
    };

    function createImgMedia(media) {
        const photos = document.createElement('img')
        const pictures = `assets/images/${media.image}`
        photos.setAttribute('src', pictures)
        photos.setAttribute('role', 'link')
        photos.setAttribute('alt', media.title + ', ' + media.date + ', ' + media.likes + ', prix : ' + media.price + '€')
        photos.className = 'photobook'
        return photos
    };

    function createDivUnderPhoto(media) {
        const divText = document.createElement('div')
        divText.className = 'photo-text'
        divText.appendChild(createTitleUnderPhoto(media))
        divText.appendChild(createSpanUnderPhoto(media))
        return divText
    };

    function createTitleUnderPhoto(media) {
        const text = document.createElement('p')
        text.textContent = media.title
        text.className = 'title-photo'
        return text
    };

    function createSpanUnderPhoto(media) {
        const spanLikes = document.createElement('span')
        spanLikes.setAttribute('aria-label', 'likes')
        spanLikes.appendChild(createCountLikes(media))
        spanLikes.appendChild(createLikeButton(media))
        return spanLikes
    };

    function createCountLikes(media) {
        const cptLikes = document.createElement('div')
        cptLikes.textContent = media.likes
        cptLikes.className = 'likes'
        return cptLikes
    };

    function createLikeButton(media) {
        const likebtn = document.createElement('button')
        likebtn.className = 'like-btn'
        likebtn.setAttribute('tabindex', '0')
        likebtn.setAttribute('aria-label', 'Like button')
        likebtn.appendChild(createHeart())
        return likebtn
    };

    function createHeart() {
        const imgHeart = document.createElement('img')
        imgHeart.className = 'regular__heart'
        imgHeart.setAttribute('src', './assets/icons/heart-regular.svg')
        return imgHeart
    };
    return articlePhoto
};
// Photo
// Video
function createArticleVideoFactory(media, index) {
    const articleVideo = document.createElement('article')
    articleVideo.className = 'article-video'
    articleVideo.appendChild(createLinkLightboxVideo(media, index))
    articleVideo.appendChild(createDivControls())
    articleVideo.appendChild(createDivTxtVideo(media))

    function createLinkLightboxVideo(media, index) {
        const linkLightbox = document.createElement('a')
        const videos = `assets/images/${media.video}`
        linkLightbox.setAttribute('href', videos)
        linkLightbox.setAttribute('type', 'video/mp4')
        linkLightbox.setAttribute('aria-label', media.title)
        linkLightbox.setAttribute('tabindex', '0')
        linkLightbox.className = 'lightboxable'
        linkLightbox.appendChild(createElmtVideo(media))
        linkLightbox.dataset.index = index
        return linkLightbox
    };

    function createElmtVideo(media) {
        const videoPage = document.createElement('video')
        videoPage.setAttribute('controls', 'controls')
        videoPage.className = 'video'
        videoPage.setAttribute('aria-label', media.title + ', ' + media.date + ', ' + media.likes + ', prix : ' + media.price + '€')
        videoPage.appendChild(createElmtSource(media))
        return videoPage
    };

    function createDivTxtVideo(media) {
        const divText = document.createElement('div')
        divText.className = 'photo-text'
        divText.appendChild(createTxtVideo(media))
        divText.appendChild(createSpanUnderVideo(media))
        return divText
    };

    function createDivControls() {
        const ariaControls = document.createElement('div')
        ariaControls.className = 'controls'
        ariaControls.appendChild(createBtnPlay())
        ariaControls.appendChild(createBtnStop())
        ariaControls.appendChild(createDiv1Timer())
        ariaControls.appendChild(createBtnRewind())
        ariaControls.appendChild(createBtnForward())
        return ariaControls
    };

    function createElmtSource(media) {
        const source = document.createElement('source')
        const videos = `assets/images/${media.video}`
        source.setAttribute('src', videos)
        source.setAttribute('type', 'video/mp4')
        source.setAttribute('preload', 'auto')
        source.className = 'source'
        return source
    };

    function createTxtVideo(media) {
        const text = document.createElement('p')
        text.textContent = media.title
        text.className = 'title-photo'
        return text
    };

    function createSpanUnderVideo(media) {
        const spanLikes = document.createElement('span')
        spanLikes.setAttribute('aria-label', 'likes')
        spanLikes.appendChild(createCountLikes(media))
        spanLikes.appendChild(createLikeButton())
        return spanLikes
    };

    function createBtnPlay() {
        const btnPlay = document.createElement('button')
        btnPlay.className = 'play'
        btnPlay.setAttribute('data-icon', 'P')
        btnPlay.setAttribute('aria-label', 'Play Pause Toggle')
        return btnPlay
    };

    function createBtnStop() {
        const btnStop = document.createElement('button')
        btnStop.className = 'stop'
        btnStop.setAttribute('data-icon', 'S')
        btnStop.setAttribute('aria-label', 'Stop')
        return btnStop
    };

    function createDiv1Timer() {
        const timer = document.createElement('div')
        timer.className = 'timer'
        timer.appendChild(createDiv2Timer())
        timer.appendChild(createSpantimer())
        return timer
    };

    function createDiv2Timer() {
        const div2 = document.createElement('div')
        return div2
    };

    function createSpantimer() {
        const span = document.createElement('span')
        span.setAttribute('aria-label', 'timer')
        span.textContent = '00:00'
        return span
    };

    function createBtnRewind() {
        const rewind = document.createElement('button')
        rewind.className = 'rwd'
        rewind.setAttribute('data-icon', 'B')
        rewind.setAttribute('aria-label', 'Rewind')
        return rewind
    };

    function createBtnForward() {
        const forward = document.createElement('button')
        forward.className = 'fwd'
        forward.setAttribute('data-icon', 'F')
        forward.setAttribute('aria-label', 'Fast forward')
        return forward
    };

    function createCountLikes(media) {
        const cptLikes = document.createElement('div')
        cptLikes.textContent = media.likes
        cptLikes.className = 'likes'
        return cptLikes
    };

    function createLikeButton(media) {
        const likebtn = document.createElement('button')
        likebtn.className = 'like-btn'
        likebtn.setAttribute('tabindex', '0')
        likebtn.setAttribute('aria-label', 'Like button')
        likebtn.appendChild(createHeart())
        return likebtn
    };

    function createHeart() {
        const imgHeart = document.createElement('img')
        imgHeart.className = 'regular__heart'
        imgHeart.setAttribute("src", "./assets/icons/heart-regular.svg")
        return imgHeart
    };
    return articleVideo
};
//Video

//Trier
trierPopAuChargement();
async function trierPopAuChargement() {
    const { media } = await getDataMedia();
    const mediasTrierPop = Array.from(media);
    mediasTrierPop.sort(function(a, b) {
        return b.likes - a.likes;
    });
    document.querySelector(".photograph-article").innerHTML = "";
    createArticlePhotoVideo(mediasTrierPop);
};

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
        const firstButton = document.querySelector('#btn-first');
        const secondButton = document.querySelector("#btn-second");
        const thirdButton = document.querySelector("#btn-third");
        firstButton.innerText = "Popularité";
        firstButton.classList = "btn-pop";
        secondButton.innerText = "Date";
        secondButton.classList = "btn-date";
        thirdButton.innerText = "Titre";
        thirdButton.classList = "btn-titre";
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
        const firstButton = document.querySelector('#btn-first');
        const secondButton = document.querySelector("#btn-second");
        const thirdButton = document.querySelector("#btn-third");
        firstButton.innerText = "Date";
        firstButton.classList = "btn-date";
        secondButton.innerText = "Popularité";
        secondButton.classList = "btn-pop";
        thirdButton.innerText = "Titre";
        thirdButton.classList = "btn-titre";
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
        const firstButton = document.querySelector('#btn-first');
        const secondButton = document.querySelector("#btn-second");
        const thirdButton = document.querySelector("#btn-third");
        firstButton.innerText = "Titre";
        firstButton.classList = "btn-titre";
        secondButton.innerText = "Date";
        secondButton.classList = "btn-date";
        thirdButton.innerText = "Popularité";
        thirdButton.classList = "btn-pop";
        document.querySelector(".photograph-article").innerHTML = "";
        createArticlePhotoVideo(mediasTrierTitre);
    });
};
//Trier
// Modale de contact

function displayModal() {
    const modal = document.getElementById("contact_modal");
    const retouracceuil = document.querySelector('header a');
    retouracceuil.setAttribute('tabindex', '-1');
    const btnmodal = document.querySelector(".contact_button");
    btnmodal.setAttribute('tabindex', '-1');
    const main = document.querySelector('main');
    const tabindexable = main.querySelectorAll('a, button, video');
    tabindexable.forEach(liens => liens.setAttribute('tabindex', '-1'));
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-modal', true);
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal').addEventListener('click', stopPropagation);
    windowEvent();
};

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const btnmodal = document.querySelector(".contact_button");
    btnmodal.setAttribute('tabindex', '0');
    const tabindexable = main.querySelectorAll('a, button');
    tabindexable.forEach(liens => liens.setAttribute('tabindex', '0'));
    const stayminusone = document.querySelectorAll('ul a');
    stayminusone.forEach(liens => liens.setAttribute('tabindex', '-1'));
    modal.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-modal', false);
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.modal').removeEventListener('click', stopPropagation);
};
const stopPropagation = function(e) {
    e.stopPropagation()
};

function windowEvent() {
    window.addEventListener('keydown', function(e) {
        if (e.key === "Escape" || e.key === "Esc") {
            closeModal(e)
        }
    });
};

dataInConsole();

function dataInConsole() {
    const sendButton = document.querySelector('.send_button')
    sendButton.addEventListener('click', function(event) {
        event.preventDefault();
        //récupération des inputs formulaire
        //console log inputs
        const forName = document.getElementById("prenom");
        const birthName = document.getElementById("nom");
        const email = document.getElementById("email");
        const message = document.getElementById("message");
        console.log(forName.value, birthName.value, email.value, message.value);
        closeModal();
    })
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
    if (inputForName.value.length >= 2) {
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
    if (inputBirthName.value.length >= 2) {
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
    if (emailRegex.test(inputEmail.value)) {
        small.innerHTML = ''
        return true
    } else {
        small.innerHTML = 'Adresse non valide'
        small.style.color = "red"
        return false
    };
};
//Events
//Cpt Likes
compteurLikes();

async function compteurLikes() {
    const { media } = await getDataMedia();
    handleLikesButton();
    addLikescounter();
};
// INC et DEC des boutons coeur
function handleLikesButton() {
    const btnLike = document.querySelectorAll('.like-btn');
    btnLike.forEach(button => button.addEventListener('click', function(event) {
        const totallikes = document.querySelector('.cmptlikes');
        event.currentTarget.getAttribute("src");
        if (event.currentTarget.firstChild.getAttribute("src") == './assets/icons/heart-solid.svg') {
            event.currentTarget.firstChild.setAttribute("src", './assets/icons/heart-regular.svg');
            event.currentTarget.previousSibling.innerHTML--
                totallikes.innerHTML--
        } else {
            event.currentTarget.firstChild.setAttribute("src", './assets/icons/heart-solid.svg');
            event.currentTarget.previousSibling.innerHTML++
                totallikes.innerHTML++
        }
    }));
};

function addLikescounter() {
    const totallike = document.querySelectorAll('.likes');
    const arrayTotallike = Array.from(totallike);
    let toto = 0;
    for (let i = 0; i < arrayTotallike.length; i++) {
        let like = arrayTotallike[i].innerText;
        toto += parseInt(like);
    };
    document.querySelector('.cmptlikes').innerText = toto;
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
    const src = document.querySelectorAll(".lightboxable");

    src.forEach(link => link.addEventListener('click', function(event) {
        let photo = event.currentTarget.getAttribute("href");
        let indexPhoto = event.currentTarget.dataset.index;
        let titrePhoto = event.currentTarget.getAttribute("aria-label");
        lightbox();
        show(photo, indexPhoto, titrePhoto);
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
    const retouracceuil = document.querySelector('header a');
    retouracceuil.setAttribute('tabindex', '-1');
    const btnmodal = document.querySelector(".contact_button");
    btnmodal.setAttribute('tabindex', '-1');
    const main = document.querySelector('main');
    const tabindexable = main.querySelectorAll('a, button, video');
    tabindexable.forEach(liens => liens.setAttribute('tabindex', '-1'));
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
    // console.log(currentIndex, nextIndex, gallery.length);
    let nextSrc = "";
    let nextTitre = "";
    gallery.forEach(function(link) {
        if (parseInt(link.dataset.index) == nextIndex) {
            nextSrc = link.getAttribute('href');
            nextTitre = link.getAttribute('aria-label');
        }
    });
    show(nextSrc, nextIndex, nextTitre);
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
    let prevTitre = "";
    gallery.forEach(function(link) {
        if (parseInt(link.dataset.index) == prevIndex) {
            prevSrc = link.getAttribute('href');
            prevTitre = link.getAttribute('aria-label');
        }
    });
    show(prevSrc, prevIndex, prevTitre);
};

function show(media, indexPhoto, titrePhoto) {
    if (media.split(".").pop() == "jpg") {
        showPhoto(media, indexPhoto, titrePhoto);
    } else if (media.split(".").pop() == "mp4") {
        showVideo(media, indexPhoto, titrePhoto);
    }
};

function showPhoto(photo, indexPhoto, titrePhoto) {
    const source = document.querySelector('.lightbox-video');
    source.style.display = "none";
    source.dataset.index = "";
    source.setAttribute('src', "");
    const img = document.querySelector('.lightbox-image');
    img.style.display = "block";
    img.setAttribute("src", photo);
    img.setAttribute("alt", titrePhoto);
    img.dataset.index = indexPhoto;
    const h2Photo = document.querySelector('.lightbox_titre')
    h2Photo.innerHTML = titrePhoto
};

function showVideo(video, indexPhoto, titrePhoto) {
    const img = document.querySelector('.lightbox-image');
    img.style.display = "none";
    img.setAttribute('src', "");
    img.dataset.index = "";
    const source = document.querySelector('.lightbox-video');
    source.style.display = "block";
    source.setAttribute("src", video);
    source.setAttribute("controls", 'controls');
    source.dataset.index = indexPhoto;
    const h2Photo = document.querySelector('.lightbox_titre')
    h2Photo.innerHTML = titrePhoto
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
    const btnmodal = document.querySelector(".contact_button");
    btnmodal.setAttribute('tabindex', '0');
    const tabindexable = main.querySelectorAll('a, button');
    tabindexable.forEach(liens => liens.setAttribute('tabindex', '0'));
    const stayminusone = document.querySelectorAll('ul a');
    stayminusone.forEach(liens => liens.setAttribute('tabindex', '-1'));
};