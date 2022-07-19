const focusableSelector = 'img, input, button';
let focusables = [];
let previouslyFocusedElement = null;
const modal = document.getElementById("contact_modal");

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    modal.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-modal', true);
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    previouslyFocusedElement = document.querySelector(':focus')
    focusables[0].focus()
    modal.addEventListener('click', closeModal);
    modal.querySelector('.modal').addEventListener('click', stopPropagation);

};

function closeModal() {
    const modal = document.getElementById("contact_modal");
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

window.addEventListener('keydown', function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab') {
        focusInModal(e)
    }
});

// DOM Elements
const forName = document.getElementById("prenom");
const birthName = document.getElementById("nom");
const email = document.getElementById("email");
const message = document.getElementById("message");
const ferm = document.querySelector(".contact_button");

forName.addEventListener('change', function() {
    validForName(this);
});
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

birthName.addEventListener('change', function() {
    validBirthName(this);
});
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

email.addEventListener('change', function() {
    validEmail(this);
});
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

message.addEventListener('change', function() {
    validMessage(this);
});
const validMessage = function(inputMessage) {
    console.log(inputMessage.value);
};