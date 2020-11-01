export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._profileTitle = document.querySelector(nameSelector)
        this._profileDescription = document.querySelector(infoSelector)
    }

    getUserInfo() {
        const getProfileContent = {name: this._profileTitle.textContent, link: this._profileDescription.textContent}
        return getProfileContent;
    }

    setUserInfo(formData) {
        this._profileTitle.textContent = formData.profile_name
        this._profileDescription.textContent = formData.profile_occupation
    }
}