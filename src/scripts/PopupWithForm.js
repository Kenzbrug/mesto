import {buttonNewPlace} from './utils.js'
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit} ) {
        super(popupSelector)
        this._popupSelector = document.querySelector(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this._inputList = this._popupSelector.querySelectorAll('.popup__form-input');
    }

    _getInputValues() {
        // достаём все элементы полей
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach((item) => {
            this._formValues[item.name] = item.value
        });
        // возвращаем объект с данными полей формы
        return this._formValues; 
    }

    _buttonOff = () => {
        buttonNewPlace.classList.add('popup__save_disabled')
        buttonNewPlace.disabled = true
    }

    closePopup() {
        this._element.reset()
        this._buttonOff()
        super.closePopup(this._cardElement)
    }

    setEventListeners() {
        this._element = super._getTemplate()
        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.closePopup()
        })
    }
}