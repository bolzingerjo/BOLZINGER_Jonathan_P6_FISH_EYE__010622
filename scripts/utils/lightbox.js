class Lightbox {

    constructor(elements) {
        this.page = document.querySelector("#main");
        this.lightbox;
        this.closeLightbox;
        this.btnNext;
        this.btnPrev;
        this.lightboxContainer;
        this.elements = elements;
        this.current = 0;
        this.createDom();
    };

    createDom() { //ok 
        this.lightbox = document.createElement('div');
        this.lightbox.classList.add('lightbox');
        this.page.append(this.lightbox);
        this.closeLightbox = this._createCloseLightbox();
        this.lightbox.append(this.closeLightbox);
        this.btnNext = this._createBtnNext();
        this.lightbox.append(this.btnNext);
        this.btnPrev = this._createBtnPrev();
        this.lightbox.append(this.btnPrev);
        this.lightboxContainer = document.createElement("div");
        this.lightboxContainer.classList.add("lightbox__container");
        this.lightbox.append(this.lightboxContainer);
    };

    _createCloseLightbox() { //ok
        const btncloseLightbox = document.createElement('button')
        btncloseLightbox.classList.add('lightbox__close')
        btncloseLightbox.setAttribute("aria-label", "close dialog");
        btncloseLightbox.onclick = function() {
            let blabla = document.querySelector('.lightbox');
            blabla.style.display = "none";
        };
        const xmark = document.createElement("i");
        xmark.className = "fa-solid fa-xmark";
        btncloseLightbox.append(xmark);
        return btncloseLightbox;
    };


    show() {
        this.lightbox.style.display = "block";


        if (src == ".jpg") // refaire la condition sur l'extension du fichier
        {
            // image
            const img = document.createElement("img");
            img.setAttribute("src", src);
            this.lightboxContainer.appendChild(img);
        }
        if (src == "video") // refaire la condition sur l'extension du fichier
        {
            // video
        }
    };

    _createBtnNext() {
        const btnNext = document.createElement("button");
        btnNext.classList.add("lightbox__next")
        btnNext.setAttribute("aria-label", "next image");
        const chevronRight = document.createElement("i");
        chevronRight.className = "fa-solid fa-chevron-right";
        btnNext.append(chevronRight);
        return btnNext;
    };

    _createBtnPrev() {
        const btnPrev = document.createElement("button");
        btnPrev.classList.add("lightbox__next")
        btnPrev.setAttribute("aria-label", "previous image");
        const chevronLeft = document.createElement("i");
        chevronLeft.className = "fa-solid fa-chevron-left";
        btnPrev.append(chevronLeft);
        return btnPrev;
    };



    // hide() {
    //     this.lightbox.style.display = "none";
    // };

    next() {
        this.current++;
        if (this.current >= this.elements.length) {
            this.current = 0;
        }
        this.show();
    };

    prev() {
        this.current--;
        if (this.current < 0) {
            this.current = this.elements.length;
        }
        this.show();
    };

};

async function lightbox() {
    const { media } = await getDataMedia();
    let getLiens = document.querySelectorAll('.lightboxable');
    // console.log(getLiens);
    let l = new Lightbox(getLiens);
};
async function getHREF() {
    const { media } = await getDataMedia();
    let links = document.querySelectorAll(".lightboxable[href]");
    links.forEach(links => links.addEventListener('click', function(event) {
        event.currentTarget.getAttribute("href");
    }));
    console.log(links);
};
getHREF();
console.log(getHREF());

//Lightbox
function lightbox() {
    createDivLightbox();
    const lightbox = document.querySelector('lightbox');
    lightbox.style.display = "block";
};

function createDivLightbox() { //ok 
    const lightboxdiv = document.createElement('div');
    lightboxdiv.classList.add('lightbox');
    lightboxdiv.appendChild(createCloseLightbox());
    lightboxdiv.appendChild(createBtnNext());
    lightboxdiv.appendChild(createBtnPrev());
    lightboxdiv.appendChild(createDivLightboxContainer());
    return lightboxdiv
};

