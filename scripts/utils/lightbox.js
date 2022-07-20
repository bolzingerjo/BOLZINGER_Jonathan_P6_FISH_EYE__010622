function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = "none";
}

class Lightbox {
    static init() {
        const links = document.querySelectorAll('img[src$=".jpeg"], source[src$=".mp4"]')
            .forEach(link => link.addEventListener('click', e => {
                e.preventDefault()
                new Lightbox(e.currentTarget.getAttribute('src'))
            }))
    }
}


/* <div class="lightbox">
        <button class="lightbox__close" onclick="closeLightbox()" aria-label="close dialog"><i class="fa-solid fa-xmark"></i></button>
        <button class="lightbox__next" aria-label="next image"><i class="fa-solid fa-chevron-right"></i></button>
        <button class="lightbox__prev" aria-label="previous image"><i class="fa-solid fa-chevron-left"></i></button>
        <div class="lightbox__container">
            <img src="assets/images/Animals_Rainbow.jpg" alt="">
        </div>
    </div> */