import {imageModal, imageModalTitle, handleLikeClick} from './utils.js'
import PopupWithImage from './PopupWithImage.js'
const popupImage = imageModal.querySelector('.popup__image');

export default class Card {
    constructor(data, cardTemplate, {handleCardClick}) {
        this._name = data.name
        this._link = data.link
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick
    }

	// находим форму в template и возвращаем её
	_getTemplate() {
      this._cardElement = this._cardTemplate.cloneNode(true)
      return this._cardElement;
    }
	
	// сопоставляем атрибуты при открытии картинки
	_fieldMapping = () => {
        imageModalTitle.textContent = this._cardTitle;
        popupImage.src = this._cardImg.src
        popupImage.alt = this._cardImg.alt
    }
	
    // добавляем слушателя на открытие картинки и открываем её
	_openCardImg = () => {
        this._cardImg.addEventListener('click', () => {
            this._handleCardClick()
            this._fieldMapping()
        })
    }
   
    someFunction () {
        this._cardImg.addEventListener('click', () => {
            this._fieldMapping()
            new PopupWithImage().openPopup(imageModal)
        })
    }
	
	// добавляем слушателя на удалние картинки и удаляем её
	_cardButtonDelete = () => {
        this._cardDeleteButton.addEventListener('click', () => {
            this._cardDeleteButton.closest('.card').remove()
        })
    }
	 
	// добавляем слушателя на лайк картинки и меняем его
	_cardButtonLike = () => {
        this._cardLikeButton.addEventListener('click', (evt) => {
            handleLikeClick(evt)
        })
    }
	// заполняем форму входными данными
	getCard() {
		this._element = this._getTemplate()
		
		this._cardImg = this._element.querySelector('.card__img')
        this._cardTitle = this._element.querySelector('.card__footer-title').textContent = this._name

		this._cardDeleteButton = this._element.querySelector('.card__button-delete')
        this._cardLikeButton = this._element.querySelector('.card__button-like')
		
        this._cardImg.src = this._link
        this._cardImg.alt = this._name
        this._openCardImg()
		this._cardButtonLike()
        this._cardButtonDelete()
		return this._element
	}
}