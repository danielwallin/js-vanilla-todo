(function () {
    'use strict';

    const ListItems = function (data) {
        return `${data.map(item => `<li class="list__item alignCenter flex1">
            <div class="item__wrapper flex alignItems justifyBetween">
                <input type="checkbox" />
                <p class="item__text">${item.text}</p>
                <div class="item__hashtags txt-right flex1">
                    ${item.tags.map(x => `<button class="btn btn__small">${x.text}</button>`)}
                </div>
            </div>
        </li>`)}`;
    }

    function View(controller) {
        const d = document;
        this.controller = controller;
        this.list = d.querySelector(".list");
        this.filters = d.querySelector(".filters");
        this.search = d.querySelector(".search");
        this.addBtn = d.querySelector(".search button");
        this.state = { searchValue: '' };

        this.setEvents();
        this.updateList();
    }

    View.prototype.setEvents = function () {
        const self = this, checkboxes = document.querySelectorAll("[type='checkbox']");

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener("click", function () {
                console.log(this.checked);
            });
        }

        this.search.addEventListener('keyup', function (e) {
            console.log('keyup: %s', e.target.value);
            self.state = { searchValue: e.target.value };
            console.log(this.state);
        });

        this.addBtn.addEventListener('click', function (e) {
            self.render(self.list, self.state.searchValue);
        });
    }

    View.prototype.clear = function (val) {
        this.state[val] = '';
    }

    View.prototype.render = function (component, data) {
        component.innerHTML = data;
    }

    View.prototype.updateList = function () {
        let items = this.controller.getItems();
        this.list.innerHTML = ListItems(items);
    }

    window.View = View;
})();