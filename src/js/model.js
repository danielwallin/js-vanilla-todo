(function () {
    'use strict';

    function Model() {
        this.observers = [];

        // MOCK DATA
        this.items = [
            {
                isDone: false,
                text: 'test',
                tags: [
                    {
                        text: 'in progress'
                    }
                ]
            },
            {
                isDone: false,
                text: 'test2',
                tags: [
                    {
                        text: 'in progress'
                    },
                    {
                        text: 'in progress'
                    }
                ]
            }
        ];
    }

    Model.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    }

    Model.prototype.notifyAll = function () {
        this.observers.forEach(function (observer) {
            observer.update(this);
        }.bind(this))
    }

    Model.prototype.setItem = function (data) {
        console.log(data);
        this.items.push({

        });
    }

    Model.prototype.updateItem = function (data) {

    }

    Model.prototype.getItem = function () {

    }

    Model.prototype.getItems = function (type) {

    }

    window.Model = Model;
})();