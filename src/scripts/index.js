import '../pages/index.css';
import Popup from '../scripts/Popup.js';
import Section from '../scripts/Section.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import {initialCards, settings, imageModal, addCardModal, editProfileModal} from './utils.js'
import FormValidator from './FormValidator.js'
import Card from './Card.js'

new FormValidator(settings, '#popupFormProfile').enableValidation()
new FormValidator(settings, '#popupFormCard').enableValidation()

const cardTemplate = document.querySelector('.template-card').content.querySelector('.card');
const list = document.querySelector('.cards__lists');
// Кнопки и другие элементы DOM
const profileEditButton = document.querySelector('.profile__button-change');
const openAddCardModalButton = document.querySelector('.prifile__button-add');

// Данные формы профайла
const titleInputValue = document.querySelector('.popup__form-input_type_name');
const descriptionInputValue = document.querySelector('.popup__form-input_type_occupation');

const renderCardList = new Section({
	data: initialCards,
	renderer: (item) => {
        const card = new Card(item, cardTemplate, {handleCardClick: () => {
                new PopupWithImage().openPopup(imageModal)
            }
        })
		const cardElement = card.getCard()
		renderCardList.addItem(cardElement)
	}
}, list)

const formCard = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    handleFormSubmit: (formData) => {
        const card = new Card(formData, cardTemplate, {handleCardClick: () => {
            new PopupWithImage().openPopup(imageModal)
        }
    });
        const cardElement = card.getCard();
        renderCardList.addItem(cardElement);
    }
})

const editProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile',
    handleFormSubmit: (formData) => {
        getInfo.setUserInfo(formData)
    }
})

const getInfo = new UserInfo({nameSelector: '.profile__name', infoSelector: '.profile__occupation'})

//слушатели на открытие модалок
openAddCardModalButton.addEventListener('click', () => {
    new Popup().openPopup(addCardModal)
})

profileEditButton.addEventListener('click', () => {
    new Popup().openPopup(editProfileModal)
    const userData = getInfo.getUserInfo()
    titleInputValue.value = userData.name
    descriptionInputValue.value = userData.link
})

editProfile.setEventListeners()
formCard.setEventListeners()
renderCardList.renderItems()