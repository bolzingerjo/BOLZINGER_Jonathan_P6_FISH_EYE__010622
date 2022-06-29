//Mettre le code JavaScript lié à la page photographer.html
let params = (new URL(document.location)).searchParams;
let pageId = params.get('id');
// console.log(pageId);

async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json
    const photographers =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.photographers.filter((object) => object.id == pageId))

    // console.log(photographers);
    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: photographers
    })

};

async function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph-header");
    console.log(photographer);
    photographer.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        // console.log(photographerModel);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();

async function getMedia() {
    // Penser à remplacer par les données récupérées dans le json
    const media =
        await fetch('./data/photographers.json')
        .then((Response) => Response.json())
        .then(data => data.media.filter((object) => object.photographerId == pageId))

    console.log(media)
        // et bien retourner le tableau photos seulement une fois
    return ({
        media: media
    })

};
// changement de photographers en media
async function displayData2(medias) {
    const photographiesSection = document.querySelector(".photograph-article");
    console.log(medias);
    medias.forEach((pho) => {
        const mediaModel = mediaFactory(pho);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        photographiesSection.appendChild(mediaCardDOM);
    });
};

async function init2() {
    // Récupère les medias des photographies
    const { media } = await getMedia();
    displayData2(media);
};

init2();

// gestion video //
// JS //

const gstVideo = document.querySelectorAll('.video');
const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');

const timerWrapper = document.querySelector('.timer');
const timer = document.querySelector('.timer span');
const timerBar = document.querySelector('.timer div');

gstVideo.removeAttribute('controls');
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

let intervalFwd;
let intervalRwd;

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