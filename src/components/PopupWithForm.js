import { Popup } from '../components/Popup.js';

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector)

        this._handleFormSubmit = handleFormSubmit
        this._inputList = this._popup.querySelectorAll('.popup__form-input');
        this._popupForm = this._popup.querySelector('.popup__form')
        this._saveButton = this._popupForm.querySelector('.popup__save')
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

    closePopup() {
        this._popupForm.reset()
        // this._buttonOff()
        super.closePopup(this._popup)
    }

    renderLoading(isLoading) {
        if (isLoading) {
            this._saveButton.textContent = 'Сохранение...';
        }
        else {
            if (this._saveButton.id == 'Delete-yes') {
                this._saveButton.textContent = 'Да';
            }else {
                if (this._saveButton.id == 'cardCreate') {
                    this._saveButton.textContent = 'Создать';
                }else{
                    this._saveButton.textContent = 'Сохранить';
                }   
                
            }
        }
    }

    setSubmitCallback(callback) {
        this._handleFormSubmit = callback;
    }

    setEventListeners() {
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            // super.setEventListener()
            this.renderLoading(true)
            this._handleFormSubmit(this._getInputValues());
        })
    }
} 