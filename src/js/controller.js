(function () {
    'use strict';

    function Controller(model) {
        this.model = model;
    }

    Controller.prototype.getItems = function() {
        return this.model.items;
    }

    Controller.prototype.addItem = function(data) {
        console.log(data);
        this.model.notifyAll();
    }

    window.Controller = Controller;
})();