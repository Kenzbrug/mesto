import Popup from '../scripts/Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
        super(popupSelector)
    }
    openPopup(imageModal){
        super.openPopup(imageModal)
    }
}