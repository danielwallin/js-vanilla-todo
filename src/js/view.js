(function () {
    'use strict';

    /**
     *
     * Utils
     *
     */

    // https://stackoverflow.com/questions/25693456/get-hashtags-from-string-with-trim-spaces-and-new-lines
    function findHashtags(searchText) {
        var regexp = /#[\w]+(?=\s|$)/g,
            result = searchText.match(regexp);

        if (result) {
            return result;
        } else {
            return false;
        }
    }

    /**
     *
     * Tpls
     *
     */

    const ListItems = function (items, tags) {
        console.log(items);
        return `${items.map(item => `<li class="list__item alignCenter flex1">
            <div class="item__wrapper flex alignItems justifyBetween">
                <input type="checkbox" />
                <p class="item__text">${item.text}</p>
                <div class="item__hashtags txt-right flex1">
                    ${(item.tags) ? item.tags.map(x => `<button class="btn btn__small">${x}</button>`) : ''}
                </div>
            </div>
        </li>`)}`;
    }

    const FilterTags = function (data) {
        return `${data.map((item, i) => `<li class="filters__tag">
            <button data-tag="${i}" class="btn btn__small">${item.text}</button>
        </li>`)}`;
    }

    function View(controller) {
        const d = document;
        this.controller = controller;
        this.list = d.querySelector(".list");
        this.filters = d.querySelector(".filters");
        this.search = d.querySelector(".search");
        this.searchinput = d.querySelector(".search .search__input");
        this.addBtn = d.querySelector(".search button");

        this.controller.model.registerObserver(this);
        this.setEvents();
        this.update();
    }

    View.prototype.setEvents = function () {
        const self = this, checkboxes = document.querySelectorAll("[type='checkbox']");
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener("click", function () {
                console.log(this, " ", this.checked);
            });
        }

        // filter buttons
        this.filters.addEventListener("click", function (e) {
            if (e.target.matches('.filters__tag button')) {
                e.stopPropagation();
                console.log("yes ", e.target.getAttribute("data-tag"));
            }
        });

        this.search.addEventListener('keyup', function (e) {
            this.controller.filterItems(this.searchinput.value);
        }.bind(this));

        this.addBtn.addEventListener('click', function (e) {
            if (this.isValidItem(this.searchinput.value)) {
                const hash = findHashtags(this.searchinput.value),
                    without = this.searchinput.value.replace(hash[0], "");

                hash[0] && hash[0] !== undefined && this.controller.addTag(hash[0].replace("#", ""));
                this.controller.addItem(without);
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
            tags = this.controller.getTags();

        this.list.innerHTML = ListItems(items, tags);
        this.filters.innerHTML = FilterTags(tags);
    }

    window.View = View;
})();