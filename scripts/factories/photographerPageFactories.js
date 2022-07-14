// factory header //
function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;
    // console.log(data);
    const picture = `assets/photographers/${portrait}`;
    const main = document.querySelector('main');
    const likesTarifs = document.createElement('div');
    likesTarifs.className = 'comptLikes';
    const nbr = document.createElement('p');
    nbr.innerText = '362565';
    const imgHeart = document.createElement('i');
    imgHeart.className = 'fa-solid fa-heart';
    const prix = document.createElement('p');
    prix.innerText = price + '€/jour';
    const h2 = document.querySelector('#title-modal');
    h2.innerText = 'Contactez-moi ' + name;

    main.appendChild(likesTarifs);
    likesTarifs.appendChild(nbr);
    nbr.appendChild(imgHeart);
    likesTarifs.appendChild(prix);

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.className = 'article-header';
        const div1 = document.createElement('div');
        const btnmodal = document.querySelector('.contact_button ');
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
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
    // console.log(data1);
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
            const divText = document.createElement('div');
            divText.className = 'photo-text';
            const text = document.createElement('p');
            text.textContent = title;
            text.className = 'title-photo';
            const spanLikes = document.createElement('span');
            spanLikes.setAttribute("aria-label", 'likes');
            const cptLikes = document.createElement('p');
            cptLikes.textContent = likes;
            cptLikes.className = 'likes';
            const imgHeart = document.createElement('i');
            imgHeart.className = 'fa-solid fa-heart';

            articlePhoto.appendChild(photos);
            articlePhoto.appendChild(divText);
            divText.appendChild(text);
            divText.appendChild(spanLikes);
            spanLikes.appendChild(cptLikes);
            spanLikes.appendChild(imgHeart);

            return (articlePhoto);
        }
        if (object = video) {
            const articleVideo = document.createElement('article');
            articleVideo.className = 'article-video';
            const videoPage = document.createElement('video');
            videoPage.setAttribute("controls", 'controls');
            videoPage.className = 'video';
            videoPage.setAttribute("aria-label", title + ', ' + date + ', ' + likes + ', prix : ' + price + '€')
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
            const divText = document.createElement('div');
            divText.className = 'photo-text';
            const text = document.createElement('p');
            text.textContent = title;
            text.className = 'title-photo';
            const spanLikes = document.createElement('span');
            spanLikes.setAttribute("aria-label", 'likes');
            const cptLikes = document.createElement('p');
            cptLikes.textContent = likes;
            cptLikes.className = 'likes';
            const imgHeart = document.createElement('i');
            imgHeart.className = 'fa-solid fa-heart';

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
            articleVideo.appendChild(divText);
            divText.appendChild(text);
            divText.appendChild(spanLikes);
            spanLikes.appendChild(cptLikes);
            spanLikes.appendChild(imgHeart);

            return (articleVideo);


        } else {
            return console.log('erreur')
        }
    }
    return { getMediaCardDOM }
};
// factory media //
// gestion video //
// JS //
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