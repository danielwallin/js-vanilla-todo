(function () {
    'use strict';

    /**
     *
     * Tpls
     *
     */


    /* should get moved */
    const ListEmpty = function() {
        return `<li class="list__item alignCenter flex1">
            <div class="item__wrapper flex alignItems justifyBetween">
                <p class="item__text">Empty</p>
            </div>
        </li>`
    }

    const ListItems = function (items, tags) {
        return `${items.map(item => `<li class="list__item alignCenter flex1">
            <div class="item__wrapper flex alignItems justifyBetween">
                <input type="checkbox" data-id="${item.id}" />
                <p class="item__text">${item.text}</p>
                <div class="item__hashtags txt-right flex1">
                    ${(item.tags) ? item.tags.map(x => `
                        <button style="background-color: ${(window.findObjectWithKey(tags, "id", x)) ? window.findObjectWithKey(tags, "id", x).color : ''}" class="btn btn__small">
                            ${(window.findObjectWithKey(tags, "id", x)) ? window.findObjectWithKey(tags, "id", x).text : ''}
                        </button>`) : ''}
                </div>
            </div>
        </li>`).join('')}`;
    }

    const FilterTags = function (data) {
        console.log(data);
        return `${data.map((item, i) => `<li class="filters__tag">
            <button style="background-color: ${item.color}" data-id="${i}" class="btn btn__small">${item.text}</button>
        </li>`).join('')}`;
    }

    function View(controller) {
        const d = document;
        this.controller = controller;
        this.list = d.querySelector(".list");
        this.listDone = d.querySelector(".list.listDone");
        this.filters = d.querySelector(".filters");
        this.search = d.querySelector(".search");
        this.searchinput = d.querySelector(".search .search__input");
        this.addBtn = d.querySelector(".search button");

        this.controller.model.registerObserver(this);
        this.update();
        this.setEvents();
    }

    View.prototype.setDoneItem = function (e) {
        if (e.target.matches('input[type="checkbox"]')) {
            const id = e.target.getAttribute("data-id");
            console.log(e.target.checked);
            this.controller.toggleDone(id, e.target.checked);
        }
    }

    View.prototype.setEvents = function () {
        const self = this;
        // lists
        this.list.addEventListener("click", function (e) { self.setDoneItem(e); });
        this.listDone.addEventListener("click", function (e) { self.setDoneItem(e); });

        // filter tags
        this.filters.addEventListener("click", function (e) {
            if (e.target.matches('.filters__tag button')) {
                e.preventDefault();
                this.controller.filterTagsWithId(e.target.getAttribute("data-id"));
            }
        }.bind(this));

        // input
        this.search.addEventListener('keyup', function (e) {
            this.controller.filterItems(this.searchinput.value);
        }.bind(this));

        // add btn
        this.addBtn.addEventListener('click', function (e) {
            if (this.isValidItem(this.searchinput.value)) {

                const hash = window.findHashtags(this.searchinput.value),
                      without = this.searchinput.value.replace(hash[0], "");

                if (hash.length > 0) {
                    const tagids = [];
                    for (var index = 0; index < hash.length; index++) {
                        const id = window.generateId();
                        tagids.push(id);
                        this.controller.addTag(hash[index].replace("#", ""), id);
                    }
                    const h = hash.toString().replace(/,/g , '');
                    const t = this.searchinput.value.replace(h, '');
                    this.controller.addItem(t, tagids);
                } else {
                    this.controller.addItem(without);
                }

                this.clearSearch();
            }
        }.bind(this));
    }

    View.prototype.isValidItem = function (val) {
        return (val || val !== '');
    }

    View.prototype.clearSearch = function () {
        this.searchinput.value = '';
    }

    View.prototype.update = function () {
        let items = this.controller.getItems(),
            itemsDone = this.controller.getDoneItems(),
            tags = this.controller.getTags(),
            filteredItems = this.controller.getFilteredItems();

        if (filteredItems.length <= 0) {
            this.list.innerHTML = ListItems(items, tags);
        } else {
            this.list.innerHTML = ListItems(filteredItems, tags);
        }

        this.listDone.innerHTML = ListItems(itemsDone, tags);
        this.filters.innerHTML = FilterTags(tags);
    }

    window.View = View;
})();