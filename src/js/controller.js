(function () {
    'use strict';

    function Controller(store) {
        console.log("hello from controller");
        this.store = store;
    }

    window.Controller = Controller;
})();