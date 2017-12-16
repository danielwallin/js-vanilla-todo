(function () {
    'use strict';

    function Model() {
        this.observers = [];

        // MOCK DATA
        this.tags = [
            {
                text: 'in progress',
                color: '#7e8c8d',
                id: 2
            },
            {
                text: 'feature request',
                color: '#8e44ad',
                id: 1
            },
            {
                text: 'defect',
                color: '#f39c12',
                id: 3
            }
        ];
        this.filteredItems = [];
        this.items = [
            {
                id: window.generateId(),
                isDone: false,
                text: 'test',
                tags: [1, 2]
            },
            {
                id: window.generateId(),
                isDone: false,
                text: 'test2',
                tags: [1, 3]
            },
            {
                id: window.generateId(),
                isDone: true,
                text: 'test3',
                tags: [1]
            }
        ];
    }

    Model.prototype.registerObserver = function (observer) {
        this.observers.push(observer);
    }

    Model.prototype.notifyAll = function () {
        this.observers.forEach(function (observer) { observer.update(this); }.bind(this))
    }

    Model.prototype.addItem = function (data, ids) {
        const d = { id: window.generateId(), isDone: false, text: data, tags: ids };
        this.items.push(d);
        console.log(this.items);
    }

    Model.prototype.addTag = function (tag, id) {
        const i = window.findObjectWithKey(this.tags, "text", tag);
        if (!i) {
            const d = { text: tag, id: id, color: '#333' };
            this.tags.push(d);
        }
    }

    Model.prototype.filterTagsWithId = function (id) {
        this.filterdItems = this.items.filter(item => { console.log(item.tags.includes(Number(id))); return item.tags.includes(Number(id)); });
        return this.filterdItems;
    }

    Model.prototype.filterItems = function (data) {
        const filtered = this.items.filter(x =>  {  });
    }

    Model.prototype.getDoneItems = function () {
        return this.items.filter(x=> x.isDone);
    }

    Model.prototype.getItems = function () {
        return this.items.filter(x=> !x.isDone);
    }

    Model.prototype.toggleDone = function (id, checked) {
        const i = window.findObjectWithKey(this.items, "id", id);
        if (i) { i.isDone = checked; }
    }

    window.Model = Model;
})();