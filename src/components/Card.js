export default class Card {
    constructor(data, cardTemplate, myId, { handleCardClick, handleLikeClick,handleDeleteIconCard }) {
        this._name = data.name
        this._link = data.link
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick
        this._likes = data.likes
        this._owner = data.owner._id
        this._cardId = data._id
        this._myId = myId
        this._handleLikeClick = handleLikeClick
        this._handleDeleteIconCard = handleDeleteIconCard
    }

    // находим форму в template и возвращаем её
    _getTemplate() {
        this._cardElement = this._cardTemplate.cloneNode(true)
        return this._cardElement;
    }

    // убираем кнопку удалить у сторонних карточках 
    _invisibleDelteIcon = () => {
        if (!(this._myId === this._owner)) {
            this._cardDeleteButton.classList.add('card__button-delete_invisible')
        }
    }

    // добавляем слушателя на открытие картинки и открываем её
    _openCardImg = () => {
        this._cardImg.addEventListener('click', () => {
            this._handleCardClick()
        })
    }

    // удаляем нашу карточу
    deleteCard = () => {
        this._cardDeleteButton.closest('.card').remove()
    }

    // ставим количество лайков, добавляем/удаляем отметку лайка наш/не наш
    renderLikes() {
        this._numberLike.textContent = this._likes.length
        if (this.isLiked()) {
            this._cardLikeButton.classList.add('card__button-like_active')
        } else {
            this._cardLikeButton.classList.remove('card__button-like_active')
        }
    }

    setLikesInfo(result) {
        this._likes = result.likes;
        this.renderLikes();
    }

    // проверяем ставили ли мы лайк
    isLiked() {
        return this._likes.some(user => user._id === this._myId)
    }

    // добавляем слушателя на лайк картинки и меняем его
    _cardButtonLike = () => {
        this._cardLikeButton.addEventListener('click', () => {
            this._handleLikeClick(this)
        })
    }

    _setEventListeners() {
        this._cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteIconCard(this)
        })
    }
    // заполняем форму входными данными
    getCard() {
        this._element = this._getTemplate()
        this._cardImg = this._element.querySelector('.card__img')
        this._cardTitle = this._element.querySelector('.card__footer-title').textContent = this._name
        this._cardDeleteButton = this._element.querySelector('.card__button-delete')
        this._cardLikeButton = this._element.querySelector('.card__button-like')
        this._numberLike = this._element.querySelector('.card__quantity-like')
        this._cardImg.src = this._link
        this._cardImg.alt = this._name
        this._openCardImg()
        this._cardButtonLike()
        this.renderLikes()
        this._invisibleDelteIcon()
        this._setEventListeners()
        return this._element
    }
}