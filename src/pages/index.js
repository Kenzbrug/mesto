import './index.css';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import { settings } from '../utils/constants.js'
import FormValidator from '../components/FormValidator.js'
import Card from '../components/Card.js'
import { Api } from '../components/Api.js'
import { Popup } from '../components/Popup';

new FormValidator(settings, '#popupFormProfile').enableValidation()
new FormValidator(settings, '#popupFormCard').enableValidation()
new FormValidator(settings, '#popupFormAvatar').enableValidation()

const cardTemplate = document.querySelector('.template-card').content.querySelector('.card');
const list = document.querySelector('.cards__lists');
// Кнопки и другие элементы DOM
const profileEditButton = document.querySelector('.profile__button-change');
const openAddCardModalButton = document.querySelector('.prifile__button-add');
const profileAvatarButton = document.querySelector('.profile__button-avatar-edit');

// Данные формы профайла
const titleInputValue = document.querySelector('.popup__form-input_type_name');
const descriptionInputValue = document.querySelector('.popup__form-input_type_occupation');

// объявляем глобальную переменную для своего ID карточек
let myUserId

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/",
    cohort: "cohort-17/",
    headers: {
        authorization: '4b89edef-9be1-402e-a5c7-910a1504eece',
        "Content-Type": "application/json",
    }
})

function createCard(item) {
    return new Card(item, cardTemplate, myUserId, {
        handleCardClick: () => {
            popupImage.openPopup(item.link, item.name)
        },
        handleLikeClick: (card) => {
            if (card.isLiked()) {
                api.setDeleteLikeCard(card._cardId)
                    .then((result) => {
                        card.setLikesInfo(result)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            } else {
                api.setLikeCard(card._cardId)
                    .then((result) => {
                        card.setLikesInfo(result)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }

        },
        handleDeleteIconCard
    })
}

const handleDeleteIconCard = (data) => {
    formDeleteCard.openPopup()
    formDeleteCard.setSubmitCallback(() => {
        api.setDeleteCard(data._cardId)
            .then(() => {
                data.deleteCard();
                formDeleteCard.closePopup();
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                formDeleteCard.renderLoading(false)
            })
    })
}

const getInfo = new UserInfo({ nameSelector: '.profile__name', infoSelector: '.profile__occupation', infoAvatar: '.profile__avatar-img' })

const formDeleteCard = new PopupWithForm({
    popupSelector: '.popup_type_delete-card'
})
const renderCardList = new Section({
    renderer: (item) => {
        const card = createCard(item);
        const cardElement = card.getCard()
        renderCardList.addItem(cardElement)
    }
}, list)

const formCard = new PopupWithForm({
    popupSelector: '.popup_type_add-card',
    handleFormSubmit: (item) => {
        api.createTask(item)
            .then(data => {
                const card = createCard(data)
                const cardElement = card.getCard();
                renderCardList.addItem(cardElement);
                formCard.closePopup()
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                formCard.renderLoading(false)
            })
    }
})

const changeAvatar = new PopupWithForm({
    popupSelector: '.popup_type_change-avatar',
    handleFormSubmit: (formData) => {
        api.changeAvatar(formData)
            .then(outputData => {
                getInfo.setAvatar(outputData)
                changeAvatar.closePopup()
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                changeAvatar.renderLoading(false)
            })
    }
})

const editProfile = new PopupWithForm({
    popupSelector: '.popup_type_edit-profile',
    handleFormSubmit: (formData) => {
        api.changeUserInfo(formData)
            .then(outputData => {
                getInfo.setUserInfo(outputData)
                editProfile.closePopup()
            })
            .catch((err) => {
                console.log(err);
            }).finally(() => {
                editProfile.renderLoading(false)
            })
    }
})

const popupAvatar = new Popup('.popup_type_change-avatar')
const popupProfile = new Popup('.popup_type_edit-profile')
const popupCard = new Popup('.popup_type_add-card')
const popupButtonDeleteCard = new Popup('.popup_type_delete-card')
const popupImage = new PopupWithImage('.popup_type_image')

popupAvatar.setEventListener()
popupProfile.setEventListener()
popupCard.setEventListener()
popupButtonDeleteCard.setEventListener()
popupImage.setEventListener()


Promise.all([api.getProfileInfo(),api.getTasks()])
    .then(([dataResult, serverData]) => {
        myUserId = dataResult._id;
        getInfo.setUserInfo(dataResult)
        renderCardList.renderItems(serverData);
    })
    .catch((err) => console.log(err))

//слушатели на открытие модалок
openAddCardModalButton.addEventListener('click', () => {
    formCard.openPopup()
})

profileAvatarButton.addEventListener('click', () => {
    changeAvatar.openPopup()
})

profileEditButton.addEventListener('click', () => {
    editProfile.openPopup()
    const userData = getInfo.getUserInfo()
    titleInputValue.value = userData.name
    descriptionInputValue.value = userData.link
})

formDeleteCard.setEventListeners()
changeAvatar.setEventListeners()
editProfile.setEventListeners()
formCard.setEventListeners()

export { api }