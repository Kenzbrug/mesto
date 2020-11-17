export default class UserInfo {
    constructor({ nameSelector, infoSelector, infoAvatar }) {
        this._profileTitle = document.querySelector(nameSelector)
        this._profileDescription = document.querySelector(infoSelector)
        this._profileAvatar = document.querySelector(infoAvatar)
    }

    getUserInfo() {
        const getProfileContent = { name: this._profileTitle.textContent, link: this._profileDescription.textContent }
        return getProfileContent;
    }

    setAvatar(formData) {
        this._profileAvatar.src = formData.avatar
    }
    setUserInfo(formData) {
        this._profileTitle.textContent = formData.name
        this._profileDescription.textContent = formData.about
        this._profileAvatar.src = formData.avatar
    }
}