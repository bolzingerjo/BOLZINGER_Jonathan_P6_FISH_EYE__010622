// class likesCounter {
//     constructor() {
//         this._count = 0
//         this._$likesCount = document.querySelector('.comptLikes p')
//     }

//     update(action) {
//         if (action === 'INC') {
//             this._count += 1
//         } else if (action === 'DEC') {
//             this._count -= 1
//         } else {
//             throw "Unknow action"
//         }

//         this._$likesCount.innerHTML = this._count
//     }
// };
// class likesSubject {
//     constructor() {
//         this._observers = []
//     }

//     subscribe(observer) {
//         this._observers.push(observer)
//     }

//     unsubscribe(observer) {
//         this._observers = this._observers.filter(obs => obs !== observer)
//     }

//     fire(action) {
//         this._observers.forEach(observer => observer.update(action))
//     }
// };

class likesCounter {
    constructor() {
        this._count = 0
        this._$likesCount = document.querySelector('.comptLikes p')
        this._observers = []
        this.handleLikesButton()
    }

    update(action) {
        if (action === 'INC') {
            this._count += 1
        } else if (action === 'DEC') {
            this._count -= 1
        } else {
            throw "Unknow action"
        }

        this._$likesCount.innerHTML = this._count
    }
    subscribe(observer) {
        this._observers.push(observer)
    }

    unsubscribe(observer) {
        this._observers = this._observers.filter(obs => obs !== observer)
    }

    fire(action) {
        this._observers.forEach(observer => observer.update(action))
    }

    handleLikesButton() {
        const that = this
        this.$wrapper = document.querySelectorAll('span');

        this.$wrapper
            .querySelector('.like-btn')
            .addEventListener('click', function() {
                if (this.classList.contains('fa-solid fa-heart')) {
                    this.classList.remove('fa-solid fa-heart')
                    this.classList.add('fa-regular fa-heart')
                    that.WishListSubject.fire('DEC')
                } else {
                    this.classList.add('fa-solid fa-heart')
                    that.WishListSubject.fire('INC')
                }
            })
    };
};
async function compteurLikes() {
    const { media } = await getMedia();
    let C = new likesCounter();
};
compteurLikes();