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
        this._manageEventlistener();
    };

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

    createDom() {
        this.lightbox = document.createElement('div');
        this.lightbox.classList.add('lightbox');
        this.show();
        this.page.append(this.lightbox);
        this.closeLightbox = this._createCloseLightbox();
        this.page.append(this.closeLightbox);
        this.btnNext = this._createBtnNext();
        this.page.append(this.btnNext);
        this.btnPrev = this._createBtnPrev();
        this.page.append(this.btnPrev);
        this.lightboxContainer = document.createElement("div");
        this.lightboxContainer.classList.add("lightbox__container");
        this.page.append(this.lightboxContainer);
    };

    _manageEventlistener() {
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

    _createCloseLightbox() {
        const closeLightbox = document.createElement('button')
        closeLightbox.classList.add('lightbox__close')
        closeLightbox.setAttribute("aria-label", "close dialog");
        closeLightbox.onclick = this.closeLightbox();
        const xmark = document.createElement("i");
        xmark.className = "fa-solid fa-xmark";
        closeLightbox.append(xmark);
        return closeLightbox;
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

    closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        lightbox.style.display = "none";
    };

    show() {
        this.lightbox.style.display = "block";
        let src = this.elements[this.current].href;
        if (src == "image") // refaire la condition sur l'extension du fichier
        {
            // image
            const img = document.createElement("img");
            img.src = src;
            this.lightboxContainer.innerHTML = "";
            this.lightboxContainer.append(img);
        }
        if (src == "video") // refaire la condition sur l'extension du fichier
        {
            // video
        }
    };

    // hide() {
    //     this.lightbox.style.display = "none";
    // };

};

async function lightbox() {
    const { media } = await getMedia();
    let getLiens = document.querySelectorAll('.lightboxable');
    // console.log(getLiens);
    let l = new Lightbox(getLiens);
};
lightbox();