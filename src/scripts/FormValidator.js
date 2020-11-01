export default class FormValidator {
    constructor(settings, formSelector) {
        this._inputSelector = settings.inputSelector
        this._submitButtonSelector = settings.submitButtonSelector
        this._inactiveButtonClass = settings.inactiveButtonClass
        this._inputErrorClass = settings.inputErrorClass
        this._errorClass = settings.errorClass
        this._formSelector = formSelector
    }

    //перебор инпутов
    _setEventListeners() {
        const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector))
        this._inputs = inputs

        const buttonElement = this._formElement.querySelector(this._submitButtonSelector)
        this._buttonElement= buttonElement
        this._toggleButtonState()
        this._inputs.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement)
                this._toggleButtonState()
            })
        })
    }
    
    // отображение активности кнопки Сохранить
    _toggleButtonState() {
        if (this._hasValidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass)
            this._buttonElement.disabled = true
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.disabled = false
        }
    }

    // проверка на валидность инпутов
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement)
        } else {
            this._hideInputError(inputElement)
        }
    }

    // добавление визуализации о неправильности ввода поля
    _showInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.add(this._inputErrorClass)
        this._errorElement.classList.add(this._errorClass)
        this._errorElement.style.display='block'
        this._errorElement.textContent = inputElement.validationMessage
    }

    // удаление визуализации о неправильности ввода поля
    _hideInputError(inputElement) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.id}-error`)
        inputElement.classList.remove(this._inputErrorClass)
        this._errorElement.classList.remove(this._errorClass)
        this._errorElement.style.display='none'
    }

    _hasValidInput() {
        return this._inputs.some((inputElement) => {
            return !inputElement.validity.valid
        })
    }

    // отправка формы
    enableValidation() {
        this._formElement = document.querySelector(this._formSelector);
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
        })
        this._setEventListeners()
    }
}