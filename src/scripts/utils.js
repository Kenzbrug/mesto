// Обертки(Wrappers)
const imageModal = document.querySelector('.popup_type_image');
const imageModalTitle = imageModal.querySelector('.popup__image-title');

const addCardModal = document.querySelector('.popup_type_add-card');
const editProfileModal = document.querySelector('.popup_type_edit-profile');

const addCardModalcloseButton = addCardModal.querySelector('.popup__close-button');
const editProfileModalcloseButton = editProfileModal.querySelector('.popup__close-button');
const imageModalcloseButton = imageModal.querySelector('.popup__image-close-button');
const buttonNewPlace = document.querySelector('.popup__save-new-place')
const ESC_KEYCODE = 27

const initialCards = [
    {
        name: 'Проселочная дорога',
        link: 'https://images.unsplash.com/photo-1595917442739-94707ce5d02e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    },
    {
        name: 'Ночной пикник',
        link: 'https://images.unsplash.com/photo-1595923112485-5e7c738fa67b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2123&q=80'
    },
    {
        name: 'Венеция',
        link: 'https://images.unsplash.com/photo-1595925024338-c52444a47e0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80'
    },
    {
        name: 'Ночной город',
        link: 'https://images.unsplash.com/photo-1595927238580-797684d76bd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
    },
    {
        name: 'Горячий кофе',
        link: 'https://images.unsplash.com/photo-1595928661736-75db10480925?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80'
    },
    {
        name: 'Собакен',
        link: 'https://images.unsplash.com/photo-1595903236347-2af2d0c62d10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
    }
]

const settings = {
    inputSelector: '.popup__form-input', // находим инпуты
    submitButtonSelector: '.popup__save', // находим кнопку
    inactiveButtonClass: 'popup__save_disabled', // стиль кнопки off
    inputErrorClass: 'popup__input_type_error', // стиль красное подчеркивание инпутов
    errorClass: 'popup__error_visible' //стиль для ошибки
}

// активное/не активное сердечко "лайк"
const handleLikeClick = (evt) => {
    evt.target.classList.toggle('card__button-like_active')
}

export {initialCards, settings, imageModal, imageModalTitle, handleLikeClick, ESC_KEYCODE, 
    imageModalcloseButton, editProfileModalcloseButton, addCardModalcloseButton, addCardModal, editProfileModal, buttonNewPlace}