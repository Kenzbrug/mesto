import {ESC_KEYCODE, imageModalcloseButton, editProfileModalcloseButton, addCardModalcloseButton, imageModal, editProfileModal} from './utils.js'

export default class Popup {
    constructor(popupSelector) {
        this._popupsSelector = popupSelector
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    _getTemplate() {
        this._cardElement = document.querySelector(this._popupsSelector)
        this._cardFormElement = this._cardElement.querySelector('.popup__form')
        return this._cardFormElement; 
    }

    openPopup(modalWindow) {
        modalWindow.classList.add('popup_open')
        document.addEventListener('keydown', this._handleEscClose)
        this.setEventListener(modalWindow)
		document.addEventListener('mousedown', this._modalCloseClick)
	}

    closePopup(modalWindow) {
		document.removeEventListener('keydown', this._handleEscClose)
        document.removeEventListener('mousedown', this._modalCloseClick)
        modalWindow.classList.remove('popup_open')
    }

    _handleEscClose(evt) {
		if (evt.keyCode === ESC_KEYCODE ) {
            const addPopup = document.querySelector('.popup_open')
            this.closePopup(addPopup)
        }
    }
    _modalCloseClick = (evt) => {
        if (evt.target.classList.contains('popup_open')) {
            const popup = document.querySelector('.popup_open')
            this.closePopup(popup)
        }
    }
    setEventListener(modalWindow) {
		addCardModalcloseButton.addEventListener('click', () => {
            this.closePopup(modalWindow)
        })
        imageModalcloseButton.addEventListener("click", () => {
            this.closePopup(imageModal)
        })
        editProfileModalcloseButton.addEventListener('click', () => {
            this.closePopup(editProfileModal)
        })
    }
}
