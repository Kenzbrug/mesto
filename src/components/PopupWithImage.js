import { Popup } from '../components/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupSelector = popupSelector
        this._popupOpenImg = document.querySelector(this._popupSelector)
        this._popupImg = this._popupOpenImg.querySelector('.popup__image')
        this._popupTitle = this._popupOpenImg.querySelector('.popup__image-title')
    }
    openPopup(link,name) {        
        this._popupImg.src = link
        this._popupImg.alt = name
        this._popupTitle.textContent = name
        super.openPopup()
    }
}