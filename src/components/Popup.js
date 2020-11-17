import { ESC_KEYCODE } from '../utils/constants.js'

class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector)
        this.popupForm = this._popup.querySelector('.popup__form')
        this._popupButtonClose = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    openPopup() {
        this._popup.classList.add('popup_open')
        document.addEventListener('keydown', this._handleEscClose)
    }

    closePopup() {
        document.removeEventListener('keydown', this._handleEscClose)
        this._popup.classList.remove('popup_open')
        this.popupForm.reset()
    }

    _handleEscClose(evt) {
        if (evt.keyCode === ESC_KEYCODE) {
            this.closePopup()
        }
    }
    _modalCloseClick = () => {
        document.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('popup_open')) {
                this.closePopup()
            }
        })
        
    }
    setEventListener() {
        this._modalCloseClick()
        this._popupButtonClose.addEventListener('click', (e) => {
            this.closePopup()
        })
    }
}

export { Popup }