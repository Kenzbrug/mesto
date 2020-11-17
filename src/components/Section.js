export default class Section {
	constructor({ renderer }, list) {
		this._renderer = renderer
		this._container = list
	}

	addItem(element) {
		this._container.prepend(element)
	}
	renderItems(data) {
		data.forEach(item => {
			this._renderer(item);
		});
	}
}