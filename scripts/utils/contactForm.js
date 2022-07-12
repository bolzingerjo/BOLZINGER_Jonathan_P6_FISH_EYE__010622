const focusableSelector = 'close-modal, input, contact-button';
let focusables = [];


function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-modal', true);
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal').addEventListener('click', stopPropagation);
};

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', true);
    modal.setAttribute('aria-modal', false);
    modal.querySelector('.modal').removeEventListener('click', stopPropagation);
};

const stopPropagation = function(e) {
    e.stopPropagation()
};

const focusInModal = function(e) {
    e.preventdefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    index++
    if (index >= focusables.length) {
        index = 0
    }
    focusable[index].focus()
};

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
});