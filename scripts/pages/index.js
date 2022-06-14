    async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        const photographers =
            await fetch('./data/photographers.json')
            .then((Response) => Response.json())
            .then(data => data.photographers)

        console.log(photographers)
            // et bien retourner le tableau photographers seulement une fois
        return ({
            photographers: photographers
        })

    }

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

    async function getMedia() {
        // Penser à remplacer par les données récupérées dans le json
        const media =
            await fetch('./data/photographers.json')
            .then((Response) => Response.json())
            .then(data => data.media)

        console.log(media)
            // et bien retourner le tableau photographers seulement une fois
        return ({
            media: media
        })

    }

    // // async function displayData(photographies) {
    // //     const photographiesSection = document.querySelector(".photographer_section");

    // //     photographers.forEach((photographer) => {
    // //         const photographerModel = photographerFactory(photographer);
    // //         const userCardDOM = photographerModel.getUserCardDOM();
    // //         photographersSection.appendChild(userCardDOM);
    // //     });
    // // };

    // async function init() {
    //     // Récupère les datas des photographies
    //     const { photographies } = await getPhotographies();
    //     displayData(photographies);
    // };

    // init();





    //rajout d'attributs d'accessibilité
    const indexNav = document.querySelector('.photographer_section');
    indexNav.setAttribute("aria-label", 'photographers navigation')
    const indexLogo = document.querySelector('.logo');
    indexLogo.setAttribute("alt", 'Fisheye home page')