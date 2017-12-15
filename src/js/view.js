(function () {
    'use strict';

    function View() {
        const d = document;
        this.list = d.querySelector(".list");
        this.filters = d.querySelector(".filters");
        this.search = d.querySelector(".search");
        this.addBtn = d.querySelector(".search button");

        this.state = { searchValue: '' };

        this.setEvents();
    }

    View.prototype.setEvents = function () {
        const self = this;
        const checkboxes = document.querySelectorAll("[type='checkbox']");

        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener("click", function () {
                console.log(this.checked);
            });
        }

        this.search.addEventListener('keyup', function (e) {
            // store temp
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

    window.View = View;
})();