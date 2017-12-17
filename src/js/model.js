(function () {
    'use strict';

    function Model() {
        this.observers = [];

        // MOCK DATA
        this.tags = [
            {
                text: 'feature request',
                color: '#8e44ad',
                id: '1'
            },
            {
                text: 'in progress',
                color: '#27ae60',
                id: '2'
            },
            {
                text: 'defect',
                color: '#f39c12',
                id: '3'
            },
            {
                text: 'bug',
                color: '#c0392c',
                id: '4'
            },
            {
                text: 'to process',
                color: '#7e8c8d',
                id: '5'
            },
        ];
        this.filteredItems = [];
        this.items = [
            {
                id: window.generateId(),
                isDone: false,
                text: 'Reply to message notifications directly in email',
                tags: ['2', '1']
            },
            {
                id: window.generateId(),
                isDone: false,
                text: 'Remember choice when switching between multiple ads',
                tags: ['4']
            },
            {
                id: window.generateId(),
                isDone: false,
                text: 'Replace joyce with Intercom messages',
                tags: ['5']
            },
            {
                id: window.generateId(),
                isDone: false,
                text: 'Fix maintenance pages to web servers',
                tags: ['3']
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
            const d = { text: tag, id: id, color: window.getRandomColor() };
            this.tags.push(d);
        }
    }

    Model.prototype.filterTagsWithId = function (id) {
        this.filteredItems = this.items.filter(item => {
            return (item.tags && item.tags.includes(id));
        });
        return this.filteredItems;
    }

    Model.prototype.resetFilter = function () {
        this.filteredItems = [];
    }

    Model.prototype.filterItems = function (data) {
        if (data.length <= 0) {
            this.resetFilter();
        } else {
            this.filteredItems = this.items.filter((x) => { return x.text.toLocaleLowerCase().includes(data.toLowerCase()) });
        }
    }

    Model.prototype.getDoneItems = function () {
        return this.items.filter(x => x.isDone);
    }

    Model.prototype.getItems = function () {
        return this.items.filter(x => !x.isDone);
    }

    Model.prototype.toggleDone = function (id, checked) {
        const i = window.findObjectWithKey(this.items, "id", id);
        if (i) { i.isDone = checked; }
    }

    window.Model = Model;
})();