const handleResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(new Error(`Ошибка: ${res.status} - ${res.statusText}`))
    }
    return res.json()
}

class Api {
    constructor(config) {
        this._headers = config.headers
        this._url = config.url
        this._cohort = config.cohort
    }

    getTasks() {
        return fetch(`${this._url}${this._cohort}cards`, {
            headers: this._headers
        }).then(handleResponse)
    }

    createTask(data) {
        return fetch(`${this._url}${this._cohort}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        }).then(handleResponse)
    }

    changeUserInfo(inputData) {
        return fetch(`${this._url}${this._cohort}users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: inputData.profile_name,
                about: inputData.profile_occupation
            })
        }).then(handleResponse)
    }
    getProfileInfo() {
        return fetch(`${this._url}${this._cohort}users/me`, {
            headers: this._headers,
        }).then(handleResponse)
    }

    setDeleteCard(cardId) {
        return fetch(`${this._url}${this._cohort}cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(handleResponse)
    }

    setLikeCard(cardId) {
        return fetch(`${this._url}${this._cohort}cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers,
        })
            .then(handleResponse)
    }

    setDeleteLikeCard(cardId) {
        return fetch(`${this._url}${this._cohort}cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then(handleResponse)
    }

    changeAvatar(inputData) {
        return fetch(`${this._url}${this._cohort}users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: inputData.avatar,
            })
        })
        .then(handleResponse)
    }
}
export { Api }