(function () {
    'use strict';

    /**
     *
     * Tpls
     *
     */

    const ListEmpty = function () {
        return `<li class="list__item alignCenter flex1">
            <div class="item__wrapper flex alignItems justifyBetween">
                <p class="item__text">Empty</p>
            </div>
        </li>`
    }

    const Count = function (data, label) {
        return `${data.length > 0 ? `<div class="count flex justifyBetween"><span class="bold">${label}</span><span> ${data.length} items</span></div>` : ""}`
    }

    const ListItems = function (items, tags) {
        return `${items.map(item => `<li class="list__item alignCenter flex1">
            <div class="item__wrapper flex alignItems justifyBetween">
                <input ${item.isDone ? "checked" : ""} type="checkbox" data-id="${item.id}" />
                <p class="item__text">${item.text}</p>
                <div class="item__hashtags txt-right flex1">
                    ${(item.tags) ? item.tags.map(x => `
                        <button style="background-color: ${(window.findObjectWithKey(tags, "id", x)) ? window.findObjectWithKey(tags, "id", x).color : ""}" class="btn btn__small">
                            ${(window.findObjectWithKey(tags, "id", x)) ? window.findObjectWithKey(tags, "id", x).text : ""}
                        </button>`).join("") : ""}
                </div>
            </div>
        </li>`).join("")}`;
    }

    const FilterTags = function (data) {
        let x = [];
        x.push(`${data.map((item, i) => `<li class="filters__tag">
            <button style="background-color: ${item.color}" data-id="${item.id}" class="btn btn__small">${item.text}</button>
        </li>`).join("")}`);
        x.unshift(`<li class="filters__tag">
            <button data-id="reset" class="btn btn__small btn__reset">all</button>
        </li>`);
        x = x.join("");
        return x;
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

        this.listCount = d.querySelector(".listCounter");
        this.listDoneCount = d.querySelector(".listDoneCounter")

        this.controller.model.registerObserver(this);
        this.update();
        this.setEvents();
    }

    View.prototype.setDoneItem = function (e) {
        if (e.target.matches('input[type="checkbox"]')) {
            const id = e.target.getAttribute("data-id");
            this.controller.toggleDone(id);
        }
    }

    View.prototype.setEvents = function () {
        // lists
        this.list.addEventListener("click", (e) => { this.setDoneItem(e); });
        this.listDone.addEventListener("click", (e) => { this.setDoneItem(e); });

        // filter tags
        this.filters.addEventListener("click", (e) => {
            if (e.target.matches('.filters__tag button')) {
                e.preventDefault();
                const id = e.target.getAttribute("data-id");
                if (id.toLowerCase() == 'reset') {
                    this.controller.resetFilter();
                } else {
                    this.controller.filterTagsWithId(e.target.getAttribute("data-id"));
                }
            }
        });

        // input
        this.search.addEventListener('keyup', (e) => {
            this.controller.filterItems(this.searchinput.value);
        });

        const handleAddItem = () => {
            if (this.isValidItem(this.searchinput.value)) {

                const hash = window.findHashtags(this.searchinput.value),
                    without = this.searchinput.value.replace(hash[0], "");

                if (hash.length > 0) {
                    const tagids = [];
                    for (var index = 0; index < hash.length; index++) {
                        const i = window.findObjectWithKey(this.controller.model.tags, "text", hash[index].replace("#", ""));
                        let id = (i !== undefined) ? i.id : window.generateId();
                        tagids.push(id);
                        this.controller.addTag(hash[index].replace("#", ""), id);
                    }

                    let regexp = new RegExp('(?:|^\s)(?:#)([a-zA-Zà-úÀ-Ú\d_\s]+)', 'g');
                    let itemtext = this.searchinput.value.replace(findHashtags(this.searchinput.value).join(""), "");
                    this.controller.addItem(itemtext, tagids);
                } else {
                    const i = window.findObjectWithKey(this.controller.model.tags, "text", hash[index]);
                    this.controller.addItem(without);
                }

                this.clearSearch();
            }
        }

        // add item
        this.searchinput.addEventListener('keydown', (e) => {
            if (e.key === "Enter") { handleAddItem(); }
        });

        this.addBtn.addEventListener('click', (e) => { handleAddItem(); });
    }

    View.prototype.isValidItem = function (val) {
        return (val || val !== "");
    }

    View.prototype.clearSearch = function () {
        this.searchinput.value = "";
    }

    View.prototype.update = function () {
        let items = this.controller.getItems(),
            itemsDone = this.controller.getDoneItems(),
            tags = this.controller.getTags(),
            filteredItems = this.controller.getFilteredItems();

        if (filteredItems.length <= 0) {
            this.listCount.innerHTML = Count(items, "Active");
            this.listDoneCount.innerHTML = Count(itemsDone, "Done");
            this.list.innerHTML = ListItems(items, tags);
            this.listDone.innerHTML = ListItems(itemsDone, tags);
        } else {
            this.listCount.innerHTML = Count(filteredItems, "Filtered");
            this.listDoneCount.innerHTML = Count(0, "Done");
            this.listDone.innerHTML = ListItems([], tags);
            this.list.innerHTML = ListItems(filteredItems, tags);
        }

        this.filters.innerHTML = FilterTags(tags);
    }

    window.View = View;
})();