function createCloseLightbox() { //ok
    const btncloseLightbox = document.createElement('button')
    btncloseLightbox.classList.add('lightbox__close')
    btncloseLightbox.setAttribute("aria-label", "close dialog");
    const xmark = document.createElement("i");
    xmark.className = "fa-solid fa-xmark";
    btncloseLightbox.append(xmark);
    btncloseLightbox.onclick = function closeLightbox() {
        const lightbox = document.querySelector('lightbox');
        lightbox.style.display = "none";
    };
    return btncloseLightbox;
};

// function closeLightbox() {
//     const lightbox = document.querySelector('lightbox');
//     lightbox.style.display = "none";
// };

function createBtnNext() {
    const btnNext = document.createElement("button");
    btnNext.classList.add("lightbox__next")
    btnNext.setAttribute("aria-label", "next image");
    const chevronRight = document.createElement("i");
    chevronRight.className = "fa-solid fa-chevron-right";
    btnNext.append(chevronRight);
    return btnNext;
};

function createBtnPrev() {
    const btnPrev = document.createElement("button");
    btnPrev.classList.add("lightbox__next")
    btnPrev.setAttribute("aria-label", "previous image");
    const chevronLeft = document.createElement("i");
    chevronLeft.className = "fa-solid fa-chevron-left";
    btnPrev.append(chevronLeft);
    return btnPrev;
};

function createDivLightboxContainer() {
    const lightboxContainer = document.createElement("div");
    lightboxContainer.classList.add("lightbox__container");
    return lightboxContainer
};

function show() {
    const src = getHREF();
    if (src == ".jpg") // refaire la condition sur l'extension du fichier
    {
        // image
        const img = document.createElement("img");
        img.setAttribute("src", src);
        const lightboxContainer = document.querySelector('lightbox__container');
        lightboxContainer.appendChild(img);
    }
    if (src == ".mp4") // refaire la condition sur l'extension du fichier
    {
        // video
        const video = document.createElement("video");
        const source = document.createElement("source");
        source.setAttribute("src", src);
        video.appendChild(source);
        const lightboxContainer = document.querySelector('lightbox__container');
        lightboxContainer.appendChild(video);
    }
};
// let current = 0;

// function next() {
//     current++;
//     if (this.current >= this.elements.length) {
//         this.current = 0;
//     }
//     this.show();
// };

// function prev() {
//     current--;
//     if (this.current < 0) {
//         this.current = this.elements.length;
//     }
//     this.show();
// };

getHREF();
console.log(getHREF());
async function getHREF() {
    const { media } = await getDataMedia();
    let links = document.querySelectorAll(".lightboxable[href]");
    links.forEach(links => links.addEventListener('click', function(event) {
        event.currentTarget.getAttribute("href");
    }));
    console.log(links);
};

manageEventlistener();
async function manageEventlistener() {
    const { media } = await getDataMedia();
    let getLiens = document.querySelectorAll('.lightboxable');
    // console.log(getLiens);
    for (let i = 0; i < getLiens.length; i++) {
        let lien = getLiens[i];
        lien.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
        })
    };
};

//Lightbox
// class Lightbox {

//     static init() {
//         let links = document.querySelectorAll(".lightboxable[href]");
//         links.forEach(links => links.addEventListener('click', function(event) {
//             event.currentTarget.getAttribute("href");
//             event.preventDefault();
//             new Lightbox(e.currentTarget.getAttribute('href'));
//         }));
//     }

//     constructor(url) {
//         this.element = this.buildDOM(url);
//         document.body.appendChild(this.element);
//     };

//     loadImage(url) {
//         const image = new Image();
//         const container = this.element.querySelector('.lightbox__container');
//         image.onload = function() {
//             console.log('chargé');
//             container.appendChild(image);
//         };
//         image.src = url
//     }
//     buildDOM(url) {
//         const dom = document.createElement('div');
//         dom.classList.add('lightbox');
//         dom.innerHTML = '<button class = "lightbox__close"></button><button class = "lightbox__next"></button><button class = "lightbox__prev"></button><div class = "lightbox__container"></div>'
//         return dom
//     };
// };
// Lightbox.init();