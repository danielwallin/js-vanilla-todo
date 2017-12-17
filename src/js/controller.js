(function () {
    'use strict';

    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getItems = function() {
        return this.model.getItems();
    }

    Controller.prototype.getDoneItems = function() {
        return this.model.getDoneItems();
    }

    Controller.prototype.getTags = function() {
        return this.model.tags;
    }

    Controller.prototype.getFilteredItems = function() {
        return this.model.filteredItems;
    }

    Controller.prototype.filterTagsWithId = function(id) {
        this.model.filterTagsWithId(id);
        this.model.notifyAll();
    }

    Controller.prototype.resetFilter = function(id) {
        this.model.resetFilter();
        this.model.notifyAll();
    }

    Controller.prototype.addItem = function(data, id=null) {
        this.model.addItem(data, id);
        this.model.notifyAll();
    }

    Controller.prototype.addTag = function(tag, id=null) {
        this.model.addTag(tag, id);
        this.model.notifyAll();
    }

    Controller.prototype.toggleDone = function(item) {
        this.model.toggleDone(item);
        this.model.notifyAll();
    }

    Controller.prototype.filterItems = function(data) {
        this.model.filterItems(data);
        this.model.notifyAll();
    }

    window.Controller = Controller;
})();