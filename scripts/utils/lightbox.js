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
    const { media } = await getMedia();
    let getLiens = document.querySelectorAll('.lightboxable');
    // console.log(getLiens);
    let l = new Lightbox(getLiens);
};

async function getHREF() {
    const { media } = await getMedia();
    let links = document.querySelectorAll('.lightboxable[href$=".jpg"], .lightboxable[href$=".mp4"]');
    links.forEach(links => links.addEventListener('click', e => {
        e.currentTarget.getAttribute("href");
    }));
    console.log(links);
};
getHREF();