UI.Linear = function(action, photo) {
	UI.call(this, action, photo);

	this._histogramWidth = 256*1.5;

	this._buildApply();
	this._buildDelete();

	this._arrowBlack = document.createElement("span");
	this._arrowBlack.innerHTML = "▲";

	this._arrowWhite = document.createElement("span");
	this._arrowWhite.innerHTML = "△";

	var opts = {
		min: 0,
		max: 255,
		step: 1,
		width: this._histogramWidth
	}
	this._white = new Slider(this._arrowWhite, null, opts);
	this._black = new Slider(this._arrowBlack, null, opts);

	this._white.onchange = this;
	this._black.onchange = this;
}
UI.Linear.prototype = Object.create(UI.prototype);

UI.Linear.prototype.show = function(parent) {
	UI.prototype.show.call(this, parent);
	
	var canvas = this._photo.getCanvas(this._action);
	canvas = App.preview.draw(canvas, true); /* create preview canvas */
	var histogram = new Action.Histogram();
	
	histogram.go(canvas).then(this._show.bind(this));
}

UI.Linear.prototype.handleEvent = function(e) {
	switch (e.type) {
		case "change":
			this._preview();
		break;

		case "click":
			if (e.target == this._apply) {
				this._action.setOptions(this._getOptions());
				this._photo.setAction(this._action);
			} else if (e.target == this._delete) {
				this._photo.deleteAction(this._action);
			}
		break;
	}
}

UI.Linear.prototype._show = function(hist) {
	var parent = document.createElement("div");
	parent.className = "slider";
	parent.style.width = this._histogramWidth + "px";

	var h = Action.Histogram.draw(hist, this._histogramWidth, 100);
	parent.appendChild(h);
	parent.appendChild(this._arrowWhite);
	parent.appendChild(this._arrowBlack);

	this._parent.appendChild(parent);

	this._parent.appendChild(this._apply);
	if (this._photo.hasAction(this._action)) { this._parent.appendChild(this._delete); }
	
	var options = this._action.getOptions();
	var minmax = this._action.abToMinMax(options.a, options.b);

	this._black.setValue(minmax[0]);
	this._white.setValue(minmax[1]);

	this._preview();
}

UI.Linear.prototype._getOptions = function() {
	var options = this._action.getOptions();
	var ab = this._action.minMaxToAB(this._black.getValue(), this._white.getValue());
	return {a:ab[0], b:ab[1]};
}