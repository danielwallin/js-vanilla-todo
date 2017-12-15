(function () {
    'use strict';

    function Controller(store) {
        console.log("hello from controller with store " , store);
        this.store = store;
    }

    window.Controller = Controller;
})();