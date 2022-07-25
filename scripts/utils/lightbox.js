class Lightbox {

    constructor(elements) {
        this.dom;
        this.closeLightbox;
        this.btnNext;
        this.btnPrev;
        this.lightboxContainer;

        // tous les liens cliquables en tableau []
        this.elements = elements;

        // index dans l'array
        this.current = 0;



        this.createDom();
    }

    next() {
        this.current++;
        if (this.current >= this.elements.length) {
            this.current = 0;
        }
        this.show();
    }

    prev() {
        this.current--;
        if (this.current < 0) {
            this.current = this.elements.length;
        }
        this.show();
    }

    createDom() {
        const dom = document.createElement('div');
        dom.classList.add('lightbox')
        this.closeLightbox = this._createCloseLightbox();
        this.dom.append(this.closeLightbox);
        this.btnNext = this._createBtnNext();
        this.dom.append(this.btnNext);
        this.btnPrev = this._createBtnPrev();
        this.dom.append(this.btnPrev);
        this.lightboxContainer = document.createElement("div");
        this.lightboxContainer.classList.add("lightbox__container");
        this.dom.append(this.lightboxContainer);
    }

    _createCloseLightbox() {
        const closeLightbox = document.createElement('button')
        closeLightbox.classList.add('lightbox__close')
        closeLightbox.setAttribute("aria-label", "close dialog");
        closeLightbox.onclick = this.closeLightbox();
        const xmark = document.createElement("i");
        xmark.classList.add("fa-solid fa-xmark");
        closeLightbox.append(xmark);
        return closeLightbox;
    }

    _createBtnNext() {
        const btnNext = document.createElement("button");
        btnNext.classList.add("lightbox__next")
        btnNext.setAttribute("aria-label", "next image");
        const chevronRight = document.createElement("i");
        chevronRight.classList.add("fa-solid fa-chevron-right");
        btnNext.append(chevronRight);
        return btnNext;
    }

    _createBtnPrev() {
        const btnPrev = document.createElement("button");
        btnPrev.classList.add("lightbox__next")
        btnPrev.setAttribute("aria-label", "previous image");
        const chevronLeft = document.createElement("i");
        chevronLeft.classList.add("fa-solid fa-chevron-left");
        btnPrev.append(chevronLeft);
        return btnPrev;
    }

    closeLightbox() {
        const lightbox = document.querySelector('.lightbox');
        lightbox.style.display = "none";
    }

    show() {
        src = this.element[this.current].href;
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
    }

};

l = new Lightbox(
    document.querySelectorAll("photograph-article a")
);
/* <div class="lightbox">
        <button class="lightbox__close" onclick="closeLightbox()" aria-label="close dialog"><i class="fa-solid fa-xmark"></i></button>
        <button class="lightbox__next" aria-label="next image"><i class="fa-solid fa-chevron-right"></i></button>
        <button class="lightbox__prev" aria-label="previous image"><i class="fa-solid fa-chevron-left"></i></button>
        <div class="lightbox__container">
            <img src="${src}" alt="">
        </div>
    </div> */