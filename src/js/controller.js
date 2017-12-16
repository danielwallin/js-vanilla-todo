(function () {
    'use strict';

    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getItems = function() {
        return this.model.items;
    }

    Controller.prototype.getTags = function() {
        return this.model.tags;
    }

    Controller.prototype.addItem = function(data) {
        this.model.addItem(data);
        this.model.notifyAll();
    }

    Controller.prototype.addTag = function(tag) {
        this.model.addTag(tag);
        this.model.notifyAll();
    }

    Controller.prototype.filterItems = function(data) {
        this.model.filterItems(data);
        this.model.notifyAll();
    }

    window.Controller = Controller;
})();