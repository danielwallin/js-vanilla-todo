(function () {
    'use strict';

    function Model() {
        this.observers = [];

        // MOCK DATA
        this.tags = [
            {
                text: 'in progress'
            },
            {
                text: 'feature request'
            }
        ];

        this.items = [
            {
                isDone: false,
                text: 'test',
                tags: [1, 2]
            },
            {
                isDone: false,
                text: 'test2',
                tags: [1, 3]
            }
        ];
    }

    Model.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    }

    Model.prototype.notifyAll = function () {
        this.observers.forEach(function (observer) { observer.update(this); }.bind(this))
    }

    Model.prototype.addItem = function (data) {
        const d = { isDone: false, text: data };
        this.items.push(d);
    }

    Model.prototype.addTag = function (tag) {
        const d = { text: tag };
        this.tags.push(d);
    }

    Model.prototype.filterItems = function (data) {
        const filtered = this.items.filter(x =>  { });
        console.log(filtered);
    }

    Model.prototype.updateItem = function (data) {

    }

    Model.prototype.getItem = function () {

    }

    Model.prototype.getItems = function (type) {

    }

    window.Model = Model;
})();