    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        const photographers =
            await fetch('./data/photographers.json')
            .then((Response) => Response.json())
            .then(data => data.photographers)

        // console.log(photographers);
        // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: photographers
        })

    };

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
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

    // //rajout d'attributs d'accessibilité
    function accessibilitéIndex() {
        const indexNav = document.querySelector('.photographer_section');
        indexNav.setAttribute("aria-label", 'photographers navigation');
        const indexLogo = document.querySelector('.logo');
        indexLogo.setAttribute("alt", 'Fisheye home page');
        const linkIndex = document.createElement('a');
        const head = document.querySelector('header');
        head.appendChild(linkIndex);
        linkIndex.appendChild(indexLogo);
        linkIndex.href = "index.html";
    };
    accessibilitéIndex();